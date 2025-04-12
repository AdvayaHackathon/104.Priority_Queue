import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, AlertCircle, Heart, Wind, Activity, Droplet, ChevronLeft, Info } from "lucide-react";
import BackButton from "../../components/shared/BackButton";

const PatientRiskReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const mockPatientRisk = {
    patientId: id,
    name: "John Doe",
    overallScore: 75,
    systemScores: [
      { system: "Cardiovascular", score: 80, icon: Heart },
      { system: "Respiratory", score: 60, icon: Wind },
      { system: "Endocrine", score: 75, icon: Activity },
      { system: "Renal", score: 85, icon: Droplet },
    ],
    riskFactors: [
      "History of hypertension",
      "Type 2 diabetes",
      "Family history of CVD",
    ],
  };

  // Get the appropriate color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return "from-red-500 to-rose-600";
    if (score >= 60) return "from-amber-500 to-orange-600";
    return "from-green-500 to-emerald-600";
  };

  const getScoreTextColor = (score) => {
    if (score >= 80) return "text-red-600";
    if (score >= 60) return "text-amber-600";
    return "text-green-600";
  };

  const getScoreProgressColor = (score) => {
    if (score >= 80) return "bg-gradient-to-r from-red-500 to-rose-600";
    if (score >= 60) return "bg-gradient-to-r from-amber-500 to-orange-600";
    return "bg-gradient-to-r from-green-500 to-emerald-600";
  };

  // Animation for progress bars
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    // Trigger animation shortly after component mounts
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-6 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto relative z-10 space-y-6">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center px-3 py-2 bg-white rounded-xl shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Patient
        </button>
        
        {/* Main Report Card */}
        <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-700 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Patient Risk Report
              </h2>
              <p className="text-sm text-white/80">
                {mockPatientRisk.name} (ID: {mockPatientRisk.patientId})
              </p>
            </div>
            <button className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>

          <div className="p-6">
            {/* Overall Risk Card */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100 shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-purple-600" />
                    Overall Risk Assessment
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Comprehensive evaluation of health risk factors and systems
                  </p>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Risk Level</span>
                      <span className={`text-sm font-bold ${getScoreTextColor(mockPatientRisk.overallScore)}`}>
                        {mockPatientRisk.overallScore >= 80 
                          ? "High" 
                          : mockPatientRisk.overallScore >= 60 
                            ? "Moderate" 
                            : "Low"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full ${getScoreProgressColor(mockPatientRisk.overallScore)} transition-all duration-1000 ease-out`}
                        style={{ width: animate ? `${mockPatientRisk.overallScore}%` : '0%' }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="relative h-48 w-48">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-4xl font-bold ${getScoreTextColor(mockPatientRisk.overallScore)}`}>
                        {mockPatientRisk.overallScore}%
                      </span>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#e5e7eb" 
                        strokeWidth="8"
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="url(#gradient)" 
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${animate ? mockPatientRisk.overallScore * 2.83 : 0}, 283`}
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={mockPatientRisk.overallScore >= 80 
                            ? "#ef4444" 
                            : mockPatientRisk.overallScore >= 60 
                              ? "#f59e0b" 
                              : "#10b981"} />
                          <stop offset="100%" stopColor={mockPatientRisk.overallScore >= 80 
                            ? "#e11d48" 
                            : mockPatientRisk.overallScore >= 60 
                              ? "#ea580c" 
                              : "#059669"} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* System Risk Scores */}
            <h3 className="text-lg font-medium text-gray-800 mb-4">System Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {mockPatientRisk.systemScores.map((system) => (
                <div key={system.system} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${getScoreColor(system.score)} text-white shadow-sm mr-3`}>
                      <system.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-700">
                        {system.system} System
                      </h4>
                    </div>
                    <span className={`text-lg font-bold ${getScoreTextColor(system.score)}`}>
                      {system.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${getScoreProgressColor(system.score)} transition-all duration-1000 ease-out`}
                      style={{ width: animate ? `${system.score}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Risk Factors */}
            <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-100">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                Key Risk Factors
              </h3>
              <ul className="space-y-2">
                {mockPatientRisk.riskFactors.map((factor, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendations Card */}
        <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-cyan-600 to-blue-700">
            <h2 className="text-xl font-semibold text-white">
              Recommended Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <RecommendationItem 
                title="Schedule Follow-up Appointment" 
                description="Recommended within 30 days to monitor cardiovascular status"
              />
              <RecommendationItem 
                title="Medication Review" 
                description="Suggest evaluation of current anti-hypertensive regimen"
              />
              <RecommendationItem 
                title="Dietary Consultation" 
                description="Referral to nutritionist for diabetes management plan"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecommendationItem = ({ title, description }) => (
  <div className="flex items-start p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
    <div className="p-1 bg-blue-100 rounded-full mr-3">
      <Info className="w-4 h-4 text-blue-600" />
    </div>
    <div>
      <h4 className="text-sm font-medium text-gray-800">{title}</h4>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  </div>
);

export default PatientRiskReport;
