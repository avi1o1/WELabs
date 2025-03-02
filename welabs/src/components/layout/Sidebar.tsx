"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

// Import your component files here
import Aim from "@/app/experiment/AimPage";
import Overview from "@/app/experiment/OverviewPage";
import Recap from "@/app/experiment/RecapPage";
import Pretest from "@/app/experiment/PretestPage";
import BubbleSort from "@/app/experiment/BubbleSort-AimPage";
// import OptimizedBubbleSort from "@/app/experiment/OptimizedBubbleSort-OptimizationTechniquePage";
import CodeAssessment from "@/app/experiment/AimPage";
import Analysis from "@/app/experiment/AimPage";
import Posttest from "@/app/experiment/AimPage";
import References from "@/app/experiment/AimPage";
import Feedback from "@/app/experiment/AimPage";


interface SidebarProps {
  isMenuOpen: boolean;
  isDarkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMenuOpen, isDarkMode = false }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Bubble Sort"]);
  const [activeComponent, setActiveComponent] = useState<string>("Aim");

  const menuItems = [
    { title: "Aim", component: Aim, hasChildren: false },
    { title: "Overview", component: Overview, hasChildren: false },
    { title: "Recap", component: Recap, hasChildren: false },
    { title: "Pretest", component: Pretest, hasChildren: false },
    { 
      title: "Bubble Sort", 
      component: BubbleSort,
      hasChildren: true,
      children: [
        { title: "Concept", component: () => <div>Concept Component</div> },
        { title: "Algorithm", component: () => <div>Algorithm Component</div> },
        { title: "Demo", component: () => <div>Demo Component</div> },
        { title: "Practice", component: () => <div>Practice Component</div> },
        { title: "Exercise", component: () => <div>Exercise Component</div> },
        { title: "Quiz", component: () => <div>Quiz Component</div> }
      ]
    },
    { 
      title: "Optimized Bubble Sort", 
      component: OptimizedBubbleSort,
      hasChildren: true,
      children: [
        { title: "Optimization Technique", component: () => <div>Optimization Component</div> },
        { title: "Demo", component: () => <div>Demo Component</div> },
        { title: "Practice", component: () => <div>Practice Component</div> },
        { title: "Exercise", component: () => <div>Exercise Component</div> },
        { title: "Quiz", component: () => <div>Quiz Component</div> }
      ]
    },
    { title: "Code Assessment", component: CodeAssessment, hasChildren: false },
    { 
      title: "Analysis", 
      component: Analysis,
      hasChildren: true,
      children: [
        { title: "Time and Space Complexity", component: () => <div>Time & Space Complexity</div> },
        { title: "Comparison with other Algorithms", component: () => <div>Comparison Component</div> },
        { title: "Quiz", component: () => <div>Quiz Component</div> }
      ]
    },
    { title: "Posttest", component: Posttest, hasChildren: false },
    { title: "Further Readings/References", component: References, hasChildren: false },
    { title: "Feedback", component: Feedback, hasChildren: false },
  ];

  const toggleExpand = (title: string) => {
    if (expandedItems.includes(title)) {
      setExpandedItems(expandedItems.filter(item => item !== title));
    } else {
      setExpandedItems([...expandedItems, title]);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside 
        className={`w-full md:w-72 lg:w-80 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className={`sticky top-20 rounded-lg shadow-sm overflow-hidden border ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <nav className="p-4">
            <h2 className="text-lg font-bold mb-4">Experiment Menu</h2>
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.hasChildren ? (
                    <div className="mb-1">
                      <button
                        onClick={() => toggleExpand(item.title)}
                        className={`w-full flex items-center justify-between p-2 rounded-md transition-colors ${
                          expandedItems.includes(item.title)
                            ? (isDarkMode ? "bg-gray-700 text-white" : "bg-blue-50 text-blue-700")
                            : (isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100")
                        }`}
                      >
                        <span className="font-medium">{item.title}</span>
                        {expandedItems.includes(item.title) ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </button>

                      {expandedItems.includes(item.title) && (
                        <ul className="pl-4 mt-1 space-y-1">
                          {item.children && item.children.map((child, childIndex) => (
                            <li key={`${index}-${childIndex}`}>
                              <button
                                onClick={() => setActiveComponent(child.title)}
                                className={`block p-2 w-full text-left rounded-md ${
                                  activeComponent === child.title
                                    ? (isDarkMode ? "bg-gray-700 text-white" : "bg-blue-50 text-blue-700")
                                    : (isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700")
                                }`}
                              >
                                {child.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveComponent(item.title)}
                      className={`block p-2 w-full text-left rounded-md ${
                        activeComponent === item.title
                          ? (isDarkMode ? "bg-gray-700 text-white" : "bg-blue-50 text-blue-700") 
                          : (isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700")
                      }`}
                    >
                      {item.title}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {menuItems.map((item) => (
          item.title === activeComponent ? <item.component key={item.title} /> : null
        ))}
        {menuItems.flatMap((item) => item.children || []).map((child) => (
          child.title === activeComponent ? <child.component key={child.title} /> : null
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
