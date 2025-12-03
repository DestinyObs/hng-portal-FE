import SettingsSidebar from '@/components/settings/settings-sidebar';
import Link from 'next/link';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-start">
      <div className="flex flex-col lg:flex-row lg:gap-8 w-full max-w-[1440px] justify-center items-start">
        {/* Sidebar */}
        <aside className="w-full lg:w-auto shrink-0">
          <SettingsSidebar />
        </aside>
        {/* Main content */}
        <div className="flex-1 w-full max-w-[1056px]">
          <div className="flex px-4 justify-start">
            <Link
              href="/profile-view"
              className="text-sm font-medium text-primary-300 hover:text-gray-900 flex items-center gap-2"
            >
              Back
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
