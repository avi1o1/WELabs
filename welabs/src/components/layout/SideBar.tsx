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

// Define a type for our category state
interface CategoryState {
  [key: string]: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  activeSection,
  setActiveSection,
  isDarkMode,
}) => {
  // Track open/closed state for each category
  const [openCategories, setOpenCategories] = useState<CategoryState>(() => {
    const initialState: CategoryState = {};
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
  
  // Rest of your component code...
  
  return (
    // Your JSX here
    <div>Sidebar Component</div>
  );
};

export default Sidebar;