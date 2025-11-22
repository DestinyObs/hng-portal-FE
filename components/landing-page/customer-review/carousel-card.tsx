import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';

const CarouselCard = ({
  customer,
}: {
  customer: {
    name: string;
    country: string;
    userType: string;
    testimonial: string;
    image: string;
  };
}) => {
  return (
    <CarouselItem className="basis-full w-[320px] hover:w-[783px] sm:basis-1/2 lg:basis-1/4 hover:lg:basis-1/2">
      <div className="w-full">
        <Card className="group p-0 py-0 w-full md:h-[233px] h-[433px] hover:h-80 flex flex-col sm:flex-row gap-0 border-0 transition-all duration-300 ease-in-out">
          <CardContent className="relative w-full h-full p-0">
            <Image
              src={customer.image}
              alt={customer.name}
              fill
              className="object-cover rounded-[11px] group-hover:rounded-br-none group-hover:rounded-tr-none"
            />
          </CardContent>

          {/* visible on hover */}
          <div className="md:hidden inset-0 bg-[#F7F9FA] bg-opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:flex justify-between flex-col rounded-br-[11px] rounded-tr-[11px] p-4 text-left">
            <div className="flex justify-between text-[18px] leading-tight ">
              <div className="name">
                <p>
                  {' '}
                  <span className="font-semibold">
                    {customer.name.split(' ')[0]}
                  </span>{' '}
                  <span className="text-[#757676]">
                    {customer.name.split(' ')[1]}
                  </span>
                </p>
                <p className="text-[#757676]">{customer.country}</p>
              </div>

              <div className="recruiter-part flex gap-2">
                <span className="h-full border-[.5] border-[#757676]" />
                <div className="user text-[18px] type">
                  <p className="text-[#757676]">user type:</p>
                  <p className="text-[#3F4040]">{customer.userType}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 w-full">
              {/* Quote Icon */}
              <div className="shrink-0">
                <Image
                  width={24}
                  height={24}
                  src="/images/quote-up.png"
                  alt="quote-up"
                />
              </div>

              {/* Testimonial Text */}
              <p className="text-[#3F4040] text-[18px] sm:text-base leading-snug">
                {customer.testimonial}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default CarouselCard;
