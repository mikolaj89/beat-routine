"use client";

import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { DashboardLayout } from "./DashoardLayout";

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  if (pathname?.startsWith("/login")) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
