/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  ...(process.platform === "android" ? { experimental: { useWasmBinary: true } } : {}),
  async headers() {
    return [{ source: "/img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }] }];
  },
};
export default nextConfig;
