"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("popularity");

  // Use system preference for initial theme
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  //   TODO: JSON
  // Sample experiment data
  const experiments: Experiment[] = [
    {
      id: "exp1",
      title: "Circuit Theory and Applications",
      domain: "Electronics",
      discipline: "Electrical Engineering",
      description:
        "Learn about basic circuit theorems and their practical applications in electronic systems.",
      image: "https://i.imgur.com/ZXjAszt.jpg",
      rating: 4.7,
      collegeName: "IIT Delhi",
      collegeLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/220px-Indian_Institute_of_Technology_Delhi_Logo.svg.png",
      labName: "Basic Electronics Lab",
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
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/IIT_Bombay_color_logo.svg/220px-IIT_Bombay_color_logo.svg.png",
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
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/220px-IIT_Kharagpur_Logo.svg.png",
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
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/IIT_Roorkee_logo.png/220px-IIT_Roorkee_logo.png",
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
        "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/IIT_Kanpur_Logo.svg/220px-IIT_Kanpur_Logo.svg.png",
      labName: "Chemical Engineering Lab",
    },
    {
      id: "exp7",
      title: "Digital Signal Processing",
      domain: "Electronics",
      discipline: "Electronics & Communication",
      description:
        "Learn about signal processing techniques and their applications in modern communication systems.",
      image: "https://i.imgur.com/0Gj3NZp.jpg",
      rating: 4.8,
      collegeName: "IIT Guwahati",
      collegeLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/IIT_Guwahati_Logo.svg/220px-IIT_Guwahati_Logo.svg.png",
      labName: "Signal Processing Lab",
    },
    {
      id: "exp8",
      title: "Quantum Computing Basics",
      domain: "Computer Science",
      discipline: "Computer Science & Engineering",
      description:
        "Introduction to quantum computing concepts with interactive simulations of quantum algorithms.",
      image: "https://i.imgur.com/h4Tngda.jpg",
      rating: 4.9,
      collegeName: "IIIT Hyderabad",
      collegeLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/IIIT_Hyderabad_Logo.svg/220px-IIIT_Hyderabad_Logo.svg.png",
      labName: "Quantum Computing Lab",
    },
    {
      id: "exp9",
      title: "Thermodynamics and Heat Transfer",
      domain: "Mechanical",
      discipline: "Mechanical Engineering",
      description:
        "Study of energy transfer processes and thermal systems through virtual experiments.",
      image: "https://i.imgur.com/1rftBfu.jpg",
      rating: 4.5,
      collegeName: "NITK Surathkal",
      collegeLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/NIT_Karnataka_logo.png/220px-NIT_Karnataka_logo.png",
      labName: "Thermal Engineering Lab",
    },
    {
      id: "exp10",
      title: "Environmental Engineering",
      domain: "Civil",
      discipline: "Civil Engineering",
      description:
        "Learn about water treatment processes, air quality management, and environmental impact assessment.",
      image: "https://i.imgur.com/P9FXhw0.jpg",
      rating: 4.2,
      collegeName: "VNIT Nagpur",
      collegeLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/VNIT_logo.png/220px-VNIT_logo.png",
      labName: "Environmental Engineering Lab",
    },
    {
      id: "exp11",
      title: "Genetics and Genomics",
      domain: "Biology",
      discipline: "Biotechnology",
      description:
        "Explore genetic principles and genomic analysis techniques through interactive simulations.",
      image: "https://i.imgur.com/ZQQBqXD.jpg",
      rating: 4.7,
      collegeName: "IIT Ropar",
      collegeLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Indian_Institute_of_Technology_Ropar_logo.png/220px-Indian_Institute_of_Technology_Ropar_logo.png",
      labName: "Genetics Lab",
    },
    {
      id: "exp12",
      title: "Organic Chemistry Reactions",
      domain: "Chemistry",
      discipline: "Chemical Engineering",
      description:
        "Virtual experiments on organic synthesis, reaction mechanisms, and compound identification.",
      image: "https://i.imgur.com/SHgHaq1.jpg",
      rating: 4.4,
      collegeName: "BITS Pilani",
      collegeLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/220px-BITS_Pilani-Logo.svg.png",
      labName: "Organic Chemistry Lab",
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
      <div className="flex items-center">
        <Star size={16} className={`fill-yellow-400 text-yellow-400`} />
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      {/* Main Content */}
      <main className="container mx-auto pt-24 px-4 pb-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl overflow-hidden shadow-xl relative mb-10 ${
            isDarkMode
              ? "bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-800"
              : "bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500"
          }`}
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

          <div className="p-8 md:p-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
                Discover Virtual Lab Experiments
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-blue-100 mb-8">
                Explore interactive experiments across various disciplines
                designed to enhance your learning experience
              </p>

              {/* Search bar */}
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search experiments, domains, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full py-3 pl-12 pr-4 rounded-full outline-none shadow-lg ${
                    isDarkMode
                      ? "bg-gray-800/80 text-white border border-gray-700 focus:border-blue-500"
                      : "bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
                  }`}
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

        {/* Filters and Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block md:col-span-1">
            <Card
              className={`sticky top-24 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle
                    className={`text-lg ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Filters
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className={`text-sm ${
                      isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    Reset All
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Domain Filter */}
                <div>
                  <h4
                    className={`font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Domain
                  </h4>
                  <RadioGroup
                    value={selectedDomain}
                    onValueChange={setSelectedDomain}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value=""
                          id="domain-all"
                          className={
                            isDarkMode
                              ? "border-gray-600 text-white [&_[data-state=checked]]:bg-white [&_[data-state=checked]]:text-white"
                              : "border-gray-300 text-primary"
                          }
                        />
                        <Label
                          htmlFor="domain-all"
                          className={
                            isDarkMode ? "text-gray-200" : "text-gray-800"
                          }
                        >
                          All Domains
                        </Label>
                      </div>
                      {domains.map((domain) => (
                        <div
                          key={domain}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={domain}
                            id={`domain-${domain}`}
                            className={
                              isDarkMode
                                ? "border-gray-600 text-white [&_[data-state=checked]]:bg-white [&_[data-state=checked]]:text-white"
                                : "border-gray-300 text-primary"
                            }
                          />
                          <Label
                            htmlFor={`domain-${domain}`}
                            className={
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }
                          >
                            {domain}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Separator
                  className={isDarkMode ? "bg-gray-700" : "bg-gray-200"}
                />

                {/* Discipline Filter */}
                <div>
                  <h4
                    className={`font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Discipline
                  </h4>
                  <ScrollArea className="h-48">
                    <RadioGroup
                      value={selectedDiscipline}
                      onValueChange={setSelectedDiscipline}
                      className="pr-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value=""
                            id="discipline-all"
                            className={
                              isDarkMode
                                ? "border-gray-600 text-white [&_[data-state=checked]]:bg-white [&_[data-state=checked]]:text-white"
                                : "border-gray-300 text-primary"
                            }
                          />
                          <Label
                            htmlFor="discipline-all"
                            className={
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }
                          >
                            All Disciplines
                          </Label>
                        </div>
                        {disciplines.map((discipline) => (
                          <div
                            key={discipline}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={discipline}
                              id={`discipline-${discipline}`}
                              className={
                                isDarkMode
                                  ? "border-gray-600 text-white [&_[data-state=checked]]:bg-white [&_[data-state=checked]]:text-white"
                                  : "border-gray-300 text-primary"
                              }
                            />
                            <Label
                              htmlFor={`discipline-${discipline}`}
                              className={
                                isDarkMode ? "text-gray-200" : "text-gray-800"
                              }
                            >
                              {discipline}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Filters Toggle Button */}
          <div className="md:hidden mb-4">
            <button
              onClick={toggleFilters}
              className={`w-full py-3 px-4 flex justify-between items-center rounded-lg shadow ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              }`}
            >
              <div className="flex items-center">
                <Filter size={18} className="mr-2" />
                <span>Filters & Sort</span>
              </div>
              {isFiltersOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {isFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-2 p-4 rounded-lg shadow-md ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                  >
                    Reset All
                  </button>
                </div>

                {/* Sort By */}
                <div className="mb-4">
                  <h4
                    className={`font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Sort By
                  </h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`w-full p-2 rounded border ${
                      isDarkMode
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
                  <h4
                    className={`font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Domain
                  </h4>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className={`w-full p-2 rounded border ${
                      isDarkMode
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
                  <h4
                    className={`font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Discipline
                  </h4>
                  <select
                    value={selectedDiscipline}
                    onChange={(e) => setSelectedDiscipline(e.target.value)}
                    className={`w-full p-2 rounded border ${
                      isDarkMode
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
              </motion.div>
            )}
          </div>

          {/* Results Area */}
          <div className="md:col-span-3">
            {/* Results Summary */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {isLoading
                  ? "Loading experiments..."
                  : `${filteredExperiments.length} Experiments Found`}
              </h2>

              {/* Desktop Sort */}
              <div className="hidden md:flex items-center">
                <span
                  className={`mr-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Sort by
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Applied Filters */}
            {(selectedDomain || selectedDiscipline) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedDomain && (
                  <div
                    className={`px-3 py-1 rounded-full text-sm flex items-center ${
                      isDarkMode
                        ? "bg-blue-900/50 text-blue-200"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    Domain: {selectedDomain}
                    <button
                      onClick={() => setSelectedDomain("")}
                      className="ml-2"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                {selectedDiscipline && (
                  <div
                    className={`px-3 py-1 rounded-full text-sm flex items-center ${
                      isDarkMode
                        ? "bg-blue-900/50 text-blue-200"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    Discipline: {selectedDiscipline}
                    <button
                      onClick={() => setSelectedDiscipline("")}
                      className="ml-2"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <button
                  onClick={resetFilters}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <Loader2
                    size={40}
                    className={`animate-spin mx-auto mb-4 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    Loading experiments...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* No Results State */}
                {filteredExperiments.length === 0 ? (
                  <div
                    className={`text-center p-12 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <Search
                      size={48}
                      className={`mx-auto mb-4 ${
                        isDarkMode ? "text-gray-700" : "text-gray-300"
                      }`}
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      No experiments found
                    </h3>
                    <p
                      className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      Try adjusting your search or filters to find experiments.
                    </p>
                    <button
                      onClick={resetFilters}
                      className={`mt-4 px-4 py-2 rounded-lg ${
                        isDarkMode
                          ? "bg-blue-700 text-white hover:bg-blue-600"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  /* Experiment Cards Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExperiments.map((experiment) => (
                      <motion.div
                        key={experiment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                          isDarkMode
                            ? "bg-gray-900 border border-gray-800"
                            : "bg-white border border-gray-100"
                        }`}
                      >
                        {/* Card Image */}
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={experiment.image}
                            alt={experiment.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>

                        {/* Card Content */}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2">
                            {experiment.title}
                          </h3>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {experiment.description}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                              <img
                                src={experiment.collegeLogo}
                                alt={experiment.collegeName}
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {experiment.collegeName}
                              </span>
                            </div>
                            <StarRating rating={experiment.rating} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default ExperimentsPage;
