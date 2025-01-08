// app/routes/bio.tsx
import { MetaFunction } from "@remix-run/node";

const BASE_URL = 'https://jellekralt.com'

export const meta: MetaFunction = () => {
  return [
    { title: "Biography Jelle Kralt" },
    { name: "description", content: "Learn about Jelle Kralt, a seasoned Technical Director and Innovator with extensive experience in web development, cloud computing, and software engineering." },
    { tagName: "link", rel: "canonical", href: `${BASE_URL}/bio` },
  ];
};

export default function Bio() {
  return (
    <div>
      <h1>Jelle Kralt</h1>
      <img className="float-left w-1/4 mr-6 mb-4 object-cover" src="/jellekralt.png" alt="Portret of Jelle Kralt, smiling, posing for a gray background looking at the camera" />
      <p>
        Jelle Kralt is a Managing Director and Partner at Lemonshark Amsterdam, a cyber security firm dedicated to safeguarding businesses in an increasingly digital world. With a strong background in technology and innovation, Jelle brings over a decade of experience in technical leadership and software engineering to his role.
      </p>
      <p>
        Jelle has a proven track record of building and leading high-performing teams, driving innovation, and delivering scalable solutions across various domains, including web development, cloud computing, and cyber security. His deep expertise in modern technologies and his ability to navigate complex challenges make him a trusted advisor to clients and a respected leader in the industry.
      </p>
      <p>
        Prior to joining Lemonshark Amsterdam, Jelle served as Director of Technical Innovation at KLM, where he led groundbreaking projects in aviation technology, focusing on creating reliable and efficient solutions for a rapidly evolving industry.
      </p>
      <p>
        Beyond his professional work, Jelle is a passionate advocate for continuous learning and knowledge sharing. He actively contributes to the tech community through blogs, talks, and mentorship. In his free time, he enjoys exploring emerging technologies, contributing to open-source projects, and staying ahead of industry trends.
      </p>
      <p>
        Connect with Jelle on <a href="https://github.com/jellekralt" className="text-blue-500 hover:underline">GitHub</a>, <a href="https://twitter.com/jellekralt" className="text-blue-500 hover:underline">Twitter</a>, or <a href="http://nl.linkedin.com/in/jellekralt" className="text-blue-500 hover:underline">LinkedIn</a>.
      </p>
    </div>
  );
}