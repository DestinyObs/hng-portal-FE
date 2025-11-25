'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useEffect, useRef } from 'react';

export function DashboardPagination({
  currentPage,
  totalPages,
  onPageChange,
  maxDesktopPages = 5,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxDesktopPages?: number;
}) {
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileScrollRef.current) {
      const activeElement = mobileScrollRef.current.querySelector(
        `[data-page="${currentPage}"]`,
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentPage]);

  const getDesktopPages = () => {
    const pages: (number | '...')[] = [];

    // If total pages is small, show all
    if (totalPages <= maxDesktopPages + 1) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const showPages =
      currentPage <= maxDesktopPages - 1
        ? maxDesktopPages
        : currentPage >= totalPages - (maxDesktopPages - 2)
          ? maxDesktopPages
          : 3;

    if (currentPage <= maxDesktopPages - 1) {
      // Near start: 1 2 3 4 5 ... 12
      for (let i = 1; i <= maxDesktopPages; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - (maxDesktopPages - 2)) {
      // Near end: 1 ... 8 9 10 11 12
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - (maxDesktopPages - 1); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const desktopPages = getDesktopPages();
  const mobilePages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="w-full flex justify-center py-4">
      <PaginationContent className="flex items-center gap-1">
        {/* Prev */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={
              currentPage === 1
                ? 'opacity-50 pointer-events-none'
                : 'cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95'
            }
          />
        </PaginationItem>

        {/* Desktop view */}
        <div className="hidden md:flex items-center gap-1">
          {desktopPages.map((p, i) => (
            <PaginationItem key={i}>
              {p === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(p)}
                  isActive={p === currentPage}
                  className="cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 border-tertiary-50 text-black"
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>

        {/* Mobile view with auto-scroll */}
        <div
          ref={mobileScrollRef}
          className="flex md:hidden overflow-x-auto gap-1 px-2 max-w-[200px] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
          }}
        >
          {mobilePages.map((p) => (
            <PaginationItem
              key={p}
              data-page={p}
              className="shrink-0"
              style={{ scrollSnapAlign: 'center' }}
            >
              <PaginationLink
                onClick={() => onPageChange(p)}
                isActive={p === currentPage}
                className="cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 border-tertiary-50 text-black"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            className={
              currentPage === totalPages
                ? 'opacity-50 pointer-events-none'
                : 'cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
