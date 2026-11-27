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
  async redirects() {
    // Old copies of the policies. The current ones are code pages
    // (app/(default)/privacy-policy, terms-of-use).
    return [
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-of-use", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/j/:path*",
          destination: `${backendOrigin}/j/:path*`,
        },
        {
          source: "/play/:path*",
          destination: `${backendOrigin}/play/:path*`,
        },
        {
          source: "/app/:path*",
          destination: `${backendOrigin}/app/:path*`,
        },
        {
          source: "/get",
          destination: `${backendOrigin}/get`,
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
