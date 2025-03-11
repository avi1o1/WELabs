"use client";

import { useState, useEffect } from "react";
import { ExperimentCard } from "@/components/experiment-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AlertCircle, ArrowDownAZ, ArrowUpDown, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Experiment, SortOption } from "@/types";

interface ExperimentGridProps {
  experiments: Experiment[] | null;
  loading: boolean;
  error: string | null;
  itemsPerPage?: number;
}

export function ExperimentGrid({
  experiments,
  loading,
  error,
  itemsPerPage = 12,
}: ExperimentGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>("rating");
  const [sortedExperiments, setSortedExperiments] = useState<Experiment[]>([]);

  // Handle pagination
  const totalPages = experiments
    ? Math.ceil(experiments.length / itemsPerPage)
    : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExperiments = sortedExperiments.slice(startIndex, endIndex);

  // Save pagination preference
  useEffect(() => {
    localStorage.setItem("vlab-current-page", currentPage.toString());
  }, [currentPage]);

  // Save sort preference
  useEffect(() => {
    localStorage.setItem("vlab-sort-option", sortOption);
  }, [sortOption]);

  // Load saved preferences
  useEffect(() => {
    const savedPage = localStorage.getItem("vlab-current-page");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }

    const savedSort = localStorage.getItem("vlab-sort-option") as SortOption;
    if (savedSort) {
      setSortOption(savedSort);
    }
  }, []);

  // Sort experiments when they change or sort option changes
  useEffect(() => {
    if (!experiments) return;

    const sortExperiments = () => {
      const sorted = [...experiments];
      switch (sortOption) {
        case "rating":
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          sorted.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          sorted.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
        case "alphabetical":
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
      setSortedExperiments(sorted);
    };

    sortExperiments();
  }, [experiments, sortOption]);

  // Reset to first page when experiments change
  useEffect(() => {
    setCurrentPage(1);
  }, [experiments]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value as SortOption);
  };

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sorting and Results Count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground">
          {loading
            ? "Loading experiments..."
            : experiments
            ? `Showing ${Math.min(
                startIndex + 1,
                sortedExperiments.length
              )}-${Math.min(endIndex, sortedExperiments.length)} of ${
                sortedExperiments.length
              } experiments`
            : "No experiments found"}
        </p>

        <div className="flex items-center gap-2">
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Highest Rating</span>
                </div>
              </SelectItem>
              <SelectItem value="newest">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Newest First</span>
                </div>
              </SelectItem>
              <SelectItem value="oldest">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Oldest First</span>
                </div>
              </SelectItem>
              <SelectItem value="alphabetical">
                <div className="flex items-center gap-2">
                  <ArrowDownAZ className="h-4 w-4" />
                  <span>Alphabetical</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && (!experiments || experiments.length === 0) && (
        <div className="text-center py-16">
          <p className="text-xl font-semibold mb-2">No experiments found</p>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or search query.
          </p>
          <Button onClick={() => window.location.reload()}>
            Reset Filters
          </Button>
        </div>
      )}

      {/* Experiment Grid */}
      {!loading && experiments && currentExperiments.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentExperiments.map((experiment) => (
              <ExperimentCard key={experiment.id} experiment={experiment} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {/* First Page */}
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(1)}
                      isActive={currentPage === 1}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Ellipsis */}
                {currentPage > 4 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Previous Page */}
                {currentPage > 2 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Current Page */}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(currentPage)}
                    isActive
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>

                {/* Next Page */}
                {currentPage < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Ellipsis */}
                {currentPage < totalPages - 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Last Page */}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(totalPages)}
                      isActive={currentPage === totalPages}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
