import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

// Define a type for the blog post metadata
export interface PostMetaData {
  title: string;
  description: string;
  date: string;
  slug: string;
}

export interface Post extends PostMetaData {
  content: string;
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory);

  const allPosts = files.filter(filename => path.extname(filename) === '.md').map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract date and slug from the filename
    const [datePart, ...slugParts] = filename.replace(/\.md$/, '').split('_');
    const slug = slugParts.join('_');
    const [year, month, day] = datePart.split('-');
    const date = `${year}-${month}-${day}`;

    return {
      slug,
      date,
      content,
      ...data,
    } as Post;
  });

  // Sort posts by date in descending order
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}