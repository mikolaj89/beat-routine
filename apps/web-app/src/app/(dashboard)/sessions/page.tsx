import { SessionsList } from "@/components/session/sessions-list";
import { Typography } from "@mui/material";
import { CreateSession } from "@/components/session/create-session";
import { fetchSessions } from "@drum-scheduler/sdk";
import { Suspense } from "react";
import Loading from "./loading";
import { API_BASE_URL } from "@/config/globals";

async function SessionsData() {
  const data = await fetchSessions(API_BASE_URL);
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
