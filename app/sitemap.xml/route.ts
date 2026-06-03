const siteUrl = "https://myacademictutor.com";

const routes = [
  "",
  "/start-here",
  "/learning-hub",
  "/courses",
  "/courses/statistics-foundation",
  "/courses/machine-learning-biostatistics",
  "/resources",
  "/interactive-demos",
  "/services",
  "/pricing",
  "/dashboard",
  "/about",
  "/contact",
  "/academic-integrity",
];

export const dynamic = "force-static";

export function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    return `  <url>
    <loc>${siteUrl}${route}/</loc>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
