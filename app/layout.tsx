import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import SuppressAntdWarning from '@/components/utils/SuppressAntdWarning';
import "./globals.css";

export const metadata: Metadata = {
  title: "SME Content",
  description: "Content Writing with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SuppressAntdWarning />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
