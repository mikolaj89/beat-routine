import { SessionsList } from "@/components/session/sessions-list";
import { Typography } from "@mui/material";
import { CreateSession } from "@/components/session/create-session";
import { Suspense } from "react";
import Loading from "./loading";

export default function Page() {
  return (
    <>
      <Typography variant="h1">Sessions</Typography>
      <CreateSession />
      <Suspense fallback={<Loading />}>
        <SessionsList />
      </Suspense>
    </>
  );
}
