import React from "react";
import { Users, AlertTriangle, FileText } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Patients"
          value="124"
          icon={Users}
          color="blue"
        />
        <SummaryCard
          title="Alerts Today"
          value="8"
          icon={AlertTriangle}
          color="yellow"
        />
        <SummaryCard
          title="High-Risk Cases"
          value="3"
          icon={FileText}
          color="red"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        {/* Add timeline component here */}
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon: Icon, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
