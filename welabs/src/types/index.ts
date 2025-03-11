export interface Experiment {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  institute: Institute;
  discipline: Discipline;
  popular: boolean;
  recent: boolean;
  createdAt: string;
}

export interface Institute {
  id: string;
  name: string;
  logo: string;
}

export interface Discipline {
  id: string;
  name: string;
}

export type TabType = "popular" | "recent" | "all" | "starred";
export type ThemeType = "light" | "dark" | "system";
export type SortOption = "rating" | "newest" | "oldest" | "alphabetical";
