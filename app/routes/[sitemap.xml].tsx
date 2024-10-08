import { getAllPosts } from '~/utils/blogposts.server';
import { navigationItems } from "~/config/navigation";

const BASE_URL = 'https://jellekralt.com'

function toXmlSitemap(urls) {
  const urlsAsXml= urls.map(url => `<url><loc>${url}</loc></url>`).join('\n')

  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${urlsAsXml}
    </urlset>
  `
}

export const loader = async () => {
  try {
    const blogPosts = getAllPosts();

    const staticUrls = navigationItems.map(page => `${BASE_URL}${page.path}`)

    // Dynamic URLs for blog posts
    const postUrls = blogPosts.map(
      ({ slug, date }) => {
        const [year, month, day] = date.split('-');
        return `${BASE_URL}/${year}/${month}/${day}/${slug}`
      }
    );

    // Extract unique tags from all blog posts
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.split(',').forEach(tag => {
        tags.add(tag.trim().toLowerCase());
      });
    });

    // Generate URLs for each tag
    const tagUrls = Array.from(tags).map(tag => `${BASE_URL}/blog/tags/${encodeURIComponent(tag)}`);
    

    // Combine all URLs
    const urls = [...staticUrls, ...tagUrls, ...postUrls];

    const sitemap = toXmlSitemap(urls);

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (e) {
    throw new Response('Internal Server Error', { status: 500 })
  }
}