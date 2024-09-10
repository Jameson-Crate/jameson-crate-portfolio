import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ProjectPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Portfolio
      </Link>
      
      <h1 className="text-4xl font-bold mb-8">[PROJECT TITLE]</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
        <p className="text-lg">
          [Your project abstract goes here. Provide a brief overview of the project, its goals, and key findings.]
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="text-lg">
          [Introduce your project here. Explain the problem you're addressing, why it's important, and any background information necessary to understand your work.]
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Methods</h2>
        <p className="text-lg">
          [Describe the methods and techniques you used in your project. Include any algorithms, tools, or datasets you utilized.]
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Optimizations</h2>
        <p className="text-lg">
          [Explain any optimizations you implemented to improve your project's performance or efficiency.]
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Results</h2>
        <p className="text-lg">
          [Present the results of your project. Include any relevant data, charts, or visualizations to support your findings.]
        </p>
      </section>
    </div>
  );
};

export default ProjectPage;