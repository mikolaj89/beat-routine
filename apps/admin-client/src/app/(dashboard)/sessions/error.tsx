"use client";

import { Box, Button, Stack, Typography } from "@mui/material";

export default function SessionsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box sx={{ py: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h1">Sessions</Typography>
        <Typography variant="h2" color="error">
          Failed to load sessions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {error.message || "Something went wrong while fetching sessions."}
        </Typography>
        <Box>
          <Button variant="contained" onClick={reset}>
            Try again
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
