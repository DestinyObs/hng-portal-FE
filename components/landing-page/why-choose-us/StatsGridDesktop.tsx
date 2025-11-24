import StatCard from './StatCard';

const StatsGridDesktop = () => (
  <div className="hidden lg:flex flex-col gap-6">
    <div className="flex items-start gap-10">
      <StatCard
        value="50K+"
        description="Talents trained through the HNG ecosystem"
        variant="gradient"
        className="w-[266px] shrink-0"
      />
      <StatCard
        value="85"
        suffix="%"
        description="Profiles contain verified internship work"
        variant="bordered"
        className="w-[266px] shrink-0"
      />
    </div>

    <div className="flex items-end justify-between">
      <div></div>
      <div className="flex gap-8">
        <StatCard
          value="30"
          suffix="%"
          description="Faster hiring decisions by recruiters"
          variant="gradient"
          className="w-[266px] shrink-0"
        />
        <StatCard
          value="15"
          suffix="+"
          description="Projects completed and showcased"
          variant="bordered"
          className="w-[266px] shrink-0"
        />
      </div>
    </div>
  </div>
);

export default StatsGridDesktop;
