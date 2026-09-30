import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server also needs to accept the loopback IP used in the browser.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
