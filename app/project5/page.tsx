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
        document.title = 'Denoising Diffusion Models Project';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-8 lg:px-20">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group">
                <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Portfolio
            </Link>

            <h1 className="text-4xl font-bold mb-8 text-center">Denoising Diffusion Models</h1>

            <div className="flex space-x-4 justify-center mb-8">
                {[
                    { href: "https://github.com/Jameson-Crate/CS180-Project5", text: "GitHub" },
                    { href: "https://drive.google.com/drive/folders/1SR6gJRUYElqwqDcRJI8tGN7nFnnZ6fCu?usp=drive_link", text: "Google Drive" },
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
                        <h3 className="text-xl font-semibold mb-2">Part A: Pre-trained Diffusion Models</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li><a href="#image-generation" className="text-blue-600 hover:underline">Image Generation</a></li>
                            <li><a href="#sampling-loops" className="text-blue-600 hover:underline">Sampling Loops</a></li>
                            <li><a href="#classical-denoising" className="text-blue-600 hover:underline">Classical Denoising</a></li>
                            <li><a href="#one-step-denoising" className="text-blue-600 hover:underline">One-Step Denoising</a></li>
                            <li><a href="#iterative-denoising" className="text-blue-600 hover:underline">Iterative Denoising</a></li>
                            <li><a href="#diffusion-model-sampling" className="text-blue-600 hover:underline">Diffusion Model Sampling</a></li>
                            <li><a href="#classifier-free-guidance" className="text-blue-600 hover:underline">Classifier-Free Guidance</a></li>
                            <li><a href="#image-to-image-translation" className="text-blue-600 hover:underline">Image-to-image Translation</a></li>
                            <li><a href="#editing-hand-drawn-and-web-images" className="text-blue-600 hover:underline">Editing Hand-Drawn and Web Images</a></li>
                            <li><a href="#inpainting" className="text-blue-600 hover:underline">Inpainting</a></li>
                            <li><a href="#text-conditional-image-to-image-translation" className="text-blue-600 hover:underline">Text-Conditional Image-to-image Translation</a></li>
                            <li><a href="#visual-anagrams" className="text-blue-600 hover:underline">Visual Anagrams</a></li>
                            <li><a href="#hybrid-images" className="text-blue-600 hover:underline">Hybrid Images</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Part B: Training a Diffusion Model</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li><a href="#implementing-unets" className="text-blue-600 hover:underline">Implementing UNets</a></li>
                            <li><a href="#using-the-unet-to-train-a-denoiser" className="text-blue-600 hover:underline">Using the UNet to Train a Denoiser</a></li>
                            <li><a href="#out-of-distribution-testing" className="text-blue-600 hover:underline">Out-of-Distribution Testing</a></li>
                            <li><a href="#adding-time-conditioning-to-unet" className="text-blue-600 hover:underline">Adding Time Conditioning to UNet</a></li>
                            <li><a href="#training-the-time-conditioned-unet" className="text-blue-600 hover:underline">Training the Time-Conditioned UNet</a></li>
                            <li><a href="#sampling-from-the-time-conditioned-unet" className="text-blue-600 hover:underline">Sampling from the Time-Conditioned UNet</a></li>
                            <li><a href="#adding-class-conditioning-to-unet" className="text-blue-600 hover:underline">Adding Class Conditioning to UNet</a></li>
                            <li><a href="#sampling-from-the-class-conditioned-unet" className="text-blue-600 hover:underline">Sampling from the Class-Conditioned UNet</a></li>
                        </ul>
                    </div>
                </div>
                <hr className="mt-8" />
            </section>

            <section id="abstract" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
                <p className="text-lg">
                    Denoising diffusion models learn the underlying probability distribution of a dataset of natural images and sample from it
                    to create new images not in the original dataset. In this project we use the diffusion model DeepFloyd IF to
                    generate new images, similar images, image edits, visual anagrams and hybrid images. We then create our own denoising
                    model and diffusion model to denoise and generate MNIST digit images.
                </p>
                <hr className="mt-8" />
            </section>

            <section id="part-a" className="mb-8">
                <h2 className="text-3xl font-semibold mb-4">Part A: Pre-trained Diffusion Models</h2>
                <p className="text-lg">
                    In this part we use DeepFloyd IF, an open source model on Hugging Face for a variety of image generation tasks. DeepFloyd IF
                    is a novel state-of-the-art open-source text-to-image model with a high degree of photorealism and language understanding.
                    The model is a modular composed of a frozen text encoder and three cascaded pixel diffusion modules. For most of this part
                    we will only use the first two cascaded pixel diffusion modules due to memory constraints.
                </p>
                <hr className="mt-8" />
            </section>

            <section id="image-generation" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Image Generation</h2>
                <p className="text-lg">
                    We can start by passing in several prompts to the model to do conditioned generation. The model has
                    been conditioned using text embeddings which allows the model to generate images of specific object descriptions.
                    Diffusion models create new images by starting with entirely noisy images and iteratively removing noise
                    for a certain number of inference steps which we can specify. For this project we seed all random generation
                    with the value 2718 to ensure reproducibility.
                </p>
                <br />
                <h3 className="text-center font-semibold">Phase 1: 20 steps, Phase 2: 20 steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/0_0.png" alt='an oil painting of a snowy mountain village'
                        caption='an oil painting of a snowy mountain village' width={500} height={500} />
                    <ImageFigure src="/assets/project5/0_1.png" alt='a man wearing a hat' caption='a man wearing a hat' width={500} height={500} />
                    <ImageFigure src="/assets/project5/0_2.png" alt="a rocket ship" caption="a rocket ship" width={500} height={500} />
                </div>
                <h3 className="text-center font-semibold">Phase 1: 10 steps, Phase 2: 10 steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/0_3.png" alt='an oil painting of a snowy mountain village'
                        caption='an oil painting of a snowy mountain village' width={500} height={500} />
                    <ImageFigure src="/assets/project5/0_4.png" alt='a man wearing a hat' caption='a man wearing a hat' width={500} height={500} />
                    <ImageFigure src="/assets/project5/0_5.png" alt="a rocket ship" caption="a rocket ship" width={500} height={500} />
                </div>
                <hr />
            </section>

            <section id="sampling-loops" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Sampling Loops</h2>
                <p className="text-lg">
                    Below we implement the forward process of diffusion models which progressively adds Gaussian noise to clean images.
                    The process involves scaling the original image and adding noise according to a predefined schedule.
                    We demonstrate this by adding increasing amounts of noise to test images at different timesteps,
                    showing the gradual degradation of image quality.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/1_0.png" alt="Original Image" caption="Original Image" width={400} height={400} />
                    <ImageFigure src="/assets/project5/1_1.png" alt="Noisy Image at t=250" caption="Noisy Image at t=250" width={400} height={400} />
                    <ImageFigure src="/assets/project5/1_2.png" alt="Noisy Image at t=500" caption="Noisy Image at t=500" width={400} height={400} />
                    <ImageFigure src="/assets/project5/1_3.png" alt="Noisy Image at t=750" caption="Noisy Image at t=750" width={400} height={400} />
                </div>
                <hr />
            </section>

            <section id="classical-denoising" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Classical Denoising</h2>
                <p className="text-lg">
                    We explore traditional denoising methods using Gaussian blur filtering on images with varying levels of noise. This classical approach demonstrates the limitations of conventional denoising techniques when dealing with significant noise, particularly at higher timesteps in the diffusion process.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/1_1.png" alt="Noisy Image at t=250" caption="Noisy Image at t=250" width={400} height={400} />
                    <ImageFigure src="/assets/project5/1_2.png" alt="Noisy Image at t=500" caption="Noisy Image at t=500" width={400} height={400} />
                    <ImageFigure src="/assets/project5/1_3.png" alt="Noisy Image at t=750" caption="Noisy Image at t=750" width={400} height={400} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/2_0.png" alt="Gaussian Denoised t=250" caption="Gaussian Denoised t=250" width={400} height={400} />
                    <ImageFigure src="/assets/project5/2_1.png" alt="Gaussian Denoised t=500" caption="Gaussian Denoised t=500" width={400} height={400} />
                    <ImageFigure src="/assets/project5/2_2.png" alt="Gaussian Denoised t=750" caption="Gaussian Denoised t=750" width={400} height={400} />
                </div>
                <hr />
            </section>

            <section id="one-step-denoising" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">One-Step Denoising</h2>
                <p className="text-lg">
                    Using a pretrained UNet model, we implement single-step denoising by estimating and removing Gaussian noise from
                    corrupted images. The model is conditioned on both the noise level and a text prompt, demonstrating improved
                    denoising capabilities compared to classical methods, though with diminishing effectiveness at higher noise levels.
                    (Note that the original image has been resized to 64x64 and the denoised images have been upsampled
                    using a super-resolution model).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/1_1.png" alt="Noisy Image" caption="Noisy Image" width={400} height={400} />
                    <ImageFigure src="/assets/project5/3_0.png" alt="One-Step Denoised" caption="One-Step Denoised t=250" width={400} height={400} />
                    <ImageFigure src="/assets/project5/1_0.png" alt="Original Image" caption="Original Image" width={400} height={400} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/1_2.png" alt="Noisy Image" caption="Noisy Image" width={400} height={400} />
                    <ImageFigure src="/assets/project5/3_1.png" alt="One-Step Denoised" caption="One-Step Denoised t=500" width={400} height={400} />
                    <ImageFigure src="/assets/project5/1_0.png" alt="Original Image" caption="Original Image" width={400} height={400} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/1_3.png" alt="Noisy Image" caption="Noisy Image" width={400} height={400} />
                    <ImageFigure src="/assets/project5/3_2.png" alt="One-Step Denoised" caption="One-Step Denoised t=750" width={400} height={400} />
                    <ImageFigure src="/assets/project5/1_0.png" alt="Original Image" caption="Original Image" width={400} height={400} />
                </div>
                <hr />
            </section>

            <section id="iterative-denoising" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Iterative Denoising</h2>
                <p className="text-lg">
                    We implement an iterative denoising process that gradually removes noise through multiple steps,
                    using a strided approach to balance computational efficiency with denoising quality. This method
                    demonstrates significantly improved results compared to single-step denoising, particularly for
                    images with high noise levels.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/4_0_0.png" alt="Iterative Denoised" caption="Iterative Denoised 1 / 5" width={300} height={300} />
                    <ImageFigure src="/assets/project5/4_0_1.png" alt="Iterative Denoised" caption="Iterative Denoised 2 / 5" width={300} height={300} />
                    <ImageFigure src="/assets/project5/4_0_2.png" alt="Iterative Denoised" caption="Iterative Denoised 3 / 5" width={300} height={300} />
                    <ImageFigure src="/assets/project5/4_0_3.png" alt="Iterative Denoised" caption="Iterative Denoised 4 / 5" width={300} height={300} />
                    <ImageFigure src="/assets/project5/4_0_4.png" alt="Iterative Denoised" caption="Iterative Denoised 5 / 5" width={300} height={300} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/1_0.png" alt="Original" caption="Original" />
                    <ImageFigure src="/assets/project5/4_0.png" alt="Iterative Denoised" caption="Iterative Denoised" />
                    <ImageFigure src="/assets/project5/4_1.png" alt="One-Step Denoised" caption="One-Step Denoised" />
                    <ImageFigure src="/assets/project5/4_2.png" alt="Gaussian Denoised" caption="Gaussian Denoised" />
                </div>
                <hr />
            </section>

            <section id="diffusion-model-sampling" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Diffusion Model Sampling</h2>
                <p className="text-lg">
                    We explore image generation by applying the iterative denoising process to pure random noise. This demonstrates
                    the model&apos;s ability to generate novel images from scratch, though the initial results show limitations in
                    image quality and coherence without additional guidance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/5_0.png" alt="Sample 1" caption="Sample 1" />
                    <ImageFigure src="/assets/project5/5_1.png" alt="Sample 2" caption="Sample 2" />
                    <ImageFigure src="/assets/project5/5_2.png" alt="Sample 3" caption="Sample 3" />
                    <ImageFigure src="/assets/project5/5_3.png" alt="Sample 4" caption="Sample 4" />
                    <ImageFigure src="/assets/project5/5_4.png" alt="Sample 5" caption="Sample 5" />
                </div>
                <hr />
            </section>

            <section id="classifier-free-guidance" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Classifier-Free Guidance</h2>
                <p className="text-lg">
                    We implement Classifier-Free Guidance (CFG) to enhance image generation quality. This technique combines
                    conditional and unconditional noise estimates with a scaling factor, resulting in significantly improved
                    image quality at the cost of reduced diversity in the generated samples.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/6_0.png" alt="CFG Sample 1" caption="CFG Sample 1" />
                    <ImageFigure src="/assets/project5/6_1.png" alt="CFG Sample 2" caption="CFG Sample 2" />
                    <ImageFigure src="/assets/project5/6_2.png" alt="CFG Sample 3" caption="CFG Sample 3" />
                    <ImageFigure src="/assets/project5/6_3.png" alt="CFG Sample 4" caption="CFG Sample 4" />
                    <ImageFigure src="/assets/project5/6_4.png" alt="CFG Sample 5" caption="CFG Sample 5" />
                </div>
                <hr />
            </section>

            <section id="image-to-image-translation" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Image-to-image Translation</h2>
                <p className="text-lg">
                    We explore image editing through controlled noise addition and denoising, following the SDEdit algorithm.
                    This process allows for varying degrees of image manipulation by adjusting the noise level, demonstrating
                    how the diffusion model can modify existing images while maintaining certain original characteristics.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/7_0_1.png" alt="Level 1" caption="Level 1" />
                    <ImageFigure src="/assets/project5/7_0_3.png" alt="Level 3" caption="Level 3" />
                    <ImageFigure src="/assets/project5/7_0_5.png" alt="Level 5" caption="Level 5" />
                    <ImageFigure src="/assets/project5/7_0_7.png" alt="Level 7" caption="Level 7" />
                    <ImageFigure src="/assets/project5/7_0_10.png" alt="Level 10" caption="Level 10" />
                    <ImageFigure src="/assets/project5/7_0_20.png" alt="Level 20" caption="Level 20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/7_1_1.png" alt="Level 1" caption="Level 1" />
                    <ImageFigure src="/assets/project5/7_1_3.png" alt="Level 3" caption="Level 3" />
                    <ImageFigure src="/assets/project5/7_1_5.png" alt="Level 5" caption="Level 5" />
                    <ImageFigure src="/assets/project5/7_1_7.png" alt="Level 7" caption="Level 7" />
                    <ImageFigure src="/assets/project5/7_1_10.png" alt="Level 10" caption="Level 10" />
                    <ImageFigure src="/assets/project5/7_1_20.png" alt="Level 20" caption="Level 20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/7_2_1.png" alt="Level 1" caption="Level 1" />
                    <ImageFigure src="/assets/project5/7_2_3.png" alt="Level 3" caption="Level 3" />
                    <ImageFigure src="/assets/project5/7_2_5.png" alt="Level 5" caption="Level 5" />
                    <ImageFigure src="/assets/project5/7_2_7.png" alt="Level 7" caption="Level 7" />
                    <ImageFigure src="/assets/project5/7_2_10.png" alt="Level 10" caption="Level 10" />
                    <ImageFigure src="/assets/project5/7_2_20.png" alt="Level 20" caption="Level 20" />
                </div>
                <hr />
            </section>

            <section id="editing-hand-drawn-and-web-images" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Editing Hand-Drawn and Web Images</h2>
                <p className="text-lg">
                    We explore the model&apos;s ability to project non-realistic images onto the natural image manifold. This process works
                    particularly well with paintings, sketches, and scribbles. We experiment with both web-sourced images and hand-drawn
                    inputs, applying varying levels of noise to observe the transformation process.
                </p>
                <h3 className="text-xl font-semibold mb-4 mt-8">Web-Sourced Image</h3>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-8 mt-4">
                    <ImageFigure src="/assets/project5/8_0.png" alt="Original Image" caption="Original Image" />
                    <ImageFigure src="/assets/project5/8_0_1.png" alt="Level 1" caption="Level 1" />
                    <ImageFigure src="/assets/project5/8_0_3.png" alt="Level 3" caption="Level 3" />
                    <ImageFigure src="/assets/project5/8_0_5.png" alt="Level 5" caption="Level 5" />
                    <ImageFigure src="/assets/project5/8_0_7.png" alt="Level 7" caption="Level 7" />
                    <ImageFigure src="/assets/project5/8_0_10.png" alt="Level 10" caption="Level 10" />
                    <ImageFigure src="/assets/project5/8_0_20.png" alt="Level 20" caption="Level 20" />
                </div>
                <h3 className="text-xl font-semibold mb-4 mt-8">Hand-Drawn Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-8 mt-4">
                    <ImageFigure src="/assets/project5/8_1.png" alt="Original Image" caption="Original Image" />
                    <ImageFigure src="/assets/project5/8_1_1.png" alt="Level 1" caption="Level 1" />
                    <ImageFigure src="/assets/project5/8_1_3.png" alt="Level 3" caption="Level 3" />
                    <ImageFigure src="/assets/project5/8_1_5.png" alt="Level 5" caption="Level 5" />
                    <ImageFigure src="/assets/project5/8_1_7.png" alt="Level 7" caption="Level 7" />
                    <ImageFigure src="/assets/project5/8_1_10.png" alt="Level 10" caption="Level 10" />
                    <ImageFigure src="/assets/project5/8_1_20.png" alt="Level 20" caption="Level 20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/8_2.png" alt="Original Image" caption="Original Image" />
                    <ImageFigure src="/assets/project5/8_2_1.png" alt="Level 1" caption="Level 1" />
                    <ImageFigure src="/assets/project5/8_2_3.png" alt="Level 3" caption="Level 3" />
                    <ImageFigure src="/assets/project5/8_2_5.png" alt="Level 5" caption="Level 5" />
                    <ImageFigure src="/assets/project5/8_2_7.png" alt="Level 7" caption="Level 7" />
                    <ImageFigure src="/assets/project5/8_2_10.png" alt="Level 10" caption="Level 10" />
                    <ImageFigure src="/assets/project5/8_2_20.png" alt="Level 20" caption="Level 20" />
                </div>
                <hr />
            </section>

            <section id="inpainting" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Inpainting</h2>
                <p className="text-lg">
                    We implement image inpainting using diffusion models, allowing for selective image editing through masked
                    regions. The process involves maintaining original image content in unmasked areas while generating new content
                    in masked regions through iterative denoising, following the RePaint methodology.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/9_0_0.png" alt="Original Image" caption="Original Image" />
                    <ImageFigure src="/assets/project5/9_0_1.png" alt="Mask" caption="Mask" />
                    <ImageFigure src="/assets/project5/9_0_2.png" alt="Region to Replace" caption="Region to Replace" />
                    <ImageFigure src="/assets/project5/9_0_3.png" alt="Inpainted Result" caption="Inpainted Result" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/9_1_0.png" alt="Original Image" caption="Original Image" />
                    <ImageFigure src="/assets/project5/9_1_1.png" alt="Mask" caption="Mask" />
                    <ImageFigure src="/assets/project5/9_1_2.png" alt="Region to Replace" caption="Region to Replace" />
                    <ImageFigure src="/assets/project5/9_1_3.png" alt="Inpainted Result" caption="Inpainted Result" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/9_2_0.png" alt="Original Image" caption="Original Image" />
                    <ImageFigure src="/assets/project5/9_2_1.png" alt="Mask" caption="Mask" />
                    <ImageFigure src="/assets/project5/9_2_2.png" alt="Region to Replace" caption="Region to Replace" />
                    <ImageFigure src="/assets/project5/9_2_3.png" alt="Inpainted Result" caption="Inpainted Result" />
                </div>
                <hr />
            </section>

            <section id="text-conditional-image-to-image-translation" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Text-Conditional Image-to-image Translation</h2>
                <p className="text-lg">
                    We extend the image-to-image translation process by incorporating text prompts for guided image manipulation.
                    This allows for more controlled transformations where the output images reflect both the original image structure
                    and the semantic guidance provided by the text prompt.
                </p>
                <h3 className="text-center font-semibold">Campanile &gt; &quot;a rocket ship&quot;</h3>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mt-8">
                    {[1, 3, 5, 7, 10, 20].map((level) => (
                        <ImageFigure
                            key={level}
                            src={"/assets/project5/10_0_" + level + ".png"}
                            alt={`Noise Level ${level}`}
                            caption={`Noise Level ${level}`}
                        />
                    ))}
                </div>
                <h3 className="text-center font-semibold">Black Cat &gt; &quot;a photo of a hipster barista&quot;</h3>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mt-8">
                    {[1, 3, 5, 7, 10, 20].map((level) => (
                        <ImageFigure
                            key={level}
                            src={"/assets/project5/10_1_" + level + ".png"}
                            alt={`Noise Level ${level}`}
                            caption={`Noise Level ${level}`}
                        />
                    ))}
                </div>
                <h3 className="text-center font-semibold">Silver Truck &gt; &quot;a photo of a dog&quot;</h3>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mt-8">
                    {[1, 3, 5, 7, 10, 20].map((level) => (
                        <ImageFigure
                            key={level}
                            src={"/assets/project5/10_2_" + level + ".png"}
                            alt={`Noise Level ${level}`}
                            caption={`Noise Level ${level}`}
                        />
                    ))}
                </div>
                <hr />
            </section>

            <section id="visual-anagrams" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Visual Anagrams</h2>
                <p className="text-lg">
                    We create optical illusions using diffusion models by simultaneously denoising images with different
                    text prompts in different orientations. The resulting images exhibit different appearances when viewed
                    right-side up versus upside down, demonstrating the model&apos;s ability to encode multiple interpretations
                    within a single image. The images below look like one scene when flipped one way, and a different scene when
                    flipped the opposite way according to their conditional text prompt.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/11_0_1.png" alt="Right Side Up" caption="an oil painting of an old man" />
                    <ImageFigure src="/assets/project5/11_0_0.png" alt="Upside Down" caption="an oil painting of people around a campfire" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/11_1_1.png" alt="Right Side Up" caption="a traditional Chinese mountain painting" />
                    <ImageFigure src="/assets/project5/11_1_0.png" alt="Upside Down" caption="a traditional Chinese dragon painting" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/11_2_1.png" alt="Right Side Up" caption="a painting of a beach" />
                    <ImageFigure src="/assets/project5/11_2_0.png" alt="Upside Down" caption="a painting of a nuclear explosions" />
                </div>
                <hr />
            </section>

            <section id="hybrid-images" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Hybrid Images</h2>
                <p className="text-lg">
                    We implement Factorized Diffusion to create hybrid images that combine low-frequency components from
                    one text prompt with high-frequency components from another. This technique produces images that appear
                    different when viewed from varying distances, similar to classical hybrid image techniques but generated
                    entirely through diffusion models.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/12_0.png" alt="View" caption="a lithograph of waterfalls + a lithograph of a skull" />
                    <ImageFigure src="/assets/project5/12_1.png" alt="View" caption="a painting of an astronaut + a painting of a fish bowl" />
                    <ImageFigure src="/assets/project5/12_2.png" alt="View" caption="a watercolor painting of a city in the rain + a cubic painting of an eye" />
                </div>
                <hr />
            </section>

            <section className="mb-8">
                <h2 className="text-3xl font-semibold mb-4">Part B: Training a Diffusion Model</h2>
                <p className="text-lg">
                    In this part, we implement and train our own diffusion model from scratch on the MNIST dataset. We start
                    by building a simple UNet architecture for single-step denoising, then extend it to handle time conditioning
                    for iterative denoising, and finally add class conditioning to enable controlled generation of specific digits.
                </p>
                <hr className="mt-8" />
            </section>

            <section id="implementing-unets" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Implementing UNets</h2>
                <p className="text-lg">
                    We implement a UNet architecture consisting of downsampling and upsampling blocks with skip connections.
                    The network includes standard operations like Conv2d, BatchNorm2d, GELU activation, and ConvTranspose2d layers.
                    The architecture is designed with composed operations including ConvBlock, DownBlock, and UpBlock to create a
                    deeper network while maintaining tensor dimensions. This forms the backbone of our denoising model with a
                    hidden dimension of 128 channels.
                </p>
                <hr className="mt-8" />
            </section>

            <section id="using-the-unet-to-train-a-denoiser" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Using the UNet to Train a Denoiser</h2>
                <p className="text-lg">
                    We train the UNet as a single-step denoiser on MNIST digits using an L2 loss function. The model learns
                    to map noisy images back to their clean counterparts. Training involves generating pairs of clean and
                    noisy images using a fixed noise level σ, with the model optimized using Adam optimizer over 5 epochs.
                    The training process shows progressive improvement in denoising capability, with significant enhancement
                    in image quality between the first and final epochs.
                </p>
                <br/>
                <ImageFigure src="/assets/project5/13_0.png" alt="Grid Noise" caption="Noising process with different sigmas" />
                <ImageFigure src="/assets/project5/13_1.png" alt="Training Loss" caption="Training Loss of Denoising UNet over batches" />
                <hr className="mt-8" />
            </section>

            <section id="out-of-distribution-testing" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Out-of-Distribution Testing</h2>
                <p className="text-lg">
                    We evaluate our trained denoiser&apos;s generalization capabilities by testing it on noise levels different
                    from the training distribution. This experiment reveals the model&apos;s robustness and limitations when dealing
                    with varying amounts of noise, demonstrating how well it can handle out-of-distribution scenarios in image
                    denoising tasks.
                </p>
                <br/>
                <h3 className="text-center font-semibold">Results after the 1st Epoch</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/13_2_0.png" alt="first epoch" caption="Noisy Image, Predicted Image, Actual Image" />
                    <ImageFigure src="/assets/project5/13_2_2.png" alt="first epoch" caption="Noisy Image, Predicted Image, Actual Image" />
                </div>
                <h3 className="text-center font-semibold">Results after the 5th Epoch</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <ImageFigure src="/assets/project5/13_2_1.png" alt="fifth epoch" caption="Noisy Image, Predicted Image, Actual Image" />
                    <ImageFigure src="/assets/project5/13_2_3.png" alt="fifth epoch" caption="Noisy Image, Predicted Image, Actual Image" />
                </div>
                <ImageFigure src="/assets/project5/13_3_0.png" alt="Noise Grid" caption="Noisy Images with sigma = [0.0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0]" />
                <ImageFigure src="/assets/project5/13_3_1.png" alt="Prediction Grid" caption="Image Predictions for noisy images" />
                <hr />
            </section>

            <section id="adding-time-conditioning-to-unet" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Adding Time Conditioning to UNet</h2>
                <p className="text-lg">
                    We extend our UNet architecture to incorporate time conditioning, enabling it to handle different noise
                    levels during the diffusion process. This is implemented using FCBlocks (fully-connected blocks) that
                    inject normalized timestep information into the network. The conditioning signal modulates the network&apos;s
                    behavior at different stages of the denoising process, allowing for more precise control over noise removal.
                </p>
                <hr className="mt-8" />
            </section>

            <section id="training-the-time-conditioned-unet" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Training the Time-Conditioned UNet</h2>
                <p className="text-lg">
                    The time-conditioned UNet is trained to predict noise in images given both the noisy input and a timestep.
                    Training uses the MNIST dataset with a batch size of 128 over 20 epochs. We employ an Adam optimizer with an
                    initial learning rate of 1e-3 and implement exponential learning rate decay. This more complex training task
                    requires additional epochs compared to the simple denoiser to achieve optimal performance.
                </p>
                <br/>
                <ImageFigure src="/assets/project5/14_0.png" alt="Training Loss" caption="Training Loss of Time Conditioned Denoising UNet over batches" />
                <hr />
            </section>

            <section id="sampling-from-the-time-conditioned-unet" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Sampling from the Time-Conditioned UNet</h2>
                <p className="text-lg">
                    We implement a sampling process that starts from pure noise and iteratively applies the time-conditioned UNet
                    to generate images. The process follows a predefined variance schedule with 300 timesteps, progressively denoising
                    the image. The sampling algorithm demonstrates the model&apos;s ability to generate coherent digit images from random
                    noise through iterative refinement.
                </p>
                <br/>
                <ImageFigure src="/assets/project5/14_1.png" alt="samples" caption="Samples after 5 Epochs" />
                <ImageFigure src="/assets/project5/14_2.png" alt="samples" caption="Samples after 20 Epochs" />
                <hr />
            </section>

            <section id="adding-class-conditioning-to-unet" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Adding Class Conditioning to UNet</h2>
                <p className="text-lg">
                    We further enhance our UNet by adding class conditioning, allowing controlled generation of specific digits.
                    The implementation uses additional FCBlocks with one-hot encoded class vectors and includes a dropout mechanism
                    where class conditioning is randomly disabled 10% of the time during training. This enables the model to handle
                    both conditional and unconditional generation scenarios.
                </p>
                <br/>
                <ImageFigure src="/assets/project5/15_0.png" alt="Training Loss" caption="Training Loss of Classification Conditioned Denoising UNet over batches" />
                <hr />
            </section>

            <section id="sampling-from-the-class-conditioned-unet" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Sampling from the Class-Conditioned UNet</h2>
                <p className="text-lg">
                    The final sampling process incorporates classifier-free guidance with a guidance scale of 3 to improve
                    the quality of conditional generation. This approach allows us to generate multiple instances of specific
                    digits with high fidelity, demonstrating the model&apos;s ability to combine both time and class conditioning
                    for controlled image generation.
                </p>
                <br/>
                <h3 className="text-center font-semibold">Sampeled Digits after the 5th Epoch</h3>
                <br/>
                <ImageFigure src="/assets/project5/15_1_0.png" alt="Digit Samples" caption="" />
                <ImageFigure src="/assets/project5/15_1_1.png" alt="Digit Samples" caption="" />
                <ImageFigure src="/assets/project5/15_1_2.png" alt="Digit Samples" caption="" />
                <ImageFigure src="/assets/project5/15_1_3.png" alt="Digit Samples" caption="" />
                <h3 className="text-center font-semibold">Sampeled Digits after the 20th Epoch</h3>
                <br/>
                <ImageFigure src="/assets/project5/15_2_0.png" alt="Digit Samples" caption="" />
                <ImageFigure src="/assets/project5/15_2_1.png" alt="Digit Samples" caption="" />
                <ImageFigure src="/assets/project5/15_2_2.png" alt="Digit Samples" caption="" />
                <ImageFigure src="/assets/project5/15_2_3.png" alt="Digit Samples" caption="" />
                <hr />
            </section>
        </div>
    );
};

export default ProjectPage;