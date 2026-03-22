import { describe, expect, it } from "vitest";
import { buildExercisesQueryParams } from "../build-exercises-query-params";

describe("buildExercisesQueryParams", () => {
  it("returns empty string when both filters are null", () => {
    expect(buildExercisesQueryParams({ name: null, categoryId: null })).toBe("");
  });

  it("builds name only", () => {
    expect(buildExercisesQueryParams({ name: "paradiddle", categoryId: null })).toBe(
      "?name=paradiddle",
    );
  });

  it("builds categoryId only", () => {
    expect(buildExercisesQueryParams({ name: null, categoryId: "5" })).toBe(
      "?categoryId=5",
    );
  });

  it("builds name and categoryId", () => {
    expect(
      buildExercisesQueryParams({ name: "foo", categoryId: "1" }),
    ).toBe("?name=foo&categoryId=1");
  });
});
