import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pino', 'pino-pretty'], // Add the packages you want to use in the server environment
  reactCompiler: true, // This requires the package you just installed
  // ... other config
  allowedDevOrigins: ["192.168.31.125"],
};

export default nextConfig;
