
import { SessionsList } from "@/components/Session/SessionsList";
import { Typography } from "@mui/material";
import { CreateSession } from "@/components/Session/CreateSession";
import { fetchSessions } from "@drum-scheduler/sdk";

export default async function Page() {
  const data = await fetchSessions("http://localhost:8000");

  return (
    <>
      <Typography variant="h1">Sessions</Typography>
      <CreateSession />
      <SessionsList sessionsData={data} />
    </>
  );
}
