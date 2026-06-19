import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // This requires the package you just installed
  // ... other config
  allowedDevOrigins: ["192.168.31.125"],
};

export default nextConfig;
