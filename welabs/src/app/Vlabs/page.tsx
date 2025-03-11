"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Users,
  School,
} from "lucide-react";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const VirtualLabsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Use system preference for initial theme
  useEffect(() => {
      // Check localStorage first for saved preference
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        // Fall back to system preference only if no saved preference
        setIsDarkMode(true);
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    }, []);
    
    const toggleTheme = () => {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "goals", label: "Goals and Philosophy" },
    { id: "institutes", label: "Participating Institutes" },
    { id: "testimonials", label: "Testimonials" },
  ];

  const handleTabChange = (tabId: any) => {
    setActiveTab(tabId);
  };

  // Content for stakeholders section
  const stakeholders = [
    { title: "Students", image: "/cards/students.jpg" },
    { title: "Faculty", image: "/cards/faculty.jpg" },
    { title: "Subject Matter Experts", image: "/cards/experts.jpg" },
    { title: "Developers", image: "/cards/developers.jpg" },
    { title: "Nodal Centre Community", image: "/cards/community.jpg" },
    { title: "Participating Institutes", image: "/cards/institutes.jpg" },
    { title: "Interns", image: "/cards/interns.jpg" },
    { title: "Ministry of Education", image: "/cards/ministry.jpg" },
    { title: "Accreditation Bodies", image: "/cards/accreditation.jpg" },
    { title: "Service Providers", image: "/cards/providers.jpg" },
    { title: "Universities", image: "/cards/universities.jpg" },
    { title: "Researchers", image: "/cards/researchers.jpg" },
  ];

  // Content for goals and philosophy
  const goals = [
    "To offer a remote learning experience with simulated experiments in diverse areas of Science and Engineering.",
    "To engage students by sparking their curiosity, allowing them to learn fundamental and complex concepts through remote experimentation.",
    "To present a complete Learning Management System around the Virtual Labs, where students and teachers can utilize various tools for learning, including supplemental web-resources, video-lectures, animated demonstrations, and self-evaluation.",
  ];

  const philosophy = [
    "Bridging the gap for colleges that lack lab facilities: Provide online labs as a substitute for hands-on lab work in engineering colleges that do not have the necessary equipment.",
    "Enhancing existing labs with online resources: Expand the capabilities of existing labs with online labs to complement and augment the learning experience of engineering students.",
    "Empowering educators through specialized workshops: Offer workshops on-site or online to enhance the skill set and proficiency of educators in the effective use of online labs in engineering education.",
  ];

  // Content for participating institutes
  const institutes = [
    { name: "AMRITA VISHWA VIDYAPEETHAM", logo: "/logos/amrita.png" },
    { name: "COE PUNE", logo: "/logos/coe-pune.png" },
    { name: "DAYALBAGH EDUCATIONAL INSTITUTE", logo: "/logos/dayalbagh.png" },
    { name: "IIT BOMBAY", logo: "/logos/iit-bombay.png" },
    { name: "IIT DELHI", logo: "/logos/iit-delhi.png" },
    { name: "IIT GUWAHATI", logo: "/logos/iit-guwahati.png" },
    { name: "IIT KANPUR", logo: "/logos/iit-kanpur.png" },
    { name: "IIT KHARAGPUR", logo: "/logos/iit-kharagpur.png" },
    { name: "IIT ROORKEE", logo: "/logos/iit-roorkee.png" },
    { name: "IIIT HYDERABAD", logo: "/logos/iiit-hyderabad.png" },
    { name: "NITK SURATHKAL", logo: "/logos/nitk.png" },
  ];

  // Content for testimonials
  const testimonials = [
    {
      quote:
        "One of the primary advantages associated with the utilization of Virtual Laboratory is the ability for students to engage in self-paced learning. This technology facilitates students in engaging in studying, preparing for, and doing laboratory experiments at their own convenience, regardless of time and location.",
      author: "Dr Mohd Zubair Ansari",
      institute: "National Institute of Technology Srinagar",
    },
    {
      quote:
        "Virtual Labs are implemented in USAR, GGSIPU and are useful in understanding the theories and concepts of science or other subjects that cannot be studied alone only by textbooks. It has the great potential to enhance actual laboratory experiences. Furthermore, the best progressive learning and performance for real experiments appears when the virtual laboratory preceded paper-based practical experiments.",
      author: "Dr. Khyati Chopra",
      institute: "USAR GGSIPU",
    },
    {
      quote:
        "Virtual Labs is the knowledge seed for the students of the science and technology domain. This e-learning platform would enlighten the learning path of the students before they move to the real lab for the experiments. The students may realize the look and feel of the real lab and optimize the efforts, time, and funds involved in performing the real labs. The best part of Virtual Labs is to use it with personal comfort and convenience.",
      author: "Dr. Pankaj K. Goswami",
      institute: "Amity University Uttar Pradesh, Lucknow",
    },
    {
      quote:
        "Virtual lab is a platform which provides an opportunity to understand the theoretical concept in very easy way with the help of simulator. Pretest and post-test feature provided make the self-assessment part easy for the students. The platform provides a wide range of experiments covering almost all kind of domain and it is very beneficial for the students. As a Nodal Coordinator of Virtual Lab for Chameli Devi Group of Institution, I am very much satisfied with virtual lab facility as it helps the students to engage more with self-learning path.",
      author: "Radheshyam Acholiya",
      institute: "Chameli Devi Group of Institution, Indore",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      } transition-colors duration-200`}
    >
      {/* Navigation Bar */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      {/* Main Content */}
      <main className="container mx-auto pt-24 px-4 space-y-12 pb-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1
            className={`text-5xl md:text-6xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Virtual Labs
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Explore, experiment, and discover through simulation-based learning
          </p>
        </motion.section>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div
            className={`inline-flex p-1 rounded-xl ${
              isDarkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 shadow-sm"
                    : isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div
          className={`bg-opacity-50 rounded-2xl p-6 md:p-8 ${
            isDarkMode ? "bg-gray-800/30" : "bg-white shadow-lg"
          }`}
        >
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="max-w-4xl mx-auto space-y-4">
                <h2
                  className={`text-2xl md:text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Overview
                </h2>
                <p
                  className={`text-lg leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Virtual Labs, an initiative of Ministry of Education, offers
                  free remote laboratory learning experiences. Workshops and
                  nodal centers support institute partnerships within the
                  Virtual Labs consortium. The project, led by IIT Delhi and
                  involving seven institutes, provides over 190 Virtual Labs and
                  1600+ web-enabled experiments across various domains using
                  open-source technologies. These simulations are accessible
                  online without any additional infrastructure or fees.
                </p>
              </div>

              <div className="space-y-4">
                <h3
                  className={`text-xl md:text-2xl font-bold text-center ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Stakeholders
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {stakeholders.map((stakeholder, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className={`rounded-xl overflow-hidden ${
                        isDarkMode
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-gray-100 hover:bg-gray-200"
                      } transition-colors group`}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <img
                          src={stakeholder.image}
                          alt={stakeholder.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                          <h4 className="text-white text-sm md:text-base font-medium">
                            {stakeholder.title}
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Goals and Philosophy Tab */}
          {activeTab === "goals" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="space-y-6">
                <h2
                  className={`text-2xl md:text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Goals
                </h2>
                <ul className="space-y-4">
                  {goals.map((goal, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span
                        className={`inline-flex items-center justify-center p-2 rounded-full mr-3 mt-0.5 ${
                          isDarkMode
                            ? "bg-blue-600"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {index === 0 ? (
                          <BookOpen size={18} />
                        ) : index === 1 ? (
                          <Users size={18} />
                        ) : (
                          <School size={18} />
                        )}
                      </span>
                      <p
                        className={`text-lg ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {goal}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h2
                  className={`text-2xl md:text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Philosophy
                </h2>
                <ul className="space-y-4">
                  {philosophy.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <p
                        className={`text-lg ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {item}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className={`p-6 rounded-xl text-center ${
                  isDarkMode
                    ? "bg-gradient-to-r from-blue-900 to-purple-900"
                    : "bg-gradient-to-r from-blue-600 to-purple-600"
                } text-white`}
              >
                <p className="text-lg md:text-xl font-medium">
                  Virtual labs are any place, any pace, any-time, any-type labs.
                  It is a paradigm shift in student-centric, online education.
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Participating Institutes Tab */}
          {activeTab === "institutes" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2
                className={`text-2xl md:text-3xl font-bold text-center ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Participating Institutes
              </h2>
              <div
                className={`grid sm:grid-cols-2 md:grid-cols-3 gap-6 ${
                  isDarkMode ? "bg-teal-900/20" : "bg-teal-50"
                } p-6 rounded-xl`}
              >
                {institutes.map((institute, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`flex flex-col items-center justify-center p-6 rounded-xl ${
                      isDarkMode ? "bg-gray-800" : "bg-white shadow-md"
                    } hover:shadow-lg transition-shadow`}
                  >
                    <div className="w-24 h-24 flex items-center justify-center mb-4">
                      <img
                        src={institute.logo}
                        alt={institute.name}
                        className="max-w-full max-h-full"
                      />
                    </div>
                    <h3
                      className={`text-center font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {institute.name}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2
                className={`text-2xl md:text-3xl font-bold text-center ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                What People Say About Virtual Labs
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`p-6 rounded-xl relative ${
                      isDarkMode
                        ? "bg-teal-900/30 border border-teal-800"
                        : "bg-teal-50 border border-teal-100"
                    }`}
                  >
                    <div className="absolute top-6 left-6 opacity-20">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.13456 9H5.37305C5.37305 5.5 7.5 4.5 9.5 4.5V7C9.5 8.10457 8.60457 9 7.5 9H7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M19.1346 9H15.373C15.373 5.5 17.5 4.5 19.5 4.5V7C19.5 8.10457 18.6046 9 17.5 9H17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M5 9.5V14.5C5 16.7091 6.79086 18.5 9 18.5H10.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M15 9.5V14.5C15 16.7091 16.7909 18.5 19 18.5H20.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-4 space-y-3">
                      <p
                        className={`italic text-lg relative ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {testimonial.quote}
                      </p>
                      <div className="pt-2">
                        <p
                          className={`font-medium ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {testimonial.author}
                        </p>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {testimonial.institute}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <section
          className={`rounded-xl p-8 text-center ${
            isDarkMode
              ? "bg-gradient-to-r from-blue-900 to-purple-900"
              : "bg-gradient-to-r from-blue-600 to-purple-600"
          } text-white shadow-lg`}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Virtual Learning Journey?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Explore our virtual experiments, create your own experiments, or
            host a workshop
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/experiments/"
              className="px-6 py-3 bg-white text-purple-700 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg flex items-center"
            >
              Start Learning <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link
              href="/development/"
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-purple-700 transition-colors flex items-center"
            >
              Create Experiments <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link
              href="/faq"
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-purple-700 transition-colors flex items-center"
            >
              View FAQ <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default VirtualLabsPage;
