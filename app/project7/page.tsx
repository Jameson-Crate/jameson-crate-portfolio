"use client";

import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ImageFigure } from "../components/ImageFigure";

const ProjectPage = () => {
  useEffect(() => {
    document.title = "Rasterization Pipeline";
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
        Rasterization Pipeline
      </h1>

      <div className="flex space-x-4 justify-center mb-8">
        {[
          {
            href: "https://github.com/cal-cs184-student/sp25-hw1-https-tinyurl-com-sp25-184-hw-1",
            text: "GitHub (Private)",
          },
          {
            href: "https://drive.google.com/drive/folders/1AHc6ZhqfkpaAsqEbMhriV7bG-ncFcszh?usp=drive_link",
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
                  href="#single-triangles"
                  className="text-blue-600 hover:underline"
                >
                  Single Color Triangles
                </a>
              </li>
              <li>
                <a
                  href="#supersampling"
                  className="text-blue-600 hover:underline"
                >
                  Antialiasing by Supersampling
                </a>
              </li>
              <li>
                <a href="#transforms" className="text-blue-600 hover:underline">
                  Transforms
                </a>
              </li>
              <li>
                <a
                  href="#barycentric-coordinates"
                  className="text-blue-600 hover:underline"
                >
                  Barycentric Coordinates
                </a>
              </li>
              <li>
                <a
                  href="#pixel-sampling"
                  className="text-blue-600 hover:underline"
                >
                  Texture Mapping with Pixel Sampling
                </a>
              </li>
              <li>
                <a
                  href="#level-sampling"
                  className="text-blue-600 hover:underline"
                >
                  Texture Mapping with Level Sampling
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
          Rasterization is the process of converting vector graphics
          instructions into pixel-based images that can be displayed by graphics
          hardware. In this project I create a rasterization pipeline capable of
          displaying svg images composed of lines, points, triangles,
          transforms, and texture mapping. I also implement multiple sampling
          methods including nearest sampling and bilinear sampling on both the
          pixel and mipmap level.
        </p>
        <hr className="mt-8" />
      </section>

      <section id="single-triangles" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Single Color Triangles</h2>
        <p className="text-lg">
          In this section we rasterize single color triangles to the screen. In
          order to rasterize triangles to the screen we need to know the three
          vertices of the triangle and the color of the triangle. For the
          simplest approach we can then iterate over pixels within the bounding
          box of the triangle and determine for each pixel if it is inside the
          triangle. In order to determine if the pixel is inside the triangle we
          can consider each of the seperating hyperplanes created by the three
          points. Each pair of points defines a line in 2D space. We define the
          line formed between two vertices of the triangle to be L. If we define
          our trianlge using a counter-clockwise winding order (vertices are
          traversed in a counter-clockwise order) and we take dot product of the
          normal vector to L and the vector formed with the starting triangle
          vertex and point we are trying to classify, if the value is positive
          the point is to the left of L, if it is zero the point is on L, and if
          it is negative it is to the right of L. We can be certain that the
          point is inside if the triangle if for all three sides the dot product
          is not negative because this would imply that the point is to the left
          of all three sides and thus due to our counter-clockwise winding order
          inside the triangle. If the point falls inside the triangle we fill it
          with the specified color, otherwise we leave it as its previous color.
          Additionally before we start determining points we first have to
          determine if the points were already given to us with a
          counter-clockwise winding order. We can do this by using the right
          hand rule which says that if the cross product between any two of our
          three side vectors is positive then our winding order is clockwise. If
          this is ever the case we can simply swap the labels of our first two
          points to ensure that our winding order becomes counter-clockwise.
          This algorithm considers every pixel in the bounding box, making it no
          less efficient than other algorithms with check every pixel in the
          bounding box in terms of the number of pixels checked. We can see
          below that in some instances our triangles have inconsistencies,
          especially in extreme regions. We will fix this in the next sections
          with improved sampling.
        </p>
        <br />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          <ImageFigure
            src="/assets/project7/q1-images/cube.png"
            alt="Cube 1"
            caption="Rendered Cube"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q1-images/cube-zoom.png"
            alt="Cube 2"
            caption="Rendered Cube (Zoom)"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q1-images/triangles.png"
            alt="Triangles 1"
            caption="Rendered Triangles"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q1-images/triangles-zoom.png"
            alt="Triangles 2"
            caption="Rendered Triangles (Zoom)"
            width={750}
            height={500}
          />
        </div>
        <hr className="mt-8" />
      </section>

      <section id="supersampling" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Antialiasing by Supersampling
        </h2>
        <p className="text-lg">
          In the previous section we were able to draw triangles, but as we saw
          in some extreme / high frequency regions our triangles had missing
          regions or malformed sections. This is due to aliasing or sampling a
          high frequency signal at a lower frequency. In order to account for
          aliasing we can antialias by sampling at a higher frequency. One such
          way of accomplishing this is by supersampling. In supersampling for
          each pixel we sample sample rate number of times and then average
          those samples together to get the pixel value. For example if our
          sample rate was four we would sample four times evenly spread around
          the pixel and average the values together. This higher frequency
          should antialias our rendering, thus helping there be less artifacts
          in our final scenes. In order to impelment supersampling I used a
          buffer that was of size <i>height * width * sample rate</i>. We can
          resize this buffer at any time in order to allow the user to change
          their sampling rate. I accounted for now dealing with different sample
          rates by writing a sample index function which just returns{" "}
          <i>sample_rate * (y * width + x) + (v * sqrt(sample_rate) + u) </i>
          where sample rate is the number of values to sample per pixel, x and y
          are the pixel coordinates, and u and v are the coordinates within the
          sampled pixel. We can calculate where to sample in the pixel for each
          u, v by using <i>(u + 0.5) / sqrt(sample_rate) </i>
          and the same for v. This will be a set of values spaced evenly between
          zero and one which we can add to our pixel coordinate to get the exact
          sample value for that (u, v) pair. Below are the results of
          supersampling at 1, 4, and 16 sample rates.
        </p>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <ImageFigure
            src="/assets/project7/q2-images/triangles_1.png"
            alt="Triangles 1"
            caption="Sample Rate: 1"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q2-images/triangles_4.png"
            alt="Triangles 4"
            caption="Sample Rate: 4"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q2-images/triangles_16.png"
            alt="Triangles 16"
            caption="Sample Rate: 16"
            width={750}
            height={500}
          />
        </div>
        <hr className="mt-8" />
      </section>

      <section id="transforms" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Transforms</h2>
        <p className="text-lg">
          In this section we implement several simple transforms including
          translations, rotations, and scaling. Each of these 2D transforms can
          be implemented by using homogenous coordinates and 3x3 matrices. Below
          I use the transformations to make a man jump in the air and pump his
          fist triumphantly.
        </p>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <ImageFigure
            src="/assets/project7/q3-images/static.png"
            alt="Man"
            caption="Standing"
            width={500}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q3-images/man.png"
            alt="Fist Pump"
            caption="Fist Pump"
            width={500}
            height={500}
          />
        </div>
        <hr className="mt-8" />
      </section>

      <section id="barycentric-coordinates" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Barycentric Coordinates</h2>
        <p className="text-lg">
          In this section we implement color gradients for triangles using
          barycentric coordinates. Barycentric coordinates linearly interpolate
          the values at each of the vertices of a triangle across the entire
          triangle. Inside the triangle the value of each point is determined by
          an alpha, beta, and gamma value which give the proportion of each
          vertex respectively. As such these three values always add to one.
          Simply put this coordinate system can be thought of as blending the
          values at each vertex which can be shown in the triangle image below.
          The bottom left corner is red, the bottom right corner is blue and the
          top corner is green. We can see that inbetween each of the vertices
          the colors are blended accordingly.
        </p>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <ImageFigure
            src="/assets/project7/q4-images/colortri.png"
            alt="triangle"
            caption="Colored Triangle"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q4-images/color_wheel.png"
            alt="wheel"
            caption="Color Wheel"
            width={750}
            height={500}
          />
        </div>
        <hr className="mt-8" />
      </section>

      <section id="pixel-sampling" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Texture Mapping with Pixel Sampling
        </h2>
        <p className="text-lg">
          In this section I implement pixel sampling to perform texture mapping
          and use two different sampling methods: nearest and bilinear. In
          texture mapping the goal is to take a specified texture map which can
          be stored as a seperate image, and for each point in the rasterized
          image (or shape / trianlge in this case) map the correct texture from
          the texture image onto the rasterized image. In the case of svg images
          the texture mapping for each triangle we draw is specified in the svg
          file. Since we know the texture mapping for each of the vertices for
          each triangle all we need to do to map the rest of the pixels inside
          of the triangle to the correct texture value is to use barycentric
          coordinates with each of the three specified mappings to get a new
          mapping which we can then sample the texture for in order to get the
          color of that pixel. The two sample methods I implemented were nearest
          sampling which uses the value of the nearest value in the texture map
          and bilinear sampling which computes multiple linear interpolations
          for all four surrounding pixels to determine the color of the pixel.
          Bilinear sampling tends to be smoother and less susceptible to
          aliasing. Below is a comparision of the two sampling methods at
          different sample rates.
        </p>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <ImageFigure
            src="/assets/project7/q5-images/nearest-1.png"
            alt="n1"
            caption="Nearest, Sample Rate: 1"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q5-images/bilinear-1.png"
            alt="b1"
            caption="Bilinear, Sample Rate: 1"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q5-images/nearest-16.png"
            alt="n16"
            caption="Nearest, Sample Rate: 16"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q5-images/bilinear-16.png"
            alt="b16"
            caption="Bilinear, Sample Rate: 16"
            width={750}
            height={500}
          />
        </div>
        <p className="text-lg">
          Nearest sampling is more coarse in both cases, whereas bilinear
          sampling tends to be much smoother. These differences could be even
          more apparent with very high frequency texture maps. In these cases
          nearest could suffer from aliasing resulting in many artifacts,
          whereas bilinear would likely handle high frequency images with slight
          blur, but less artifacts.
        </p>
        <hr className="mt-8" />
      </section>

      <section id="level-sampling" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Texture Mapping with Level Sampling
        </h2>
        <p className="text-lg">
          In this section we implement level sampling which samples from
          different levels of a texture map stored as a mipmap. In a mipmap
          different levels of the map have been downsampled accordingly. Level
          zero is the original texture image, and every level above has been
          downsampled. In level sampling we decide on which level of the mipmap
          to sample from depending on the frequency of the image at some
          specific pixel. At higher frequencies as measured by the derivative of
          the texture image at some any give point, we sample from higher levels
          in the mipmap. In order to calculate the level of the mipmap we can
          use the log base two of the max of derivatives in both the x and y
          direction of the texture map. This can sometimes be a non-integer
          value, but our mipmap only has integer levels which means we have to
          do sampling. Here I implement zero level which just always samples
          from the full texture mipmap, nearest level sampling which samples
          from the nearest level in the mipmap, and linear level sampling which
          linearly interpolates between sample levels to get the texture value.
          Combining all of our previous methods of avoiding aliasing and
          improving quality, we can disscuss the speed, memory usage, and
          antialiasing ability of different combinations of methods. The fastest
          and most memory efficient way is to sample from level zero of the
          mipmap with the nearest texture pixel and one sample per pixel. While
          this is fast, it is highly subject o aliasing and can often result in
          artifacts and poor quality. By using an increased sampling rate we can
          drastically improve results, but our memory usage will increase
          signficantly, especially in high-frequency sampling cases. We can use
          bilinear pixel sampling for textures, which improves quality
          signficantly and doesn&apos;t use too much memory; however, it can
          potentially slow our rendering time down by a large margin. Different
          forms of level sampling have a similar effect. If we wanted the
          highest quality we could use a pixel sampling rate of 16, bilinear
          pixel sampling, and linear level sampling. Combining linear leveling
          sampling and bilinear pixel sampling is known as trilinear sampling
          and it will give the highest quality, but also takes the longeset and
          can use much larger amounts of memory than prevous configurations.
        </p>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <ImageFigure
            src="/assets/project7/q6-images/zero_nearest.png"
            alt="lzpn"
            caption="Level: Zero, Pixel: Nearest"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q6-images/zero_linear.png"
            alt="lzpl"
            caption="Level: Zero, Pixel: Linear"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q6-images/nearest_nearest.png"
            alt="lnpn"
            caption="Level: Nearest, Pixel: Nearest"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/q6-images/nearest_linear.png"
            alt="lnpl"
            caption="Level: Nearest, Pixel: Linear"
            width={750}
            height={500}
          />
        </div>
        <hr className="mt-8" />
      </section>

      <section id="level-sampling" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <ImageFigure
            src="/assets/project7/gallery/lion.png"
            alt="lion"
            caption="Lion"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/gallery/ring.png"
            alt="ring"
            caption="Ring"
            width={750}
            height={500}
          />
          <ImageFigure
            src="/assets/project7/gallery/fractal.png"
            alt="fractal"
            caption="Fractal"
            width={750}
            height={500}
          />
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
