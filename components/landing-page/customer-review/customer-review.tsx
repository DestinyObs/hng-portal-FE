import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CarouselCard from './carousel-card';
import { testimonials } from '@/constants/landing-page';

const CustomerReview = () => {
  return (
    <div className="max-w-[1440px] mx-auto w-full flex justify-center items-center gap-10 py-3 sm:py-10 flex-col pb-3 sm:pb-20">
      {/* LEFT TEXT AREA */}
      <div className="w-full text-left max-w-[1180px] min-w-sm px-5 sm:px-2">
        <h2 className="text-h4 font-medium">
          Don&apos;t take our word for it! <br />
          Hear from our partners.
        </h2>
      </div>

      {/* CAROUSEL AREA */}
      <div className="w-full relative flex justify-end px-5 sm:px-0">
        <Carousel className="w-full sm:w-[92%]">
          {/*  buttons */}
          <div className="absolute -bottom-10 sm:bottom-0 sm:-top-20 right-10 sm:right-20 -translate-y-1/2 flex gap-3">
            <CarouselPrevious
              icon={<ChevronLeft />}
              className="bg-[#E3F6FE] text-black p-2 sm:p-1 border-0 "
            />
            <CarouselNext
              icon={<ChevronRight />}
              className="bg-[#E3F6FE] text-black p-2 sm:p-1  border-0 "
            />
          </div>

          <CarouselContent>
            {testimonials.map((customer, index) => (
              <CarouselCard customer={customer} key={index} />
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CustomerReview;
