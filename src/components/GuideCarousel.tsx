import { Fullscreen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/src/components/Common/Carousel";

interface StyledCarouselProps {
  exampleList: { name: string; src: string }[];
}

const GuideCarousel = ({ exampleList }: StyledCarouselProps) => {
  return (
    <Carousel className="flex h-full items-center justify-center">
      <CarouselContent className="flex w-full">
        {exampleList.map((example, index) => (
          <CarouselItem className="flex justify-center" key={index}>
            <div className="flex justify-center">
              <Image
                className="flex justify-center"
                width={800}
                height={100}
                src={example.src}
                alt={`guide`}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default GuideCarousel;
