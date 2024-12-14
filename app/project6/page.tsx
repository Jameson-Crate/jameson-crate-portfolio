'use client'

import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
        document.title = 'Neural Radiance Fields Project';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-8 lg:px-20">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group">
                <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Portfolio
            </Link>

            <h1 className="text-4xl font-bold mb-8 text-center">Neural Radiance Fields</h1>

            <div className="flex space-x-4 justify-center mb-8">
                {[
                    { href: "https://github.com/Jameson-Crate/CS180-Project6", text: "GitHub" },
                    { href: "https://drive.google.com/drive/folders/1CtAbSHUj6bNkR2TP9Fmctk6ecRbDyXMY?usp=drive_link", text: "Google Drive" },
                    { href: "https://inst.eecs.berkeley.edu/~cs180/fa24/", text: "Course Website" },
                ].map(({ href, text }) => (
                    <a href={href} key={text} className="text-gray-600 hover:text-blue-800" title={`Visit ${text}`} target="_blank" rel="noopener noreferrer">
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
                            <li><a href="#neural-fields" className="text-blue-600 hover:underline">Fitting Neural Fields to Images</a></li>
                            <li><a href="#rays" className="text-blue-600 hover:underline">Create Rays from Cameras</a></li>
                            <li><a href="#sampling" className="text-blue-600 hover:underline">Sampling Rays and Points</a></li>
                            <li><a href="#nerfs" className="text-blue-600 hover:underline">Neural Radiance Field Architecture</a></li>
                            <li><a href="#volume-rendering" className="text-blue-600 hover:underline">Volume Rendering and Novel Views</a></li>
                            <li><a href="#depth-rendering" className="text-blue-600 hover:underline">Depth Rendering</a></li>
                        </ul>
                    </div>
                </div>
                <hr className="mt-8" />
            </section>

            <section id="abstract" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
                <p className="text-lg">
                    With multiple views of a scene or object as well as camera poses and camera instrinsics we can we train
                    a model to generate novel views not in the training set of the same object. In this first part of this
                    project we train a MLP to map xy coordinates to rgb values to store image information inside the MLP
                    as a neural field. In the second part of this project we implement NeRF by first sampling rays from a
                    set of camera views and then sampling points along those rays. We then create an MLP which takes in
                    points along a ray as well as the direction of the ray and returns the color and volume density of
                    the specified point. We then take the colors and volume densities of sampled points along a ray and
                    approximate integrating using a quadrature to get the resulting RGB value at the corresponding point
                    to the ray.
                </p>
                <hr className="mt-8" />
            </section>

            <section id="neural-fields" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Fitting Neural Fields to 2D Images</h2>
                <p className="text-lg">
                    From previous projects we established the concept of images as functions which take in xy coordinates
                    and output a real value (or 3 real values for color images). Neural networks are structures which can
                    act as universal function approximators. Since images can be viewed as functions this means we can
                    train a neural network to approximate the function which describes and image, thus storing the image
                    within the weights of the network. In order to accomplish this we will first postionally encode our
                    coordinates within several sin waves in order to ensure that the model is able to capture high
                    frequency changes in the image, a task which with neural networks have been proven to be imperfect at.
                    We use the following positional embedding:
                </p>
                <br />
                <ImageFigure src="/assets/project6/positional_embedding.png" alt="positional-embedding" caption="" width={750} height={500} />
                <p className="text-lg">
                    We then use the following MLP architecture:
                </p>
                <br />
                <ImageFigure src="/assets/project6/nf_img.jpg" alt="neural-field" caption="" width={500} height={500} />
                <p className="text-lg">
                    Training for 1000 iterations yields the following results which are decent; however, some high frequency
                    details are left out and there is some aliasing implying there is possbility for optimization.
                </p>
                <br />
                <ImageFigure src="/assets/project6/fox_nf_1k_steps_10k_bs.png" alt="neural-field-fox-graph" caption="1k Fox Traning Loss and PSNR" width={1000} height={500} />
                <ImageFigure src="/assets/project6/fox_nf_1k_steps_10k_bs_over_steps.png" alt="neural-field-fox-graph" caption="1k Fox Generation Over Steps" width={1000} height={500} />
                <ImageFigure src="/assets/project6/fox_nf_1k_steps_10k_bs_image.png" alt="neural-field-fox" caption="1k Fox Ground Truth Comparison" width={1000} height={500} />
                <p className="text-lg">
                    After experimenting with different values we found that with 3000 iterations we are able to get better
                    results as shown below with the following images.
                </p>
                <br />
                <ImageFigure src="/assets/project6/fox_nf_3k_steps_10k_bs.png" alt="neural-field-fox-graph" caption="3k Fox Traning Loss and PSNR" width={1000} height={500} />
                <ImageFigure src="/assets/project6/fox_nf_3k_steps_10k_bs_image.png" alt="neural-field-fox" caption="3k Fox Ground Truth Comparison" width={1000} height={500} />
                <ImageFigure src="/assets/project6/david_nf_3k_steps_10k_bs.png" alt="neural-field-fox-graph" caption="3k David Traning Loss and PSNR" width={1000} height={500} />
                <ImageFigure src="/assets/project6/david_nf_3k_steps_10k_bs_img.png" alt="neural-field-fox" caption="3k David Ground Truth Comparison" width={1000} height={500} />
                <hr className="mt-8" />
            </section>

            <section id="rays" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Generating Rays From Pixels</h2>
                <p className="text-lg">
                    In order to train a neural radiance field, we first need to create a dataloader capable of sampling
                    rays from input coordinates and providing the corresponding ground truth color value at the sampled pixel.
                    We first developed a method to convert points between camera and world
                    coordinate spaces using a rotation matrix and translation vector, creating transformation matrices that
                    allow bidirectional mapping. Subsequently, we implemented a pixel-to-camera coordinate conversion process
                    using an intrinsic matrix, which enables the projection of 3D points onto a 2D image plane. The final
                    component of our implementation focused on ray generation, where we derived a method to calculate ray
                    origins and directions for each pixel by leveraging the previously developed coordinate transformation
                    techniques. Our implementation supports batched coordinate processing and provides flexible functionality
                    that can be used with both NumPy and PyTorch, enhancing the versatility of the coordinate transformation pipeline.
                </p>
                <hr className="mt-8" />
            </section>

            <section id="sampling" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Sampling Rays and Points</h2>
                <p className="text-lg">
                    We can use the functions from the previous section to randomly select cameras and coordinates in those
                    cameras and then generate rays for each of those coordinates as well as get the pixel values corresponding
                    to each of the cameras and the rays. Finally we can sample points along each of the rays which we will
                    pass into our neural radiance field. For training we add small perturbations to where we sample our points
                    from in order to approximate sampling along the entire ray. The resulting cameras, rays, and points are
                    shown below:
                </p>
                <br />
                <ImageFigure src="/assets/project6/sampled_rays_2.png" alt="sampled-rays" caption="Sampled Cameras, Rays, and Points" width={500} height={500} />
                <hr className="mt-8" />
            </section>

            <section id="nerfs" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">NeRF Architecture</h2>
                <p className="text-lg">
                    For the architecture of our model we once again use positional encoding in order to assist the model
                    in capturing high frequency portions of the function. We concatenate our original positional encoding
                    half way through training in order to ensure that our model does not forget the original position.
                    After several fully connected layers and activations we split into predicting the color of each point
                    and the volume density of each point which can essentially be thought of as the amount of mass at some
                    point.
                </p>
                <br />
                <ImageFigure src="/assets/project6/mlp_nerf.png" alt="nerf-arch" caption="" width={1000} height={500} />
                <hr className="mt-8" />
            </section>

            <section id="volume-rendering" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Volume Rendering and Novel Views</h2>
                <p className="text-lg">
                    In order to make predictions about pixel colors with our MLP we need to aggregate the points we sampled
                    along our rays using some differentiable function. For our purposes we will integrate all of the points
                    along the ray using the following integral which depends on volume density, pointwise color, and sampling
                    step size:
                </p>
                <br />
                <ImageFigure src="/assets/project6/volume_integral.png" alt="volume-integral" caption="" width={750} height={500} />
                <p className="text-lg">
                    We can approximate this integral using the following qudrature:
                </p>
                <br />
                <ImageFigure src="/assets/project6/volume_quadrature.png" alt="volume-quadrature" caption="" width={750} height={500} />
                <p className="text-lg">
                    With volume rendering implemented we can now predict rgb values of specific pixels and calculate the mean
                    square error loss between the predicted rgb value and actual rgb value then train the MLP with back
                    propagation. Training over 1.5k gradient update iterations with a batch size of 10k and using an Adam
                    optimizer with a learning rate of 5e-4 we get the following results:
                </p>
                <br />
                <ImageFigure src="/assets/project6/nerf_validation_plot.png" alt="nerf-validation" caption="NeRF Validation Loss and PSNR" width={750} height={500} />
                <ImageFigure src="/assets/project6/nerf_over_steps.png" alt="nerf-train-over-time" caption="NeRF Generation Over Iterations" width={750} height={500} />
                <p className="text-lg">
                    With our fully trained model we are able to generate novel views of our object / scene that were not
                    in the training set as shown in the gif below:
                </p>
                <br />
                <ImageFigure src="/assets/project6/nerf_tractor.gif" alt="nerf-novel-views" caption="NeRF Novel Views" width={500} height={500} />
                <hr className="mt-8" />
            </section>

            <section id="depth-rendering" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Depth Rendering</h2>
                <p className="text-lg">
                    We can replace the pointwise rgb value in the volume rendring equation with the depth along the specific
                    ray in the volume rendering equation to instead render depth using the same model that was trained on
                    the original views of the object / scene. We essentially get the depth of the object from any novel
                    or existing view without additional training which can be shown below:
                </p>
                <br />
                <ImageFigure src="/assets/project6/depth_tractor.gif" alt="nerf-novel-views" caption="NeRF Depth" width={500} height={500} />
                <hr className="mt-8" />
            </section>
        </div>
    )
};

export default ProjectPage;