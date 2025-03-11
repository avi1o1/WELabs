"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Share2,
  Bookmark,
  BookmarkCheck,
  Star,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Experiment } from "@/types";

interface ExperimentCardProps {
  experiment: Experiment;
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  const [isStarred, setIsStarred] = useState(() => {
    if (typeof window !== "undefined") {
      const starredExperiments = JSON.parse(
        localStorage.getItem("starredExperiments") || "[]"
      );
      return starredExperiments.includes(experiment.id);
    }
    return false;
  });

  const handleToggleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStarredStatus = !isStarred;
    setIsStarred(newStarredStatus);

    // Update localStorage
    const starredExperiments = JSON.parse(
      localStorage.getItem("starredExperiments") || "[]"
    );

    if (newStarredStatus) {
      localStorage.setItem(
        "starredExperiments",
        JSON.stringify([...starredExperiments, experiment.id])
      );
    } else {
      localStorage.setItem(
        "starredExperiments",
        JSON.stringify(
          starredExperiments.filter((id: string) => id !== experiment.id)
        )
      );
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: experiment.title,
          text: `Check out this Virtual Lab experiment: ${experiment.title}`,
          url: `/experiment/${experiment.id}`,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(
        `${window.location.origin}/experiment/${experiment.id}`
      );
      // Show toast notification (implementation depends on your toast system)
      console.log("URL copied to clipboard");
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <div className="relative h-48 overflow-hidden">
              <img
                src={experiment.image}
                alt={experiment.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {experiment.rating}
              </div>
              <div className="absolute top-2 left-2">
                <img
                  src={experiment.institute.logo}
                  alt={experiment.institute.name}
                  className="h-8 w-8 rounded-full border-2 border-white bg-white"
                />
              </div>
            </div>

            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg line-clamp-1">
                {experiment.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {experiment.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 pt-2">
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">{experiment.discipline.name}</Badge>
                <Badge variant="secondary">{experiment.institute.name}</Badge>
              </div>
            </CardContent>
          </div>
        </DialogTrigger>

        <CardFooter className="p-4 pt-0 flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggleStar}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isStarred ? (
                    <BookmarkCheck className="h-5 w-5 fill-primary text-primary" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isStarred ? "Remove from favorites" : "Add to favorites"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share experiment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>

        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <img
                src={experiment.institute.logo}
                alt={experiment.institute.name}
                className="h-8 w-8 rounded-full"
              />
              <DialogTitle>{experiment.title}</DialogTitle>
            </div>
            <DialogDescription>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{experiment.discipline.name}</Badge>
                <Badge variant="secondary">{experiment.institute.name}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {experiment.rating}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <img
              src={experiment.image}
              alt={experiment.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-sm text-muted-foreground mb-6">
              {experiment.description}
            </p>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleToggleStar}
                className="flex items-center gap-2"
              >
                {isStarred ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 fill-primary text-primary" />
                    Remove from favorites
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    Add to favorites
                  </>
                )}
              </Button>

              <Button className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Start Experiment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
