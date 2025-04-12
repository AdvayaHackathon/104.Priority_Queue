from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
import uvicorn
from typing import Optional
import requests
import json
import uuid
import pandas as pd
from pathlib import Path
import re

# Create FastAPI app
app = FastAPI(title="CareChain API")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    "https://busy-onions-see.loca.lt",
    # Add any other origins your frontend might use
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Use specific origins instead of "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MultiChain connection settings
RPC_USER = "multichainrpc"
RPC_PASSWORD = "DJwS8MKqFZTTe3nbdU3Co8fQxE6MhhTEqi2di3RYDcUx"
RPC_PORT = "4360"
RPC_HOST = "127.0.0.1"
CHAIN_NAME = "Health"
STREAM_NAME = "users"
DOCTOR_STREAM = "doctors"
RPC_URL = f"http://{RPC_USER}:{RPC_PASSWORD}@{RPC_HOST}:{RPC_PORT}"

# Pydantic models for request validation
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str
    age: str
    gender: str
    bloodGroup: str
    medicalIssues: Optional[str] = ""

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class DoctorSignup(BaseModel):
    name: str
    email: EmailStr
    password: str
    specialization: str
    licenseNumber: str
    hospital: str
    phone: str
    experience: Optional[str] = ""

class DoctorLogin(BaseModel):
    email: EmailStr
    password: str

def multichain_request(method, params=None):
    """Make a request to the MultiChain API"""
    if params is None:
        params = []
    
    headers = {'content-type': 'application/json'}
    payload = {
        "method": method,
        "params": params,
        "id": 1,
        "chain_name": CHAIN_NAME
    }
    
    try:
        response = requests.post(RPC_URL, json=payload, headers=headers)
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"MultiChain error: {str(e)}")

@app.post("/api/signup", status_code=201)
async def signup(user: UserSignup):
    """Register a new user and store details in MultiChain"""
    try:
        # Generate unique user ID
        user_id = str(uuid.uuid4())
        
        # Prepare data for blockchain
        # Note: In a production app, password should be hashed and not stored directly on blockchain
        blockchain_data = {
            "userId": user_id,
            "name": user.name,
            "email": user.email,
            "age": user.age,
            "gender": user.gender,
            "bloodGroup": user.bloodGroup,
            "medicalIssues": user.medicalIssues,
            "password": user.password  # In a real app, hash this password
        }
        
        # Convert to hex for MultiChain
        hex_data = json.dumps(blockchain_data).encode('utf-8').hex()
        
        # Create stream item with user email as the key
        result = multichain_request(
            "publish",
            [STREAM_NAME, user.email, hex_data]
        )
        
        if "result" in result:
            return {
                "success": True,
                "message": "User registered successfully",
                "userId": user_id
            }
        else:
            if "error" in result:
                raise HTTPException(status_code=500, detail=result["error"]["message"])
            else:
                raise HTTPException(status_code=500, detail="Unknown error occurred")
                
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/login")
async def login(credentials: UserLogin):
    """Authenticate a user"""
    try:
        # Retrieve user data from MultiChain
        result = multichain_request(
            "liststreamkeyitems",
            [STREAM_NAME, credentials.email]
        )
        
        if "result" in result and result["result"]:
            # Get the latest user data
            latest_data = result["result"][-1]
            
            # Decode data from hex
            user_data_hex = latest_data["data"]
            if user_data_hex:
                user_data = json.loads(bytes.fromhex(user_data_hex).decode('utf-8'))
                
                # In a real app, you would hash the password and compare to stored hash
                if user_data["password"] == credentials.password:
                    return {
                        "success": True,
                        "message": "Login successful",
                        "userId": user_data["userId"],
                        "name": user_data["name"],
                        "email": user_data["email"]
                    }
                else:
                    raise HTTPException(status_code=401, detail="Invalid credentials")
            else:
                raise HTTPException(status_code=401, detail="Invalid user data")
        else:
            raise HTTPException(status_code=404, detail="User not found")
            
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/doctor/signup", status_code=201)
async def doctor_signup(doctor: DoctorSignup):
    """Register a new doctor and store details in MultiChain"""
    try:
        # Generate unique doctor ID
        doctor_id = str(uuid.uuid4())
        
        # Ensure the doctors stream exists
        create_stream_result = multichain_request(
            "create", 
            ["stream", DOCTOR_STREAM, True]
        )
        print(f"Stream creation: {create_stream_result}")
        
        # Check if a doctor with this email already exists
        check_result = multichain_request(
            "liststreamkeyitems",
            [DOCTOR_STREAM, doctor.email]
        )
        
        if "result" in check_result and check_result["result"]:
            raise HTTPException(status_code=400, detail="A doctor with this email already exists")
        
        # Prepare data for blockchain
        blockchain_data = {
            "doctorId": doctor_id,
            "name": doctor.name,
            "email": doctor.email,
            "specialization": doctor.specialization,
            "licenseNumber": doctor.licenseNumber,
            "hospital": doctor.hospital,
            "phone": doctor.phone,
            "experience": doctor.experience,
            "password": doctor.password,  # In a real app, hash this password
            "role": "doctor"
        }
        
        # Convert to hex for MultiChain
        hex_data = json.dumps(blockchain_data).encode('utf-8').hex()
        
        # Create stream item with doctor email as the key
        result = multichain_request(
            "publish",
            [DOCTOR_STREAM, doctor.email, hex_data]
        )
        
        if "result" in result:
            # Subscribe to the doctors stream
            subscribe_result = multichain_request(
                "subscribe",
                [DOCTOR_STREAM]
            )
            
            return {
                "success": True,
                "message": "Doctor registered successfully",
                "doctorId": doctor_id
            }
        else:
            if "error" in result:
                raise HTTPException(status_code=500, detail=result["error"]["message"])
            else:
                raise HTTPException(status_code=500, detail="Unknown error occurred")
                
    except Exception as e:
        print(f"Doctor signup error: {str(e)}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/doctor/login")
async def doctor_login(credentials: DoctorLogin):
    """Authenticate a doctor using blockchain credentials"""
    try:
        # Retrieve doctor data from MultiChain
        result = multichain_request(
            "liststreamkeyitems",
            [DOCTOR_STREAM, credentials.email]  # Use DOCTOR_STREAM constant
        )
        
        if "result" in result and result["result"]:
            # Get the latest doctor data
            latest_data = result["result"][-1]
            
            # Decode data from hex
            doctor_data_hex = latest_data["data"]
            if doctor_data_hex:
                doctor_data = json.loads(bytes.fromhex(doctor_data_hex).decode('utf-8'))
                
                # In a real app, you would hash the password and compare to stored hash
                if doctor_data["password"] == credentials.password:
                    return {
                        "success": True,
                        "message": "Login successful",
                        "doctorId": doctor_data["doctorId"],
                        "name": doctor_data["name"],
                        "email": doctor_data["email"],
                        "specialization": doctor_data["specialization"],
                        "hospital": doctor_data["hospital"],
                        "role": "doctor"
                    }
                else:
                    raise HTTPException(status_code=401, detail="Invalid credentials")
            else:
                raise HTTPException(status_code=401, detail="Invalid doctor data")
        else:
            raise HTTPException(status_code=404, detail="Doctor not found")
            
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/user/{email}")
async def get_user_profile(email: str):
    """Get user profile data"""
    try:
        # Retrieve user data from MultiChain
        result = multichain_request(
            "liststreamkeyitems",
            [STREAM_NAME, email]
        )
        
        if "result" in result and result["result"]:
            # Get the latest user data
            latest_data = result["result"][-1]
            
            # Decode data from hex
            user_data_hex = latest_data["data"]
            if user_data_hex:
                user_data = json.loads(bytes.fromhex(user_data_hex).decode('utf-8'))
                
                # Remove sensitive information
                if "password" in user_data:
                    del user_data["password"]
                    
                return user_data
            else:
                raise HTTPException(status_code=400, detail="Invalid user data")
        else:
            raise HTTPException(status_code=404, detail="User not found")
            
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/doctor/{email}")
async def get_doctor_profile(email: str):
    """Get doctor profile data from blockchain"""
    try:
        # Retrieve doctor data from MultiChain
        result = multichain_request(
            "liststreamkeyitems",
            [DOCTOR_STREAM, email]
        )
        
        if "result" in result and result["result"]:
            # Get the latest doctor data
            latest_data = result["result"][-1]
            
            # Decode data from hex
            doctor_data_hex = latest_data["data"]
            if doctor_data_hex:
                doctor_data = json.loads(bytes.fromhex(doctor_data_hex).decode('utf-8'))
                
                # Remove sensitive information
                if "password" in doctor_data:
                    del doctor_data["password"]
                    
                return doctor_data
            else:
                raise HTTPException(status_code=400, detail="Invalid doctor data")
        else:
            raise HTTPException(status_code=404, detail="Doctor not found")
            
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/doctors")
async def get_all_doctors():
    """Get a list of all doctors"""
    try:
        # Retrieve all items from the doctors stream
        result = multichain_request(
            "liststreamitems",
            [DOCTOR_STREAM]
        )
        
        if "result" in result and result["result"]:
            doctors = []
            for item in result["result"]:
                if "data" in item and item["data"]:
                    doctor_data = json.loads(bytes.fromhex(item["data"]).decode('utf-8'))
                    
                    # Remove sensitive information
                    if "password" in doctor_data:
                        del doctor_data["password"]
                        
                    doctors.append(doctor_data)
            
            return {"doctors": doctors}
        else:
            return {"doctors": []}
            
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/patients")
async def get_all_patients():
    """Get a list of all patients from the blockchain"""
    try:
        # Retrieve all items from the users stream
        result = multichain_request(
            "liststreamitems",
            [STREAM_NAME]
        )
        
        if "result" in result and result["result"]:
            return result["result"]
        else:
            return []
            
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/status")
async def check_status():
    """Check if MultiChain is accessible"""
    try:
        result = multichain_request("getinfo")
        if "result" in result:
            return {
                "status": "connected",
                "chain": result["result"]["chainname"]
            }
        else:
            raise HTTPException(
                status_code=500, 
                detail="Could not connect to MultiChain"
            )
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/debug")
async def debug_endpoint():
    """Test endpoint to verify API is working"""
    return {
        "status": "ok",
        "message": "API is working properly",
        "timestamp": str(uuid.uuid4())
    }

def generate_complementary_strand(dna_strand):
    """Generate the complementary DNA strand"""
    complement_dict = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}
    complementary_strand = ''
    
    for base in dna_strand:
        complementary_strand += complement_dict.get(base, base)
    
    return complementary_strand[::-1]

def check_huntingtin_sequence(sequence):
    """Check for Huntington's Disease genetic markers"""
    cleaned_sequence = sequence.upper().replace(" ", "")
    cag_counts = [len(match.group(0)) // 3 for match in re.finditer(r'(CAG)+', cleaned_sequence)]
    c_count = max(cag_counts, default=0)
    return 1 if c_count > 35 else 0

def check_sickle_cell_sequence(genetic_sequence):
    """Check for Sickle Cell Anemia genetic markers"""
    start_index = genetic_sequence.find("ATG")
    if start_index != -1:
        target_position = start_index + 14
        if len(genetic_sequence) > target_position:
            return 1 if genetic_sequence[target_position] == 'T' else 0
    return 0

def check_dmd_sequence(sequence):
    """Check for Muscular Dystrophy genetic markers"""
    cleaned_sequence = sequence.upper().replace(" ", "")
    for i in range(0, len(cleaned_sequence), 3):
        codon = cleaned_sequence[i:i+3]
        if codon in ["TGA", "TAG", "TAA"]:
            return 1
    return 0 if "---" not in cleaned_sequence else 1

def generate_punnett_square(parent1, parent2):
    """Generate Punnett square for genetic inheritance"""
    punnett_square = []
    for gene1 in parent1:
        for gene2 in parent2:
            punnett_square.append(gene1 + gene2)
    return punnett_square

class GeneticAnalysisRequest(BaseModel):
    disease: str
    father_sequence: str
    mother_sequence: str
    paternal_grandfather_sequence: str
    paternal_grandmother_sequence: str
    maternal_grandfather_sequence: str
    maternal_grandmother_sequence: str

@app.post("/api/analyze")
async def analyze_genetics(request_data: GeneticAnalysisRequest):
    """Analyze genetic sequences for disease markers"""
    try:
        print("\n=== Starting Genetic Analysis ===")
        data = request_data.dict()
        print(f"Received data for analysis: {data['disease']}")
        
        # Generate complementary strands
        print("\nGenerating complementary strands...")
        sequences = {}
        for key in [
            'father_sequence', 
            'mother_sequence', 
            'paternal_grandfather_sequence', 
            'paternal_grandmother_sequence', 
            'maternal_grandfather_sequence', 
            'maternal_grandmother_sequence'
        ]:
            sequence = data[key]
            complement = generate_complementary_strand(sequence)
            sequences[key] = sequence
            sequences[f"{key}_complement"] = complement
            print(f"Generated complement for {key}: {complement[:10]}...")

        # Process based on disease type
        disease = data['disease']
        print(f"\nProcessing disease type: {disease}")
        if disease == "Huntington's Disease":
            check_function = check_huntingtin_sequence
            print("Using Huntington's Disease check function")
        elif disease == "Sickle Cell Anemia":
            check_function = check_sickle_cell_sequence
            print("Using Sickle Cell Anemia check function")
        elif disease == "Muscular Dystrophy":
            check_function = check_dmd_sequence
            print("Using Muscular Dystrophy check function")
        else:
            print(f"ERROR: Invalid disease type - {disease}")
            raise HTTPException(status_code=400, detail='Invalid disease type')

        # Generate results
        print("\nAnalyzing sequences...")
        results = []
        for key, sequence in sequences.items():
            result = str(check_function(sequence))
            results.append(result)
            print(f"Analysis result for {key}: {result}")
        results = ''.join(results)
        print(f"Combined results string: {results}")

        # Generate Punnett squares
        print("\nGenerating Punnett squares...")
        father_genotype = results[:2]
        mother_genotype = results[2:4]
        paternal_grandfather_genotype = results[4:6]
        paternal_grandmother_genotype = results[6:8]
        maternal_grandfather_genotype = results[8:10]
        maternal_grandmother_genotype = results[10:]

        print(f"Father genotype: {father_genotype}")
        print(f"Mother genotype: {mother_genotype}")
        print(f"Paternal grandparents genotypes: {paternal_grandfather_genotype}, {paternal_grandmother_genotype}")
        print(f"Maternal grandparents genotypes: {maternal_grandfather_genotype}, {maternal_grandmother_genotype}")

        punnett_squares = {
            'father_mother': generate_punnett_square(father_genotype, mother_genotype),
            'paternal_grandparents': generate_punnett_square(paternal_grandfather_genotype, paternal_grandmother_genotype),
            'maternal_grandparents': generate_punnett_square(maternal_grandfather_genotype, maternal_grandmother_genotype)
        }
        print("Punnett squares generated successfully")

        # Store results in CSV
        print("\nStoring results in CSV...")
        df = pd.DataFrame({
            "Disease": [disease],
            **{k: [v] for k, v in sequences.items()},
            "Results": [results]
        })

        csv_file_path = "genetic_data.csv"
        if Path(csv_file_path).is_file():
            print("Appending to existing CSV file")
            existing_df = pd.read_csv(csv_file_path)
            df = pd.concat([existing_df, df], ignore_index=True)
        df.to_csv(csv_file_path, index=False)
        print("Data saved successfully")

        print("\n=== Analysis Complete ===")
        return {
            'disease': disease,
            'sequences': sequences,
            'results': results,
            'punnett_squares': punnett_squares
        }

    except Exception as e:
        print(f"\nERROR: An exception occurred - {str(e)}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # Run the API with uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)