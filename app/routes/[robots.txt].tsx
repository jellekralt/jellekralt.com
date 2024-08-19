import { getAllPosts } from '~/utils/blogposts.server';

const BASE_URL = 'https://jellekralt.com'

export const loader = async () => {
  try {
    
    const robotText = `
User-agent: *
Disallow: 
Sitemap: ${BASE_URL}/sitemap.xml`

    return new Response(robotText, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (e) {
    throw new Response('Internal Server Error', { status: 500 })
  }
}