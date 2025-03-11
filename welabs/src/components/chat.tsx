"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send, ChevronDown, Bot, User } from "lucide-react";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatAssistantProps {
  isDarkMode: boolean;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "Welcome to Virtual Labs Assistant! I can help you with experiments, concepts, troubleshooting, and more. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response with predefined answers
    setTimeout(() => {
      const botResponse = getBotResponse(input.trim().toLowerCase());
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: botResponse,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const getBotResponse = (query: string): string => {
    // Predefined responses based on keywords
    if (
      query.includes("hello") ||
      query.includes("hi") ||
      query.includes("hey")
    ) {
      return "Hello! I'm the Virtual Labs Assistant. How can I help you with your experiments today?";
    }

    if (query.includes("bubble sort")) {
      return "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed. Would you like to know more about its implementation, complexity, or see an example?";
    }

    if (
      query.includes("sort algorithm") ||
      query.includes("sorting algorithm")
    ) {
      return "Virtual Labs offers various sorting algorithm experiments including Bubble Sort, Quick Sort, Merge Sort, and more. These sorting algorithms differ in their approach, efficiency, and use cases. Would you like me to explain a specific algorithm?";
    }

    if (query.includes("complexity") || query.includes("time complexity")) {
      return "Time complexity measures how algorithm execution time increases with input size. Common notations include O(1) (constant), O(n) (linear), O(n²) (quadratic), and O(log n) (logarithmic). For example, Bubble Sort has O(n²) worst-case time complexity. Would you like to learn about a specific algorithm's complexity?";
    }

    if (query.includes("experiment steps") || query.includes("how to run")) {
      return "To run an experiment in Virtual Labs:\n1. Navigate to the experiment page\n2. Read the theory and prerequisites\n3. Take the pre-test to assess your knowledge\n4. Follow the step-by-step procedure\n5. Interact with the simulation as instructed\n6. Analyze your results and complete the post-test\n\nIs there a specific experiment you're trying to run?";
    }

    if (query.includes("thanks") || query.includes("thank you")) {
      return "You're welcome! If you have any more questions about Virtual Labs experiments or concepts, feel free to ask anytime.";
    }

    if (
      query.includes("what is virtual labs") ||
      query.includes("about virtual labs")
    ) {
      return "Virtual Labs is an initiative by the Ministry of Education under NMEICT. It provides remote laboratory learning experiences across various domains free of cost. The project is led by IIT Delhi and involves eleven partner institutes, offering over 190 Virtual Labs and 1600+ web-enabled experiments using open-source technologies.";
    }

    if (query.includes("vlead")) {
      return "The Virtual Labs Engineering, Architecture, and Design (VLEAD) Team at IIIT Hyderabad optimizes Virtual Labs operations. Their responsibilities include infrastructure management, system administration, user interface design, process coordination, analytics, automation, performance and security enhancements, content authoring tool development, and technology research.";
    }

    if (
      query.includes("create") ||
      query.includes("develop") ||
      query.includes("new experiment")
    ) {
      return "To develop a new experiment for Virtual Labs:\n1. Review the development process documentation\n2. Design your experiment following the provided templates\n3. Implement using recommended technologies\n4. Test thoroughly for usability and accuracy\n5. Submit for review through the Virtual Labs platform\n\nWould you like me to provide more specific guidance on any of these steps?";
    }

    if (query.includes("workshop") || query.includes("host workshop")) {
      return "Virtual Labs supports workshops to promote the platform. To host a workshop:\n1. Navigate to the Outreach section\n2. Fill out the 'Request a Workshop' form\n3. Provide details about your institution and potential participants\n4. Submit your request for review\n\nThe Virtual Labs team will contact you to coordinate the workshop details.";
    }

    // Default response if no keywords match
    return "Thank you for your question. Virtual Labs covers a wide range of topics across engineering, architecture and design. Could you provide more details about what you're looking for so I can give you a more specific answer?";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
          isDarkMode
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
        aria-label="Open chat assistant"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-20 right-6 z-40 w-full sm:w-96 md:w-[450px] rounded-xl shadow-2xl overflow-hidden ${
              isDarkMode
                ? "bg-gray-900 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div
              className={`p-4 flex justify-between items-center border-b ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-indigo-600 text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-1 rounded-full bg-white/20">
                  <Bot size={18} className="text-white" />
                </div>
                <h3 className="font-semibold text-white">
                  Virtual Labs Assistant
                </h3>
              </div>
              <button
                onClick={toggleChat}
                className="text-white p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages area */}
            <div
              className={`p-4 overflow-y-auto ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
              style={{ height: "350px" }}
            >
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 inline-block ${
                        message.role === "user"
                          ? isDarkMode
                            ? "bg-indigo-600 text-white"
                            : "bg-indigo-600 text-white"
                          : isDarkMode
                          ? "bg-gray-800 text-gray-200"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-start mb-1 space-x-2">
                        {message.role !== "user" && (
                          <div
                            className={`p-1 rounded-full ${
                              isDarkMode ? "bg-indigo-600/30" : "bg-indigo-100"
                            } mt-0.5`}
                          >
                            <Bot
                              size={14}
                              className={
                                isDarkMode
                                  ? "text-indigo-300"
                                  : "text-indigo-600"
                              }
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {message.role === "user"
                              ? "You"
                              : "Virtual Labs Assistant"}
                          </div>
                          <div className="whitespace-pre-line">
                            {message.content}
                          </div>
                          <div
                            className={`text-xs mt-1 ${
                              message.role === "user"
                                ? "text-indigo-200"
                                : isDarkMode
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                        {message.role === "user" && (
                          <div
                            className={`p-1 rounded-full ${
                              isDarkMode ? "bg-indigo-500/30" : "bg-indigo-100"
                            } mt-0.5`}
                          >
                            <User size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 inline-block ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-200"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex space-x-2">
                        <div className="typing-dot animate-pulse"></div>
                        <div className="typing-dot animate-pulse animation-delay-200"></div>
                        <div className="typing-dot animate-pulse animation-delay-400"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input area */}
            <div
              className={`p-3 border-t ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className={`w-full p-3 pr-10 rounded-lg resize-none ${
                      isDarkMode
                        ? "bg-gray-700 text-white placeholder:text-gray-400 border-gray-600"
                        : "bg-white text-gray-900 placeholder:text-gray-500 border-gray-300"
                    } border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    rows={1}
                    style={{ maxHeight: "120px", minHeight: "44px" }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className={`absolute right-2 bottom-2 p-1.5 rounded-full ${
                      input.trim()
                        ? isDarkMode
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : isDarkMode
                        ? "bg-gray-600 text-gray-400"
                        : "bg-gray-200 text-gray-400"
                    } transition-colors`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-2 text-center">
                <span
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Ask about experiments, concepts, or how to use Virtual Labs
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styling for typing animation */}
      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${isDarkMode ? "#6366f1" : "#4f46e5"};
          display: inline-block;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </>
  );
};

export default AIChatAssistant;
