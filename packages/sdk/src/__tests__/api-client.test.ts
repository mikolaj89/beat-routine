import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "../api-client";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("ApiClient", () => {
  it("returns parsed data for successful responses", async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      json: async () => ({ data: { ok: true } }),
    })) as unknown as typeof fetch;

    vi.stubGlobal("fetch", fetchMock);

    const client = new ApiClient("http://localhost:8000");
    const result = await client.get<{ ok: boolean }>("/sessions/123");

    expect(result).toEqual({ data: { ok: true } });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8000/sessions/123",
      expect.objectContaining({
        method: "GET",
        headers: expect.any(Object),
      })
    );
  });

  it("returns api error payload when response contains error", async () => {
    const fetchMock = vi.fn(async () => ({
      ok: false,
      json: async () => ({
        error: { message: "Not found", errorCode: "NOT_FOUND" },
      }),
    })) as unknown as typeof fetch;

    vi.stubGlobal("fetch", fetchMock);

    const client = new ApiClient("http://localhost:8000");
    const result = await client.get("/sessions/999");

    expect(result).toEqual({
      error: { message: "Not found", errorCode: "NOT_FOUND" },
    });
  });

  it("returns network error when fetch throws", async () => {
    const fetchMock = vi.fn(async () => {
      throw new Error("ECONNREFUSED");
    }) as unknown as typeof fetch;

    vi.stubGlobal("fetch", fetchMock);

    const client = new ApiClient("http://localhost:8000");
    const result = await client.get("/sessions/500");

    expect(result).toEqual({
      error: { message: "ECONNREFUSED", errorCode: "NETWORK_ERROR" },
    });
  });

  it("returns parse error when response body is not JSON", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn(async () => ({
      ok: false,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    })) as unknown as typeof fetch;

    vi.stubGlobal("fetch", fetchMock);

    const client = new ApiClient("http://localhost:8000");
    const result = await client.get("/sessions/400");

    expect(result).toEqual({
      error: {
        message:
          "Request failed, AND response is not JSON. Check server logs or network tab.",
        errorCode: "PARSE_ERROR",
      },
    });
    warnSpy.mockRestore();
  });
});
