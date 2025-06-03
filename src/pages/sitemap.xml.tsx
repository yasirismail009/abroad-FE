import { GetServerSideProps } from 'next';

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://globalscholarships.com';

interface Scholarship {
  id: number;
  updatedAt: string;
}

interface NewsArticle {
  slug: string;
  updatedAt: string;
}

function generateSiteMap(scholarships: Scholarship[], news: NewsArticle[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static Pages -->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/about</loc>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/contact</loc>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/privacy-policy</loc>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/terms</loc>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/cookies</loc>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
     
     <!-- Scholarship Pages -->
     ${scholarships
       .map((scholarship) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/scholarships/${scholarship.id}`}</loc>
           <lastmod>${scholarship.updatedAt}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.9</priority>
       </url>
     `;
       })
       .join('')}
     
     <!-- News Pages -->
     ${news
       .map((article) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/news/${article.slug}`}</loc>
           <lastmod>${article.updatedAt}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will handle the XML generation
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Fetch scholarships and news data from your API
  const scholarships = await fetch(`${EXTERNAL_DATA_URL}/api/scholarships`).then((res) => res.json());
  const news = await fetch(`${EXTERNAL_DATA_URL}/api/news`).then((res) => res.json());

  // Generate the XML sitemap
  const sitemap = generateSiteMap(scholarships, news);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap; 