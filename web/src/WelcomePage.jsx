import React from "react";
import { useNavigate } from "react-router-dom";

const CareChainWelcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="max-w-2xl px-8 py-12 bg-white rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CareChain AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your AI-powered clinical decision support system
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  );
};

export default CareChainWelcome;
