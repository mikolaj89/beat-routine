"use client";

import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLogin } from "../../../../../packages/sdk/src/sessions";
import { LOGIN_BOX_WIDTH, styles } from "./page.styles";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, error, isPending } = useLogin("http://localhost:8000");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <Box sx={styles.page}>
      <Paper sx={{ p: 4, maxWidth: LOGIN_BOX_WIDTH, width: "100%" }}>
        <Stack width={"100%"} spacing={2}>
          <Box>
            <Typography variant="h1">Sign In</Typography>
            <Typography variant="body1" color="text.secondary">
              Enter your credentials to sign in.
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
