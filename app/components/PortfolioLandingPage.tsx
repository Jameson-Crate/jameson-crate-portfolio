"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Github, Twitter, Mail, Linkedin } from "lucide-react";
import ThreePyramid from "./Pyramid";

const TypingAnimation = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  const [displayText, setDisplayText] = React.useState("");

  React.useEffect(() => {
    let i = 0;
    setDisplayText("");
    const typingInterval = setInterval(() => {
      if (i < text?.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, Math.random() * (100 - 50) + 50);

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <div className="h-[40px] mb-6">
      <h2 className={className}>{displayText}</h2>
    </div>
  );
};

const ProjectList = () => {
  const projects = [
    { name: "Project 1", description: "Color Channel Alignment" },
    { name: "Project 2", description: "Convolutions and Image Filtering" },
    { name: "Project 3", description: "Image Warping and Face Morphing" },
    { name: "Project 4", description: "Coming soon..." },
    { name: "Project 5", description: "Coming soon..." },
  ];

  const router = useRouter();

  return (
    <div className="cursor-pointer">
      <h3 className="text-2xl font-semibold mb-4">Projects</h3>
      <ul className="space-y-2">
        {projects.map((project, index) => (
          <li
            key={index}
            className="bg-gray-100 p-2 rounded hover:text-blue-800"
            onClick={() => router.push(`/project${index + 1}`)}
          >
            <h4 className="font-semibold">{project.name}</h4>
            <p className="text-sm">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PortfolioLandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8 md:flex">
      <div className="w-2/3 pr-8">
        <TypingAnimation
          text="{ Computer Vision Portfolio }"
          className="text-2xl md:text-4xl font-bold mb-2 absolute"
        />
        <h2 className="text-2xl font-semibold mb-8">{">> Jameson Crate"}</h2>
        <ThreePyramid />
      </div>
      <div className="md:w-1/3 bg-gray-200 p-6 rounded-lg">
        <ProjectList />
      </div>
      <div className="flex space-x-4 mt-8 md:absolute bottom-[30px]">
          <a
            href="https://github.com/jameson-crate"
            className="text-gray-600 hover:text-gray-800"
          >
            <Github size={24} />
          </a>
          <a
            href="https://twitter.com/jamesoncrate"
            className="text-gray-600 hover:text-gray-800"
          >
            <Twitter size={24} />
          </a>
          <a
            href="mailto:jamesoncrate@gmail.com"
            className="text-gray-600 hover:text-gray-800"
          >
            <Mail size={24} />
          </a>
          <a
            href="https://linkedin.com/in/jameson-crate"
            className="text-gray-600 hover:text-gray-800"
          >
            <Linkedin size={24} />
          </a>
        </div>
    </div>
  );
};

export default PortfolioLandingPage;
