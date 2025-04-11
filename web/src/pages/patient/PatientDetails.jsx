import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, Calendar, Heart, ChevronLeft, Clock } from "lucide-react";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Patient data mock
  const patient = {
    id: id,
    name: "John Doe",
    age: 45,
    lastVisit: "2024-04-10",
    nextCheckup: "2024-04-20",
    riskLevel: "Low",
  };

  // Breadcrumb navigation helper
  const BreadcrumbNav = () => (
    <div className="flex items-center space-x-2 text-sm text-gray-500">
      <button
        onClick={() => navigate("/patients")}
        className="hover:text-gray-700"
      >
        Patients
      </button>
      <span>/</span>
      <span className="text-gray-700">{patient.name}</span>
    </div>
  );

  // Updated action cards array without Schedule Checkup
  const actionCards = [
    {
      icon: Clock,
      title: "New Checkup",
      description: "Start a new checkup session with the patient",
      path: "new-checkup",
      pageName: "New Checkup Session",
    },
    {
      icon: FileText,
      title: "Risk Report",
      description: "View detailed health risk assessment",
      path: "risk-report",
      pageName: "Patient Risk Assessment",
    },
    {
      icon: Heart,
      title: "Wellness Plan",
      description: "View personalized health recommendations",
      path: "wellness-plan",
      pageName: "Patient Wellness Plan",
    },
  ];

  // Action card component with page title management
  const ActionCard = ({ icon: Icon, title, description, path, pageName }) => (
    <div
      onClick={() => {
        // Store the current page name for back navigation
        sessionStorage.setItem("previousPage", "Patient Details");
        sessionStorage.setItem("currentPage", pageName);
        navigate(`/patients/${id}/${path}`);
      }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 
        hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
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
      {/* Header with Breadcrumb Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <BreadcrumbNav />
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
            <div className="mt-2 space-y-1">
              <p className="text-gray-500">Patient ID: {patient.id}</p>
              <p className="text-gray-500">Age: {patient.age}</p>
              <p className="text-gray-500">Last Visit: {patient.lastVisit}</p>
              <p className="text-gray-500">
                Next Checkup: {patient.nextCheckup}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              patient.riskLevel === "High"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {patient.riskLevel} Risk
          </span>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actionCards.map((card, index) => (
          <ActionCard key={index} {...card} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          {actionCards.map((card, index) => (
            <button
              key={index}
              onClick={() => {
                sessionStorage.setItem("previousPage", "Patient Details");
                sessionStorage.setItem("currentPage", card.pageName);
                navigate(`/patients/${id}/${card.path}`);
              }}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 
                hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
            >
              {card.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
