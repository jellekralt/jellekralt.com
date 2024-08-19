import { Link } from '@remix-run/react';
import { PostMetaData } from '~/utils/blogposts.server';

interface BlogPostListProps {
  posts: PostMetaData[];
  limit?: number;
  tag?: string;
}

function BlogPostList({ posts, limit, tag }: BlogPostListProps) {
  return (
    <div>
      <span className="block">$ tree blog/ {limit && `--filelimit ${limit}`} {tag && `xargs grep -l "#${tag}"`}</span>
      <ul className="list-none pl-1 mx-0 mt-0">
        {posts.map((post, index) => {
          const isLast = index === posts.length - 1;
          return (
            <li
              key={post.slug}
              className={`after:content-[''] pl-0 pt-2 before:content-[''] before:absolute before:top before:left before:block ${!isLast ? 'before:h-full': 'before:h-[10px]'} before:border-l-[1.5px] before:border-[color:var(--font-color)]`}
            >
              <div className="flex items-top">
                <span
                  className={`inline-block flex-none w-6 mt-[10px] h-[1.5px] bg-[color:var(--font-color)]`}
                ></span>
                <Link
                  to={`/${post.date.split('-').join('/')}/${post.slug}`}
                  className="ml-3"
                >
                  {post.date} - {post.title}.md
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      {(limit || tag) && (
        <p>&gt; <Link to="/blog">View All Blogposts</Link></p>
      )}
    </div>
  );
}

export default BlogPostList;