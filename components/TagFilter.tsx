'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { getTagColors } from '@/lib/tags';

interface TagFilterProps {
  tags: string[];
}

export default function TagFilter({ tags }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get('tag');

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentTag === tag) {
      // If clicking the active tag, remove filter
      params.delete('tag');
      params.delete('page'); // Reset to page 1
    } else {
      // Set new tag filter
      params.set('tag', tag);
      params.delete('page'); // Reset to page 1
    }

    const query = params.toString();
    router.push(`/blog${query ? `?${query}` : ''}`);
  };

  if (tags.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
        Filter by tag:
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const colors = getTagColors(tag);
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                currentTag === tag
                  ? 'ring-2 ring-zinc-900 dark:ring-zinc-50'
                  : 'hover:opacity-80'
              } ${colors.bg} ${colors.text}`}
            >
              {tag}
            </button>
          );
        })}
        {currentTag && (
          <button
            onClick={() => handleTagClick(currentTag)}
            className="px-3 py-1.5 rounded-full text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
          >
            Clear filter
          </button>
        )}
      </div>
    </div>
  );
}
