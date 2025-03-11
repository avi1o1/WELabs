import { Experiment, Institute, Discipline } from "@/types";

// Mock Institutes
const institutes: Institute[] = [
  {
    id: "iit-delhi",
    name: "IIT Delhi",
    logo: "/api/placeholder/32/32",
  },
  {
    id: "iit-bombay",
    name: "IIT Bombay",
    logo: "/api/placeholder/32/32",
  },
  {
    id: "iit-kanpur",
    name: "IIT Kanpur",
    logo: "/api/placeholder/32/32",
  },
  {
    id: "iiit-hyderabad",
    name: "IIIT Hyderabad",
    logo: "/api/placeholder/32/32",
  },
  {
    id: "amrita-university",
    name: "Amrita University",
    logo: "/api/placeholder/32/32",
  },
];

// Mock Disciplines
const disciplines: Discipline[] = [
  {
    id: "computer-science",
    name: "Computer Science",
  },
  {
    id: "electronics",
    name: "Electronics",
  },
  {
    id: "civil-engineering",
    name: "Civil Engineering",
  },
  {
    id: "mechanical-engineering",
    name: "Mechanical Engineering",
  },
  {
    id: "biotechnology",
    name: "Biotechnology",
  },
  {
    id: "chemistry",
    name: "Chemistry",
  },
  {
    id: "physics",
    name: "Physics",
  },
];

// Helper function to generate random dates within the last year
const getRandomDate = () => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - Math.random() * 31536000000); // Random date in the last year
  return pastDate.toISOString();
};

// Generate 30 mock experiments
const generateExperiments = (): Experiment[] => {
  const experiments: Experiment[] = [];

  const titles = [
    "Digital Logic Design",
    "Data Structures",
    "Computer Networks",
    "Circuit Theory",
    "Signals and Systems",
    "Structural Analysis",
    "Fluid Mechanics",
    "Heat Transfer",
    "Thermodynamics",
    "Genetic Engineering",
    "Molecular Biology",
    "Organic Chemistry",
    "Inorganic Chemistry",
    "Quantum Physics",
    "Optics",
  ];

  for (let i = 0; i < 30; i++) {
    const instituteIndex = Math.floor(Math.random() * institutes.length);
    const disciplineIndex = Math.floor(Math.random() * disciplines.length);
    const titleIndex = Math.floor(Math.random() * titles.length);
    const rating = (3 + Math.random() * 2).toFixed(1);
    const popular = Math.random() > 0.7;
    const recent = Math.random() > 0.7;

    experiments.push({
      id: `exp-${i + 1}`,
      title: `${titles[titleIndex]} Lab ${i + 1}`,
      description: `This virtual laboratory provides hands-on experience with ${titles[titleIndex]} concepts, including interactive simulations and guided experiments for practical learning.`,
      image: `/api/placeholder/400/240?text=Experiment+${i + 1}`,
      rating: parseFloat(rating),
      institute: institutes[instituteIndex],
      discipline: disciplines[disciplineIndex],
      popular,
      recent,
      createdAt: getRandomDate(),
    });
  }

  return experiments;
};

export const mockData = {
  institutes,
  disciplines,
  experiments: generateExperiments(),
};
