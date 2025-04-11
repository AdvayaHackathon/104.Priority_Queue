from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
import uvicorn
from typing import Optional
import requests
import json
import uuid

# Create FastAPI app
app = FastAPI(title="CareChain API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# MultiChain connection settings
RPC_USER = "multichainrpc"
RPC_PASSWORD = "DJwS8MKqFZTTe3nbdU3Co8fQxE6MhhTEqi2di3RYDcUx"
RPC_PORT = "4360"
RPC_HOST = "127.0.0.1"
CHAIN_NAME = "Health"
STREAM_NAME = "users"
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

@app.post("/api/doctor/login")
async def doctor_login(credentials: DoctorLogin):
    """Authenticate a doctor using blockchain credentials"""
    try:
        # Retrieve doctor data from MultiChain
        result = multichain_request(
            "liststreamkeyitems",
            ["doctors", credentials.email]
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
            ["doctors", email]
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
            ["doctors"]
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

if __name__ == "__main__":
    # Run the API with uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)