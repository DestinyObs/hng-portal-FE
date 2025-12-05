import Image from 'next/image';

export default function TalentDashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src="/assets/dashboard/empty_dashboard.png"
        alt="dashboard empty state"
        width={300}
        height={300}
        className="w-auto h-auto"
      />
      <div>
        <p className="text-[#232323] text-xl sm:text-2xl font-ag font-bold leading-6 sm:leading-8">
          There is nothing to show here yet
        </p>
        <p className="text-[#5E5C5C] text-xs sm:text-base font-ag sm:font-dm_sans font-normal sm:leading-6">
          When there is, you’ll see it here.
        </p>
      </div>
    </div>
  );
}
