import "./globals.css";
import "reactflow/dist/base.css";
import "reactflow/dist/style.css";
import type { Metadata, Viewport } from "next";
import Metrics from "@/metrics";

export const metadata: Metadata = {
  title: "Sync-D",
  description: "실시간 아이디어 기획 플랫폼",
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
      <Metrics />
    </html>
  );
}
