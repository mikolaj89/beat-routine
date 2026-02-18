import type { PropsWithChildren } from "react";
import { DashboardLayout } from "../../components/layout/dashoard-layout";
import { AuthProvider } from "@/providers/auth-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";

export default function DashboardGroupLayout({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
    <AuthProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthProvider>
    </ReactQueryProvider>
  );
}
