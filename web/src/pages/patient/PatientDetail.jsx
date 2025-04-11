import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, FileText, ChevronRight } from "lucide-react";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = {
    id: id,
    name: "John Doe",
    age: 45,
    lastVisit: "2024-04-10",
    wellness: {
      breakfast: "Oatmeal with berries",
      exercise: "30 min walking",
    },
    prescription: {
      medication: "Lisinopril 10mg",
      doctor: "Dr. Emily Chen",
      date: "2024-04-05",
    },
    riskLevel: "LOW",
  };

  const Card = ({ title, icon: Icon, children, action }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Icon className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );

  const ActionButton = ({ label, onClick }) => (
    <button
      onClick={onClick}
      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
    >
      {label}
      <ChevronRight className="w-4 h-4 ml-1" />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <span>ID: {patient.id}</span>
              <span className="mx-2">•</span>
              <span>Age: {patient.age}</span>
              <span className="mx-2">•</span>
              <span>Last Visit: {patient.lastVisit}</span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/patients/${id}/upload-prescription`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upload Prescription
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wellness Plan Card */}
        <Card
          title="Today's Wellness Plan"
          icon={Calendar}
          action={
            <ActionButton
              label="View Plan"
              onClick={() => navigate(`/patients/${id}/wellness-plan`)}
            />
          }
        >
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Breakfast</p>
              <p className="text-sm text-gray-900">
                {patient.wellness.breakfast}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Exercise</p>
              <p className="text-sm text-gray-900">
                {patient.wellness.exercise}
              </p>
            </div>
          </div>
        </Card>

        {/* Latest Prescription Card */}
        <Card
          title="Latest Prescription"
          icon={FileText}
          action={
            <ActionButton
              label="View Details"
              onClick={() => navigate(`/patients/${id}/prescriptions`)}
            />
          }
        >
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Medication</p>
              <p className="text-sm text-gray-900">
                {patient.prescription.medication}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Doctor</p>
              <p className="text-sm text-gray-900">
                {patient.prescription.doctor}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Prescribed Date
              </p>
              <p className="text-sm text-gray-900">
                {patient.prescription.date}
              </p>
            </div>
          </div>
        </Card>

        {/* Health Risk Assessment Card */}
        <Card title="Health Risk Assessment" icon={Clock}>
          <div className="space-y-3">
            <div className="flex items-center">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  patient.riskLevel === "LOW"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {patient.riskLevel} RISK
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Your health metrics are within normal ranges.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientDetail;
