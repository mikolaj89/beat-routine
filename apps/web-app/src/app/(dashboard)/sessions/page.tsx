import { SessionsList } from "@/components/session/sessions-list";
import { Typography } from "@mui/material";
import { CreateSession } from "@/components/session/create-session";
import { fetchSessions } from "@drum-scheduler/sdk";
import { Suspense } from "react";
import Loading from "./loading";

async function SessionsData() {
  const data = await fetchSessions("http://localhost:8000");
  return <SessionsList sessionsData={data} />;
}

export default function Page() {
  return (
    <>
      <Typography variant="h1">Sessions</Typography>
      <CreateSession />
      <Suspense fallback={<Loading />}>
        <SessionsData />
      </Suspense>
    </>
  );
}
