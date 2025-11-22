import Header from './Header';
import Carousel from './Carousel';
import ServiceCards from './ServiceCards';

export default function HowItWorks() {
  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1440px]">
        <Header />
        <Carousel />
        <ServiceCards />
      </div>
    </section>
  );
}