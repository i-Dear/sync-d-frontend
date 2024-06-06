import Image from "next/image";
import { exampleImagesType } from "@/lib/guideImages";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/src/components/Common/Carousel";

interface StyledCarouselProps {
  exampleList: exampleImagesType;
}

const GuideCarousel = ({ exampleList }: StyledCarouselProps) => {
  return (
    <Carousel className="mx-[4rem] flex h-full items-center justify-center">
      <CarouselContent className="flex w-full">
        {exampleList.map((example, index) => (
          <CarouselItem
            className="flex items-center justify-center"
            key={index}
          >
            <div className="flex justify-center">
              <Image width={700} height={0} src={example.src} alt={`guide`} />
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
