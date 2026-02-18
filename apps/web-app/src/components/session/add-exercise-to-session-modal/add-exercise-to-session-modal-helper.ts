import { useAddExerciseToSession as useAddExerciseToSessionSDK, useCategoryExercisesQuery as useCategoryExercisesQuerySDK } from "@drum-scheduler/sdk";
import { API_BASE_URL } from "@/config/globals";

export const useAddExerciseToSession = (
  sessionId: number,
  exerciseId: string,
  onSuccess: (id: number) => void
) => {
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

export const useCategoryExercisesQuery = (categoryId: string) => {
  return useCategoryExercisesQuerySDK(
    API_BASE_URL,
    categoryId,
    { enabled: !!categoryId }
  );
};
