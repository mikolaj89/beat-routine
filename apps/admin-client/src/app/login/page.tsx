"use client";

import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLogin } from "../../../../../packages/sdk/src/sessions";

type LoginResponse = {
  accessToken: string;
  user: { id: string; accountId: string; role: string };
};

type ErrorResponse = {
  error?: { message?: string; errorCode?: string };
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, error, isPending } = useLogin("http://localhost:8000");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: "100%" }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h1">Admin login</Typography>
            <Typography variant="body1" color="text.secondary">
              Use your admin credentials to sign in.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
                required
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

          {/* {error && <Alert severity="error">{error}</Alert>}

          {result && (
            <Alert severity="success">
              Signed in as {result.user.role} (user id: {result.user.id}).
            </Alert>
          )} */}
        </Stack>
      </Paper>
    </Box>
  );
}
