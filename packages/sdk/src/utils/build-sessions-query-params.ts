const buildSessionsQueryParams = (query?: string | null): string => {
  const params = new URLSearchParams();
  if (query) {
    params.set("query", query);
  }
  return params.toString() ? `?${params.toString()}` : "";
};

export default buildSessionsQueryParams;