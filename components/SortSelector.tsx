'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SortSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'score';

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (sort === 'score') {
      // Remove sort param for default "score"
      params.delete('sort');
    } else {
      params.set('sort', sort);
    }

    params.delete('page'); // Reset to page 1 when changing sort

    const query = params.toString();
    router.push(`/blog${query ? `?${query}` : ''}`);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
        Sort by:
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleSortChange('score')}
          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
            currentSort === 'score'
              ? 'bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          Magic sauce
        </button>
        <button
          onClick={() => handleSortChange('recent')}
          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
            currentSort === 'recent'
              ? 'bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          Recent
        </button>
      </div>
    </div>
  );
}
