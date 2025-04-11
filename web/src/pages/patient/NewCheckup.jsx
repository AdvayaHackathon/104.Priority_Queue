import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Send, Upload, ChevronLeft } from "lucide-react";
import BackButton from "../../components/shared/BackButton";

const NewCheckup = () => {
  const { id } = useParams();
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI assistant. How can I help you with this checkup?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [prescriptionNotes, setPrescriptionNotes] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChatMessages([
      ...chatMessages,
      { role: "user", content: inputMessage },
      {
        role: "assistant",
        content: "I understand. Let me help you with that...",
      },
    ]);
    setInputMessage("");
  };

  const handleUploadPrescription = () => {
    // Add your upload logic here
    console.log("Uploading prescription:", prescriptionNotes);
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <BackButton />
        <h2 className="text-xl font-semibold text-gray-800 mt-2">
          New Checkup Session
        </h2>
        <p className="text-sm text-gray-500">Patient ID: {id}</p>
      </div>

      {/* Split View Container */}
      <div className="flex-1 flex">
        {/* Left Half - Chat Interface */}
        <div className="w-1/2 border-r border-gray-200 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">AI Assistant</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-200"
          >
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Half - Prescription Editor */}
        <div className="w-1/2 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Prescription Notes
            </h3>
          </div>

          <div className="flex-1 p-4">
            <textarea
              value={prescriptionNotes}
              onChange={(e) => setPrescriptionNotes(e.target.value)}
              placeholder="Type your prescription notes here..."
              className="w-full h-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleUploadPrescription}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Prescription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCheckup;
