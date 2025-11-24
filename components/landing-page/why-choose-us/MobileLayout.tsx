import StatsGridMobile from './StatsGridMobile';
import WhyDescription from './WhyDescription';

const MobileLayout = () => (
  <div className="lg:hidden max-w-7xl mx-auto">
    <StatsGridMobile />
    <div className="mt-4 text-center">
      <WhyDescription />
    </div>
  </div>
);

export default MobileLayout;
