import type { MetaFunction } from "@remix-run/node";
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import BlogPostList from '~/components/BlogPosts';
import { getAllPosts, PostMetaData } from '~/utils/blogposts.server';
// import { GithubIcon, LinkedinBoxIcon, KeyIcon } from '@remixicons/react/fill'

const BASE_URL = 'https://jellekralt.com'

export const meta: MetaFunction = () => {
  return [
    { title: "Jelle Kralt - Personal Homepage & Blog" },
    { name: "description", content: "Jelle Kralt is a Technical Director and Innovator with expertise in web development, cloud computing, and cutting-edge technology. Explore insights, projects, and a blog focused on tech, innovation, and software engineering." },
    { tagName: "link", rel: "canonical", href: `${BASE_URL}/` },
    { tagName: "link", rel: "alternate", type: "application/rss+xml", title: "RSS Feed", href: "/rss" },
  ];
};

export const loader: LoaderFunction = async () => {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 5); // Get the latest 5 posts
  return json({ latestPosts });
};

export default function Index() {
  const { latestPosts } = useLoaderData<{ latestPosts: PostMetaData[] }>();
  return (
    <div>
      <section>
        <h1>Hi there, and welcome to my personal spot on the web!</h1> 
        <p>
          I'm Jelle Kralt, Managing Director and Partner at <a href="http://www.lemonshark.nl" target="_blank" rel="noreferrer">Lemonshark Amsterdam</a>.
          I'm crazy about cyber security, technology and innovation, and with a background in software engineering, I still ❤️ everything to do with JavaScript, both in the browser and on the server.
        </p> 
        <p>
          {/* <span>Find me on </span> <span><a className="inline-block" target="_blank" rel="noreferrer" href="https://github.com/jellekralt" title="Github"><i><GithubIcon className="h-7 w-7 inline-block"/><span className="hidden">Github</span></i></a>, </span>
          <span><a className="inline-block" target="_blank" rel="noreferrer" href="http://nl.linkedin.com/in/jellekralt" title="LinkedIn"><i><LinkedinBoxIcon className="h-7 w-7 inline-block"/><span className="hidden">LinkedIn</span></i></a>, </span>
          <span>and </span>
          <span><a className="inline-block" target="_blank" rel="noreferrer" href="https://keybase.io/jellekralt/" title="Keybase"><i><KeyIcon className="h-7 w-7 inline-block"/><span className="hidden">Keybase</span></i></a></span> */}
        </p>
      </section>

      <section>
        <h2>Blogposts</h2> 
        <p>Even though my last blogpost has been written quite a while ago, I'm keeping them here for archival purposes.</p>
      
        <BlogPostList posts={latestPosts} limit={5} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2>Links</h2>
          <nav>
            <ul>
              <li><a href="https://github.com/jellekralt" rel="noreferrer">GitHub</a></li>
              <li><a href="http://nl.linkedin.com/in/jellekralt" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://keybase.io/jellekralt/" rel="noreferrer">Keybase</a></li>
            </ul>
          </nav>
        </section>

        <section>
          <h2>License</h2>
          <p>
            All content by Jelle Kralt is under <a href="https://creativecommons.org/licenses/by-nc-sa/2.0/nl/deed.en" rel="noreferrer">creative commons</a> and code under <a href="https://jellekralt.mit-license.org/" rel="noreferrer">MIT license</a>.
          </p>
          <p>
            All code and content for this blog is available as open source on <a href="https://github.com/jellekralt/jellekralt.com/" rel="noreferrer">GitHub</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
