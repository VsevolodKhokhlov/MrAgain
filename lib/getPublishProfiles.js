const Axios = require("axios");
const { API_PATH } = require("../constants");

const fs = require("fs-extra");
const getPathsObject = require("../scripts/getPathsObject");
const formatDate = require("../scripts/formatDate");

// ROBOTS.txt
const robotsTxt = `User-agent: *
Sitemap: https://www.mragain.nl/sitemap_local.xml
Disallow:`;

fs.writeFileSync("public/robots.txt", robotsTxt);

export async function getPublishProfies() {
  const result = await Axios.get(`${API_PATH.GETSHOPPUBLISHPROFILE}`);

  // SITEMAP.XML
  const pathsObj = getPathsObject();
  const today = formatDate(new Date());

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${Object.keys(pathsObj)
      .filter(
        (path) =>
          path !== "/_document" &&
          path !== "/_app" &&
          path.includes("[") !== true
      )

      .map(
        (path) => `<url>
      ${
        path === "/index"
          ? `<loc>https://www.mragain.nl</loc>`
          : `<loc>https://www.mragain.nl${path}</loc>`
      }
      <lastmod>${
        pathsObj[path].lastModified
          ? formatDate(new Date(pathsObj[path].lastModified))
          : today
      }</lastmod>
    </url>`
      )}
      ,
    ${result.data.urls.map(
      (profiles) => `<url>
        ${`<loc>${profiles}</loc>`}
        <lastmod>${today}</lastmod>
      </url>`
    )}
  </urlset>`;
  fs.writeFileSync("public/sitemap_local.xml", sitemapXml);
}
