import type { Metadata } from "next";
import { DashboardLayout } from "../components/layout/DashoardLayout";

export const metadata: Metadata = {
  title: "Drum session scheduler app",
  description: "Drum session scheduler app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <DashboardLayout>
        {children}
      </DashboardLayout>
      </body>
    </html>
  );
}
