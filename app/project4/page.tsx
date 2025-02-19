'use client'

import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { MathEquation } from '../components/ui/math-equation';

// Component to render each figure with image and caption
const ImageFigure = ({ src, alt, caption, width = 750, height = 750 }: { src: string, alt: string, caption: string, width?: number, height?: number }) => (
    <figure className="mb-8">
        <div className="flex justify-center">
            <Image src={src} alt={alt} width={width} height={height} className="rounded-lg transition-transform hover:scale-105" />
        </div>
        <figcaption className="text-sm text-center mt-2 text-gray-500">{caption}</figcaption>
    </figure>
);

const ProjectPage = () => {
    useEffect(() => {
        document.title = 'Homography and Automatic Image Stitching Project';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-8 lg:px-20">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group">
                <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Portfolio
            </Link>

            <h1 className="text-4xl font-bold mb-8 text-center">Homography and Image Stitching</h1>

            <div className="flex space-x-4 justify-center mb-8">
                {[
                    { href: "https://github.com/Jameson-Crate/CS180-Project4", text: "GitHub" },
                    { href: "https://drive.google.com/drive/folders/1uEHzyYiqfzw4LEfyp3FArlBDBab7PVjV?usp=sharing", text: "Google Drive" },
                ].map(({ href, text }) => (
                    <a href={href} key={text} className="text-gray-600 hover:text-blue-800" title={`Visit ${text}`} target="_blank" rel="noopener noreferrer">
                        <h3>{text}</h3>
                    </a>
                ))}
            </div>

            <hr className="mb-8" />

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
                <p className="text-lg leading-relaxed">
                    Multiple images taken with the same center of projection can be transformed into each other using homography / projective transformations. In order
                    to discover these transformations we can use correspondence points from each image. In this project we use homography to stitch several images with
                    the same center of project (COP) together to create an image mosaic. We can then use concepts from optimization in order to systematically find key
                    points and automatically create these image mosaics.
                </p>
                <br />
                <hr className="mb-4" />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Homography</h2>
                <p className="text-lg leading-relaxed">
                    In order to get image with the same center of projection we can fix our camera at some point and only rotate it to get several images. We can then manually
                    select correspondence points and use linear algebra to calculate homographies between different images. We select our correspondence points usually to be
                    edges in corresponding pictures because they are easy to match. Below are pictures of corresponding points.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <ImageFigure src="/assets/project4/bedroom_1.png" alt="Bedroom Corresponding Points 1" caption="Bedroom Corresponding Points 1" />
                    <ImageFigure src="/assets/project4/bedroom_2.png" alt="Bedroom Corresponding Points 2" caption="Bedroom Corresponding Points 2" />
                </div>

                <p className="text-lg leading-relaxed">
                    To calculate the necessary projective transformation we can solve a set of linear equations for the 8 parameters of the transformation. This means we need at
                    least 4 points to compute this transformation. In practice it is helpful to use more than 4 points and solve the system using OLS. We derive out system of equations
                    as shown below. Notice the scaling constant in projective transformation. For all of our purposes we can simply divide each component of the resulting 3D
                    coordinate by the scaling constant to recover the homogenous output coordinate.
                </p>
                <div className="hidden md:flex flex-col items-center p-4 space-y-4">
                    <div className="w-full overflow-x-auto text-center p-2">
                        <MathEquation
                            equation={
                                "H = \\begin{bmatrix} h_{11} & h_{12} & h_{13} \\\\ h_{21} & h_{22} & h_{23} \\\\ h_{31} & h_{32} & 1 \\end{bmatrix} \\qquad \\qquad \
            W = \\begin{bmatrix} h_{11} \\\\ h_{12} \\\\ h_{13} \\\\ h_{21} \\\\ h_{22} \\\\ h_{23} \\\\ h_{31} \\\\ h_{32} \\\\ 1 \\end{bmatrix}"
                            }
                        />
                    </div>

                    <div className="w-full overflow-x-auto text-center p-2">
                        <MathEquation
                            equation={
                                "v = \\begin{bmatrix} p1_{x} & p1_{y} & 1 & 0 & 0 & 0 & -p1_{x} \\cdot p2_{x} & -p1_{y} \\cdot p2_{x} \\end{bmatrix}"
                            }
                        />
                    </div>

                    <div className="w-full overflow-x-auto text-center p-2">
                        <MathEquation
                            equation={
                                "u = \\begin{bmatrix} 0 & 0 & 0 & p1_{x} & p1_{y} & 1 & -p1_{x} \\cdot p2_{y} & -p1_{y} \\cdot p2_{y} \\end{bmatrix}"
                            }
                        />
                    </div>

                    <div className="w-full overflow-x-auto text-center p-2">
                        <MathEquation
                            equation={
                                "\\begin{bmatrix} p1_{x} & p1_{y} & 1 & 0 & 0 & 0 & -p1_{x} \\cdot p2_{x} & -p1_{y} \\cdot p2_{x} \\\\ 0 & 0 & 0 & p1_{x} & p1_{y} & 1 & -p1_{x} \\cdot p2_{y} & -p1_{y} \\cdot p2_{y} \\end{bmatrix} \
          \\cdot \\begin{bmatrix} h_{11} \\\\ h_{12} \\\\ h_{13} \\\\ h_{21} \\\\ h_{22} \\\\ h_{23} \\\\ h_{31} \\\\ h_{32} \\\\ 1 \\end{bmatrix} = \
          \\begin{bmatrix} p2_{x} \\\\ p2_{y} \\end{bmatrix}"
                            }
                        />
                    </div>
                </div>
                <hr className="mb-4" />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Image Rectification</h2>
                <p className="text-lg leading-relaxed">
                    Using the principles of projective transformations and homography we can rectify images, that is we can take an image of a rectangular object from a perspective
                    where the image of the object is not rectangular and make it rectangular again. In order to do this we simply compute the homography between the corners of the
                    object and four corners of a rectangle, then compute the transformation between the first set of points and the second. We then apply the transformation to the
                    original image as shown below.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <ImageFigure src="/assets/project4/door.JPG" alt="Unrectified Door" caption="Unrectified Door" />
                    <ImageFigure src="/assets/project4/door.png" alt="Rectified Door" caption="Rectified Door" />
                    <ImageFigure src="/assets/project4/inter_pre.png" alt="Unrectified Poster" caption="Unrectified Poster" />
                    <ImageFigure src="/assets/project4/inter.png" alt="Rectified Poster" caption="Rectified Poster" />
                </div>
                <hr className="mb-4" />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Image Stitching and Mosaics</h2>
                <p className="text-lg leading-relaxed">
                    In order to stich our images together we can simply use the homographies we computed in the first section between our correspondence points to
                    transform our images toward one image we choose. In this case we will use the center image as our central coordinate system. We can simply transform
                    the images and then shift them the necessary amount as determined by our transformations output in order to align our images on the coordinate system.
                    Once our images are aligned on a central coordinate system we can blend our images together to get our final result. For this project I used
                    Laplacian stacks to blend my images which neatly deals with merging high frequency and low frequency components of both images. For more information
                    check filtering project on the main page of my portfolio. Below are examples of images and their corresponding mosaics.
                </p>



                <ImageFigure src="/assets/project4/front_door_mosaic.jpg" alt="Front Door Mosaic" caption="Front Door Mosaic" />
                <hr className="mb-4" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <ImageFigure src="/assets/project4/bd1.JPG" alt="Bedroom 1" caption="Bedroom 1" />
                    <ImageFigure src="/assets/project4/bd2.JPG" alt="Bedroom 2" caption="Bedroom 2" />
                    <ImageFigure src="/assets/project4/bd3.JPG" alt="Bedroom 3" caption="Bedroom 3" />
                </div>

                <ImageFigure src="/assets/project4/bedroom_mosaic.jpg" alt="Bedroom Mosaic" caption="Bedroom Mosaic" />
                <hr className="mb-4" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <ImageFigure src="/assets/project4/str1.jpg" alt="Street 1" caption="Street 1" />
                    <ImageFigure src="/assets/project4/str2.jpg" alt="Street 2" caption="Street 2" />
                    <ImageFigure src="/assets/project4/str3.jpg" alt="Street 3" caption="Street 3" />
                </div>

                <ImageFigure src="/assets/project4/street_mosaic.jpg" alt="Street Mosaic" caption="Street Mosaic" />
                <hr className="mb-4" />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Detecting Points with Harris Corners</h2>
                <p className="text-lg leading-relaxed">
                    So far we have relied on manually selected feature points; however, this is time consuming and tedious.
                    We will now automate this task through first detecting a large set of possible matching key-points and then
                    selecting a subset of those points using several algorithms. Our first step will be to get a large set of
                    possible key points. In order to do this we can use Harris Corners. Essentially the idea here is that
                    good feature points often fall at corners because they are easy to match across images. In order to systematically
                    find corners we can take the gradient in both the x and y dimensions, compute the second moment matrix, and analyze
                    the diagonalized form of the matrix. If eigenvalues of the second moment matrix (M) are both larger and close to each other
                    then we are likely at a corner because small changes in either of those directions would yield large changes in the
                    image function. This can be formalized by calculating the corner response function det(M) / Trace(M). We can consider this
                    functions local maximums as potential key-points. Shown below is an image, its corner response function plot, and the
                    selected key-points.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <ImageFigure src="/assets/project4/astronaut.jpg" alt="Astronaut" caption="Astronaut" />
                    <ImageFigure src="/assets/project4/corner_response.png" alt="Corner Response" caption="Corner Response" />
                    <ImageFigure src="/assets/project4/harris_corners.png" alt="Harris Corners" caption="Harris Corners" />
                </div>
                <hr className="mb-4" />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Adaptive Non-Maximal Suppression</h2>
                <p className="text-lg leading-relaxed">
                    With our potential feature points we can now narrow our selection. This will improve the efficiency of our feature matching
                    and outlier rejection in the next sections. We will use a technique known as Adaptive Non-Maximal Suppression in order to
                    narrow our selection of points. This technique selects the points with the highest corner response while ensuring that points
                    are reasonably spread out. It works by having a window and selecting the best point as measured by the corner response for that
                    window. We then recursively reduce the size of the window and select the next best points until we get the number of specified points.
                    For our purposes we selected 500 key-points using this method. In practice this set of points forms an ordered list which can be
                    computed much more efficiently that the recursive approach. We compute this list and select the 500 best points to get the following result.
                </p>
                <br />
                <ImageFigure src="/assets/project4/anms_points.png" alt="ANMS Points" caption="ANMS Points" />
                <hr className="mb-4" />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Feature Descriptors</h2>
                <p className="text-lg leading-relaxed">
                    We now move towards the task of matching key-points across photos. Ideally across photos similar key points in regions of interest
                    were found because in both images the corner response is high. We can take advantage of the fact to match the key points. In order
                    to know if two points are similar we can look in a local region surrounding the point and compute a vector which says what the region
                    looks like. We do this by sampling every 5 pixels in a 40x40 range surrounding the image to get an 8x8 sample which we flatten into a
                    64 dimensional vector as a feature descriptor. These vectors correspond to a specific key-point. Some of the pre-flattened feature
                    descriptors are shown below.
                </p>
                <br />
                <ImageFigure src="/assets/project4/feature_descriptors.png" alt="Feature Descriptors" caption="Feature Descriptors" width={1000} />
                <hr className="mb-4" />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Matching Key-Points</h2>
                <p className="text-lg leading-relaxed">
                    With our feature descriptors we can move on to the task of matching descriptors across images. Some properties that would be nice
                    for our matches to have are symmetry (if x is a match to y, y is a match to x) and certainty (if x is a match to y1 then x is not
                    close to being a match to y2). A natural approach to finding pairs of matching feature detectors is to use nearest neighbors where
                    we compute the Euclidean distance between feature detectors and choose the first neighbor of each descriptor to be its pair. To get
                    symmetry as desired we can ensure that features x and y are only a pair if x is the first neighbor of y and y is the first neighbor of
                    x. This will ensure that if y is the first neighbor of x1 and x2 then only one of the pairs matches with y. In order to get the second
                    desired property we can consider the 2nd neighbor of each feature point. Ideally the distance from a points first neighbor should be much less
                    than the distance to the points second neighbor. This will ensure that certainty is preserved. We can simply compute the ratio of these two
                    distances and threshold at a chosen hyper-parameter value in order to get this property. After completing these steps we get the following result.
                </p>
                <br />
                <ImageFigure src="/assets/project4/feature_match.png" alt="Feature Match" caption="Feature Match" width={1000} />
                <hr className="mb-4" />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Outlier Rejection with RANSAC</h2>
                <p className="text-lg leading-relaxed">
                    We can see that many of our feature matches are decent; however, there are still some serious outliers that will hinder our mosaic
                    if we were to try and compute our homographies with these points. These points are particularly difficult to handle due to the
                    nature of their being. These points survived all of our other attempts to remove outliers and find correct points. In order to solve
                    this we turn to RANSAC. RANSAC is an exponential runtime algorithm in the number of parameters, but it can be very precise in removing
                    outliers. With so few points left the exponential runtime will not prove to be a hinderance, and we will still be able to remove outliers in
                    reasonable time. RANSAC essentially picks a random combination of points and computes the desired transformation for those points. It then
                    uses that transformation on every point pair and computes how many of the point pairs agreed with that transformation (for a point pair x and y
                    we want T(x) to be sufficiently close to y as determined by a hyper-parameter). We compute the total number of pairs which agreed with the transformation
                    and compare it to the previous best total number of pairs. If the total number of pairs for this transformation is larger we set it as our best and remember
                    the set of points which agreed with the transformation. We repeat this process for some N number of iterations. If the algorithm is run for enough iterations
                    we will eventually find a set of points which are free of outliers that we can use to compute our homography.
                </p>
                <br />
                <ImageFigure src="/assets/project4/ransac_points.png" alt="RANSAC Points" caption="RANSAC Points" width={1000} />
                <hr className="mb-4" />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Auto-Generating Mosaics</h2>
                <p className="text-lg leading-relaxed">
                    With our automatically selected feature points in each image we are now ready to combine everything to automatically compute mosaics. We simply follow
                    the following steps: detect features using Harris corners, narrow the selection using ANMS, get feature descriptors using MOPS, find matching feature descriptors,
                    remove outliers with RANSAC, compute homographies, warp images into some base image, and finally blend the images together to get our mosaic. Here are some of the
                    following results from running this process.
                </p>
                <br />
                <ImageFigure src="/assets/project4/hearst_mosaic.jpg" alt="Genomics Building Auto Mosaic" caption="Genomics Building Auto Mosaic" />
                <br />
                <ImageFigure src="/assets/project4/bww_mosaic.jpg" alt="Transfer Building Auto Mosaic" caption="Transfer Building Auto Mosaic" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <ImageFigure src="/assets/project4/front_door_mosaic.jpg" alt="Front Door Manual Mosaic" caption="Front Door Manual Mosaic" />
                    <ImageFigure src="/assets/project4/front_door_auto_mosaic.jpg" alt="Front Door Auto Mosaic" caption="Front Door Auto Mosaic" />
                </div>
                <hr className="mb-4" />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
                <p className="text-lg leading-relaxed">
                    The first three projects all come together in the first part of this project. We use pyramids, blurring, and warping to
                    get our image mosaics. We then introduced concepts from optimization such as searching for local maximums and the 
                    second moment matrix to automatically find correspondence points. We finish by using RANSAC and combining everything to
                    get our final results.
                </p>
            </section>
        </div>

    );
};

export default ProjectPage;
