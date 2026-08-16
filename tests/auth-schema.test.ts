import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const schemaPath = new URL("../prisma/schema.prisma", import.meta.url);

async function readSchema() {
  return readFile(schemaPath, "utf8");
}

describe("authentication schema contract", () => {
  it("contains the Better Auth core models", async () => {
    const schema = await readSchema();

    expect(schema).toContain("model User {");
    expect(schema).toContain("model Session {");
    expect(schema).toContain("model Account {");
    expect(schema).toContain("model Verification {");
  });

  it("keeps session and account records owned by a user", async () => {
    const schema = await readSchema();

    expect(schema).toContain("userId    String");
    expect(schema).toContain("user      User");
    expect(schema).toContain("onDelete: Cascade");
  });

  it("enforces unique authentication identifiers", async () => {
    const schema = await readSchema();

    expect(schema).toContain('email         String    @unique');
    expect(schema).toContain('token     String   @unique');
    expect(schema).toContain("@@unique([providerId, accountId])");
  });
});
