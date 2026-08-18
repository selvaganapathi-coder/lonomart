import { describe, expect, it } from "vitest";

import { getTemplateDefinition } from "@/lib/templates/definitions";

describe("template structure contract", () => {
  it("provides versioned pages for every starter template", () => {
    for (const key of ["professional-services", "local-business", "restaurant"]) {
      const template = getTemplateDefinition(key, "Example Business", "A short business description.");

      expect(template).toBeDefined();
      expect(template?.version).toBe(1);
      expect(template?.pages.length).toBeGreaterThan(0);
      expect(template?.pages.some((page) => page.isHome)).toBe(true);
    }
  });

  it("keeps page and section ordering deterministic", () => {
    const template = getTemplateDefinition("professional-services", "Example Business", "A short business description.");

    expect(template?.pages.map((page) => page.sortOrder)).toEqual([0, 1, 2, 3]);
    expect(template?.pages.every((page) => page.sections.every((section) => section.version === 1))).toBe(true);
  });

  it("uses structured section content rather than editor-specific markup", () => {
    const template = getTemplateDefinition("restaurant", "Example Restaurant", "A local restaurant.");
    const sections = template?.pages.flatMap((page) => page.sections) ?? [];

    expect(sections.length).toBeGreaterThan(0);
    expect(sections.every((section) => typeof section.content === "object" && !Array.isArray(section.content))).toBe(true);
  });
});
