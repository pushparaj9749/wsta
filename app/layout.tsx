import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WSTA — Instagram jaisa platform",
  description: "WSTA - photo sharing platform. Compress + Cloud storage, 200 budget me.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">{children}</body>
    </html>
  );
}
