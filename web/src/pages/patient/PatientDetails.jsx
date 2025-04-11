import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, Stethoscope, Heart, ChevronLeft } from "lucide-react";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = {
    id: id,
    name: "John Doe",
    age: 45,
    lastVisit: "2024-04-10",
    riskLevel: "Low",
  };

  const ActionCard = ({ icon: Icon, title, description, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 
        hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <button
          onClick={() => navigate("/patients")}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Patients
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
          <p className="text-gray-500">Patient ID: {patient.id}</p>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard
          icon={FileText}
          title="Risk Report"
          description="View detailed health risk assessment and analysis"
          onClick={() => navigate(`/patients/${id}/risk-report`)}
        />
        <ActionCard
          icon={Stethoscope}
          title="Drug Interactions"
          description="Check medication interactions and warnings"
          onClick={() => navigate(`/patients/${id}/drug-interactions`)}
        />
        <ActionCard
          icon={Heart}
          title="Wellness Plan"
          description="View personalized diet and exercise recommendations"
          onClick={() => navigate(`/patients/${id}/wellness-plan`)}
        />
      </div>
    </div>
  );
};

export default PatientDetails;
