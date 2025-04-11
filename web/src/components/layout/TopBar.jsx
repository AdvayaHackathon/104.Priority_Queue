import React from "react";
import { Bell, Sun, User } from "lucide-react";

const TopBar = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-gray-900 truncate">
              Dashboard
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Sun className="w-6 h-6" />
            </button>
            <button className="flex items-center text-sm font-medium text-gray-700">
              <User className="w-6 h-6 mr-2" />
              Dr. John Doe
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
