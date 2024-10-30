import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MathEquation } from "../components/ui/math-equation";

const ProjectPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <Link
        href="/"
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Portfolio
      </Link>

      <h1 className="text-4xl font-bold mb-8">
        Convolutions and Image Filtering
      </h1>
      <div className="flex space-x-4">
        <a
          href="https://github.com/Jameson-Crate/CS180-Project2"
          className="text-gray-600 hover:text-blue-800"
        >
          <h3>Github</h3>
        </a>
        <a
          href="https://drive.google.com/drive/folders/1aMzIMn3wYIeg4IawTUe_s0LaVX1I3NgT?usp=drive_link"
          className="text-gray-600 hover:text-blue-800"
        >
          <h3>Google Drive</h3>
        </a>
        <a
          href="https://inst.eecs.berkeley.edu/~cs180/fa24/"
          className="text-gray-600 hover:text-blue-800"
        >
          <h3>Course Website</h3>
        </a>
      </div>
      <hr className="mb-4" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
        <p className="text-lg">
          All images can be represented as discrete approximations of functions
          and represented in the frequency domain. Images can be filtered
          through the use of convolutions in order to remove different frequency
          signals from an image. In this project I used filtering to blur,
          flatten, and blend images as well as create hybrid images which appear
          different from different viewing distances.
        </p>
        <hr />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="text-lg">
          From a somewhat nontrivial perspective images can be thought of as
          discrete samples of continuous multivariate functions where the
          function takes in an x, y coordinate of a pixel and returns the
          brightness of that pixel (or pixels in the case of colored images).
          This discrete sample of a function can be thought of a two dimensional
          discrete signal. From this perspective it becomes very natural to
          approach the problem of making systematic transformations to the image
          using{" "}
          <a
            href="https://en.wikipedia.org/wiki/Convolution"
            className="text-sky-500"
          >
            convolutions
          </a>
          {". "}
          Convolutions allow us to make local transofrmations across entire
          images and have several nice mathematical properties which make them a
          well-fit candidate for image processing and filtering. In this project
          I show how these perspectives of images and the use of convolutions
          can be helpful for many different applications.
        </p>
        <hr />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Edge Detection and Blurring
        </h2>
        <p className="text-lg">
          Edge detection in image processing is the process of automatically
          finding edges of objects in an image. Edges by definition are
          signficant local changes an image&lsquo;s intensity. The gradient of a
          function represents the direction and magnitude of local change and
          since images can be represented as functions we can use the gradient
          of the image to detect the intensity of local changes in an image.
          Note that we only have discrete samples of the underlying image
          function so we can&lsquo;t take the derivative directly and must instead
          take an approximation. In this case we can recognize that the partial
          derivative for each direction of the image can be approximated by
          subtracting the value of the previous pixel from the current pixel for
          each pixel in the image. Which can be represented as a convolution
          operation with the following kernels for the x and y partial
          derivatives respectively.
        </p>
        <br />
        <div className="flex flex-row justify-center gap-x-40">
          <MathEquation
            equation={
              "\\frac{\\partial f}{\\partial x} = \\begin{bmatrix} 1 & -1 \\end{bmatrix}"
            }
          />
          <MathEquation
            equation={
              "\\frac{\\partial f}{\\partial y} = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}"
            }
          />
        </div>
        <br />
        <p className="text-lg">
          We can see the results of convolving these kernels (applying these
          filters) in the images below. We can see that by taking the norm of
          the partial derivatives in the x and y directions we get the gradient
          magnitude of the image which works as a primative edge detection
          operator for the image. If we binarize the gradient magnitude through
          some threshold value that we choose we can get a mask of just the
          edges.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_1.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Original Image
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_2.png"
                alt="Partial Derivative Cameraman X"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Partial Derivative with X
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_3.png"
                alt="Partial Derivative Cameraman Y"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Partial Derivative with Y
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_4.png"
                alt="Gradient Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Gradient Magnitude
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_5.png"
                alt="Binarized Gradient Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Binarized Gradient Magnitude
            </figcaption>
          </figure>
        </div>
        <p className="text-lg">
          We can see however that our edge detection has some imperfections. In
          particular there are several artifacts in the image which are not
          edges that were captured. If we try to lower our threshold value to
          remove these artifacts we end up potentially losing actual edges. In
          order to fix this issue we can first blur our image before taking the
          gradient in order to average out artifacts with surrounding pixels
          thus improving out edge detection procedure. In order to blur our
          image we can use a low-pass filter which only lets through lower
          frequencies and removes high frequencies. We will use a 2D gaussian
          kernel and convolution to blur our image to avoid aliasing and get a
          smooth blur.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_6.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Gaussian (2D View)
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_7.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Gaussian (3D View)
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_8.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Gaussian Blurred Image
            </figcaption>
          </figure>
        </div>
        <p className="text-lg">
          After blurring our image we can then take the gradient, like earlier,
          resulting in much cleaner edge detection with fewer artifacts. Due to
          the commutative property of convolutions we can also combine our
          partial derivative and gaussian kernels through convolution to create
          a deritive of a gaussian or DoG filter which when convolved with the
          original image gives the same result as first blurring then taking the
          gradient.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_9.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Blurred Partial Derivative of X
            </figcaption>
          </figure>

          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_10.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Blurred Partial Derivative of Y
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_11.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Blurred Gradient Magnitude
            </figcaption>
          </figure>
        </div>
        <figure className="mb-8">
          <div className="flex justify-center">
            <Image
              src="/assets/project2/q1_12.png"
              alt="Original Cameraman"
              width={400}
              height={400}
              className="w-auto h-auto"
            />
          </div>
          <figcaption className="text-sm text-center mt-2">
            Non-Blurred vs Blurred Binarized Gradient Magnitude
          </figcaption>
        </figure>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_13.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Gaussian Partial Derivative of X Kernel
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_14.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Gaussian Partial Derivative of X
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_15.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Gaussian Partial Derivative of Y Kernel
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q1_16.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Gaussian Partial Derivative of Y
            </figcaption>
          </figure>
        </div>
        <figure className="mb-8">
          <div className="flex justify-center">
            <Image
              src="/assets/project2/q1_18.png"
              alt="Original Cameraman"
              width={700}
              height={700}
              className="w-auto h-auto"
            />
          </div>
          <figcaption className="text-sm text-center mt-2">
            Binarized Gradient Magnitude Using All 3 Methods
          </figcaption>
        </figure>
        <hr />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Image Sharpening</h2>
        <p className="text-lg">
          Image sharpening is the process of enhancing the high frequency
          details of an image. In order to accomplish this we can take a
          relaitvely simple approach stemming from image blurring. For image
          blurring we used a low-pass filter so it is only natural that for
          image sharpening we can use a high-pass filter which only lets through
          high frequency signals from and image. By simply subtracting the
          low-pass filtered image from the original image we can acomplish
          exactly this. In order to sharpen our image we can then multiply our
          high frequencies by some constant value and add them to our original
          image. Through a simple derivation and use of the{" "}
          <a
            href="https://en.wikipedia.org/wiki/Dirac_delta_function"
            className="text-sky-500"
          >
            Dirac delta
          </a>{" "}
          function we can create a new filter known as the unsharp mask filter
          which can all be represented as the operation below.
        </p>
        <br />
        <MathEquation
          equation={
            "\\text{unsharp mask} = ((1 + \\alpha)*\\text{dirac delta}-\\alpha*\\text{gaussian filter})"
          }
        />
        <br />
        <p className="text-lg">
          Through this procedure we get the following result pictured below. We
          can also see what happens if we first blur and already sharpened image
          then resharpen using our procedure as shown by the mantis shrimp
          images in the figure below.
        </p>
        <figure className="mt-8 mb-8">
          <div className="flex justify-center">
            <Image
              src="/assets/project2/q2_2.png"
              alt="Original Cameraman"
              width={300}
              height={300}
              className="w-auto h-auto"
            />
          </div>
          <figcaption className="text-sm text-center mt-2">
            Taj Mahal vs Sharpened Taj Mahal
          </figcaption>
        </figure>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q2_3.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Sharp Shrimp
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q2_4.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Blurred Shrimp
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q2_5.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Resharpened Shrimp
            </figcaption>
          </figure>
        </div>
        <hr />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hybrid Images</h2>
        <p className="text-lg">
          Now we will use our high-pass filters, low-pass filters and the
          approach described in the SIGGRAPH 2006 paper by Oliva, Torralba, and
          Schyns to create hybrid images. Hybrid images are static images that
          change in interpretation as a function of the viewing distance. The
          basic idea is that high frequency tends to dominate perception when it
          is available, but, at a distance, only the low frequency (smooth) part
          of the signal can be seen. By blending the high frequency portion of
          one image with the low-frequency portion of another, you get a hybrid
          image that leads to different interpretations at different distances.
          <br />
          <br />
          Our first hybrid image will be a combination of a man and his cat.
          Note that as a preprocessing step for all hybrid images we first align
          the images based on some manually selected points. We will add a
          low-pass filter of the man and a high-pass filter of the cat in order
          to yield our hybrid image. In this case we are using gray images, but
          we can get similar generalized results from RGB images.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <figure className="mb-8 content-center">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q3_1.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Aligned Cat and Man Images
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q3_2.jpg"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Hybrid Cat and Man Images
            </figcaption>
          </figure>
        </div>
        <p className="text-lg">
          From a frequency domain perspective we can get a more geometric
          interpretation of filtering and hybrid images. By comparing the
          visualization of the amplitude versus frequency plots of the fourier
          transforms of each of the images and their respective filters we can
          see how each of the filters attenuates certain frequencies depneding
          on their respective filter. We can then see the resultant hybrid
          images fourier transform when we recombine the images.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q3_3.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Man (Fourier Transfrom)
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q3_4.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Low-Pass Filtered Man (Fourier Transfrom)
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q3_5.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Cat (Fourier Transfrom)
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q3_6.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              High-Pass Filtered Cat (Fourier Transfrom)
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q3_7.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Hybrid Image (Fourier Transform)
            </figcaption>
          </figure>
        </div>

        <p className="text-lg">
          Below we are using hybrid images to superimpose my friend Amitoj Singh
          with the Mona Lisa and to superimpose New York City before and after
          its creation which both yield interesting results.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/mona_lisa.jpg"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Mona Lisa
            </figcaption>
          </figure>
          <figure className="mb-8 content-center">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/amitoj_singh.jpg"
                alt="Original Cameraman"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Amitoj Singh
            </figcaption>
          </figure>
        </div>

        <figure className="mb-8 content-center">
          <div className="flex justify-center">
            <Image
              src="/assets/project2/mona_lisa_amitoj_singh_hybrid.jpg"
              alt="Original Cameraman"
              width={300}
              height={300}
              className="w-auto h-auto"
            />
          </div>
          <figcaption className="text-sm text-center mt-2">
            Amitoj Lisa
          </figcaption>
        </figure>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/old_new_york.png"
                alt="Original Cameraman"
                width={400}
                height={400}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Old New York
            </figcaption>
          </figure>
          <figure className="mb-8 content-center">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/new_new_york.png"
                alt="Original Cameraman"
                width={400}
                height={400}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              New New York
            </figcaption>
          </figure>
        </div>

        <figure className="mb-8 content-center">
          <div className="flex justify-center">
            <Image
              src="/assets/project2/new_york_hybrid.jpg"
              alt="Original Cameraman"
              width={500}
              height={500}
              className="w-auto h-auto"
            />
          </div>
          <figcaption className="text-sm text-center mt-2">
            New York Hybrid
          </figcaption>
        </figure>
        <hr />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Blending Images</h2>
        <p className="text-lg">
          We will now use filters to blend two images seamlessly using a multi
          resolution blending as described in the 1983 paper by Burt and
          Adelson. An image spline is a smooth seam joining two image together
          by gently distorting them. Multiresolution blending computes a gentle
          seam between the two images seperately at each band of image
          frequencies, resulting in a much smoother seam. We&lsquo;ll approach this
          section in two steps: creating and visualizing the Gaussian and
          Laplacian stacks and blending together images with the help of the
          completed stacks, and exploring outcomes.
          <br />
          <br />
          We will use both gaussian and laplacian stacks in or image blending
          algorithm. In order to create a gaussian we must iteravely convolve
          the same gaussian kernel over successive images. The end result will
          be a list or stack of images which progressively get blurrier. In
          order to create a laplacian stack we can simply take the nth level of
          the gaussian stack and subtract the n+1th level of the stack. This
          will progressively band-pass filter our image with the final level of
          the stack just being the final level of the gaussain stack.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q4_1.png"
                alt="Original Cameraman"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Apple Gaussian Stack
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q4_2.png"
                alt="Original Cameraman"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Orange Gaussian Stack
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q4_3.png"
                alt="Original Cameraman"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Apple Laplacian Stack
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q4_4.png"
                alt="Original Cameraman"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Orange Laplacian Stack
            </figcaption>
          </figure>
        </div>
        <p className="text-lg">
          We can now blend our images using the a modified version of the
          algorithm defined the aforementioned paper. We first create laplacian
          stacks for each of the images. We then get a mask which will define
          the boundary along which we want to blend our images. We take a
          gaussian stack of our mask and use it to smooth the transistion
          between images. For every level of the laplacian stacks we multiply by
          the corresponding level of the mask gaussian stack for the first
          image, and 1 - the corresponding level of the mask gaussian stack for
          the second image. We then add these two products to get the nth level
          of the combined stack. We can get our final result by adding all
          levels of the combined stack. We will first blend and apple and an
          orange along their veritical midpoint to create the oraple.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q4_5.png"
                alt="Original Cameraman"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Apple Laplacian Stack Weighted by Mask Gaussian Stack
            </figcaption>
          </figure>
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q4_6.png"
                alt="Original Cameraman"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Orange Laplacian Stack Weighted by Mask Gaussian Stack
            </figcaption>
          </figure>
        </div>

        <figure className="mb-8">
          <div className="flex justify-center">
            <Image
              src="/assets/project2/q4_7.png"
              alt="Original Cameraman"
              width={300}
              height={300}
              className="w-auto h-auto"
            />
          </div>
          <figcaption className="text-sm text-center mt-2">
            Blended Image Laplacian Stack
          </figcaption>
        </figure>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q4_8.png"
                alt="Original Cameraman"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Orapple
            </figcaption>
          </figure>
          <figure className="mb-8 content-center">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/q4_9.png"
                alt="Original Cameraman"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Apple vs Orange vs Orapple
            </figcaption>
          </figure>
        </div>
        <p className="text-lg">
          If we use a different mask we can get different results. Below are
          several other results achieved by using different masks with the same
          algorithm.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <figure className="mb-8">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/kingpin.png"
                alt="Original Cameraman"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Kingpin Donuts (Berkeley)
            </figcaption>
          </figure>
          <figure className="mb-8 content-center">
            <div className="flex justify-center">
              <Image
                src="/assets/project2/versailles.png"
                alt="Original Cameraman"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </div>
            <figcaption className="text-sm text-center mt-2">
              Outside Versailles (France)
            </figcaption>
          </figure>
        </div>
        <figure className="mb-8 content-center">
          <div className="flex justify-center">
            <Image
              src="/assets/project2/french_kingpin.png"
              alt="Original Cameraman"
              width={400}
              height={400}
              className="w-auto h-auto"
            />
          </div>
          <figcaption className="text-sm text-center mt-2">
            Frenchpin Donuts (Unknown)
          </figcaption>
        </figure>
        <hr />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
        <p className="text-lg">
          Filters and convolutions are deeply connected to the idea of image
          processing and play an important role in efficiently and effectively
          allowing us to transform images for many different purposes. Viewing
          images as signals poses a whole field of questions and is a
          perspective that is somewhat unnatural at first, but can be very
          useful for a wide range of applications. If images are failing to
          render on this page please see the attached google drive. Also if you
          are unable to access the github and are interested please send an
          email.
        </p>
      </section>
    </div>
  );
};

export default ProjectPage;
