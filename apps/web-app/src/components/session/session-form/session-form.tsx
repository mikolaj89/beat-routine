"use client";

import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SessionFormData, sessionSchema } from "./session-form-helper";
import { useRouter } from "next/navigation";
import { FormError } from "@/components/common/typography";
import { useCreateSession } from "@drum-scheduler/sdk";
import { API_BASE_URL } from "@/config/globals";
import { useAuth } from "@/providers/auth-provider";

export const SessionForm = () => {
  const { push } = useRouter();
  const { accessToken } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // @ts-expect-error - zodResolver type inference issue with react-hook-form
    resolver: zodResolver(sessionSchema),
  });
  const { error, mutate, isPending } = useCreateSession(API_BASE_URL, {
    accessToken,
  });

  const onSubmit = (data: SessionFormData) => {
    mutate(data, {
      onSuccess: (result) => {
        if ("data" in result) {
          push(`/sessions/${result.data?.id}`);
        }
      },
      onError: (error) => {
        console.error("Error creating session:", error);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {error && <FormError error>{error.message}</FormError>}

      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        disabled={isPending}
      />
      <TextField
        label="Notes"
        {...register("notes")}
        error={!!errors.notes}
        helperText={errors.notes?.message}
        disabled={isPending}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={isPending}
      >
        {isPending ? <CircularProgress size={24} /> : "Add Exercise"}
      </Button>
    </form>
  );
};
