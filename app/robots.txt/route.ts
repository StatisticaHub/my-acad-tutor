const siteUrl = "https://myacademictutor.com";

export const dynamic = "force-static";

export function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
