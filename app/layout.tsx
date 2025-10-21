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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const originalWarn = console.warn;
                const originalError = console.error;
                
                console.warn = function(...args) {
                  const message = String(args[0] || '');
                  if (
                    message.includes('[antd: compatible]') ||
                    message.includes('antd v5 support React') ||
                    message.includes('see https://u.ant.design/v5-for-19')
                  ) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };
                
                console.error = function(...args) {
                  const message = String(args[0] || '');
                  if (
                    message.includes('[antd: compatible]') ||
                    message.includes('antd v5 support React') ||
                    message.includes('see https://u.ant.design/v5-for-19')
                  ) {
                    return;
                  }
                  originalError.apply(console, args);
                };
              })();
            `,
          }}
        />
      </head>
      <body>
        <SuppressAntdWarning />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
