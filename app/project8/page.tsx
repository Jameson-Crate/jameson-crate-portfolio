"use client";

import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ImageFigure } from "../components/ImageFigure";

const ProjectPage = () => {
  useEffect(() => {
    document.title = "Mesh Editing and Bezier Curves";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8 lg:px-20">
      <Link
        href="/"
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
      >
        <ArrowLeft
          size={20}
          className="mr-2 transition-transform group-hover:-translate-x-1"
        />
        Back to Portfolio
      </Link>

      <h1 className="text-4xl font-bold mb-8 text-center">
        Curve and Mesh Editing
      </h1>

      <div className="flex space-x-4 justify-center mb-8">
        {[
          {
            href: "https://github.com/Jameson-Crate/CS180-Project8",
            text: "GitHub (Private)",
          },
          {
            href: "https://drive.google.com/drive/folders/1D19ikssbGn-WkkDHMEPWGT0ChiwtYv2U?usp=sharing",
            text: "Google Drive",
          },
        ].map(({ href, text }) => (
          <a
            href={href}
            key={text}
            className="text-gray-600 hover:text-blue-800"
            title={`Visit ${text}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>{text}</h3>
          </a>
        ))}
      </div>

      <hr className="mb-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <a
                  href="#bezier-curves"
                  className="text-blue-600 hover:underline"
                >
                  Bezier Curves
                </a>
              </li>
              <li>
                <a
                  href="#bezier-surfaces"
                  className="text-blue-600 hover:underline"
                >
                  Bezier Surfaces
                </a>
              </li>
              <li>
                <a
                  href="#vertex-normals"
                  className="text-blue-600 hover:underline"
                >
                  Mesh Vertex Normals
                </a>
              </li>
              <li>
                <a href="#edge-flips" className="text-blue-600 hover:underline">
                  Mesh Edge Flips
                </a>
              </li>
              <li>
                <a
                  href="#edge-splits"
                  className="text-blue-600 hover:underline"
                >
                  Mesh Edge Splits
                </a>
              </li>
              <li>
                <a href="#upsampling" className="text-blue-600 hover:underline">
                  Mesh Upsampling
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="mt-8" />
      </section>

      <section id="abstract" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
        <p className="text-lg">
          There are many ways to represent 3D geometry in computer graphics. In
          this project I explore two of the most common ways: bezier surfaces
          and triangle meshes. For meshes specifically I implement flipping
          edges, splitting edges and combining those two steps to implement loop
          subdivision for upsampling.
        </p>
        <hr className="mt-8" />
      </section>

      <section id="bezier-curves" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bezier Curves</h2>
        <p className="text-lg">
          In computer graphics, Bezier curves and surfaces are frequently used
          to model smooth and infinitely scalable curves and surfaces. A Bezier
          curve of degree n is defined by (n+1) control points. It is a
          parametric curve based on a single parameter t, ranging between 0 and
          1. To evaluate a point on the curve at parameter t, we use the de
          Casteljau algorithm which recursively applies linear interpolation
          between pairs of control points. Given n control points, we compute
          n-1 intermediate points using linear interpolation: p_i&apos; = (1-t)p_i +
          tp_(i+1). By repeating this process recursively, we eventually arrive
          at a single point that lies on the Bezier curve at parameter t. This
          elegant geometric construction allows us to efficiently evaluate
          smooth curves that interpolate between the first and last control
          points while being influenced by the shape of all control points.
        </p>
        <br />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          <ImageFigure
            src="/assets/project8/q1-1/pt_6_stp_1.png"
            alt="Bezier Curve"
            caption="6 Point Bezier Curve"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q1-1/pt_6_stp_2.png"
            alt="Bezier Curve"
            caption="Bezier Curve (Recursive Step 1)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q1-1/pt_6_stp_3.png"
            alt="Bezier Curve"
            caption="Bezier Curve (Recursive Step 2)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q1-1/pt_6_stp_4.png"
            alt="Bezier Curve"
            caption="Bezier Curve (Recursive Step 3)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q1-1/pt_6_stp_5.png"
            alt="Bezier Curve"
            caption="Bezier Curve (Recursive Step 4)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q1-1/pt_6_stp_6.png"
            alt="Bezier Curve"
            caption="Bezier Curve (Recursive Step 5)"
            width={750}
            height={500}
          />
        </div>
        <ImageFigure
          src="/assets/project8/q1-1/pt_6.png"
          alt="Bezier Curve"
          caption="Bezier Curve"
          width={750}
          height={500}
        />
        <hr className="mt-8" />
      </section>

      <section id="bezier-surfaces" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bezier Surfaces</h2>
        <p className="text-lg">
          Now we move to extending bezier curves to three dimensions to create
          smooth bezier surfaces. A bezier surface is defined by an n x n grid
          of control points, where n is the degree of the surface. To evaluate a
          point on the surface at parameters u and v (both ranging from 0 to 1),
          we use a separable 1D de Casteljau algorithm. First, we treat each row
          of n control points as a bezier curve parameterized by u, evaluating
          to get n intermediate points. These n points then define a bezier
          curve parameterized by v, which we evaluate to get the final surface
          point. This elegant extension of the curve algorithm allows us to
          create smooth, controllable surfaces that interpolate between the
          corner control points while being influenced by the interior control
          points.
        </p>
        <br />
        <ImageFigure
          src="/assets/project8/q1-2/teapot.png"
          alt="Utah Teapot"
          caption="Utah Teapot - Bezier Surface"
          width={750}
          height={500}
        />
        <hr className="mt-8" />
      </section>

      <section id="vertex-normals" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mesh Vertex Normals</h2>
        <p className="text-lg">
          While bezier curves are good for describing geometry of curved
          surfaces, they are often not ideal for representation in graphics
          pipelines. Instead it is often simpler to represent 3D objects as
          collections of triangles known as triangle meshes. One important
          aspect of triangle meshes is computing vertex normals, which are
          essential for smooth shading. For each vertex, we calculate an
          area-weighted normal by iterating through all faces incident to that
          vertex, weighting each face&apos;s normal by its area, and then normalizing
          the sum. This allows us to achieve smooth Phong shading across the
          mesh surface, providing much better visual results than flat shading,
          especially for curved surfaces. The process involves using a half-edge
          data structure to efficiently traverse the mesh and compute the cross
          products and face areas of every triangle. Below are some of the
          results showing before and after rendering using vertex normals.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-8">
          <ImageFigure
            src="/assets/project8/q2-1/teapot-rough-mesh.png"
            alt="Vertex Normal"
            caption="Teapot Mesh Wireframe (No Vertex Normals)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-1/teapot-rough-render.png"
            alt="Vertex Normal"
            caption="Teapot Mesh (No Vertex Normals)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-1/teapot-smooth-mesh.png"
            alt="Vertex Normal"
            caption="Teapot Mesh Wireframe (Vertex Normals)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-1/teapot-smooth-render.png"
            alt="Vertex Normal"
            caption="Teapot Mesh (Vertex Normals)"
            width={750}
            height={500}
          />
        </div>
        <hr className="mt-8" />
      </section>

      <section id="edge-flips" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mesh Edge Flips</h2>
        <p className="text-lg">
          One of the fundamental operations for triangle meshes is edge
          flipping. If two triangles share an edge AC where the first triangle
          is made of the vertices BAC and the second is CAD, then an edge flip
          can be described as changing the vertices of the original edge to be
          CD. To implement this with the same half-edge datastructure we used in
          the last section we can store all of the pointers the relevant mesh
          elements (vertices, edges, faces, and half-edges) and then reassign
          them to flip the edge. We can ignore boundary edges as it is undefined
          behavior to flip an edge on the boundary of a mesh.
        </p>
        <ImageFigure
          src="/assets/project8/q2-2/original.png"
          alt="Teapot Flip"
          caption="Utah Teapot Mesh"
          width={750}
          height={500}
        />
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-8">
          <ImageFigure
            src="/assets/project8/q2-2/simple-flip.png"
            alt="Teapot Flip"
            caption="Teapot Simple Edge Flip"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-2/complex-flip.png"
            alt="Teapot Flip"
            caption="Teapot Complex Edge Flip"
            width={750}
            height={500}
          />
        </div>
        <hr className="mt-8" />
      </section>

      <section id="edge-splits" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mesh Edge Splits</h2>
        <p className="text-lg">
          Another fundamental operation we can use for editing meshes is
          splitting edges. Unlike flipping edges, splitting edges creates new
          mesh elements by taking a pre-existing edge and splitting it in half
          and adding two new egdes which bisect the original edge. To implement
          edge splits we can follow a similar procedure to edge flipping. We can
          first list out every element that we will need to change. We can also
          create new mesh elements which we will connect to the rest of our mesh
          with pointer reassignments. We can also mark all of our new elements
          with a boolean flag which will be helpful in the next part.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-8">
          <ImageFigure
            src="/assets/project8/q2-3/basic.png"
            alt="Box Split"
            caption="Cube Mesh"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-3/basic-split.png"
            alt="Box Split"
            caption="Cube Mesh Edge Split"
            width={750}
            height={500}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          <ImageFigure
            src="/assets/project8/q2-3/edge-split.png"
            alt="Box Split"
            caption="Cube Mesh Corner Edge Split (View 1)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-3/edge-split-side.png"
            alt="Box Split"
            caption="Cube Mesh Corner Edge Split (View 2)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-3/split-flip.png"
            alt="Box Split"
            caption="Cube Mesh Split + Flip"
            width={750}
            height={500}
          />
        </div>
        <hr className="mt-8" />
      </section>

      <section id="upsampling" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mesh Upsampling</h2>
        <p className="text-lg">
          We can now combine our previous two parts in order to upsample our
          mesh / improve the quality of our mesh. For this we can use the loop
          subdivision algorithm. The loop subdivision algorithm has two steps.
          First subidivde each triangle into four smaller triangles, then update
          the positions of each of the vertices of the triangle according to
          preset weights. In practice we can compute the updated positions
          before subdividing the mesh in order to make the process simpler to
          write in code. In my implementation I followed the following steps:
          Step 1: Compute the positions of both new and old vertices using the
          original mesh. Step 2: Subdivide the original mesh via edge splits and
          flips as described. Step 3: Update all vertex positions in the
          subdivided mesh using the values already computed. From the results we
          can see that sharp edges gradually get smoother and smoother as we
          increase the amount of upsampling. We can also see that the cube is
          originally not symmetric when we upsample, but if we split each of the
          diagonal edges on each face before upsampling we get a symmetric
          result.
        </p>
        <br />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          <ImageFigure
            src="/assets/project8/q2-4/cube-1.png"
            alt="Cube Upsample"
            caption="Cube Mesh"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-4/cube-2.png"
            alt="Cube Upsample"
            caption="Cube Mesh Upsample 1"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-4/cube-3.png"
            alt="Cube Upsample"
            caption="Cube Mesh Upsample 2"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-4/cube-4.png"
            alt="Cube Upsample"
            caption="Cube Mesh Upsample 3"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-4/sym-cube-1.png"
            alt="Cube Upsample"
            caption="Symmetric Cube Mesh"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-4/sym-cube-2.png"
            alt="Cube Upsample"
            caption="Symmetric Cube Mesh Upsample 1"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-4/sym-cube-3.png"
            alt="Cube Upsample"
            caption="Symmetric Cube Mesh Upsample 2"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/q2-4/sym-cube-4.png"
            alt="Cube Upsample"
            caption="Symmetric Cube Mesh Upsample 3"
            width={750}
            height={500}
          />
        </div>
        <hr className="mt-8" />
      </section>

      <section id="upsampling" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          <ImageFigure
            src="/assets/project8/gallery/rough-torus.png"
            alt="Gallery Picture"
            caption="Torus"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/gallery/torus.png"
            alt="Gallery Picture"
            caption="Torus (Upsampled)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/gallery/rough-icosahedron.png"
            alt="Gallery Picture"
            caption="icosahedron"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/gallery/icosahedron.png"
            alt="Gallery Picture"
            caption="icosahedron (Upsampled)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/gallery/rough-cow.png"
            alt="Gallery Picture"
            caption="Cow"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/gallery/cow.png"
            alt="Gallery Picture"
            caption="Cow (Upsampled)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/gallery/beetle.png"
            alt="Gallery Picture"
            caption="Car"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project8/gallery/max-planck.png"
            alt="Gallery Picture"
            caption="Max Planck"
            width={750}
            height={500}
          />
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
