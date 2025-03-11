"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabType } from "@/types";

interface TabNavigationProps {
  onTabChange: (tab: TabType) => void;
  initialTab?: TabType;
}

export function TabNavigation({
  onTabChange,
  initialTab = "popular",
}: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  // Load saved tab preference from localStorage if available
  useEffect(() => {
    const savedTab = localStorage.getItem("vlab-active-tab") as TabType | null;
    if (savedTab) {
      setActiveTab(savedTab);
      onTabChange(savedTab);
    }
  }, [onTabChange]);

  const handleTabChange = (value: string) => {
    const tab = value as TabType;
    setActiveTab(tab);
    localStorage.setItem("vlab-active-tab", tab);
    onTabChange(tab);
  };

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger
          value="popular"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Popular
        </TabsTrigger>
        <TabsTrigger
          value="recent"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Recent
        </TabsTrigger>
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          All Experiments
        </TabsTrigger>
        <TabsTrigger
          value="starred"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Starred
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
