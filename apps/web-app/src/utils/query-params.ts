export const buildExercisesQueryParams = (
  filters: { name: string | null; categoryId: string | null }
): string => {
  const params = new URLSearchParams();
  if (filters.name) {
    params.set("name", filters.name);
  }
  if (filters.categoryId) {
    params.set("categoryId", filters.categoryId);
  }
  return params.toString() ? `?${params.toString()}` : "";
};
