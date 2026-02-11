import type { PropsWithChildren } from "react";
import { DashboardLayout } from "../../components/layout/DashoardLayout";

export default function DashboardGroupLayout({ children }: PropsWithChildren) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
