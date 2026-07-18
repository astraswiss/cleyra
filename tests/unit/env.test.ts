import { describe, expect, it } from "vitest";

describe("env", () => {
  it("parses without throwing when no variables are required yet", async () => {
    const { env } = await import("@/lib/env");
    expect(env).toEqual({});
  });
});
