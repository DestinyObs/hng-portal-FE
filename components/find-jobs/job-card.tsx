import Image from 'next/image';
import { Heart } from 'lucide-react';

export interface JobCardProps {
  id: number;
  title: string;
  company: string;
  salary: string;
  type: string;
  location: string;
  posted: string;
  image?: string;
  onClick: () => void;
}

export default function JobCard({
  title,
  company,
  salary,
  type,
  location,
  posted,
  image,
  onClick,
}: JobCardProps) {
  return (
    <article
      onClick={onClick}
      className="w-full rounded-xl border border-[#9C9C9C] bg-(--color-white-50) p-8 hover:border-(--color-primary-blue) hover:shadow-md cursor-pointer transition"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-start gap-4">
          {image ? (
            <Image
              src={image}
              alt={company}
              width={56}
              height={56}
              className="rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-purple-600">
              <span className="text-2xl font-bold text-white">
                {company.charAt(0)}
              </span>
            </div>
          )}

          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-(--color-gray-500) leading-none">
              {title}
            </h3>
            <p className="text-(--color-gray-100) text-sm font-medium leading-none">
              {company}
            </p>
          </div>
        </div>

        <button
          onClick={(e) => e.stopPropagation()}
          aria-label="Save job"
          className="p-2 rounded-lg transition hover:bg-(--color-gray-50)"
        >
          <Heart className="h-6 w-6 text-(--color-gray-100) hover:text-red-500 transition" />
        </button>
      </div>

      <p className="mb-6 text-(--color-gray-100) text-sm leading-relaxed">
        Design and refine intuitive web interfaces that provide users with a
        seamless and visually engaging experience...
      </p>

      <div className="mb-6 flex flex-wrap gap-3">
        {[
          'Proficiency in Figma, Adobe XD, or Sketch',
          'Excellent communication & collaboration skills',
          'Strong understanding of UX principles & design systems',
        ].map((tag, idx) => (
          <span
            key={idx}
            className="inline-block px-4 py-2 text-xs font-medium text-(--color-gray-300) bg-white border border-[#9C9C9C] rounded-[36px]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm text-(--color-gray-100)">
          Posted: {posted} • {type} • {location}
        </div>
        <div className="text-2xl font-bold text-(--color-gray-500)">
          {salary} per Month
        </div>
      </div>
    </article>
  );
}