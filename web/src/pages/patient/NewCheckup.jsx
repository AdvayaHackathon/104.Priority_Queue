import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, Upload, ChevronLeft, Clock, Clipboard, FilePlus } from "lucide-react";
import BackButton from "../../components/shared/BackButton";

// Your Gemini API key should be in .env file
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "AIzaSyDIj_BIwaYHQoNKDkZxdf1IZ3KtMS5lk2Y";

const NewCheckup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you with this checkup?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [prescriptionNotes, setPrescriptionNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Function to call Gemini API
  const callGeminiAPI = async (message) => {
    setIsLoading(true);

    try {
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      };

      // Start with the system prompt and include chat history
      const chatHistory = chatMessages
        .filter((msg) => msg.role !== "system")
        .map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        }));

      // Add the new message
      chatHistory.push({
        role: "user",
        parts: [{ text: message }],
      });

      const data = {
        generationConfig,
        contents: chatHistory,
        systemInstruction: {
          role: "user",
          parts: [
            {
              text: 'You are a clinical assistant chatbot designed to process and converse about prescriptions provided by doctors. When a prescription is given to you in plain text: Identify and extract key details such as: Drug names Dosage Frequency Duration Special instructions (e.g., "after food", "at bedtime") Respond by: Summarizing the prescription clearly Asking for clarification if any important detail is missing or ambiguous Gently flagging potential concerns (e.g., duplicate medications, uncommon dosages) Optional (if patient history is provided): Mention possible drug interactions or allergy conflicts Suggest safer or standard alternatives (only if applicable) You must not use Markdown or formatting styles such as asterisks, bullet points, or headings in your response. Always use plain text with clear sentence structure. Maintain a professional, helpful, and non-alarming tone. Always defer medical authority to the doctor. Do not make definitive clinical decisions. Your purpose is to act as a thinking assistant — helping review, understand, and talk through prescriptions with care and intelligence.',
            },
          ],
        },
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (responseData.candidates && responseData.candidates[0]?.content?.parts[0]?.text) {
        return responseData.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected API response:", responseData);
        return "I'm sorry, I couldn't process that request. Please try again.";
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I apologize, but I encountered an error. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle sending the initial prescription
  const handleSharePrescription = async () => {
    if (!prescriptionNotes.trim()) {
      alert("Please enter prescription details first.");
      return;
    }

    setIsLoading(true);

    // Prepare the message with prescription notes
    const message = `Prescription:\n\n${prescriptionNotes}`;

    // Add user message to chat
    setChatMessages((prev) => [...prev, { role: "user", content: message }]);

    // Get AI response
    const aiResponse = await callGeminiAPI(message);

    // Add AI response to chat
    setChatMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);

    setIsLoading(false);
  };

  // Function to handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    // Add user message to chat
    setChatMessages((prev) => [...prev, { role: "user", content: inputMessage }]);

    // Clear input field
    const messageToBeSent = inputMessage;
    setInputMessage("");

    // Get AI response
    const aiResponse = await callGeminiAPI(messageToBeSent);

    // Add AI response to chat
    setChatMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
  };

  // Function to handle uploading prescription
  const handleUploadPrescription = () => {
    console.log("Uploading prescription:", prescriptionNotes);
    alert("Prescription uploaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header - Updated to match WelcomePag.js style */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">New Checkup Session</h2>
              <p className="text-sm text-gray-600">Patient ID: {id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Updated with decorative elements from WelcomePag.js */}
      <section className="container mx-auto px-6 py-8 relative">
        {/* Decorative elements like in WelcomePag.js */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="flex flex-col md:flex-row gap-6 relative z-10">
          {/* Left Half - Chat Interface */}
          <div className="w-full md:w-1/2 flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
            <div className="p-4 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-700">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                AI Assistant
              </h3>
            </div>

            {/* Scrollable Chat Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 h-[500px]">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl shadow px-4 py-3 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="markdown">
                        {/* Basic formatting for bold text */}
                        {message.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                          if (part.startsWith("**") && part.endsWith("**")) {
                            return <strong key={i}>{part.slice(2, -2)}</strong>;
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-xl px-4 py-3 bg-white border border-gray-200 shadow">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="h-2 w-2 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-purple-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input Form - Fixed at bottom */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 flex-shrink-0 bg-gray-50"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl shadow-md transition-all ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:from-purple-700 hover:to-indigo-800 hover:shadow-lg"
                  }`}
                  disabled={isLoading}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Half - Prescription Editor */}
          <div className="w-full md:w-1/2 flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
            <div className="p-4 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-700">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Clipboard className="w-5 h-5 mr-2" />
                Prescription Notes
              </h3>
            </div>

            {/* Scrollable Prescription Area */}
            <div className="flex-1 p-4 overflow-hidden h-[400px]">
              <textarea
                value={prescriptionNotes}
                onChange={(e) => setPrescriptionNotes(e.target.value)}
                placeholder="Type your prescription notes here..."
                className="w-full h-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 overflow-y-auto"
              />
            </div>

            {/* Action Buttons - Fixed at bottom */}
            <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-gray-50 space-y-3">
              <button
                onClick={handleSharePrescription}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-md hover:from-green-600 hover:to-emerald-700 hover:shadow-xl transition-all flex items-center justify-center"
                disabled={isLoading || !prescriptionNotes.trim()}
              >
                <Send className="w-5 h-5 mr-2" />
                Share with AI Assistant
              </button>

              <button
                onClick={handleUploadPrescription}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl shadow-md hover:from-purple-700 hover:to-indigo-800 hover:shadow-xl transition-all flex items-center justify-center"
                disabled={isLoading || !prescriptionNotes.trim()}
              >
                <FilePlus className="w-5 h-5 mr-2" />
                Upload Prescription
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewCheckup;
