import type { NextConfig } from "next";

// Supabase origin is taken from the public env var; empty if not set yet.
function supabaseOrigins(): { https: string; wss: string } {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!raw) return { https: "", wss: "" };
  try {
    const u = new URL(raw);
    return { https: u.origin, wss: `wss://${u.host}` };
  } catch {
    return { https: "", wss: "" };
  }
}

const sb = supabaseOrigins();

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${sb.https}`.trim(),
  `connect-src 'self' ${sb.https} ${sb.wss}`.trim(),
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
