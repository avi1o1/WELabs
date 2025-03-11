"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  Star,
  Loader2,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Experiment {
  id: string;
  title: string;
  domain: string;
  discipline: string;
  description: string;
  image: string;
  rating: number;
  collegeName: string;
  collegeLogo: string;
  labName: string;
}

const ExperimentsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");

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

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  // Sample experiment data
  const experiments: Experiment[] = [
    {
      id: "exp1",
      title: "Bubble Sort",
      domain: "Computer Science",
      discipline: "Computer Science and Engineering",
      description:
        "Learn about the bubble sort algorithm and visualize the sorting process step-by-step.",
      image: "https://i.imgur.com/ZXjAszt.jpg",
      rating: 4.7,
      collegeName: "IIIT Hyderabad",
      collegeLogo:
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/IIIT_logo.png",
      labName: "Software Engineering Research Centre",
    },
    {
      id: "exp2",
      title: "Data Structures Visualization",
      domain: "Computer Science",
      discipline: "Computer Science & Engineering",
      description:
        "Interactive visualization of common data structures and algorithms with step-by-step execution.",
      image: "https://i.imgur.com/KQvYdgz.jpg",
      rating: 4.9,
      collegeName: "IIT Bombay",
      collegeLogo:
        "https://scontent-tir3-3.xx.fbcdn.net/v/t39.30808-6/358686084_665671552249517_3295747950737683000_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Cl2Msk7XZiwQ7kNvgFO4zlx&_nc_oc=AdhOYDA2CTQnJ7rlB3Szqm5fEg-co6bHzJrXDvcx1v7FKuGugiaLlyFkOTkjCB6VgVA&_nc_zt=23&_nc_ht=scontent-tir3-3.xx&_nc_gid=A0WJEujPlaSfeU1qaHJNVXl&oh=00_AYFH31XcK20mJRNIbxc7QnIjnB5_67EhXMPxbUkpQJX6qQ&oe=67D631AC",
      labName: "Data Structures Lab",
    },
    {
      id: "exp3",
      title: "Mechanics of Machines",
      domain: "Mechanical",
      discipline: "Mechanical Engineering",
      description:
        "Study of mechanisms, kinematics, and dynamics of machinery with interactive simulations.",
      image: "https://i.imgur.com/dXcnZtN.jpg",
      rating: 4.5,
      collegeName: "IIT Madras",
      collegeLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/220px-IIT_Madras_Logo.svg.png",
      labName: "Mechanics Lab",
    },
    {
      id: "exp4",
      title: "Structural Analysis",
      domain: "Civil",
      discipline: "Civil Engineering",
      description:
        "Analyze different types of structures and understand their behavior under various loading conditions.",
      image: "https://i.imgur.com/vvpbUMK.jpg",
      rating: 4.3,
      collegeName: "IIT Kharagpur",
      collegeLogo:
        "https://logowik.com/content/uploads/images/iit-indian-institute-of-technology-kharagpur4613.jpg",
      labName: "Structural Engineering Lab",
    },
    {
      id: "exp5",
      title: "Molecular Biology Techniques",
      domain: "Biology",
      discipline: "Biotechnology",
      description:
        "Virtual experiments on DNA extraction, PCR, gel electrophoresis and other fundamental techniques.",
      image: "https://i.imgur.com/mS3jTFh.jpg",
      rating: 4.6,
      collegeName: "IIT Roorkee",
      collegeLogo:
        "https://cmsredesign.channeli.in/library/assets/images/IITR_Logo.svg",
      labName: "Molecular Biology Lab",
    },
    {
      id: "exp6",
      title: "Chemical Reaction Engineering",
      domain: "Chemistry",
      discipline: "Chemical Engineering",
      description:
        "Study chemical reactions, reactor design, and process optimization through virtual simulations.",
      image: "https://i.imgur.com/7f1l3cy.jpg",
      rating: 4.4,
      collegeName: "IIT Kanpur",
      collegeLogo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgFDz-OWRKMSMuxwm0pw76sX8C6ahmjHJs2VtwajEpvoRlnxf8-6zvmBNf8AZ1sU-Adw&usqp=CAU",
      labName: "Chemical Engineering Lab",
    },
  ];

  // Get unique domains and disciplines for filters
  const domains = [...new Set(experiments.map((exp) => exp.domain))].sort();
  const disciplines = [
    ...new Set(experiments.map((exp) => exp.discipline)),
  ].sort();

  // Filter and sort experiments
  const filteredExperiments = experiments
    .filter((exp) => {
      const matchesSearch =
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.labName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDomain = selectedDomain
        ? exp.domain === selectedDomain
        : true;
      const matchesDiscipline = selectedDiscipline
        ? exp.discipline === selectedDiscipline
        : true;

      return matchesSearch && matchesDomain && matchesDiscipline;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.title.localeCompare(b.title);
        default: // 'popularity' (using rating as proxy)
          return b.rating - a.rating;
      }
    });

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedDomain, selectedDiscipline, sortBy]);

  // Reset filters
  const resetFilters = () => {
    setSelectedDomain("");
    setSelectedDiscipline("");
    setSearchQuery("");
    setSortBy("popularity");
  };

  // Generate star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-current text-yellow-400" />
        <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} text-sm font-medium`}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className={isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}>
      {/* Navigation Bar */}
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

      {/* Main Content */}
      <main className="min-h-screen pt-16 pb-24">
        {/* Hero Section */}
        <section className={`relative overflow-hidden ${isDarkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"}`}>
          <div className="container mx-auto px-4 py-16 md:py-24">
            {/* Background shape (optional) */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 opacity-10">
              <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
                <defs>
                  <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className={isDarkMode ? "text-indigo-500" : "text-indigo-600"} fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="404" fill="url(#pattern)" />
              </svg>
            </div>

            <div className="relative max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Discover Virtual Lab Experiments
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`text-lg md:text-xl mb-10 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Explore interactive experiments across various disciplines
                designed to enhance your learning experience
              </motion.p>

              {/* Search bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative max-w-xl mx-auto"
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                </div>
                <input
                  type="text"
                  placeholder="Search experiments by name, domain, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full py-3 pl-12 pr-4 rounded-full outline-none shadow-lg ${isDarkMode
                      ? "bg-gray-800/80 text-white border border-gray-700 focus:border-blue-500"
                      : "bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
                    }`}
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filters and Results Section */}
        <section className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block">
              <Card className={`rounded-xl border shadow-sm p-0 overflow-hidden ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                <CardHeader className={`p-5 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-indigo-900/40" : "bg-indigo-50"}`}>
                        <Filter className={`w-5 h-5 ${isDarkMode ? "text-indigo-300" : "text-indigo-600"}`} />
                      </div>
                      <CardTitle className={`text-xl font-semibold ${isDarkMode ? " text-indigo-300" : "text-indigo-600"}`}>Filters</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className={`text-sm font-medium ${
                        isDarkMode 
                          ? "text-indigo-300 hover:text-indigo-200 hover:bg-indigo-900/30" 
                          : "text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
                      }`}
                    >
                      Reset All
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-6">
                  {/* Domain Filter */}
                  <div className="space-y-3">
                    <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Domain
                    </h4>

                    <div className="space-y-2">
                      <div className={`flex items-center rounded-lg px-3 py-2 cursor-pointer transition-colors ${selectedDomain === "" ? (isDarkMode ? "bg-indigo-600/20 text-indigo-300" : "bg-indigo-50 text-indigo-700") : (isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700")}`}
                        onClick={() => setSelectedDomain("")}>
                        <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${selectedDomain === "" ? (isDarkMode ? "border-2 border-indigo-300 bg-indigo-300" : "border-2 border-indigo-600 bg-indigo-600") : (isDarkMode ? "border border-gray-500" : "border border-gray-400")}`}>
                          {selectedDomain === "" && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span>All Domains</span>
                      </div>

                      {domains.map((domain) => (
                        <div
                          key={domain}
                          className={`flex items-center rounded-lg px-3 py-2 cursor-pointer transition-colors ${selectedDomain === domain ? (isDarkMode ? "bg-indigo-600/20 text-indigo-300" : "bg-indigo-50 text-indigo-700") : (isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700")}`}
                          onClick={() => setSelectedDomain(domain)}
                        >
                          <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${selectedDomain === domain ? (isDarkMode ? "border-2 border-indigo-300 bg-indigo-300" : "border-2 border-indigo-600 bg-indigo-600") : (isDarkMode ? "border border-gray-500" : "border border-gray-400")}`}>
                            {selectedDomain === domain && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span>{domain}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className={isDarkMode ? "bg-gray-700" : "bg-gray-200"} />

                  {/* Discipline Filter */}
                  <div className="space-y-3">
                    <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Discipline
                    </h4>

                    <div className="space-y-2">
                      <div
                        className={`flex items-center rounded-lg px-3 py-2 cursor-pointer transition-colors ${selectedDiscipline === "" ? (isDarkMode ? "bg-indigo-600/20 text-indigo-300" : "bg-indigo-50 text-indigo-700") : (isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700")}`}
                        onClick={() => setSelectedDiscipline("")}
                      >
                        <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${selectedDiscipline === "" ? (isDarkMode ? "border-2 border-indigo-300 bg-indigo-300" : "border-2 border-indigo-600 bg-indigo-600") : (isDarkMode ? "border border-gray-500" : "border border-gray-400")}`}>
                          {selectedDiscipline === "" && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span>All Disciplines</span>
                      </div>

                      {disciplines.map((discipline) => (
                        <div
                          key={discipline}
                          className={`flex items-center rounded-lg px-3 py-2 cursor-pointer transition-colors ${selectedDiscipline === discipline ? (isDarkMode ? "bg-indigo-600/20 text-indigo-300" : "bg-indigo-50 text-indigo-700") : (isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700")}`}
                          onClick={() => setSelectedDiscipline(discipline)}
                        >
                          <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${selectedDiscipline === discipline ? (isDarkMode ? "border-2 border-indigo-300 bg-indigo-300" : "border-2 border-indigo-600 bg-indigo-600") : (isDarkMode ? "border border-gray-500" : "border border-gray-400")}`}>
                            {selectedDiscipline === discipline && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span>{discipline}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Filters Toggle Button */}
            <div className="lg:hidden mb-4">
              <Button
                onClick={toggleFilters}
                variant="outline"
                className={`w-full justify-between ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"
                  }`}
              >
                <div className="flex items-center">
                  <Filter className="w-4 h-12 mr-2" />
                  Filters & Sort
                </div>

                {isFiltersOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>

              {isFiltersOpen && (
                <Card className={`mt-2 p-4 rounded-xl ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      Filters
                    </h3>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className={isDarkMode ? "text-indigo-300" : "text-indigo-600"}
                    >
                      Reset All
                    </Button>
                  </div>

                  {/* Sort By */}
                  <div className="mb-4">
                    <label
                      className={`block mb-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      Sort By
                    </label>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`w-full p-2 rounded border ${isDarkMode
                        ? "bg-gray-800 text-white border-gray-700"
                        : "bg-white text-gray-900 border-gray-300"
                        }`}
                    >
                      <option value="popularity">Popularity</option>
                      <option value="rating">Rating</option>
                      <option value="name">Name</option>
                    </select>
                  </div>

                  {/* Domain Filter */}
                  <div className="mb-4">
                    <label
                      className={`block mb-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      Domain
                    </label>

                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      className={`w-full p-2 rounded border ${isDarkMode
                        ? "bg-gray-800 text-white border-gray-700"
                        : "bg-white text-gray-900 border-gray-300"
                        }`}
                    >
                      <option value="">All Domains</option>
                      {domains.map((domain) => (
                        <option key={domain} value={domain}>
                          {domain}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Discipline Filter */}
                  <div className="mb-2">
                    <label
                      className={`block mb-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      Discipline
                    </label>

                    <select
                      value={selectedDiscipline}
                      onChange={(e) => setSelectedDiscipline(e.target.value)}
                      className={`w-full p-2 rounded border ${isDarkMode
                        ? "bg-gray-800 text-white border-gray-700"
                        : "bg-white text-gray-900 border-gray-300"
                        }`}
                    >
                      <option value="">All Disciplines</option>
                      {disciplines.map((discipline) => (
                        <option key={discipline} value={discipline}>
                          {discipline}
                        </option>
                      ))}
                    </select>
                  </div>
                </Card>
              )}
            </div>

            {/* Results Area */}
            <div className="lg:col-span-3">
              {/* Results Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pr-6 pl-6">
                <h2 className={`text-xl font-semibold mb-2 sm:mb-0 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {isLoading
                    ? "Loading experiments..."
                    : `${filteredExperiments.length} Experiments Found`}
                </h2>

                {/* Desktop Sort */}
                <div className="hidden sm:flex items-center space-x-2">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Sort by
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className={`w-[140px] ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : ""}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-700 text-white" : ""}>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Applied Filters */}
              {(selectedDomain || selectedDiscipline) && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {selectedDomain && (
                    <div className={`flex items-center rounded-full px-3 py-1 text-sm ${isDarkMode ? "bg-gray-800 text-indigo-300 border border-gray-700" : "bg-indigo-50 text-indigo-700"
                      }`}>
                      Domain: {selectedDomain}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedDomain("")}
                        className="ml-2"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                  {selectedDiscipline && (
                    <div className={`flex items-center rounded-full px-3 py-1 text-sm ${isDarkMode ? "bg-gray-800 text-indigo-300 border border-gray-700" : "bg-indigo-50 text-indigo-700"
                      }`}>
                      Discipline: {selectedDiscipline}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedDiscipline("")}
                        className={`ml-2 rounded-full ${
                          isDarkMode 
                            ? "hover:bg-gray-700 text-gray-400 hover:text-white" 
                            : "hover:bg-indigo-100 text-gray-500 hover:text-indigo-700"
                        }`}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className={isDarkMode 
                      ? "text-gray-300 hover:text-white hover:bg-gray-700" 
                      : "text-gray-600 hover:text-gray-700 hover:bg-gray-200"
                    }
                  >
                    Clear All
                  </Button>
                </div>
              )}

              {/* Loading State */}
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center items-center py-20"
                >
                  <div className="text-center">
                    <Loader2 className={`w-12 h-12 animate-spin mx-auto mb-4 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"
                      }`} />

                    <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Loading experiments...
                    </p>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* No Results State */}
                  {filteredExperiments.length === 0 ? (
                    <div className={`text-center py-16 rounded-xl border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                      }`}>
                      <h3 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        No experiments found
                      </h3>
                      <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Try adjusting your filters or search query
                      </p>
                    </div>
                  ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
                          {filteredExperiments.map((experiment) => (
                            <Card
                              key={experiment.id}
                              className={`rounded-xl border overflow-hidden transform transition-all p-0 duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                                }`}
                            >
                              {/* Image container with no top margin/padding */}
                              <div className="relative h-52 w-full overflow-hidden">
                                <img
                                  src="https://images.unsplash.com/photo-1587355760421-b9de3226a046?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  alt={experiment.title}
                                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                                />
                                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
                                  }`}>
                                  {experiment.domain}
                                </div>
                              </div>

                              {/* Content area as a flex column with flex-grow to push button to bottom */}
                              <CardContent className="pb-5 flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center">
                                    <img
                                      src={experiment.collegeLogo}
                                      alt={experiment.collegeName}
                                      className="w-7 h-7 rounded-full ring-2 ring-gray-200"
                                    />
                                    <span className={`text-sm ml-2 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"
                                      }`}>
                                      {experiment.collegeName}
                                    </span>
                                  </div>
                                  <StarRating rating={experiment.rating} />
                                </div>

                                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"
                                  }`}>
                                  {experiment.title}
                                </h3>

                                <p className={`text-sm mb-4 line-clamp-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"
                                  }`}>
                                  {experiment.description}
                                </p>

                                {/* Spacer to push button to bottom */}
                                <div className="flex-grow"></div>

                                {/* Button */}
                                <Link href={"/experiment"}>
                                  <button
                                    className={`w-full py-2 mt-4 rounded-lg font-medium transition-colors cursor-pointer ${
                                      isDarkMode
                                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                        : "bg-indigo-500 hover:bg-indigo-600 text-white"
                                    }`}
                                  >
                                    View Details
                                  </button>
                                </Link>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default ExperimentsPage;
