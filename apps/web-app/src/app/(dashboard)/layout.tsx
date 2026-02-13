import type { PropsWithChildren } from "react";
import { DashboardLayout } from "../../components/layout/dashoard-layout";

export default function DashboardGroupLayout({ children }: PropsWithChildren) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
