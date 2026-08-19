import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const schemaPath = new URL("../prisma/schema.prisma", import.meta.url);

async function readSchema() {
  return readFile(schemaPath, "utf8");
}

describe("website schema contract", () => {
  it("defines a customer-owned website project", async () => {
    const schema = await readSchema();

    expect(schema).toContain("model Website {");
    expect(schema).toMatch(/userId\s+String/);
    expect(schema).toMatch(/user\s+User\s+@relation\(fields: \[userId\]/);
    expect(schema).toMatch(/businessProfile\s+Json/);
  });

  it("keeps website lifecycle and template references explicit", async () => {
    const schema = await readSchema();

    expect(schema).toContain("enum WebsiteStatus");
    expect(schema).toMatch(/status\s+WebsiteStatus\s+@default\(DRAFT\)/);
    expect(schema).toMatch(/templateKey\s+String/);
    expect(schema).toMatch(/templateVersion\s+Int\s+@default\(1\)/);
  });

  it("protects ownership queries and slug uniqueness", async () => {
    const schema = await readSchema();

    expect(schema).toMatch(/slug\s+String\s+@unique/);
    expect(schema).toContain("@@index([userId])");
    expect(schema).toContain("@@index([userId, status])");
    expect(schema).toContain("onDelete: Cascade");
  });
});
