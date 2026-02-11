"use client";

import type { PropsWithChildren } from "react";
import { ReactQueryProvider } from "../../providers/ReactQueryProvider";

export default function LoginLayout({ children }: PropsWithChildren) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
