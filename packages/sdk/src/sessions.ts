import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Exercise,
  Session
} from "@drum-scheduler/contracts";
import { ApiClient } from "./api-client";

export const sessionsQueryKeys = {
  all: ["sessions"] as const,
  byId: (sessionId: number) => ["sessions", sessionId] as const,
};

export type CreateSessionResponse = { id: number };

export type SessionWithExercises = Session & {
  totalDuration: number;
  exercises: Exercise[];
};

export const fetchSessions = async (baseUrl: string) => {
  const apiClient = new ApiClient(baseUrl);
  const result = await apiClient.get<Session[]>("/sessions");

  if ("error" in result) {
    throw new Error(result.error.message);
  }

  // In case the server returns an empty body for a GET, keep a stable shape.
  return result.data ?? [];
};

export const fetchSessionById = async (baseUrl: string, sessionId: number) => {
  const apiClient = new ApiClient(baseUrl);
  const result = await apiClient.get<SessionWithExercises>(`/sessions/${sessionId}`);
  
  if ("error" in result) {
    throw new Error(result.error.message);
  }

  if (result.data == null) {
    throw new Error("Empty response");
  }

  return result.data;
};



export function useSessionsQuery(
  baseUrl: string,
  options?: { initialData?: Session[]; refetchOnMount?: boolean }
) { 
  const result = useQuery({
    queryKey: sessionsQueryKeys.all,
    queryFn: () => fetchSessions(baseUrl),
    initialData: options?.initialData,
    refetchOnMount: options?.refetchOnMount ?? true,
  });

  return result;
}

export function useSessionQuery(
  baseUrl: string,
  sessionId: number,
  options?: { initialData?: SessionWithExercises; refetchOnMount?: boolean }
) {
  const result = useQuery({
    queryKey: sessionsQueryKeys.byId(sessionId),
    queryFn: () => fetchSessionById(baseUrl, sessionId),
    initialData: options?.initialData,
    refetchOnMount: options?.refetchOnMount ?? true,
  });

  return result;
}

export type SessionExercisesOrderInput = {
  exercises: Exercise[];
};

export const reorderSessionExercises = async (
  baseUrl: string,
  sessionId: number,
  exercises: SessionExercisesOrderInput
) => {
  const apiClient = new ApiClient(baseUrl);
  const result = await apiClient.patch<null>(
    `/sessions/${sessionId}/exercises-order`,
    exercises
  );
  
  if ("error" in result) {
    throw new Error(result.error.message);
  }
  
  return result.data;
};

export function useReorderSessionExercises(
  baseUrl: string,
  sessionId: number
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (exercises: Exercise[]) => 
      reorderSessionExercises(baseUrl, sessionId, { exercises }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionsQueryKeys.byId(sessionId),
      });
    },
  });
}

export const removeExerciseFromSession = async (
  baseUrl: string,
  sessionId: number,
  exerciseId: number
) => {
  const apiClient = new ApiClient(baseUrl);
  const result = await apiClient.delete<null>(
    `/sessions/${sessionId}/exercises/${exerciseId}`
  );
  
  if ("error" in result) {
    throw new Error(result.error.message);
  }
  
  return result.data;
};

export function useRemoveExerciseFromSession(
  baseUrl: string,
  sessionId: number
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (exerciseId: number) => 
      removeExerciseFromSession(baseUrl, sessionId, exerciseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionsQueryKeys.byId(sessionId),
      });
    },
  });
}
export const deleteSession = async (
  baseUrl: string,
  sessionId: number
) => {
  const apiClient = new ApiClient(baseUrl);
  const result = await apiClient.delete<null>(`/sessions/${sessionId}`);
  
  if ("error" in result) {
    throw new Error(result.error.message);
  }
  
  return result.data;
};

export function useDeleteSession(baseUrl: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (sessionId: number) => 
      deleteSession(baseUrl, sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionsQueryKeys.all,
      });
    },
  });
}

export const createSession = async <T extends { name: string; notes: string | null }>(
  baseUrl: string,
  session: T
) => {
  const apiClient = new ApiClient(baseUrl);
  const result = await apiClient.post<CreateSessionResponse>("/sessions", session);
  
  if ("error" in result) {
    throw new Error(result.error.message);
  }
  
  return result;
};

export function useCreateSession<T extends { name: string; notes: string | null }>(baseUrl: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (session: T) => createSession(baseUrl, session),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionsQueryKeys.all,
      });
    },
  });
}

export const addExerciseToSession = async (
  baseUrl: string,
  sessionId: number,
  exerciseId: string
) => {
  const apiClient = new ApiClient(baseUrl);
  const result = await apiClient.post<SessionWithExercises>(
    `/sessions/${sessionId}/exercises/${exerciseId}`,
    {}
  );
  
  if ("error" in result) {
    throw new Error(result.error.message);
  }
  
  return result;
};

export function useAddExerciseToSession(
  baseUrl: string,
  sessionId: number
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (exerciseId: string) => 
      addExerciseToSession(baseUrl, sessionId, exerciseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionsQueryKeys.byId(sessionId),
      });
    },
  });
}