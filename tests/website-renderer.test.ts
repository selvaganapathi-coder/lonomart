import { describe, expect, it } from "vitest";

import { objectArray, objectValue, stringValue } from "../lib/website-renderer/section-content";

describe("website renderer content helpers", () => {
  it("reads only string values as strings", () => {
    expect(stringValue("Lonomart", "fallback")).toBe("Lonomart");
    expect(stringValue(123, "fallback")).toBe("fallback");
    expect(stringValue(undefined, "fallback")).toBe("fallback");
  });

  it("accepts JSON objects and rejects arrays", () => {
    expect(objectValue({ label: "Contact" })).toEqual({ label: "Contact" });
    expect(objectValue(["not-an-object"])).toEqual({});
    expect(objectValue(undefined)).toEqual({});
  });

  it("filters section item arrays to JSON objects", () => {
    expect(objectArray([{ title: "One" }, "invalid", null, ["invalid"]])).toEqual([{ title: "One" }]);
    expect(objectArray(undefined)).toEqual([]);
  });
});
