import { Experiment, Institute, Discipline } from "@/types";
import { mockData } from "./mockData";

// In a real application, these functions would make API calls
// For this demo, we're using mock data

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchExperiments(): Promise<Experiment[]> {
  await delay(800); // Simulate network delay
  return mockData.experiments;
}

export async function fetchInstitutes(): Promise<Institute[]> {
  await delay(500);
  return mockData.institutes;
}

export async function fetchDisciplines(): Promise<Discipline[]> {
  await delay(500);
  return mockData.disciplines;
}

export async function getExperimentById(
  id: string
): Promise<Experiment | undefined> {
  await delay(300);
  return mockData.experiments.find((exp) => exp.id === id);
}
