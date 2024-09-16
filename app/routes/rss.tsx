import { getAllPosts } from '~/utils/blogposts.server';
import { format } from "date-fns";

const BASE_URL = 'https://jellekralt.com';

// Function to generate the RSS feed
function toXmlRSS(posts) {
  const itemsAsXml = posts.map(post => {
    const pubDate = new Date(post.date).toUTCString();
    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <description><![CDATA[${post.description || ""}]]></description>
        <link>${BASE_URL}/${post.date.split('-').join('/')}/${post.slug}</link>
        <guid isPermaLink="false">${BASE_URL}/${post.date.split('-').join('/')}/${post.slug}</guid>
        <dc:creator><![CDATA[Jelle Kralt]]></dc:creator>
        <pubDate>${pubDate}</pubDate>
        <content:encoded><![CDATA[${post.htmlContent || ""}]]></content:encoded>
      </item>
    `;
  }).join('\n');

  return `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" 
         xmlns:content="http://purl.org/rss/1.0/modules/content/" 
         xmlns:atom="http://www.w3.org/2005/Atom" 
         version="2.0" 
         xmlns:media="http://search.yahoo.com/mrss/">
      <channel>
        <title><![CDATA[JelleKralt.com]]></title>
        <description><![CDATA[Personal blog of Jelle Kralt, Front End Engineer. I love JavaScript, AngularJS, and Node.js.]]></description>
        <link>${BASE_URL}</link>
        <generator>Remix RSS Generator</generator>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${BASE_URL}/rss" rel="self" type="application/rss+xml" />
        <ttl>60</ttl>
        ${itemsAsXml}
      </channel>
    </rss>
  `;
}

export const loader = async () => {
  try {
    const blogPosts = await getAllPosts(); // Fetch blog posts from the server

    const rss = toXmlRSS(blogPosts);

    return new Response(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=UTF-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (e) {
    return new Response('Internal Server Error', { status: 500 });
  }
};