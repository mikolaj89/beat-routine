"use client";

import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { DashboardLayout } from "./dashoard-layout";

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  if (pathname?.startsWith("/login")) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
