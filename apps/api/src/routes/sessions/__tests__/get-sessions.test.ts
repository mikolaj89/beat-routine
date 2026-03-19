import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FastifyReply, FastifyRequest } from "fastify";
import { getSessions } from "../get-sessions";
import { filterSessionsDB } from "../../../db/sessions";

vi.mock("../../../db/sessions", () => ({
  filterSessionsDB: vi.fn(),
}));

const filterSessionsDBMock = vi.mocked(filterSessionsDB);
type FilterSessionsDBResult = Awaited<ReturnType<typeof filterSessionsDB>>;

const createReply = () => {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  };

  return reply as unknown as FastifyReply;
};

describe("getSessions route handler", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("passes null to filtering when query is not provided", async () => {
    // These mocked payloads keep the assertions readable; they do not verify
    // the actual filtering logic, which belongs to the DB layer.
    const allSessions: FilterSessionsDBResult = [
      {
        id: 1,
        name: "Rock",
        sessionDate: null,
        notes: "Loud practice",
        createdAt: null,
        totalDuration: 30,
      },
      {
        id: 2,
        name: "Jazz",
        sessionDate: null,
        notes: "Brushes only",
        createdAt: null,
        totalDuration: 20,
      },
    ];
    filterSessionsDBMock.mockResolvedValueOnce(allSessions);
    const request = {
      query: {},
    } as FastifyRequest<{ Querystring: { query?: string } }>;
    const reply = createReply();

    await getSessions(request, reply);

    expect(filterSessionsDBMock).toHaveBeenCalledTimes(1);
    expect(filterSessionsDBMock).toHaveBeenCalledWith(null);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({
      data: allSessions,
    });
  });

  it("passes an empty query string to filtering", async () => {
    const allSessions: FilterSessionsDBResult = [
      {
        id: 1,
        name: "Rock",
        sessionDate: null,
        notes: "Loud practice",
        createdAt: null,
        totalDuration: 30,
      },
      {
        id: 2,
        name: "Jazz",
        sessionDate: null,
        notes: "Brushes only",
        createdAt: null,
        totalDuration: 20,
      },
    ];
    filterSessionsDBMock.mockResolvedValueOnce(allSessions);
    const request = {
      query: { query: "" },
    } as FastifyRequest<{ Querystring: { query?: string } }>;
    const reply = createReply();

    await getSessions(request, reply);

    expect(filterSessionsDBMock).toHaveBeenCalledTimes(1);
    expect(filterSessionsDBMock).toHaveBeenCalledWith("");
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({
      data: allSessions,
    });
  });

  it("passes the provided query string to filtering", async () => {
    const filteredSessions: FilterSessionsDBResult = [
      {
        id: 1,
        name: "Rock",
        sessionDate: null,
        notes: "Loud practice",
        createdAt: null,
        totalDuration: 30,
      },
    ];
    filterSessionsDBMock.mockResolvedValueOnce(filteredSessions);
    const request = {
      query: { query: "rock" },
    } as FastifyRequest<{ Querystring: { query?: string } }>;
    const reply = createReply();

    await getSessions(request, reply);

    expect(filterSessionsDBMock).toHaveBeenCalledTimes(1);
    expect(filterSessionsDBMock).toHaveBeenCalledWith("rock");
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({
      data: filteredSessions,
    });
  });
});
