import StatCard from './StatCard';

const StatsGridMobile = () => (
  <div className="lg:hidden flex flex-col gap-6">
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 pr-8">
        <StatCard value="50K+" description="Talents trained through the HNG ecosystem" variant="gradient" className="flex-1" />
        <StatCard value="85" suffix="%" description="Profiles contain verified internship work" variant="bordered" className="flex-1" />
      </div>

      <div className="flex gap-3 pl-8">
        <StatCard value="30" suffix="%" description="Faster hiring decisions by recruiters" variant="gradient" className="flex-1" />
        <StatCard value="15" suffix="+" description="Projects completed and showcased" variant="bordered" className="flex-1" />
      </div>
    </div>
  </div>
);

export default StatsGridMobile;