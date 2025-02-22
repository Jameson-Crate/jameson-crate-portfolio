"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Github,
  Twitter,
  Mail,
  Linkedin,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
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

const CollapsibleSection = ({
  title,
  children,
}: {
  title: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  children: any;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6">
      <div
        className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        <h3 className="text-2xl font-semibold ml-1">{title}</h3>
      </div>
      {isOpen && (
        <div className="mt-3 ml-2 pl-4 border-l-2 border-gray-300">
          {children}
        </div>
      )}
    </div>
  );
};

const ProjectList = () => {
  const router = useRouter();

  const computerVisionProjects = [
    { name: "Color Channel Alignment", description: "Channel Alignment, Image Pyramids", number: 1 },
    { name: "Convolutions and Image Filtering", description: "Signal Processing, Convolutions", number: 2 },
    { name: "Image Warping and Face Morphing", description: "Affine Transforms, Triangulation", number: 3 },
    { name: "Homography and Image Stitching", description: "Feature Detection and Matching, RANSAC", number: 4 },
    { name: "Denoising Diffusion Models", description: "DDPM, U-Nets, Classifier-Free Guidance", number: 5 },
    { name: "Neural Radiance Fields", description: "2D Neural Fields, Sampling Rays, Depth Estimation", number: 6 },
  ];

  const computerGraphicsProjects = [
    { name: "Rasterization Pipeline", description: "Barycentric Coordinates, Supersampling, Mipmaps", number: 7 },
  ];

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const renderProjects = (projects: any) => (
    <ul className="space-y-2">
      { /* eslint-disable  @typescript-eslint/no-explicit-any */ }
      {projects.map((project: any, index: any) => (
        <li
          key={index}
          className="bg-gray-100 p-2 rounded hover:text-blue-800 cursor-pointer"
          onClick={() => {
            router.push(`/project${project.number}`);
          }}
        >
          <h4 className="font-semibold">{project.name}</h4>
          <p className="text-sm">{project.description}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <CollapsibleSection title="Computer Vision">
        {renderProjects(computerVisionProjects)}
      </CollapsibleSection>

      <CollapsibleSection title="Computer Graphics">
        {renderProjects(computerGraphicsProjects)}
      </CollapsibleSection>
    </div>
  );
};

const PortfolioLandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8 md:flex">
      <div className="w-2/3 pr-8">
        <TypingAnimation
          text="{ Visual Computing Portfolio }"
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
