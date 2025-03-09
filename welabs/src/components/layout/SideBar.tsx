import React from 'react';

// Define interfaces for type safety
interface SidebarItem {
    id: string;
    title: string;
}

interface SidebarButton {
    id: string;
    title: string;
    link: string;
}

interface SidebarCategory {
    title: string;
    items: SidebarItem[];
    buttons?: SidebarButton[];
}

interface SidebarProps {
    categories: SidebarCategory[];
    activeSection: string;
    setActiveSection: (section: string) => void;
    isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
    categories,
    activeSection,
    setActiveSection,
    isDarkMode
}) => {
    return (
        <div className={`sticky top-24 overflow-y-auto max-h-[calc(100vh-8rem)] rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
            } shadow-md`}>
            <nav className="p-4">
                {categories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-6">
                        <h3 className={`font-bold text-lg mb-2 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
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
                                        className={`block px-3 py-2 rounded-lg transition-colors ${activeSection === item.id
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
                                        className={`block px-3 py-2 rounded-lg text-center font-medium transition-colors ${isDarkMode
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
    );
};

export default Sidebar;
