import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
      allowedOrigins: ['app.taskflow.test', 'localhost:3000', 'localhost:3001', '127.0.0.1:3000', '127.0.0.1:3001'],
    },
  },
};

export default nextConfig;
