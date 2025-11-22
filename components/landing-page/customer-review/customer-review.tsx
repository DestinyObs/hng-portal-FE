import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CarouselCard from './carousel-card';

export const testimonials = [
  {
    name: 'Ema G.',
    country: 'Nigeria',
    userType: 'Recruiter',
    testimonial:
      'We hired two interns through HNG Portal in less than a week. The verified profiles and skill tags make screening 10x faster.',
    image: '/images/customer1.jpg',
  },
  {
    name: 'Samuel O.',
    country: 'Nigeria',
    userType: 'Hiring Manager',
    testimonial:
      'HNG Portal helped us find qualified candidates without spending hours reviewing irrelevant CVs. The platform’s filters and assessments are incredibly accurate.',
    image: '/images/customer2.png',
  },
  {
    name: 'Nelo A.',
    country: 'United Kingdom',
    userType: 'Tech Lead',
    testimonial:
      'The talent pool on HNG Portal is impressive. The developers we interviewed were well-prepared, responsive, and possessed the exact skills we were looking for.',
    image: '/images/customer3.png',
  },
  {
    name: 'Emmanuel O.',
    country: 'Nigeria',
    userType: 'Product Designer',
    testimonial:
      'HNG Portal gave me visibility to companies I never had access to before. I landed interviews quickly, and the platform made the entire process easier.',
    image: '/images/customer1.jpg',
  },
  {
    name: 'Samuel O.',
    country: 'Nigeria',
    userType: 'Hiring Manager',
    testimonial:
      'HNG Portal helped us find qualified candidates without spending hours reviewing irrelevant CVs. The platform’s filters and assessments are incredibly accurate.',
    image: '/images/customer2.png',
  },
  {
    name: 'Nelo A.',
    country: 'United Kingdom',
    userType: 'Tech Lead',
    testimonial:
      'The talent pool on HNG Portal is impressive. The developers we interviewed were well-prepared, responsive, and possessed the exact skills we were looking for.',
    image: '/images/customer3.png',
  },
  {
    name: 'Emmanuel O.',
    country: 'Nigeria',
    userType: 'Product Designer',
    testimonial:
      'HNG Portal gave me visibility to companies I never had access to before. I landed interviews quickly, and the platform made the entire process easier.',
    image: '/images/customer1.jpg',
  },
];

const CustomerReview = () => {
  return (
    <div className="w-full flex justify-center items-center gap-10 py-3 sm:py-10 flex-col pb-3 sm:pb-20">
      {/* LEFT TEXT AREA */}
      <div className="w-full text-left max-w-[1180px] min-w-sm px-5 sm:px-0">
        <h2 className="text-h4 font-medium">
          Don&apos;t take our word for it! <br />
          Hear from our partners.
        </h2>
      </div>

      {/* CAROUSEL AREA */}
      <div className="w-full relative flex justify-end px-5 sm:px-0">
        <Carousel className="w-full sm:w-[92%]">
          {/*  buttons */}
          <div className="absolute -bottom-20 sm:bottom-0 sm:-top-20 right-10 sm:right-20 -translate-y-1/2 flex gap-3">
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
