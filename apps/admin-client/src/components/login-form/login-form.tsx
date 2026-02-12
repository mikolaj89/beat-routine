"use client";

import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLogin } from "../../../../../packages/sdk/src/sessions";
import { styles } from "./login-form.styles";
import { LoginFormData, LoginFormSchema } from "./login-form.utils";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const { mutate: login, isPending } = useLogin("http://localhost:8000");

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <Stack sx={styles.content} spacing={2}>
      <Box>
        <Typography variant="h1" sx={styles.title}>
          Sign In
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter your credentials to sign in.
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            required
            {...register("email", { required: "Email is required" })}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            required
            {...register("password", { required: "Password is required" })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            fullWidth
            sx={{ py: 1.2 }}
          >
            {isPending ? (
              <CircularProgress size={22} sx={{ color: "white" }} />
            ) : (
              "Sign in"
            )}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};
