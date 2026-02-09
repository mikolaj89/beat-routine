import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createExercise,
  deleteExercise,
  fetchCategories,
  fetchCategoryExercises,
  fetchExercise,
  fetchExercises,
  updateExercise,
} from "../index";
import { baseUrl, createFetchMock, getRequestBody } from "./test-utils";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("exercises api", () => {
  it("fetchCategories returns data", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/categories`,
        response: { data: [{ id: "cat-1", name: "Cat" }] },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchCategories(baseUrl);
    expect(result).toEqual([{ id: "cat-1", name: "Cat" }]);
  });

  it("fetchCategoryExercises returns data", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/categories/cat-1/exercises`,
        response: { data: [{ id: 1, name: "Ex" }] },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchCategoryExercises(baseUrl, "cat-1");
    expect(result).toEqual([{ id: 1, name: "Ex" }]);
  });

  it("fetchExercise returns data", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/exercises/1`,
        response: { data: { id: 1, name: "Ex" } },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchExercise(baseUrl, 1);
    expect(result).toEqual({ id: 1, name: "Ex" });
  });

  it("fetchExercise throws on error response", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/exercises/2`,
        ok: true,
        response: { error: { message: "Not found", errorCode: "NOT_FOUND" } },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchExercise(baseUrl, 2)).rejects.toThrow("Not found");
  });

  it("fetchExercises returns data with query string", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/exercises?name=foo`,
        response: { data: [{ id: 3, name: "Foo" }] },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchExercises(baseUrl, "?name=foo");
    expect(result).toEqual([{ id: 3, name: "Foo" }]);
  });

  it("createExercise posts payload", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/exercises`,
        method: "POST",
        response: { data: { id: 10 } },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const payload = { name: "New", categoryId: "cat-1" };
    const result = await createExercise(baseUrl, payload as any);

    expect(result).toEqual({ data: { id: 10 } });
    const [, init] = fetchMock.mock.calls[0];
    expect(getRequestBody(init)).toEqual(payload);
  });

  it("updateExercise puts payload", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/exercises/5`,
        method: "PUT",
        response: { data: { id: 5 } },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const payload = { name: "Updated" };
    const result = await updateExercise(baseUrl, 5, payload);

    expect(result).toEqual({ data: { id: 5 } });
    const [, init] = fetchMock.mock.calls[0];
    expect(getRequestBody(init)).toEqual(payload);
  });

  it("deleteExercise returns data", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/exercises/7`,
        method: "DELETE",
        response: { data: null },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const result = await deleteExercise(baseUrl, 7);
    expect(result).toBeNull();
  });
});
