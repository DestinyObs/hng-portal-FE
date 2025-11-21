import Image from 'next/image';

export const metadata = {
  title: 'HNG Portal | Dashboard',
  description: 'Hire talent on the HNG Portal. Coming soon!',
};

export default function HireTalentPage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] text-center px-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to the dashboard</h1>
        <p className="text-lg text-gray-600 mb-6">
          This feature is coming soon. Stay tuned for updates!
        </p>
      </div>
      <footer className="border-t py-10 md:py-5 lg:py-[50px]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground px-6 md:px-10 lg:px-[60px]">
          <Image
            src="/images/hng-logo.png"
            alt="HNG Portal Logo"
            width={120}
            height={40}
          />

          <div className="flex flex-row flex-wrap items-center gap-4 text-foreground justify-center md:justify-start">
            {' '}
            <span>© 2025 HNG Portal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
