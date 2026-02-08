import { fetchCategoryExercises } from "@/utils/exercises-api";
import { useQuery } from "@tanstack/react-query";
import { useAddExerciseToSession as useAddExerciseToSessionSDK } from "@drum-scheduler/sdk";

export const useAddExerciseToSession = (
  sessionId: number,
  exerciseId: string,
  onSuccess: (id: number) => void
) => {
  const API_BASE_URL = "http://localhost:8000";
  const mutation = useAddExerciseToSessionSDK(API_BASE_URL, sessionId);
  
  return {
    ...mutation,
    mutate: () => {
      if (!sessionId || !exerciseId) {
        throw new Error("Both sessionId and exerciseId are required.");
      }
      mutation.mutate(exerciseId, {
        onSuccess: () => onSuccess(sessionId),
      });
    },
  };
};

export const useCategoryExercisesQuery = (categoryId: string) =>
  useQuery({
    queryKey: ["categoryExercises", categoryId],
    queryFn: async () => {
      if (!categoryId) {
        return [];
      }
      const result = await fetchCategoryExercises(categoryId);

      if ("error" in result) {
        throw new Error(result.error.message);
      }
      if (!result.data) {
        throw new Error("No data found");
      }
      return result.data;
    },
    enabled: !!categoryId,
    retry: false,
  });
