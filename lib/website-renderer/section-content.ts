import type { JsonObject, JsonValue } from "./types";

export function stringValue(value: JsonValue | undefined, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function objectValue(value: JsonValue | undefined): JsonObject {
  return value && typeof value === "object" && !Array.isArray(value) ? value as JsonObject : {};
}

export function objectArray(value: JsonValue | undefined): JsonObject[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is JsonObject => Boolean(item) && typeof item === "object" && !Array.isArray(item));
}
