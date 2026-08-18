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
    expect(schema).toContain("userId            String");
    expect(schema).toMatch(/user\s+User\s+@relation\(fields: \[userId\]/);
    expect(schema).toContain("businessProfile   Json");
  });

  it("keeps website lifecycle and template references explicit", async () => {
    const schema = await readSchema();

    expect(schema).toContain("enum WebsiteStatus");
    expect(schema).toContain("status            WebsiteStatus @default(DRAFT)");
    expect(schema).toContain("templateKey       String");
    expect(schema).toContain("templateVersion   Int           @default(1)");
  });

  it("protects ownership queries and slug uniqueness", async () => {
    const schema = await readSchema();

    expect(schema).toContain('slug              String        @unique');
    expect(schema).toContain("@@index([userId])");
    expect(schema).toContain("@@index([userId, status])");
    expect(schema).toContain("onDelete: Cascade");
  });
});
