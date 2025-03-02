// src/components/filter-sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Institute, Discipline } from "@/types";

interface FilterSidebarProps {
  institutes: Institute[];
  disciplines: Discipline[];
  onFilterChange: (institutes: string[], disciplines: string[]) => void;
  onSearchChange: (query: string) => void;
  isMobileFilterOpen: boolean;
  onCloseMobileFilter: () => void;
}

export function FilterSidebar({
  institutes,
  disciplines,
  onFilterChange,
  onSearchChange,
  isMobileFilterOpen,
  onCloseMobileFilter,
}: FilterSidebarProps) {
  const [selectedInstitutes, setSelectedInstitutes] = useState<string[]>([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load saved filter preferences
  useEffect(() => {
    const savedFilters = localStorage.getItem("vlab-filters");
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      setSelectedInstitutes(filters.institutes || []);
      setSelectedDisciplines(filters.disciplines || []);
    }
  }, []);

  // Update filters
  useEffect(() => {
    onFilterChange(selectedInstitutes, selectedDisciplines);

    // Save filter preferences
    localStorage.setItem(
      "vlab-filters",
      JSON.stringify({
        institutes: selectedInstitutes,
        disciplines: selectedDisciplines,
      })
    );
  }, [selectedInstitutes, selectedDisciplines, onFilterChange]);

  const handleInstitueToggle = (instituteId: string) => {
    setSelectedInstitutes((prev) =>
      prev.includes(instituteId)
        ? prev.filter((id) => id !== instituteId)
        : [...prev, instituteId]
    );
  };

  const handleDisciplineToggle = (disciplineId: string) => {
    setSelectedDisciplines((prev) =>
      prev.includes(disciplineId)
        ? prev.filter((id) => id !== disciplineId)
        : [...prev, disciplineId]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  const clearAllFilters = () => {
    setSelectedInstitutes([]);
    setSelectedDisciplines([]);
    setSearchQuery("");
    onSearchChange("");
  };

  const sidebarClasses = `
    bg-background border-r p-4 h-[calc(100vh-4rem)] flex flex-col
    ${
      isMobileFilterOpen
        ? "fixed inset-y-0 left-0 right-1/4 z-50 lg:relative lg:right-auto"
        : "hidden lg:flex"
    }
  `;

  return (
    <div className={sidebarClasses}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear all
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCloseMobileFilter}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative mb-6">
        <Input
          type="search"
          placeholder="Search experiments..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pr-8"
        />
        <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Institutes</h3>
            <div className="space-y-2">
              {institutes.map((institute) => (
                <div key={institute.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`institute-${institute.id}`}
                    checked={selectedInstitutes.includes(institute.id)}
                    onCheckedChange={() => handleInstitueToggle(institute.id)}
                  />
                  <Label
                    htmlFor={`institute-${institute.id}`}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <img
                      src={institute.logo}
                      alt={institute.name}
                      className="h-4 w-4 rounded-full"
                    />
                    {institute.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Disciplines</h3>
            <div className="space-y-2">
              {disciplines.map((discipline) => (
                <div
                  key={discipline.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`discipline-${discipline.id}`}
                    checked={selectedDisciplines.includes(discipline.id)}
                    onCheckedChange={() =>
                      handleDisciplineToggle(discipline.id)
                    }
                  />
                  <Label
                    htmlFor={`discipline-${discipline.id}`}
                    className="cursor-pointer text-sm"
                  >
                    {discipline.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
