import { NextConfig } from "next";

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  images: {
    domains: ["hyljuqtnwpxbyfcxmswf.supabase.co"], // <-- add your Supabase host here
  },
};

export default nextConfig;
