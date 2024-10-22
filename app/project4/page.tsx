import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";
import { MathEquation } from "../components/ui/math-equation";

const ProjectPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
                <ArrowLeft size={20} className="mr-2" />
                Back to Portfolio
            </Link>

            <h1 className="text-4xl font-bold mb-8">[ Homography and Image Stitching ]</h1>

            <div className="flex space-x-4">
                <a
                    href="https://github.com/Jameson-Crate/CS180-Project4"
                    className="text-gray-600 hover:text-blue-800"
                >
                    <h3>Github</h3>
                </a>
                <a
                    href="https://drive.google.com/drive/folders/1uEHzyYiqfzw4LEfyp3FArlBDBab7PVjV?usp=sharing"
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
                    Multiple images taken with the same center of projection can be transformed into each other using homography / projective transformations. In order
                    to discover these transformations we can use correspondence points from each image. In this project we use homography to stitch several images with
                    the same center of project (COP) together to create an image mosaic.
                </p>
                <hr className="mb-4" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Homography</h2>
                <p className="text-lg">
                    In order to get image with the same center of projection we can fix our camera at some point and only rotate it to get several images. We can then manually
                    select correspondence points and use linear algebra to calculate homographies between different images. We select our correspondence points usually to be
                    edges in corresponding pictures because they are easy to match. Below are pictures of corresponding points.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/bedroom_1.png"
                                alt="Project Image"
                                width={1000}
                                height={1000}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Bedroom Corresponding Points
                        </figcaption>
                    </figure>
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/bedroom_2.png"
                                alt="Project Image"
                                width={1000}
                                height={1000}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Bedroom Corresponding Points
                        </figcaption>
                    </figure>
                </div>
                <p className="text-lg">
                    To calculate the necessary projective transformation we can solve a set of linear equations for the 8 parameters of the transformation. This means we need at
                    least 4 points to compute this transformation. In practice it is helpful to use more than 4 points and solve the system using OLS. We derive out system of equations
                    as shown below. Notice the scaling constant in projective transformation. For all of our purposes we can simply divide each component of the resulting 3D
                    coordinate by the scaling constant to recover the homogenous output coordinate.
                </p>
                <br />
                <div>
                    <br />
                    <div className="grid grid-cols-2">
                        <MathEquation
                            equation={`H = \\begin{bmatrix} h_{11} & h_{12} & h_{13} \\\\ h_{21} & h_{22} & h_{23} \\\\ h_{31} & h_{32} & 1 \\end{bmatrix}`}
                        />
                        <MathEquation
                            equation={`W = \\begin{bmatrix} h_{11} \\\\ h_{12} \\\\ h_{13} \\\\ h_{21} \\\\ h_{22} \\\\ h_{23} \\\\ h_{31} \\\\ h_{32} \\\\ 1 \\end{bmatrix}`}
                        />
                    </div>
                    <br />

                    <MathEquation
                        equation={`v = \\begin{bmatrix} p1_{x} & p1_{y} & 1 & 0 & 0 & 0 & -p1_{x} \\cdot p2_{x} & -p1_{y} \\cdot p2_{x} \\end{bmatrix}`}
                    />
                    <br />

                    <MathEquation
                        equation={`u = \\begin{bmatrix} 0 & 0 & 0 & p1_{x} & p1_{y} & 1 & -p1_{x} \\cdot p2_{y} & -p1_{y} \\cdot p2_{y} \\end{bmatrix}`}
                    />
                    <br />

                    <MathEquation
                        equation={`\\begin{bmatrix} p1_{x} & p1_{y} & 1 & 0 & 0 & 0 & -p1_{x} \\cdot p2_{x} & -p1_{y} \\cdot p2_{x} \\\\ 0 & 0 & 0 & p1_{x} & p1_{y} & 1 & -p1_{x} \\cdot p2_{y} & -p1_{y} \\cdot p2_{y} \\end{bmatrix}
        \\cdot \\begin{bmatrix} h_{11} \\\\ h_{12} \\\\ h_{13} \\\\ h_{21} \\\\ h_{22} \\\\ h_{23} \\\\ h_{31} \\\\ h_{32} \\\\ 1 \\end{bmatrix} = 
        \\begin{bmatrix} p2_{x} \\\\ p2_{y} \\end{bmatrix}`}
                    />
                    <br />
                </div>
                <hr className="mb-4" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Image Rectification</h2>
                <p className="text-lg">
                    Using the principles of projective transformations and homography we can rectify images, that is we can take an image of a rectangular object from a perspective
                    where the image of the object is not rectangular and make it rectangular again. In order to do this we simply compute the homography between the corners of the
                    object and four corners of a rectangle, then compute the transformation between the first set of points and the second. We then apply the transformation to the
                    original image as shown below.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/door.JPG"
                                alt="Project Image"
                                width={750}
                                height={750}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Unrectified Door
                        </figcaption>
                    </figure>
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/door.png"
                                alt="Project Image"
                                width={1000}
                                height={1000}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Rectified Door
                        </figcaption>
                    </figure>
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/inter_pre.png"
                                alt="Project Image"
                                width={750}
                                height={750}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Unrectified Poster
                        </figcaption>
                    </figure>
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/inter.png"
                                alt="Project Image"
                                width={1000}
                                height={1000}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Rectified Poster
                        </figcaption>
                    </figure>
                </div>
                <hr className="mb-4" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Image Stitching and Mosaics</h2>
                <p className="text-lg">
                    In order to stich our images together we can simply use the homographies we computed in the first section between our correspondence points to
                    transform our images toward one image we choose. In this case we will use the center image as our central coordinate system. We can simply transform
                    the images and then shift them the necessary amount as determined by our transformations output in order to align our images on the coordinate system.
                    Once our images are aligned on a central coordinate system we can blend our images together to get our final result. For this project I used
                    Laplacian stacks to blend my images which neatly deals with merging high frequency and low frequency components of both images. For more information
                    check filtering project on the main page of my portfolio. Below are examples of images and their corresponding mosaics.
                </p>
                <div className="mt-8 grid gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/fd1.JPG"
                                alt="Project Image"
                                width={750}
                                height={750}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Front Door 1
                        </figcaption>
                    </figure>
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/fd2.JPG"
                                alt="Project Image"
                                width={1000}
                                height={1000}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Front Door 2
                        </figcaption>
                    </figure>
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/fd3.JPG"
                                alt="Project Image"
                                width={750}
                                height={750}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Front Door 3
                        </figcaption>
                    </figure>
                </div>
                <figure className="mb-8">
                    <div className="flex justify-center">
                        <Image
                            src="/assets/project4/front_door_mosaic.jpg"
                            alt="Project Image"
                            width={1000}
                            height={1000}
                            className="w-auto h-auto"
                        />
                    </div>
                    <figcaption className="text-sm text-center mt-2">
                        Front Door Mosaic
                    </figcaption>
                </figure>
                <div className="mt-8 grid gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/bd1.JPG"
                                alt="Project Image"
                                width={750}
                                height={750}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Bedroom 1
                        </figcaption>
                    </figure>
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/bd2.JPG"
                                alt="Project Image"
                                width={1000}
                                height={1000}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Bedroom 2
                        </figcaption>
                    </figure>
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/bd3.JPG"
                                alt="Project Image"
                                width={750}
                                height={750}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Bedroom 3
                        </figcaption>
                    </figure>
                </div>
                <figure className="mb-8">
                    <div className="flex justify-center">
                        <Image
                            src="/assets/project4/bedroom_mosaic.jpg"
                            alt="Project Image"
                            width={1000}
                            height={1000}
                            className="w-auto h-auto"
                        />
                    </div>
                    <figcaption className="text-sm text-center mt-2">
                        Bedroom Mosaic
                    </figcaption>
                </figure>
                <div className="mt-8 grid gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/str1.jpg"
                                alt="Project Image"
                                width={750}
                                height={750}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Street 1
                        </figcaption>
                    </figure>
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/str2.jpg"
                                alt="Project Image"
                                width={1000}
                                height={1000}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Street 2
                        </figcaption>
                    </figure>
                    <figure className="mb-8">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/project4/str3.jpg"
                                alt="Project Image"
                                width={750}
                                height={750}
                                className="w-auto h-auto"
                            />
                        </div>
                        <figcaption className="text-sm text-center mt-2">
                            Street 3
                        </figcaption>
                    </figure>
                </div>
                <figure className="mb-8">
                    <div className="flex justify-center">
                        <Image
                            src="/assets/project4/street_mosaic.jpg"
                            alt="Project Image"
                            width={1000}
                            height={1000}
                            className="w-auto h-auto"
                        />
                    </div>
                    <figcaption className="text-sm text-center mt-2">
                        Street Mosaic
                    </figcaption>
                </figure>
            </section>
            <hr className="mb-4" />
        </div>
    );
};

export default ProjectPage;