import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@prisma/client",
    ".prisma/client",
    "pg-cloudflare",
  ],
};

initOpenNextCloudflareForDev();

export default nextConfig;
