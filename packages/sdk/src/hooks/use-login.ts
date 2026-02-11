import { useMutation } from "@tanstack/react-query";
import type { UserInput } from "@drum-scheduler/contracts";
import { login } from "../api";

export function useLogin(baseUrl: string) {
  return useMutation({
    mutationFn: (credentials: UserInput) => login(credentials, baseUrl),
  });
}
