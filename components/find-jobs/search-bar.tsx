import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-none">
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-(--color-gray-100)" />
      <input
        type="text"
        placeholder="Search jobs..."
        aria-label="Search jobs"
        className="w-full h-14 rounded-xl border border-[#9C9C9C] bg-(--color-white-50) pl-14 pr-6 text-(--color-gray-500) placeholder:text-(--color-gray-100) focus:border-(--color-primary-blue) focus:outline-none focus:ring-2 focus:ring-(--color-primary-blue)/20 transition text-base"
      />
    </div>
  );
}