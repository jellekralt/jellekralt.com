// routes/index.jsx
import { json, useLoaderData } from "@remix-run/react";
import { getAllPosts } from '~/utils/blogposts.server';
import BlogPostList from "~/components/BlogPosts";

export const loader = async () => {
  const posts = getAllPosts();
  return json({ posts });
};

export default function Index() {
  const { posts } = useLoaderData();
  console.log(posts)

  return (
    <div>
      <h1 className="">Latest Blog Posts</h1>
      <p>Even though my last blogpost has been written quite a while ago, I'm keeping them here for archival purposes.</p>
      <BlogPostList posts={posts} />
    </div>
  );
}