export type TemplateSectionDefinition = {
  type: string;
  version: number;
  sortOrder: number;
  content: Record<string, unknown>;
};

export type TemplatePageDefinition = {
  slug: string;
  title: string;
  description?: string;
  sortOrder: number;
  isHome: boolean;
  sections: TemplateSectionDefinition[];
};

export type TemplateDefinition = {
  key: string;
  version: number;
  name: string;
  category: string;
  description: string;
  pages: TemplatePageDefinition[];
};

const commonSections = {
  hero: (businessName: string, description: string): TemplateSectionDefinition => ({
    type: "hero",
    version: 1,
    sortOrder: 0,
    content: {
      eyebrow: "Welcome",
      title: businessName,
      description,
      primaryButton: { label: "Contact Us", url: "/contact" },
    },
  }),
  about: (businessName: string): TemplateSectionDefinition => ({
    type: "about",
    version: 1,
    sortOrder: 1,
    content: {
      title: `About ${businessName}`,
      description: "Tell your customers what makes your business different.",
    },
  }),
  services: (): TemplateSectionDefinition => ({
    type: "services",
    version: 1,
    sortOrder: 2,
    content: {
      title: "What we offer",
      items: [
        { title: "Professional service", description: "A clear description of your primary service." },
        { title: "Reliable support", description: "Explain how customers can work with you." },
        { title: "A better experience", description: "Highlight a reason customers should choose you." },
      ],
    },
  }),
  cta: (): TemplateSectionDefinition => ({
    type: "cta",
    version: 1,
    sortOrder: 3,
    content: {
      title: "Ready to get started?",
      description: "Give customers a clear next step.",
      button: { label: "Contact Us", url: "/contact" },
    },
  }),
  contact: (businessName: string): TemplateSectionDefinition => ({
    type: "contact",
    version: 1,
    sortOrder: 0,
    content: {
      title: `Contact ${businessName}`,
      description: "Add your contact details and make it easy for customers to reach you.",
    },
  }),
};

export function getTemplateDefinition(key: string, businessName: string, description: string): TemplateDefinition | undefined {
  const definitions: Record<string, TemplateDefinition> = {
    "professional-services": {
      key,
      version: 1,
      name: "Professional Services",
      category: "Business",
      description: "A clean, credible starting point for consultants and service businesses.",
      pages: [
        { slug: "home", title: "Home", sortOrder: 0, isHome: true, sections: [commonSections.hero(businessName, description), commonSections.about(businessName), commonSections.services(), commonSections.cta()] },
        { slug: "about", title: "About", sortOrder: 1, isHome: false, sections: [commonSections.about(businessName), commonSections.cta()] },
        { slug: "services", title: "Services", sortOrder: 2, isHome: false, sections: [commonSections.services(), commonSections.cta()] },
        { slug: "contact", title: "Contact", sortOrder: 3, isHome: false, sections: [commonSections.contact(businessName)] },
      ],
    },
    "local-business": {
      key,
      version: 1,
      name: "Local Business",
      category: "Local",
      description: "A practical layout for shops, clinics, salons and local service providers.",
      pages: [
        { slug: "home", title: "Home", sortOrder: 0, isHome: true, sections: [commonSections.hero(businessName, description), commonSections.services(), commonSections.about(businessName), commonSections.cta()] },
        { slug: "about", title: "About", sortOrder: 1, isHome: false, sections: [commonSections.about(businessName), commonSections.contact(businessName)] },
        { slug: "services", title: "Services", sortOrder: 2, isHome: false, sections: [commonSections.services(), commonSections.cta()] },
        { slug: "contact", title: "Contact", sortOrder: 3, isHome: false, sections: [commonSections.contact(businessName)] },
      ],
    },
    restaurant: {
      key,
      version: 1,
      name: "Restaurant",
      category: "Food & Dining",
      description: "A focused starting point for restaurants, cafes and food businesses.",
      pages: [
        { slug: "home", title: "Home", sortOrder: 0, isHome: true, sections: [commonSections.hero(businessName, description), commonSections.services(), commonSections.about(businessName), commonSections.cta()] },
        { slug: "menu", title: "Menu", sortOrder: 1, isHome: false, sections: [commonSections.services()] },
        { slug: "about", title: "About", sortOrder: 2, isHome: false, sections: [commonSections.about(businessName)] },
        { slug: "contact", title: "Contact", sortOrder: 3, isHome: false, sections: [commonSections.contact(businessName)] },
      ],
    },
  };

  return definitions[key];
}
