import SettingsSidebar from '@/components/dashboard/settings-sidebar';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-start">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full max-w-[1440px] justify-center items-start">
        <aside className="w-full lg:w-auto shrink-0">
          <SettingsSidebar />
        </aside>
        <div className="flex-1 w-full max-w-[1056px]">{children}</div>
      </div>
    </div>
  );
}
