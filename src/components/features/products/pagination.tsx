'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = generatePagination(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          'flex items-center justify-center h-10 w-10 rounded-lg border transition-colors',
          currentPage <= 1
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              'flex items-center justify-center h-10 w-10 rounded-lg border font-medium transition-colors',
              isActive
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            )}
            aria-label={`Page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          'flex items-center justify-center h-10 w-10 rounded-lg border transition-colors',
          currentPage >= totalPages
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}

/**
 * Generate pagination array with ellipsis
 */
function generatePagination(current: number, total: number): (number | '...')[] {
  // If total pages is 7 or less, show all pages
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Always show first and last page
  const result: (number | '...')[] = [];

  if (current <= 3) {
    // Near the start
    result.push(1, 2, 3, 4, '...', total);
  } else if (current >= total - 2) {
    // Near the end
    result.push(1, '...', total - 3, total - 2, total - 1, total);
  } else {
    // In the middle
    result.push(1, '...', current - 1, current, current + 1, '...', total);
  }

  return result;
}
