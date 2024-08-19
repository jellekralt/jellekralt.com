// app/routes/bio.tsx
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Biography Jelle Kralt - JelleKralt.com" },
    { name: "description", content: "Learn about Jelle Kralt, a seasoned Technical Director and Innovator with extensive experience in web development, cloud computing, and software engineering." },
  ];
};

export default function Bio() {
  return (
    <div>
      <h1>Jelle Kralt</h1>
      <img className="float-left w-1/4 mr-6 mb-4 object-cover" src="/jellekralt.png" alt="Portret of Jelle Kralt, smiling, posing for a gray background looking at the camera" />
      <p>
        Jelle Kralt is a seasoned Technical Director and Innovator with a passion for pushing the boundaries of technology. With extensive experience in web development, cloud computing, and software engineering, Jelle has a proven track record of leading technical teams to success.
      </p>
      <p>
        Jelle&apos;s career spans over a decade, during which he has honed his skills in various programming languages, frameworks, and cloud platforms. He has a deep understanding of modern web technologies and is always on the lookout for the next big innovation in the tech industry.
      </p>
      <p>
        Currently, Jelle serves as the Director of Technical Innovation at KLM, where he spearheads cutting-edge projects that drive the future of aviation technology. His work focuses on creating scalable, reliable, and efficient solutions that meet the needs of a rapidly evolving industry.
      </p>
      <p>
        Beyond his professional work, Jelle is an avid contributor to the open-source community and enjoys sharing his knowledge through blogs, talks, and mentorship. His dedication to continuous learning and passion for technology make him a respected leader and innovator in the field.
      </p>
      <p>
        In his free time, Jelle enjoys exploring new technologies, contributing to open-source projects, and staying ahead of the curve in the ever-changing landscape of software development.
      </p>
      <p>
        Connect with Jelle on <a href="https://github.com/jellekralt" className="text-blue-500 hover:underline">GitHub</a>, <a href="https://twitter.com/jellekralt" className="text-blue-500 hover:underline">Twitter</a>, or <a href="http://nl.linkedin.com/in/jellekralt" className="text-blue-500 hover:underline">LinkedIn</a>.
      </p>
    </div>
  );
}