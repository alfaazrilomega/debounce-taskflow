import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  allowedDevOrigins: ['app.taskflow.test', 'taskflow.test', 'localhost:3000', 'localhost:3001', '127.0.0.1:3000', '127.0.0.1:3001'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
      allowedOrigins: ['app.taskflow.test', 'taskflow.test', 'localhost:3000', 'localhost:3001', '127.0.0.1:3000', '127.0.0.1:3001'],
    },
  },
};

export default nextConfig;
