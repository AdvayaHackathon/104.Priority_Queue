import React from "react";
import { useParams } from "react-router-dom";
import { Calendar, Clock, Stethoscope } from "lucide-react";
import BackButton from "../../components/shared/BackButton";

const PatientCheckup = () => {
  const { id } = useParams();

  const checkupData = {
    nextAppointment: "2024-04-20",
    time: "10:00 AM",
    doctor: "Dr. Sarah Johnson",
    vitals: {
      bp: "120/80",
      pulse: "72",
      temp: "98.6°F",
      weight: "70 kg",
    },
    notes: "Regular follow-up for diabetes management. Blood pressure stable.",
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <BackButton />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Check-up Details
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Patient ID: {id}
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Appointment Info */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Next Appointment
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  Date: {checkupData.nextAppointment}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Time: {checkupData.time}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Doctor: {checkupData.doctor}
                </p>
              </div>
            </div>

            {/* Vitals */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center mb-4">
                <Stethoscope className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Vitals
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Blood Pressure
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {checkupData.vitals.bp}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pulse Rate
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {checkupData.vitals.pulse}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Temperature
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {checkupData.vitals.temp}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Weight
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {checkupData.vitals.weight}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="md:col-span-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Notes
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {checkupData.notes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCheckup;
