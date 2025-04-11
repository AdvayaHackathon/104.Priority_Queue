import React from "react";
import { useParams } from "react-router-dom";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

const PatientDrugInteractions = () => {
  const { id } = useParams();

  const interactions = [
    {
      drugs: ["Metformin", "Lisinopril"],
      severity: "Low",
      description: "Minimal risk of interaction. Monitor blood pressure.",
      recommendation: "Continue as prescribed, regular BP monitoring advised.",
    },
    {
      drugs: ["Aspirin", "Warfarin"],
      severity: "High",
      description: "Increased risk of bleeding when used together.",
      recommendation: "Consider alternative antiplatelet therapy.",
    },
  ];

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "medium":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "low":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Drug Interactions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Patient ID: {id}
          </p>
        </div>

        <div className="p-6 space-y-4">
          {interactions.map((interaction, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                interaction.severity.toLowerCase() === "high"
                  ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900"
                  : "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900"
              }`}
            >
              <div className="flex items-start">
                {getSeverityIcon(interaction.severity)}
                <div className="ml-3">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {interaction.drugs.join(" + ")}
                    </h3>
                    <span
                      className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                        interaction.severity.toLowerCase() === "high"
                          ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                      }`}
                    >
                      {interaction.severity} Risk
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {interaction.description}
                  </p>
                  <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    Recommendation: {interaction.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDrugInteractions;
