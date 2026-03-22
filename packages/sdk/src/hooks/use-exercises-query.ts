import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Exercise } from "@drum-scheduler/contracts";
import {
  buildExercisesQueryParams,
  exercisesQueryKeys,
  fetchExercises,
} from "../api";

export type ExercisesFilters = {
  name?: string | null;
  categoryId?: string | null;
};

export type UseExercisesQueryOptions = {
  debounceMs?: number;
  refetchOnMount?: boolean;
  initialData?: Exercise[] | null;
  enabled?: boolean;
};

const normalizeFilters = (filters: ExercisesFilters) => ({
  name: filters.name?.trim() ||  null,
  categoryId: filters.categoryId?.trim() || null,
});

export function useExercisesQuery(
  baseUrl: string,
  filters: ExercisesFilters,
  options?: UseExercisesQueryOptions,
) {
  const debounceMs = options?.debounceMs ?? 0;
  const normalizedFilters = normalizeFilters(filters);
  const [debouncedFilters, setDebouncedFilters] = useState(normalizedFilters);

  //when debounce is 0, debouncedFilters are not changed, thus fallback to normalizedFilters
  const resolvedFilters = debounceMs === 0 ? normalizedFilters : debouncedFilters;
  const queryString = buildExercisesQueryParams(resolvedFilters);

  useEffect(() => {
    
    if (debounceMs === 0) {
      return;
    }
    const next = normalizeFilters(filters);
    const timeoutId = setTimeout(() => {
      setDebouncedFilters(next);
    }, debounceMs);
    return () => clearTimeout(timeoutId);
  }, [debounceMs, filters.name, filters.categoryId]);

 

  return useQuery({
    queryKey: exercisesQueryKeys.filtered(resolvedFilters),
    queryFn: () => fetchExercises(baseUrl, queryString),
    refetchOnMount: options?.initialData
      ? false
      : (options?.refetchOnMount ?? true),
    initialData: options?.initialData ?? undefined,
    enabled: options?.enabled ?? true,
  });
}
