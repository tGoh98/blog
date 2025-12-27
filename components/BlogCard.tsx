import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { BlogPostMetadata } from '@/lib/types';
import { HiExternalLink } from 'react-icons/hi';
import { HiStar } from 'react-icons/hi2';

interface BlogCardProps {
  post: BlogPostMetadata;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Parse date string without timezone conversion
  const [year, month, day] = post.date.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const formattedDate = format(date, 'MMMM d, yyyy');

  const isStarred = post.tags.includes('starred');

  const cardContent = (
    <article className="group h-full border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors flex items-center gap-2">
              {post.title}
              {post.externalUrl && (
                <HiExternalLink className="w-5 h-5 flex-shrink-0" />
              )}
            </h2>
            {isStarred && (
              <HiStar className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            )}
          </div>
          <time className="text-sm text-zinc-500 dark:text-zinc-500 mb-3 block">
            {formattedDate}
          </time>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
            {post.description}
          </p>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );

  if (post.externalUrl) {
    return (
      <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
    );
  }

  return <Link href={`/blog/${post.slug}`}>{cardContent}</Link>;
}
