import { afterEach, describe, expect, it, vi } from "vitest";
import {
  addExerciseToSession,
  createSession,
  deleteSession,
  fetchSessionById,
  fetchSessions,
  removeExerciseFromSession,
  reorderSessionExercises,
} from "../index";
import { baseUrl, createFetchMock, getRequestBody } from "./test-utils";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("sessions api", () => {
  it("fetchSessions returns data", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/sessions`,
        response: { data: [{ id: 1, name: "S1", notes: null }] },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchSessions(baseUrl);
    expect(result).toEqual([{ id: 1, name: "S1", notes: null }]);
  });

  it("fetchSessionById returns data", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/sessions/1`,
        response: { data: { id: 1, name: "S1", totalDuration: 0, exercises: [] } },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchSessionById(baseUrl, 1);
    expect(result).toEqual({ id: 1, name: "S1", totalDuration: 0, exercises: [] });
  });

  it("fetchSessionById throws on error response", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/sessions/2`,
        ok: true,
        response: { error: { message: "Not found", errorCode: "NOT_FOUND" } },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchSessionById(baseUrl, 2)).rejects.toThrow("Not found");
  });

  it("reorderSessionExercises sends payload", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/sessions/3/exercises-order`,
        method: "PATCH",
        response: { data: null },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const payload = { exercises: [{ id: 1 }] };
    const result = await reorderSessionExercises(baseUrl, 3, payload as any);

    expect(result).toBeNull();
    const [, init] = fetchMock.mock.calls[0];
    expect(getRequestBody(init)).toEqual(payload);
  });

  it("removeExerciseFromSession calls delete", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/sessions/4/exercises/9`,
        method: "DELETE",
        response: { data: null },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const result = await removeExerciseFromSession(baseUrl, 4, 9);
    expect(result).toBeNull();
  });

  it("deleteSession calls delete", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/sessions/5`,
        method: "DELETE",
        response: { data: null },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const result = await deleteSession(baseUrl, 5);
    expect(result).toBeNull();
  });

  it("createSession posts payload", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/sessions`,
        method: "POST",
        response: { data: { id: 20 } },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const payload = { name: "New", notes: null };
    const result = await createSession(baseUrl, payload as any);

    expect(result).toEqual({ data: { id: 20 } });
    const [, init] = fetchMock.mock.calls[0];
    expect(getRequestBody(init)).toEqual(payload);
  });

  it("addExerciseToSession posts", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/sessions/6/exercises/8`,
        method: "POST",
        response: { data: { id: 6 } },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const result = await addExerciseToSession(baseUrl, 6, "8");
    expect(result).toEqual({ data: { id: 6 } });
  });
});
