import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Set up a timer to call onSearch after 500ms of inactivity
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500); // 500ms debounce delay

    // Cleanup function to clear the timer if the user keeps typing
    return () => {
      clearTimeout(timer);
    };
  }, [query, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query); // Trigger search immediately on pressing Enter
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-none">
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-(--color-gray-100)" />
      <input
        type="text"
        placeholder="Search jobs..."
        aria-label="Search jobs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-14 rounded-xl border border-[#9C9C9C] bg-(--color-white-50) pl-14 pr-6 text-(--color-gray-500) placeholder:text-(--color-gray-100) focus:border-(--color-primary-blue) focus:outline-none focus:ring-2 focus:ring-(--color-primary-blue)/20 transition text-base"
      />
    </form>
  );
}
