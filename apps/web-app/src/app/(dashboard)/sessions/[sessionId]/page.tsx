import { SessionDetails } from "@/components/session/session-details";
import { Box, Typography } from "@mui/material";
import { fetchSessionById, SessionWithExercises } from "@drum-scheduler/sdk";
import { API_BASE_URL } from "@/config/globals";

type PageProps = {
  params: Promise<{
    sessionId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { sessionId } = await params;
  let data: SessionWithExercises | null = null;
  try {
    data = await fetchSessionById(API_BASE_URL, parseInt(sessionId));
  } catch (error) {
    return (
      <Box>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </Box>
    );
  }
  if (data === null) {
    return <Box>No session found</Box>;
  }

  return (
    <>
      <Typography variant="h1">{data.name}</Typography>
      <SessionDetails sessionData={data} />
    </>
  );
}
