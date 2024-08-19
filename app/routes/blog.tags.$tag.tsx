// routes/index.jsx
import { json, useLoaderData } from "@remix-run/react";
import { getAllPosts } from '~/utils/blogposts.server';
import BlogPostList from "~/components/BlogPosts";

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