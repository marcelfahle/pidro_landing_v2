/** @type {import('next').NextConfig} */
const backendOrigin = (
  process.env.PIDRO_BACKEND_ORIGIN || "https://app.pidro.online"
).replace(/\/$/, "");

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
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/j/:path*",
          destination: `${backendOrigin}/j/:path*`,
        },
        {
          source: "/.well-known/:path*",
          destination: `${backendOrigin}/.well-known/:path*`,
        },
        {
          source: "/apple-app-site-association",
          destination: `${backendOrigin}/apple-app-site-association`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

module.exports = nextConfig;
