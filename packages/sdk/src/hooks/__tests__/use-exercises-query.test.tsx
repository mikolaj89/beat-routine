import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  baseUrl,
  createTestQueryClient,
  createWrapper,
} from "./test-utils";

const { fetchExercises, expectedExercises } = vi.hoisted(() => {
  const expectedExercises = [
    {
      id: 1,
      name: "Test Exercise",
      categoryId: "cat-1",
    },
  ];
  return {
    fetchExercises: vi.fn().mockResolvedValue(expectedExercises),
    expectedExercises,
  };
});

vi.mock("../../api", () => ({
  fetchExercises: fetchExercises,
  exercisesQueryKeys: {
    all: ["exercises"] as const,
    byId: (exerciseId: number) => ["exercises", exerciseId] as const,
    filtered: (filters: { name: string | null; categoryId: string | null }) =>
      ["exercises", filters.name, filters.categoryId] as const,
  },
  buildExercisesQueryParams: (filters: {
    name: string | null;
    categoryId: string | null;
  }): string => {
    const params = new URLSearchParams();
    if (filters.name) params.set("name", filters.name);
    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    return params.toString() ? `?${params.toString()}` : "";
  },
}));

afterEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("useExercisesQuery", () => {
  it("returns exercises when fetch succeeds", async () => {
    const { useExercisesQuery } = await import("../use-exercises-query");
    const queryClient = createTestQueryClient();
    const wrapper = createWrapper(queryClient);

    const { result } = renderHook(
      () => useExercisesQuery(baseUrl, { name: null, categoryId: null }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(expectedExercises);
    });

    expect(fetchExercises).toHaveBeenCalledWith(baseUrl, "");
  });

  it("refetches when filters change without debounce", async () => {
    const { useExercisesQuery } = await import("../use-exercises-query");
    const queryClient = createTestQueryClient();
    const wrapper = createWrapper(queryClient);

    const { rerender } = renderHook(
      ({ name }) =>
        useExercisesQuery(baseUrl, { name, categoryId: null }, { debounceMs: 0 }),
      {
        wrapper,
        initialProps: { name: "" as string | null },
      },
    );

    await waitFor(() => {
      expect(fetchExercises).toHaveBeenCalledWith(baseUrl, "");
    });

    fetchExercises.mockClear();

    rerender({ name: "paradiddle" });

    await waitFor(() => {
      expect(fetchExercises).toHaveBeenCalledWith(baseUrl, "?name=paradiddle");
    });
  });

  it("debounces filter changes when debounceMs is provided", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const { useExercisesQuery } = await import("../use-exercises-query");
    const queryClient = createTestQueryClient();
    const wrapper = createWrapper(queryClient);

    const { rerender } = renderHook(
      ({ name }) =>
        useExercisesQuery(baseUrl, { name, categoryId: null }, { debounceMs: 500 }),
      {
        wrapper,
        initialProps: { name: "" as string | null },
      },
    );

    await waitFor(() => {
      expect(fetchExercises).toHaveBeenCalledWith(baseUrl, "");
    });

    expect(fetchExercises).toHaveBeenCalledTimes(1);
    fetchExercises.mockClear();

    rerender({ name: "rock" });

    await vi.advanceTimersByTimeAsync(499);
    expect(fetchExercises).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);

    await waitFor(() => {
      expect(fetchExercises).toHaveBeenCalledWith(baseUrl, "?name=rock");
    });
    expect(fetchExercises).toHaveBeenCalledTimes(1);
  }, 10_000);
});
