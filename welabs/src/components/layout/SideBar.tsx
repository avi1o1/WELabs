import React, { useState } from "react";

interface SidebarProps {
  categories: {
    title: string;
    items: { id: string; title: string }[];
    buttons?: { id: string; title: string; link: string }[];
  }[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  activeSection,
  setActiveSection,
  isDarkMode,
}) => {
  // Track open/closed state for each category
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>(() => {
    const initialState = {};
    categories.forEach((category, index) => {
      const hasActiveItem = category.items.some(item => item.id === activeSection);
      initialState[`category-${index}`] = hasActiveItem;
    });
    return initialState;
  });
  
  // Toggle category open/closed state
  const toggleCategory = (categoryIndex: number) => {
    setOpenCategories(prev => ({
      ...prev,
      [`category-${categoryIndex}`]: !prev[`category-${categoryIndex}`]
    }));
  };

  return (
    <div
      className={`sticky top-24 overflow-y-auto max-h-[calc(100vh-8rem)] rounded-xl border ${
        isDarkMode
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
      } shadow-md`}
    >
      <nav className="p-4">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-6">
            <button 
              onClick={() => toggleCategory(categoryIndex)}
              className={`w-full text-left font-bold text-lg mb-2 px-3 py-2 rounded-lg flex justify-between items-center ${
                isDarkMode 
                  ? "bg-gray-800 text-white hover:bg-gray-700" 
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              } transition-colors`}
            >
              <span>{category.title}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 transition-transform ${openCategories[`category-${categoryIndex}`] ? "rotate-180" : ""}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openCategories[`category-${categoryIndex}`] && (
              <ul className="space-y-1 mt-2 transition-all">
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
                          ? isDarkMode
                            ? "bg-blue-800 text-white"
                            : "bg-blue-100 text-blue-800"
                          : isDarkMode
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}

                {category.buttons &&
                  category.buttons.map((button) => (
                    <li key={button.id} className="mt-3">
                      <a
                        href={button.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`block px-3 py-2 rounded-lg text-center font-medium transition-colors ${
                          isDarkMode
                            ? "bg-blue-700 hover:bg-blue-600 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        {button.title}
                      </a>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;