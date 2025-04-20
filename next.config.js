/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "s3-eu-west-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
