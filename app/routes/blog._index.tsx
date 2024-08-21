// routes/index.jsx
import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { getAllPosts } from '~/utils/blogposts.server';
import BlogPostList from "~/components/BlogPosts";

const BASE_URL = 'https://jellekralt.com'

export const meta: MetaFunction = () => {
  return [
    { title: "Blog - Jelle Kralt" },
    { name: "description", content: "All blogposts written and published by Jelle Kralt" },
    { name: "canonical", content: `${BASE_URL}/blog` },
  ];
};

export const loader = async () => {
  const posts = getAllPosts();
  return json({ posts });
};

export default function Index() {
  const { posts } = useLoaderData();

  return (
    <div>
      <h1 className="">All Blog Posts</h1>
      <p>Even though my last blogpost has been written quite a while ago, I'm keeping them here for archival purposes.</p>
      <BlogPostList posts={posts} />
    </div>
  );
}