// routes/index.jsx
import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { getAllPosts } from '~/utils/blogposts.server';
import BlogPostList from "~/components/BlogPosts";

const BASE_URL = 'https://jellekralt.com'

export const meta: MetaFunction = ({params}) => {
  return [
    { title: `Blogposts tagged with  #${params.tag} - Jelle Kralt` },
    { name: "description", content: `All blogposts tagged with #${params.tag}` },
    { tagName: "link", rel: "canonical", href: `${BASE_URL}/blog/tags/${params.tag}` },
  ];
};

export async function loader({ params }) {
  const { tag } = params;
  const posts = getAllPosts().filter((post) => {
    return post.tags.split(',').includes(tag);
  });
  return json({ posts, tag });
};

export default function Index() {
  const { posts, tag } = useLoaderData();

  return (
    <div>
      <h1 className="">Blog Posts Tagged With #{tag}</h1>
      <BlogPostList posts={posts} tag={tag} />
    </div>
  );
}