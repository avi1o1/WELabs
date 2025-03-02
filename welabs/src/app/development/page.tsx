'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const DevelopmentPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('onboarding-process');

  // Use system preference for initial theme
  useEffect(() => {
    if (window.matchMedia && 
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Side navigation menu categories and items
  const sideNavCategories = [
    {
      title: "On-Boarding and Hosting",
      items: [
        { id: "onboarding-process", title: "Onboarding Process" },
        { id: "development-process", title: "Development Process" },
        { id: "hosting-process", title: "Hosting Process" },
        { id: "lab-experiment-lifecycle", title: "Lab & Experiment Lifecycle" },
        { id: "bug-processing-guide", title: "Bug Management Process" },
        { id: "troubleshooting-guide", title: "Troubleshooting Guide" },
        { id: "best-practices", title: "Best Practices" }
      ]
    },
    {
      title: "Developer Tools",
      items: [
        { id: "authoring-environment", title: "VS Code Authoring Environment" },
        { id: "code-assessment", title: "Code Assessment Tool" },
        { id: "create-experiment-online", title: "Create Experiment Online" }
      ],
      buttons: [
        { id: "develop-online", title: "Develop Online", link: "http://virtual-labs-cms.netlify.app" }
      ]
    },
    {
      title: "Progressive Web Application",
      items: [
        { id: "user-guide-pwa", title: "User Guide" },
        { id: "content-creator-guide", title: "Content Creator Guide" }
      ]
    },
    {
      title: "See Also",
      items: [
        { id: "virtual-box-installation", title: "Virtual Box Installation" }
      ],
      buttons: [
        { id: "vlead-tech-blogs", title: "VLEAD Tech Blogs", link: "https://medium.com/vlead-tech" }
      ]
    }
  ];

  // Content for each section
  interface ContentSection {
    title: string;
    content: React.ReactNode;
  }
  
  const contentSections: { [key: string]: ContentSection } = {
    "onboarding-process": {
      title: "Onboarding Process",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Virtual Labs Onboarding Process</h2>
          <p>
            The Virtual Labs onboarding process describes the steps required for a lab to be added to the 
            Virtual Labs platform. This process ensures quality and consistency across all experiments.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Step 1: Initial Request</h3>
          <p>
            Lab developers submit an onboarding request through the Virtual Labs portal. 
            The request includes basic information about the lab, target audience, and educational objectives.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Step 2: Technical Review</h3>
          <p>
            The Virtual Labs technical team reviews the lab to ensure it meets the platform's standards 
            and technical requirements. This includes code quality, accessibility, and responsiveness checks.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Step 3: Content Review</h3>
          <p>
            Subject matter experts review the lab content for educational value, accuracy, and pedagogical approach.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Step 4: Integration and Testing</h3>
          <p>
            Upon approval, the lab is integrated into the Virtual Labs platform and undergoes final testing 
            before being made available to users.
          </p>
          
          <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/30 mt-8">
            <h4 className="font-semibold">Note:</h4>
            <p>For detailed information on the onboarding process, please refer to the official documentation at 
            <a href="https://github.com/virtual-labs/engineers-forum/blob/master/ph4/services/onboarding-process.md" 
              className="text-blue-600 dark:text-blue-400 ml-1 hover:underline">
              engineers-forum repository
            </a>.
            </p>
          </div>
        </div>
      )
    },
    "development-process": {
      title: "Development Process",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Virtual Labs Development Process</h2>
          <p>
            The development process outlines the methodology for creating high-quality virtual lab experiments. 
            Following this process ensures that experiments meet educational goals while maintaining technical standards.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Planning Phase</h3>
          <p>
            Begin by defining clear learning objectives for the virtual experiment. Identify the target audience and 
            required technical resources. Create a detailed storyboard outlining the experiment flow.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Design Phase</h3>
          <p>
            Develop UI mockups and interaction models. Design the experiment architecture and data flow. 
            Plan accessibility features and responsive layouts for various devices.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Implementation Phase</h3>
          <p>
            Code the experiment following Virtual Labs coding standards. Implement the UI, simulation logic, 
            and assessment components. Conduct unit testing throughout development.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Testing Phase</h3>
          <p>
            Perform comprehensive testing including functional testing, usability testing, and cross-browser testing. 
            Validate that the experiment achieves its educational objectives.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Deployment Phase</h3>
          <p>
            Package the experiment for integration with the Virtual Labs platform. Create documentation for users 
            and administrators. Submit for final review and deployment.
          </p>
          
          <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/30 mt-8">
            <h4 className="font-semibold">Resources:</h4>
            <ul className="list-disc ml-5 mt-2">
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Development Templates</a></li>
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Coding Standards Guide</a></li>
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">UI Component Library</a></li>
            </ul>
          </div>
        </div>
      )
    },
    "hosting-process": {
      title: "Hosting Process",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Virtual Labs Hosting Process</h2>
          <p>
            The hosting process describes how approved lab experiments are deployed and maintained on the 
            Virtual Labs infrastructure.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Hosting Requirements</h3>
          <p>
            Before hosting, ensure your lab experiment meets these requirements:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>Code repository follows the standard Virtual Labs structure</li>
            <li>All dependencies are properly documented</li>
            <li>The experiment passes all quality assurance tests</li>
            <li>Documentation is complete and up-to-date</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6">Deployment Steps</h3>
          <p>
            The Virtual Labs team follows these steps to host your experiment:
          </p>
          <ol className="list-decimal ml-5 mt-2">
            <li>Repository verification and access setup</li>
            <li>Build pipeline configuration</li>
            <li>Staging deployment and testing</li>
            <li>Production deployment</li>
            <li>Integration with the Virtual Labs portal</li>
          </ol>
          
          <h3 className="text-xl font-semibold mt-6">Maintenance and Updates</h3>
          <p>
            After hosting, labs are maintained through:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>Regular security updates</li>
            <li>Performance monitoring</li>
            <li>Content updates via pull requests</li>
            <li>Version tracking and release management</li>
          </ul>
          
          <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-900/30 mt-8">
            <h4 className="font-semibold">Important:</h4>
            <p>Changes to production experiments must follow the change management process and require approval 
              before deployment.</p>
          </div>
        </div>
      )
    },
    "lab-experiment-lifecycle": {
      title: "Lab & Experiment Lifecycle",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Lab & Experiment Lifecycle</h2>
          <p>
            Virtual Labs follows a comprehensive lifecycle management approach for all experiments, from conception 
            to retirement.
          </p>
          
          <div className="my-8">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center text-white">1</div>
              <div className="flex-grow h-1 bg-green-200 dark:bg-green-800 mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white">2</div>
              <div className="flex-grow h-1 bg-blue-200 dark:bg-blue-800 mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center text-white">3</div>
              <div className="flex-grow h-1 bg-purple-200 dark:bg-purple-800 mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-orange-600 dark:bg-orange-500 flex items-center justify-center text-white">4</div>
              <div className="flex-grow h-1 bg-orange-200 dark:bg-orange-800 mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-red-600 dark:bg-red-500 flex items-center justify-center text-white">5</div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="w-16 text-center">Proposal</div>
              <div className="w-16 text-center">Development</div>
              <div className="w-16 text-center">Review</div>
              <div className="w-16 text-center">Deployment</div>
              <div className="w-16 text-center">Maintenance</div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">1. Proposal Phase</h3>
          <p>
            Lab developers submit a proposal that includes learning objectives, target audience, and experiment outline.
            Educational and technical committees review proposals for approval.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">2. Development Phase</h3>
          <p>
            Approved proposals enter the development phase where the experiment is created following Virtual Labs
            standards. This includes coding, content creation, and initial testing.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">3. Review Phase</h3>
          <p>
            Completed experiments undergo technical and educational review to ensure quality, accessibility,
            and alignment with learning objectives.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">4. Deployment Phase</h3>
          <p>
            Approved experiments are deployed to the Virtual Labs platform and made accessible to users.
            Integration with learning management systems and analytics tools is completed.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">5. Maintenance Phase</h3>
          <p>
            Active experiments are maintained with regular updates, bug fixes, and content improvements.
            Usage data is collected to inform future enhancements.
          </p>
          
          <div className="p-4 border rounded-md bg-green-50 dark:bg-green-900/30 mt-8">
            <h4 className="font-semibold">Benefits of Lifecycle Management:</h4>
            <ul className="list-disc ml-5 mt-2">
              <li>Ensures consistent quality across all experiments</li>
              <li>Provides clear expectations for all stakeholders</li>
              <li>Enables efficient resource allocation</li>
              <li>Facilitates continuous improvement</li>
            </ul>
          </div>
        </div>
      )
    },
    // Add more content sections for other menu items
  };

  // Default to the first section if no matching content is found
  const getContentForSection = (sectionId: string) => {
    return contentSections[sectionId] || contentSections["onboarding-process"];
  };

  const currentContent = getContentForSection(activeSection);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      {/* Main Content */}
      <main className="container mx-auto pt-24 px-4 space-y-8 pb-16">
        {/* Page Header */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-xl relative"
        >
          <div className={`${
            isDarkMode 
              ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900' 
              : 'bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600'
          } text-white`}>
            <div className="absolute inset-0 overflow-hidden">
              <svg className="absolute -right-10 -top-20 w-96 h-96 text-white opacity-10" viewBox="0 0 200 200" fill="currentColor">
                <path d="M44.5,-76.3C56.6,-69.3,64.8,-54.1,71.4,-39.1C78.1,-24.1,83.2,-9.3,81.2,4.7C79.1,18.7,69.9,31.9,59.1,42.4C48.2,53,35.5,60.9,21.7,66.1C7.8,71.3,-7.2,73.8,-20.8,70.3C-34.4,66.9,-46.6,57.4,-55.9,45.6C-65.2,33.7,-71.7,19.5,-74.7,3.9C-77.7,-11.7,-77.2,-28.6,-68.7,-40C-60.2,-51.4,-43.8,-57.3,-28.9,-63.5C-14.1,-69.7,0.1,-76.2,15.2,-78.9C30.4,-81.6,48.4,-80.5,51.4,-76.2C54.3,-72,44.4,-54.7,44.5,-76.3Z" transform="translate(100 100)" />
              </svg>
            </div>
          
            <div className="p-8 md:p-16 relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Virtual Labs Development
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-100 max-w-3xl">
                Create, host and manage virtual lab experiments using our comprehensive development 
                tools and processes. Follow our guidelines to ensure high-quality educational experiences.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Content Section with Sidebar Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className={`sticky top-24 overflow-y-auto max-h-[calc(100vh-8rem)] rounded-xl border ${
              isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
            } shadow-md`}>
              <nav className="p-4">
                {sideNavCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-6">
                    <h3 className={`font-bold text-lg mb-2 px-3 py-2 rounded-lg ${
                      isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                    }`}>
                      {category.title}
                    </h3>
                    <ul className="space-y-1">
                      {category.items.map((item) => (
                        <li key={item.id}>
                          <a 
                            href={`#${item.id}`} 
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveSection(item.id);
                            }}
                            className={`block px-3 py-2 rounded-lg transition-colors ${
                              activeSection === item.id 
                                ? (isDarkMode ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800') 
                                : (isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100')
                            }`}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                      
                      {category.buttons && category.buttons.map((button) => (
                        <li key={button.id} className="mt-3">
                          <a 
                            href={button.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`block px-3 py-2 rounded-lg text-center font-medium transition-colors ${
                              isDarkMode 
                                ? 'bg-blue-700 hover:bg-blue-600 text-white' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {button.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-3">
            <div className={`p-6 md:p-8 rounded-xl border ${
              isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
            } shadow-md`}>
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                id={activeSection}
              >
                <h1 className="text-3xl font-bold mb-6">{currentContent.title}</h1>
                {currentContent.content}
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className={`rounded-3xl p-8 md:p-12 overflow-hidden relative ${
          isDarkMode 
            ? 'bg-gradient-to-r from-green-900 to-teal-900 shadow-lg' 
            : 'bg-gradient-to-r from-green-500 to-teal-500 shadow-xl'
        }`}>
          {/* Background patterns */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute -right-16 -bottom-16 w-96 h-96 text-white opacity-10" viewBox="0 0 200 200" fill="currentColor">
              <path d="M37.9,-65.8C47.4,-58.6,52.5,-44.7,59.7,-31.9C66.9,-19,76.1,-7.1,77.4,5.8C78.7,18.8,72,32.8,62.3,43.1C52.5,53.5,39.8,60.1,26.5,64.3C13.3,68.5,-0.5,70.2,-14.7,68.5C-28.9,66.9,-43.5,61.9,-54.9,52.3C-66.2,42.7,-74.4,28.7,-77,13.5C-79.6,-1.7,-76.7,-17.9,-69.9,-32.2C-63.1,-46.5,-52.6,-58.8,-40,-65.2C-27.3,-71.6,-12.5,-72,1,-73.5C14.4,-75.1,28.3,-73,37.9,-65.8Z" transform="translate(100 100)" />
            </svg>
          </div>
        
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Create?</h2>
            <p className="mt-3 text-gray-100 text-lg max-w-2xl mx-auto">
              Start building your virtual lab experiment today and inspire students worldwide
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <a 
              href="http://virtual-labs-cms.netlify.app" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-3 bg-white text-teal-700 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform flex items-center"
            >
              Start Developing
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a 
              href="#development-process" 
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("development-process");
              }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-teal-700 transition-colors shadow-md hover:shadow-lg"
            >
              Learn More
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DevelopmentPage;