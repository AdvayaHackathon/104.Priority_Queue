import React from "react";
import { useParams } from "react-router-dom";
import { Download, AlertCircle } from "lucide-react";

const PatientRiskReport = () => {
  const { id } = useParams();

  const mockPatientRisk = {
    patientId: id,
    name: "John Doe",
    overallScore: 75,
    systemScores: [
      { system: "Cardiovascular", score: 80 },
      { system: "Respiratory", score: 60 },
      { system: "Endocrine", score: 75 },
      { system: "Renal", score: 85 },
    ],
    riskFactors: [
      "History of hypertension",
      "Type 2 diabetes",
      "Family history of CVD",
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Patient Risk Report
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Patient ID: {id}
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>

        {/* Risk Scores Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Overall Risk Score
              </h3>
              <AlertCircle className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {mockPatientRisk.overallScore}%
            </div>
          </div>

          {/* System Analysis */}
          <div className="space-y-4">
            {mockPatientRisk.systemScores.map((system) => (
              <div
                key={system.system}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {system.system}
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {system.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${system.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRiskReport;
