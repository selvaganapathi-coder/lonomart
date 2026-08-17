export type StarterTemplate = {
  key: string;
  version: number;
  name: string;
  category: string;
  description: string;
};

export const starterTemplates: StarterTemplate[] = [
  {
    key: "professional-services",
    version: 1,
    name: "Professional Services",
    category: "Business",
    description: "A clean, credible starting point for consultants and service businesses.",
  },
  {
    key: "local-business",
    version: 1,
    name: "Local Business",
    category: "Local",
    description: "A practical layout for shops, clinics, salons and local service providers.",
  },
  {
    key: "restaurant",
    version: 1,
    name: "Restaurant",
    category: "Food & Dining",
    description: "A focused starting point for restaurants, cafes and food businesses.",
  },
];

export function getStarterTemplate(key: string) {
  return starterTemplates.find((template) => template.key === key);
}
