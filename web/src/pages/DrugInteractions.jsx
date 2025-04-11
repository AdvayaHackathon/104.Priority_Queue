import React from "react";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

const DrugInteractions = () => {
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
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Drug Interactions
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {interactions.map((interaction, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                interaction.severity.toLowerCase() === "high"
                  ? "border-red-200 bg-red-50"
                  : "border-blue-200 bg-blue-50"
              }`}
            >
              <div className="flex items-start">
                {getSeverityIcon(interaction.severity)}
                <div className="ml-3">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium">
                      {interaction.drugs.join(" + ")}
                    </h3>
                    <span
                      className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                        interaction.severity.toLowerCase() === "high"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {interaction.severity} Risk
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {interaction.description}
                  </p>
                  <p className="mt-2 text-sm font-medium">
                    Recommendation: {interaction.recommendation}
                  </p>
                  <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Explain This ↓
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrugInteractions;
