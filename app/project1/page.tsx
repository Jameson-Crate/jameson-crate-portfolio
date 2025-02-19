"use client";

import React from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";

const ProjectPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const images = [
    {
      name: "Cathedral",
      file: "cathedral.jpg",
      redDisp: [3, 12],
      greenDisp: [2, 5],
      size: [341, 390],
    },
    {
      name: "Monastery",
      file: "monastery.jpg",
      redDisp: [2, 3],
      greenDisp: [2, -3],
      size: [341, 391],
    },
    {
      name: "Tobolsk",
      file: "tobolsk.jpg",
      redDisp: [3, 6],
      greenDisp: [2, 3],
      size: [341, 396],
    },
    {
      name: "Church",
      file: "church.jpg",
      redDisp: [-4, 58],
      greenDisp: [4, 25],
      size: [3202, 3634],
    },
    {
      name: "Harvesters",
      file: "harvesters.jpg",
      redDisp: [11, 122],
      greenDisp: [14, 59],
      size: [3218, 3683],
    },
    {
      name: "Lady",
      file: "lady.jpg",
      redDisp: [12, 120],
      greenDisp: [8, 57],
      size: [3212, 3761],
    },
    {
      name: "Onion Church",
      file: "onion_church.jpg",
      redDisp: [35, 108],
      greenDisp: [22, 52],
      size: [3215, 3781],
    },
    {
      name: "Self Portrait",
      file: "self_portrait.jpg",
      redDisp: [36, 175],
      greenDisp: [28, 78],
      size: [3251, 3810],
    },
    {
      name: "Emir",
      file: "emir.jpg",
      redDisp: [40, 105],
      greenDisp: [21, 50],
      size: [3209, 3702],
    },
    {
      name: "Train",
      file: "train.jpg",
      redDisp: [29, 85],
      greenDisp: [-2, 40],
      size: [3238, 3741],
    },
    {
      name: "Icon",
      file: "icon.jpg",
      redDisp: [22, 89],
      greenDisp: [16, 42],
      size: [3244, 3741],
    },
    {
      name: "Melons",
      file: "melons.jpg",
      redDisp: [-3, 140],
      greenDisp: [4, 83],
      size: [3241, 3770],
    },
    {
      name: "Sculpture",
      file: "sculpture.jpg",
      redDisp: [-27, 140],
      greenDisp: [-11, 33],
      size: [3257, 3800],
    },
    {
      name: "Three Generations",
      file: "three_generations.jpg",
      redDisp: [7, 108],
      greenDisp: [5, 52],
      size: [3209, 3714],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <Link
        href="/"
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Portfolio
      </Link>

      <h1 className="text-4xl font-bold mb-4">
        Color Channel Alignment
      </h1>
      <div className="flex space-x-4">
        <a
          href="https://github.com/Jameson-Crate/CS180-Project1"
          className="text-gray-600 hover:text-blue-800"
        >
          <h3>Github</h3>
        </a>
        <a
          href="https://drive.google.com/drive/folders/19L-stZKCUK7fR_7cxNqt7bd0w2wS8kUz?usp=drive_link"
          className="text-gray-600 hover:text-blue-800"
        >
          <h3>Google Drive</h3>
        </a>
      </div>
      <hr className="mb-4" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
        <p className="text-lg mb-2">
          This project focuses on reconstructing color images from the digitized
          glass plate negatives of Sergei Mikhailovich Prokudin-Gorskii, who
          captured early 20th-century Russia in color using three exposures
          through red, green, and blue filters. By applying image pyramids for
          multi-scale alignment and experimenting with various alignment
          metrics, I aimed to efficiently align these color channels to produce
          high-quality RGB images with minimal artifacts.
        </p>
        <hr />
      </section>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 md:pr-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-lg mb-2">
              Sergei Mikhailovich Prokudin-Gorskii (1863-1944) [Сергей
              Михайлович Прокудин-Горский, to his Russian friends] was a man
              well ahead of his time. Convinced, as early as 1907, that color
              photography was the wave of the future, he won Tzar{"'"}s special
              permission to travel across the vast Russian Empire and take color
              photographs of everything he saw including the only color portrait
              of Leo Tolstoy. And he really photographed everything: people,
              buildings, landscapes, railroads, bridges... thousands of color
              pictures! His idea was simple: record three exposures of every
              scene onto a glass plate using a red, a green, and a blue filter.
              Never mind that there was no way to print color photographs until
              much later -- he envisioned special projectors to be installed in
              &ldquo;multimedia&rdquo; classrooms all across Russia where the children
              would be able to learn about their vast country. Alas, his plans
              never materialized: he left Russia in 1918, right after the
              revolution, never to return again. Luckily, his RGB glass plate
              negatives, capturing the last years of the Russian Empire,
              survived and were purchased in 1948 by the Library of Congress.
              The LoC has recently digitized the negatives and made them
              available on-line.
              <br />
              <br />
              The goal of this project was to take the digitized
              Prokudin-Gorskii glass plate images and, using image processing
              techniques, automatically produce a color image with as few visual
              artifacts as possible. To accomplish this I extracted the three
              color channel images, placed them on top of each other, and
              aligned them so that they form a single RGB color image. Since
              each color channel image has color information about its
              corresponding channel in the final image, by finding a good
              alignment (formalized in the next section) the corresponding color
              image can be reconstructed.
            </p>
            <hr />
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Methods</h2>
            <p className="text-lg mb-2">
              In order to align all three of the color channels I aligned both
              the red and the green channels to the blue channel independently.
              This ensured that problem took less computational complexity,
              while still resulting in an aligned result. For each of the two
              pairs (blue + red, and blue + green) I searched over a region of
              xy transformations in order to minimize some error function which
              measured the distance between pixels of two images in some
              alignment. Originally I used euclidian distance to measure the
              difference between pixels which wasn&apos;t perfect. I found that for
              small images {"(< 1000 x 1000 pixels)"} computing the distance
              between images was quick, but compute time quickly grew as the
              size of images grew due to all of the distance measurements. Even
              with a heavily vectorized implementation, runtime was still very
              slow.
              <br />
              <br />
              In order to be more efficient on larger images I used image
              pyramids to speed up runtime on larger images. An image pyramid is
              a set of resized versions of the same image starting at a coarser
              resolution and ending at a finer resolution. In our case the
              finest resolution was the image we were trying to recreate. I used
              scikit-image&apos;s rescale function in order to shrink the original
              image into lower resolution images and create an image pyramid.
              Since our problem is computationally much simpler with smaller
              images we can first align the coarsest versions of the images and
              then use a scaled version of the transistion vector from the
              coarser image to align larger images which we can then further
              align to get a good alignment much faster. Once an alignment has
              been found the color channels are stacked on top of each other to
              produce the final image.
            </p>
            <hr />
          </section>
        </div>
        <div className="md:w-1/3 mt-8 md:mt-0 content-center">
          <figure className="mb-8">
            <div className="flex justify-center">
            <Image
              src="/assets/project1/monastery_input.jpg"
              alt="Original monastery image input"
              width={400}
              height={300}
              className="w-auto h-auto"
            />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Figure 1: Original input image of the monastery before color
              channel alignment
            </figcaption>
          </figure>
        </div>
      </div>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Optimizations</h2>
        <p className="text-lg mb-2">
          In order to optimize the process of aligning the color channels and
          yield a better quality result in less time I experimented with two
          main optimizations: 1) Relative recursion-depth search ranges and 2)
          robust difference metrics.
          <br />
          <br />
          The first optimization involved changing the search range depending on
          the depth of recursive calls inside the image pyramid. With every
          additional recursive call, I would increase the search space by some
          fixed amount. As a result, the finest resolution image had the
          smallest search range, and the coarest resolution image had the
          largest search range. This decision was made to improve the runtime of
          the alignment algorithm. Computing the distance metric for small
          images happens very quickly which allows us to search over a much
          larger range of transistions relative to large images. Additionally
          searching over a range on a smaller image in the pyramid corresponds
          to searching over a exponentially larger range in larger images.
          <br />
          <br />
          The second optimization involved changing the distance metric from
          traditional euclidian distance to a more robust metric. In this case I
          used scikit-learn&apos;s structural similarity metric which uses factors
          other than just pixel difference in order to determine the difference
          between two images. Euclidian distance between pixels works well when
          the images are similar in brightness, but could suffer when the
          brightness between images largely differs. Structural similarity
          (ssim) focuses on the underlying structure of the object in the image
          which is much more robust to differences in brightness between color
          channels. Using SSIM did slightly improve the results of the final
          images, however these results noteably increased the runtime of the
          algorithm which led me to using euclidian distance for my final
          result.
        </p>

        <hr />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Results</h2>
        <p className="text-lg mb-2">
          The resulting images are displayed below. The first three images are
          small images that did not use images pyramids, whereas the rest of the
          alignments were computed using image pyramids. Note that all if the
          images have been cropped for display purposes, but the full images can
          be seen in the attached google drive.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow justify-center">
                  <CardContent className="p-4">
                    <div className="flex justify-center">
                      <Image
                        src={`/assets/project1/${image.file}`}
                        alt={image.name}
                        width={image.size[0]}
                        height={image.size[1]}
                        className="w-auto h-auto object-cover mb-4"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{image.name}</h3>
                    <p className="text-sm">
                      <strong>Red Displacement:</strong> [{image.redDisp[0]},{" "}
                      {image.redDisp[1]}]<br />
                      <strong>Green Displacement:</strong> [{image.greenDisp[0]}
                      , {image.greenDisp[1]}]<br />
                      <strong>Size:</strong> {image.size[0]} x {image.size[1]}
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="w-auto h-auto p-0">
                <div className="relative">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                  )}
                  <Image
                    src={`/assets/project1/${image.file}`}
                    alt={image.name}
                    width={image.size[0]}
                    height={image.size[1]}
                    className="w-full h-auto"
                    onLoadStart={() => setIsLoading(true)}
                    onLoad={handleImageLoad}
                  />
                  <button className="absolute top-2 right-2 bg-white rounded-full p-1"></button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
