import Link from 'next/link';
import { PaginationInfo } from '@/lib/types';

interface PaginationProps {
  pagination: PaginationInfo;
  tag?: string;
}

export default function Pagination({ pagination, tag }: PaginationProps) {
  const { currentPage, totalPages } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (tag) params.set('tag', tag);
    const query = params.toString();
    return `/blog${query ? `?${query}` : ''}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
        >
          Previous
        </Link>
      )}

      <div className="flex gap-2">
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <Link
              key={page}
              href={buildUrl(page)}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 border-zinc-900 dark:border-zinc-50'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-50'
              }`}
            >
              {page}
            </Link>
          ) : (
            <span
              key={`ellipsis-${index}`}
              className="px-4 py-2 text-zinc-400 dark:text-zinc-600"
            >
              {page}
            </span>
          )
        )}
      </div>

      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  );
}
