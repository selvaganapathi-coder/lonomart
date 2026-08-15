"use client";

import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

const theme = {
  token: {
    colorPrimary: "#1677ff",
    borderRadius: 8,
  },
};

export function AppProviders({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
