export const dynamic = "force-static";

const siteUrl = "https://www.myacademictutor.com";

export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
