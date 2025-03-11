import React, { useState } from "react";
import { motion } from "framer-motion";

interface FeedbackContentProps {
  isDarkMode?: boolean;
}

const FeedbackContent: React.FC<FeedbackContentProps> = ({
  isDarkMode = false,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    liked: "",
    improvements: "",
    recommendation: "",
    email: "",
  });

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the form submission to a backend
    setSubmitted(true);
  };

  // Reset the entire feedback flow
  const resetFeedback = () => {
    setSubmitted(false);
    setShowForm(false);
    setFormData({
      liked: "",
      improvements: "",
      recommendation: "",
      email: "",
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div
        className={`relative overflow-hidden rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900"
            : "bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-600"
        } p-6 sm:p-8 text-white shadow-lg`}
      >
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z" />
            <circle cx="6.5" cy="6.5" r="1.5" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-4 relative z-10">
          {submitted ? "Thank You!" : "Share Your Feedback"}
        </h2>
        <p className="max-w-3xl text-base sm:text-lg relative z-10">
          {submitted
            ? "Your feedback has been submitted successfully."
            : "Help us improve the Virtual Labs experience by sharing your thoughts and suggestions."}
        </p>
      </div>

      {submitted ? (
        // Thank you view after submission
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl shadow-md p-6 sm:p-8 border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <div
              className={`p-3 sm:p-4 rounded-full mb-6 ${
                isDarkMode ? "bg-green-900/30" : "bg-green-100"
              }`}
            >
              <svg
                className={`w-8 h-8 sm:w-12 sm:h-12 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h3
              className={`text-xl sm:text-2xl font-bold mb-4 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Feedback Received
            </h3>

            <p
              className={`text-base sm:text-lg mb-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We appreciate your input in helping us improve the Virtual Labs
              experience. Your feedback will be used to enhance our learning
              modules and create better educational experiences.
            </p>

            <div
              className={`w-full p-4 rounded-lg mb-6 ${
                isDarkMode ? "bg-gray-900/70" : "bg-gray-50"
              }`}
            >
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                A member of our team may reach out if we need additional
                information about your experience. Thank you for helping us
                improve!
              </p>
            </div>

            <button
              onClick={resetFeedback}
              className={`px-5 py-2.5 rounded-lg transition-all font-medium 
                flex items-center shadow-sm hover:shadow ${
                  isDarkMode
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "bg-teal-500 hover:bg-teal-600 text-white"
                }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
              Return to Feedback Page
            </button>
          </div>
        </motion.div>
      ) : !showForm ? (
        // Initial view - Feedback invitation
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl shadow-md border overflow-hidden ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="md:flex">
            <div className="md:w-7/12 p-5 sm:p-6 md:p-8">
              <div className="flex items-center mb-5">
                <div
                  className={`p-2 rounded-lg ${
                    isDarkMode ? "bg-teal-900/40" : "bg-teal-100"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-teal-400" : "text-teal-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <h3
                  className={`text-lg sm:text-xl font-semibold ml-3 ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Your Opinion Matters
                </h3>
              </div>

              <p
                className={`mb-4 text-sm sm:text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Thanks for using Virtual Labs. We're committed to providing the
                best learning experience possible.
              </p>

              <p
                className={`mb-6 text-sm sm:text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Your feedback helps us understand what's working well and where
                we can improve. It only takes a few minutes to share your
                thoughts.
              </p>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <div className="flex items-start">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-teal-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Improve our learning materials</span>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-teal-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Enhance interactive elements</span>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-teal-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Create better experiments</span>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-teal-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Focus on what matters to you</span>
                </div>
              </div>
            </div>

            <div
              className={`md:w-5/12 flex items-center justify-center p-5 sm:p-6 md:p-8 ${
                isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
              } md:rounded-r-xl`}
            >
              <div className="text-center">
                <div
                  className={`inline-block p-3 sm:p-4 rounded-full mb-4 ${
                    isDarkMode ? "bg-teal-900/30" : "bg-teal-100"
                  }`}
                >
                  <svg
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${
                      isDarkMode ? "text-teal-400" : "text-teal-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h4
                  className={`text-base sm:text-lg font-medium mb-4 ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Ready to share your thoughts?
                </h4>
                <button
                  onClick={() => setShowForm(true)}
                  className={`w-full px-5 py-3 rounded-lg transition-all font-medium 
                    flex items-center justify-center shadow-sm hover:shadow ${
                      isDarkMode
                        ? "bg-teal-600 hover:bg-teal-700 text-white"
                        : "bg-teal-500 hover:bg-teal-600 text-white"
                    }`}
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Give Feedback
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        // Feedback form view
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl shadow-md border overflow-hidden ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="p-5 sm:p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-lg ${
                    isDarkMode ? "bg-teal-900/40" : "bg-teal-100"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-teal-400" : "text-teal-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3
                  className={`text-lg sm:text-xl font-semibold ml-3 ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Feedback Form
                </h3>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
                aria-label="Close form"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`p-3 sm:p-4 mb-5 rounded-lg ${
                isDarkMode
                  ? "bg-blue-900/20 border border-blue-800"
                  : "bg-blue-50 border border-blue-100"
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className={`h-5 w-5 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-blue-300" : "text-blue-700"
                    }`}
                  >
                    All fields are optional. Your feedback helps us improve the
                    learning experience.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                {/* What did you like */}
                <div>
                  <label
                    className={`block mb-2 font-medium ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    What did you like about this experiment?
                  </label>
                  <textarea
                    name="liked"
                    value={formData.liked}
                    onChange={handleChange}
                    className={`w-full rounded-lg p-3 transition-shadow ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-100 border-gray-600 focus:border-teal-500 focus:ring focus:ring-teal-500/20"
                        : "bg-white text-gray-900 border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500/20"
                    }`}
                    rows={3}
                    placeholder="I enjoyed..."
                  ></textarea>
                  <p
                    className={`mt-1 text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Tell us what aspects of the experiment were most valuable or
                    enjoyable for you.
                  </p>
                </div>

                {/* What could be improved */}
                <div>
                  <label
                    className={`block mb-2 font-medium ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    What could be improved in this experiment?
                  </label>
                  <textarea
                    name="improvements"
                    value={formData.improvements}
                    onChange={handleChange}
                    className={`w-full rounded-lg p-3 transition-shadow ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-100 border-gray-600 focus:border-teal-500 focus:ring focus:ring-teal-500/20"
                        : "bg-white text-gray-900 border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500/20"
                    }`}
                    rows={3}
                    placeholder="I think..."
                  ></textarea>
                  <p
                    className={`mt-1 text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Share any suggestions or improvements that would enhance
                    your learning experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Recommendation */}
                  <div>
                    <label
                      className={`block mb-2 font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Would you recommend this to others?
                    </label>
                    <select
                      name="recommendation"
                      value={formData.recommendation}
                      onChange={handleChange}
                      className={`w-full rounded-lg p-3 transition-shadow ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-100 border-gray-600 focus:border-teal-500 focus:ring focus:ring-teal-500/20"
                          : "bg-white text-gray-900 border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500/20"
                      }`}
                    >
                      <option value="" disabled>
                        Select your recommendation
                      </option>
                      <option value="0">Not likely to recommend</option>
                      <option value="1">Somewhat likely to recommend</option>
                      <option value="2">Likely to recommend</option>
                      <option value="3">Very likely to recommend</option>
                    </select>
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label
                      className={`block mb-2 font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-lg p-3 transition-shadow ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-100 border-gray-600 focus:border-teal-500 focus:ring focus:ring-teal-500/20"
                          : "bg-white text-gray-900 border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500/20"
                      }`}
                      placeholder="your@email.com"
                    />
                    <p
                      className={`mt-1 text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      We'll only use this to follow up on your feedback if
                      needed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form actions */}
              <div
                className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4 pt-5 border-t ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className={`mt-3 sm:mt-0 px-5 py-2.5 rounded-lg transition-all ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2.5 rounded-lg transition-all font-medium shadow-sm hover:shadow ${
                    isDarkMode
                      ? "bg-teal-600 hover:bg-teal-700 text-white"
                      : "bg-teal-500 hover:bg-teal-600 text-white"
                  }`}
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>

          <div
            className={`p-4 sm:p-5 text-center rounded-b-xl ${
              isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
            }`}
          >
            <p
              className={`text-xs sm:text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Your feedback is anonymous unless you provide your email address.
              <br className="hidden sm:block" />
              We appreciate your time and input!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FeedbackContent;
