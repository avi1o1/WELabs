"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Search, X, Plus, Minus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const FAQPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("general");
  const [searchResults, setSearchResults] = useState<FAQ[]>([]);

  // Use system preference for initial theme
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }
  }, []);

  // FAQ Data
  interface FAQ {
    id: number;
    question: string;
    answer: React.ReactNode;
    category: string;
  }

  const faqData: FAQ[] = [
    {
      id: 1,
      question: "What are Virtual Labs?",
      answer: (
        <>
          <p className="mb-4">
            Virtual Labs are intended to augment the learning of science and engineering subjects through 
            performing experiments. The experiments are designed either as simulations or as remote triggered. 
            A remote triggered lab allows a user to connect to real equipment using a web browser.
          </p>
          <p>
            There are currently around 150 labs and 1500 experiments at various stages of development and 
            deployment. They are currently hosted at Vlabs. Virtual Labs is an initiative of Ministry of 
            Human Resources, India.
          </p>
        </>
      ),
      category: "general"
    },
    {
      id: 2,
      question: "What are the objectives of the Virtual Labs?",
      answer: (
        <>
          <p className="mb-4">
            The broad objectives of the 'Virtual Lab' are:
          </p>
          <ul className="list-disc ml-5 space-y-2">
            <li>To provide remote access to Labs in various disciplines.</li>
            <li>To arouse curiosity in students and help them learn concepts through remote experimentation.</li>
            <li>To provide a complete 'Learning Management System' (LMS) around the Virtual labs – 
                access to web-resources, videos, animated demonstrations, and self evaluation.</li>
            <li>To provide access to resources available to only a limited number of users due to 
                constraints of time and physical locations.</li>
          </ul>
        </>
      ),
      category: "general"
    },
    {
      id: 3,
      question: "What are the various types of Virtual Labs?",
      answer: (
        <>
          <p className="mb-4">
            There are two types of Virtual Labs:
          </p>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              <strong>Simulation Based Virtual Labs:</strong> In these Virtual Labs, the experiments are 
              modeled using mathematical equations. The simulations are carried out remotely at a high end 
              server, and the results are communicated to the student over the internet. This class of 
              Virtual Labs, at best, mimics the real-world scenarios/experiments. Simulation based Virtual 
              Labs are scalable and can cater to a large number of simultaneous users.
            </li>
            <li>
              <strong>Remote Triggered Virtual Labs:</strong> In these Virtual Labs, the actual experiments 
              are triggered remotely. The output of the experiment (being conducted remotely) is communicated 
              back to the student over the internet. This class of Virtual Labs, gives the student the output 
              of real-time experiments. Remote Triggered Virtual Labs are difficult to scale and can cater to 
              a limited number of users. Typically, time-slots are booked before conducting such experiments.
            </li>
          </ul>
        </>
      ),
      category: "general"
    },
    {
      id: 4,
      question: "Who are the intended users of the Virtual Labs?",
      answer: (
        <>
          <p className="mb-4">
            The intended beneficiaries of the projects are:
          </p>
          <ol className="list-decimal ml-5 space-y-2">
            <li>All students and Faculty Members of Science and Engineering Colleges who do not have 
                access to good lab-facilities and/or instruments.</li>
            <li>High-school students, whose inquisitiveness will be triggered, possibly motivating 
                them to take up higher-studies.</li>
            <li>Researchers in different institutes who can collaborate /share equipment and resources.</li>
            <li>Different engineering colleges, who can benefit from the content and related teaching resources.</li>
          </ol>
          <p className="mt-4">
            The project has completely fulfilled the requirements of the targeted beneficiaries (and even gone beyond). 
            An eco-system has evolved around Virtual Labs, where the community has become involved in 
            evolving and benefitting from the project.
          </p>
        </>
      ),
      category: "general"
    },
    {
      id: 5,
      question: "How can I access the Virtual Labs?",
      answer: (
        <p>
          All Virtual Labs can be accessed through a common website: 
          <a href="https://www.vlabs.ac.in" className={`ml-1 ${isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}>
            www.vlabs.ac.in
          </a>. 
          At the user end, a PC and broadband connectivity enables the user to access Virtual Labs.
        </p>
      ),
      category: "general"
    },
    {
      id: 6,
      question: "Is it free to use?",
      answer: (
        <p>
          Yes, it is free of cost to the user.
        </p>
      ),
      category: "general"
    },
    {
      id: 7,
      question: "What are the system configuration needed to run Workshops?",
      answer: (
        <>
          <p className="mb-4">
            System configuration required for running Virtual Labs:
          </p>
          <ol className="list-decimal ml-5 space-y-2">
            <li>No pop-up blockers</li>
            <li>Browser: Firefox, Chrome</li>
            <li>Internet connection (2-4 mbps)</li>
            <li>JavaScript should be enabled on the browser</li>
            <li>Plugins: Flash, Java 1.6 version, and IcedTea</li>
            <li>Faculty from electronics department may be needed while running some of the adders, multiplexers experiments.</li>
          </ol>
        </>
      ),
      category: "technical"
    },
    {
      id: 8,
      question: "Our college internet network has firewalls. Should any specific care be taken?",
      answer: (
        <p>
          If Internet network operates behind a firewall, the communication ports to facilitate VLab network 
          traffic should be open. Specifically ports 3306, 5900, 5902, and 8700 will need to be opened.
        </p>
      ),
      category: "technical"
    },
    {
      id: 9,
      question: "Does the Virtual Lab provide the LMS that the objectives mention?",
      answer: (
        <p>
          Virtual Lab project provides a complete Leaning Management System. For most users, Virtual Lab 
          provides all the relevant material at one place including the Objectives of the Experiment, 
          Procedure, Lab manual, Pre- and Post-experiment quizzes, additional Lab resources, in addition 
          to the Virtual Lab experiment. Most labs also have an associated question bank.
        </p>
      ),
      category: "general"
    },
    {
      id: 10,
      question: "How do I register for using the Virtual Labs?",
      answer: (
        <>
          <p className="mb-4">
            As mentioned earlier, Virtual Labs are divided into two categories: simulation based labs and 
            remote triggered labs. Registration requirements are different for the two categories.
          </p>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              <strong>Simulation based Labs:</strong> All labs can be directly accessed by following the lab links on the web page.
            </li>
            <li>
              <strong>Remote Triggered Labs:</strong> To access a remote triggered lab, a user has to book a slot. 
              For booking a slot, you have to register yourself first and then book a slot from the slot chart. 
              All the available /booked slots can be viewed on this chart. Once a request for slot-booking is 
              made, all the information regarding the user id, password and the slot booked will be sent to the 
              user's email address provided by the user at the time of registration. Once registered, a user 
              can login using the same credentials every time. This registration has to be done by the user 
              separately for each of the remote triggered virtual labs.
            </li>
          </ul>
        </>
      ),
      category: "general"
    },
    {
      id: 11,
      question: "I already have a Physical Lab in my college/institute. What benefit will Virtual Lab provide?",
      answer: (
        <p>
          Virtual Lab is a complete Learning Management System. All the relevant information including the theory, 
          lab-manual, additional web-resources, video-lectures, animated demonstrations and self-evaluation are 
          available at a common place. Virtual Labs can be used in a complementary fashion to augment the efficacy 
          of theory-based lectures. Small projects can also be carried out using some of the Virtual Labs. 
          Virtual Labs can be effectively used to give lab-demonstrations to large classes.
        </p>
      ),
      category: "educators"
    },
    {
      id: 12,
      question: "How does one derive the maximum benefit from Virtual Labs?",
      answer: (
        <p>
          In order to derive maximum learning experience, the users are advised to first read all the instructions 
          for conducting the labs. There are 'step-by-step' instructions available in each lab to assist the users.
        </p>
      ),
      category: "general"
    },
    {
      id: 13,
      question: "When I do an experiment how do I know if the experiment I did is done correctly?",
      answer: (
        <>
          <p className="mb-4">
            Virtual Labs will provide to the students the result of an experiment by one of the following 
            methods (or possibly a combination):
          </p>
          <ol className="list-decimal ml-5 space-y-2">
            <li>Modelling the physical phenomenon by a set of equations and carrying out simulations to 
                yield the result of the particular experiment.</li>
            <li>Providing a corresponding measurement data for the Virtual Lab experiment based 
                previously carried out measurements on an actual system.</li>
            <li>Remotely triggering an experiment in an actual lab and providing the student the 
                result of the experiment through the computer interface.</li>
          </ol>
        </>
      ),
      category: "general"
    },
    {
      id: 14,
      question: "How can a college conduct a Virtual Lab Workshop?",
      answer: (
        <p>
          For details on conducting a Virtual Lab Workshop at your institution, please visit our 
          <a href="/outreach/" className={`ml-1 ${isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}>
            Outreach page
          </a>.
        </p>
      ),
      category: "workshops"
    },
    {
      id: 15,
      question: "Whom can I contact if I get stuck while using Virtual Labs?",
      answer: (
        <p>
          You can email your concerns/queries to the Virtual Labs team at 
          <a href="mailto:support@vlabs.ac.in" className={`ml-1 ${isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}>
            support@vlabs.ac.in
          </a>.
        </p>
      ),
      category: "technical"
    },
    {
      id: 16,
      question: "How can I contribute to the FAQ?",
      answer: (
        <p>
          Drop a mail to 
          <a href="mailto:support@vlabs.ac.in" className={`ml-1 ${isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}>
            support@vlabs.ac.in
          </a> 
          with Questions (and Answers).
        </p>
      ),
      category: "general"
    },
    {
      id: 17,
      question: "How can I contribute to Virtual Labs?",
      answer: (
        <p>
          vlabs-dev is the main portal for Virtual Labs Development. Please visit the contributing section 
          of the vlabs-dev portal. For more information, you can also contact us at 
          <a href="mailto:support@vlabs.ac.in" className={`ml-1 ${isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}>
            support@vlabs.ac.in
          </a>.
        </p>
      ),
      category: "development"
    }
  ];

  // Toggle FAQ expansion
  const toggleFAQ = (id: number) => {
    if (expandedFAQs.includes(id)) {
      setExpandedFAQs(expandedFAQs.filter((faqId) => faqId !== id));
    } else {
      setExpandedFAQs([...expandedFAQs, id]);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Categories
  const categories = [
    { id: "general", name: "General Questions" },
    { id: "technical", name: "Technical Support" },
    { id: "workshops", name: "Workshops & Events" },
    { id: "development", name: "Development" },
    { id: "educators", name: "For Educators" },
  ];

  // Filter FAQs by category and search term
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredResults = faqData.filter((faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setSearchResults(filteredResults);
  }, [searchQuery]);

  const filteredFAQs = searchQuery
    ? searchResults
    : faqData.filter((faq) => faq.category === selectedCategory);

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

      {/* Breadcrumb */}
      <div className={`border-b pt-20 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm">
            <a href="/" className={`${isDarkMode ? "text-blue-400" : "text-blue-600"} hover:underline`}>
              Home
            </a>
            <ChevronRight size={16} className="mx-2 text-gray-500" />
            <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>FAQ</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto pt-10 px-4 pb-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-xl relative mb-16"
        >
          <div
            className={`${
              isDarkMode
                ? "bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
                : "bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600"
            } text-white`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <svg
                className="absolute -right-10 -top-20 w-96 h-96 text-white opacity-10"
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                <path
                  d="M44.5,-76.3C56.6,-69.3,64.8,-54.1,71.4,-39.1C78.1,-24.1,83.2,-9.3,81.2,4.7C79.1,18.7,69.9,31.9,59.1,42.4C48.2,53,35.5,60.9,21.7,66.1C7.8,71.3,-7.2,73.8,-20.8,70.3C-34.4,66.9,-46.6,57.4,-55.9,45.6C-65.2,33.7,-71.7,19.5,-74.7,3.9C-77.7,-11.7,-77.2,-28.6,-68.7,-40C-60.2,-51.4,-43.8,-57.3,-28.9,-63.5C-14.1,-69.7,0.1,-76.2,15.2,-78.9C30.4,-81.6,48.4,-80.5,51.4,-76.2C54.3,-72,44.4,-54.7,44.5,-76.3Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            <div className="p-8 md:p-12 relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-100 max-w-3xl mx-auto mb-8">
                Find answers to the most common questions about Virtual Labs, our experiments, 
                workshops, and technical support.
              </p>

              {/* Search bar */}
              <div className="max-w-2xl mx-auto relative">
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`rounded-full py-3 px-6 pl-12 w-full outline-none focus:ring-2 shadow-lg ${
                    isDarkMode
                      ? "bg-gray-800/80 text-white focus:ring-blue-600 border border-gray-700"
                      : "bg-white/90 text-gray-800 focus:ring-blue-400"
                  } transition-all`}
                />
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Category Sidebar */}
          <div className="md:w-1/4">
            <div 
              className={`rounded-xl shadow-lg p-5 sticky top-24 ${
                isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {setSelectedCategory(category.id); setSearchQuery("");}}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? isDarkMode
                          ? "bg-blue-900/40 text-blue-300"
                          : "bg-blue-50 text-blue-700"
                        : isDarkMode
                          ? "hover:bg-gray-700 text-gray-300"
                          : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ List */}
          <div className="md:w-3/4">
            {searchQuery && (
              <div className="mb-6">
                <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {searchResults.length} results for "{searchQuery}"
                </p>
              </div>
            )}

            {!searchQuery && (
              <h2 className="text-2xl font-bold mb-6">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
            )}

            {filteredFAQs.length === 0 ? (
              <div 
                className={`rounded-xl p-8 text-center ${
                  isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                } shadow-lg`}
              >
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  We couldn't find any FAQs matching your search. Please try a different query.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-xl shadow-md overflow-hidden ${
                      isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className={`w-full text-left p-6 flex justify-between items-center transition-colors ${
                        expandedFAQs.includes(faq.id)
                          ? isDarkMode
                            ? "bg-gray-700"
                            : "bg-gray-50"
                          : ""
                      }`}
                    >
                      <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                      {expandedFAQs.includes(faq.id) ? (
                        <Minus size={20} className={`flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                      ) : (
                        <Plus size={20} className={`flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                      )}
                    </button>
                    {expandedFAQs.includes(faq.id) && (
                      <div className={`p-6 pt-0 border-t ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                        <div className={`mt-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Still have questions section */}
        <div 
          className={`mt-16 rounded-xl p-8 text-center ${
            isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-100 border border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Can't find the answer you're looking for? Please reach out to our support team.
          </p>
          <a
            href="mailto:support@vlabs.ac.in"
            className={`px-6 py-3 rounded-full font-medium inline-flex items-center transition-colors ${
              isDarkMode
                ? "bg-blue-700 text-white hover:bg-blue-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default FAQPage;