import { resourceGuides } from "@/lib/resources";

export const dynamic = "force-static";

const siteUrl = "https://www.myacademictutor.com";

const staticRoutes = [
  "",
  "/about",
  "/faq",
  "/contact",
  "/courses",
  "/learning-hub",
  "/learning-hub/statistics",
  "/learning-hub/mathematics",
  "/learning-hub/data-science",
  "/learning-hub/biostatistics",
  "/learning-hub/bioinformatics",
  "/learning-hub/research-methods",
  "/resources",
  "/interactive-demos",
  "/privacy",
  "/cookies",
  "/terms-and-conditions",
  "/academic-integrity",
  "/certificate-policy",
  "/courses/statistics-foundation",
  "/courses/statistics-foundation/modules/introduction-to-statistical-thinking",
  "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics",
  "/courses/machine-learning-biostatistics",
  "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const today = new Date().toISOString();

  const resourceRoutes = resourceGuides.map(
    (guide) => `/resources/${guide.slug}`
  );

  const allRoutes = Array.from(new Set([...staticRoutes, ...resourceRoutes]));

  const urls = allRoutes
    .map((route) => {
      const url = `${siteUrl}${route || "/"}`;

      const priority =
        route === ""
          ? "1.0"
          : route === "/learning-hub" ||
              route === "/courses" ||
              route === "/resources"
            ? "0.9"
            : route.startsWith("/learning-hub/")
              ? "0.75"
              : route.startsWith("/resources/")
                ? "0.65"
                : "0.7";

      const changeFrequency =
        route === "" || route === "/resources" || route === "/learning-hub"
          ? "weekly"
          : "monthly";

      return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
