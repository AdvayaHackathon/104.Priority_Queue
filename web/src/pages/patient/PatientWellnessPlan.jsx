import React from "react";
import { useParams } from "react-router-dom";
import { Utensils, Activity, Moon } from "lucide-react";
import BackButton from "../../components/shared/BackButton";

const PatientWellnessPlan = () => {
  const { id } = useParams();

  const plan = {
    diet: {
      breakfast: ["Oatmeal with berries", "Greek yogurt", "Green tea"],
      lunch: ["Grilled chicken salad", "Quinoa", "Fresh fruits"],
      dinner: ["Baked salmon", "Steamed vegetables", "Brown rice"],
    },
    exercise: [
      { activity: "Morning walk", duration: "30 mins", intensity: "Low" },
      {
        activity: "Strength training",
        duration: "20 mins",
        intensity: "Medium",
      },
      { activity: "Evening yoga", duration: "15 mins", intensity: "Low" },
    ],
    lifestyle: [
      { type: "Hydration", tip: "Drink 8-10 glasses of water daily" },
      { type: "Sleep", tip: "Aim for 7-8 hours of sleep" },
      { type: "Stress", tip: "Practice deep breathing exercises" },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <BackButton />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Wellness Plan</h2>
          <p className="text-sm text-gray-500">Patient ID: {id}</p>
        </div>

        <div className="p-6">
          {/* Diet Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Utensils className="w-5 h-5 mr-2" />
              Diet Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(plan.diet).map(([meal, items]) => (
                <div key={meal} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600 mb-2 capitalize">
                    {meal}
                  </h4>
                  <ul className="space-y-1">
                    {items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Exercise Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Exercise Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plan.exercise.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">{item.activity}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.duration} • {item.intensity} intensity
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Lifestyle Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Moon className="w-5 h-5 mr-2" />
              Lifestyle Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plan.lifestyle.map((item, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">{item.type}</h4>
                  <p className="text-sm text-blue-700 mt-1">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientWellnessPlan;
