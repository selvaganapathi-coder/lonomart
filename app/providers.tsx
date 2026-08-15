"use client";

import { ConfigProvider, theme } from "antd";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#2563eb",
          borderRadius: 10,
          fontFamily: "var(--font-geist-sans)",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
