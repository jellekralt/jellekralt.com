import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Link, useLoaderData } from '@remix-run/react';
import type { MetaFunction } from "@remix-run/node";
import hljs from "highlight.js";
import { formatDate } from '~/utils/datetime';
import { useEffect } from 'react';

const BASE_URL = 'https://jellekralt.com'

export const meta: MetaFunction<typeof loader> = ({
  data,
  matches,
  params
}) => {
  const { year, month, day, slug } = params;

  return [
    { title: data.data.title + ' - Jelle Kralt' },
    { name: "description", content: generateMetaDescription((data?.htmlContent)) },
    { tagName: "link", rel: "canonical", href: `${BASE_URL}/${year}/${month}/${day}/${slug}` }

  ];
};

export async function loader({ params }) {
  const { year, month, day, slug } = params;

  const filePath = path.join('posts', `${year}-${month}-${day}_${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(fileContents);
  const result = await remark().use(html).process(content);
  const htmlContent = result.toString();
  const date = Date.parse(`${year}-${month}-${day}`);

  return { htmlContent, data, date };
}

export default function BlogPost() {
  const { htmlContent, data, date } = useLoaderData();
  let tags = data.tags.split(',');

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      if (!block.hasAttribute('data-highlighted')) {
        hljs.highlightElement(block as HTMLElement);
        block.setAttribute('data-highlighted', 'yes');
      }
    });
  }, []);

  return (
    <article>
      <h1>{data.title}</h1>
      <p>&gt; By <strong>{data.author}</strong> on <strong>{date && formatDate(date)}</strong> </p>
      <p>
        {tags.map((tag, index) => (
          <span key={index} className="inline-block bg-[color:var(--primary-color)] text-sm font-semibold mr-2 mb-2 px-3 py-1 rounded">
            <Link to={`/blog/tags/${tag.trim()}`} className="text-[color:var(--invert-font-color)] ">
              #{tag.trim()}
            </Link>
          </span>
        ))}
      </p>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </article>
  );
}

function generateMetaDescription(content) {
  if (content) {
    const text = content.replace(/<[^>]+>/g, ''); // Strip out any HTML tags
    return text.slice(0, 160).trim() + '...'; // Trim to 160 characters and add ellipsis
  } else {
    return '';
  }
}
