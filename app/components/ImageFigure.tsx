import { FC, useState } from 'react';
import Image from 'next/image';

interface ImageFigureProps {
  src: string;
  alt: string; 
  caption: string;
  width?: number;
  height?: number;
}

export const ImageFigure: FC<ImageFigureProps> = ({
  src,
  alt,
  caption,
  width = 750,
  height = 750,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <figure className="mb-8">
      <div className="flex justify-center">
        <div 
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="rounded-lg transition-transform hover:scale-105"
          />
        </div>
      </div>
      <figcaption className="text-sm text-center mt-2 text-gray-500">
        {caption}
      </figcaption>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={src}
              alt={alt}
              width={width * 1.25}
              height={height * 1.25}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </figure>
  );
};