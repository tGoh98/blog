import { getSortedPosts, getPostsByTag, paginatePosts, getAllTags } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import TagFilter from '@/components/TagFilter';
import SortSelector from '@/components/SortSelector';
import FadeIn from '@/components/FadeIn';

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    tag?: string;
    sort?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const currentTag = params.tag;
  const currentSort = (params.sort || 'score') as 'recent' | 'score';

  // Get all posts or filtered by tag
  const allPosts = currentTag ? getPostsByTag(currentTag, currentSort) : getSortedPosts(currentSort);

  // Paginate the posts
  const { posts, pagination } = paginatePosts(allPosts, currentPage, 12);

  // Get all available tags for filtering
  const allTags = getAllTags();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Blog
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              A heap of projects and soapboxes.
            </p>
          </div>
        </FadeIn>

        {/* Sort and Filter Controls */}
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
            <SortSelector />
            <TagFilter tags={allTags} />
          </div>
        </FadeIn>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <FadeIn delay={350}>
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination pagination={pagination} tag={currentTag} />
            </>
          </FadeIn>
        ) : (
          <FadeIn delay={350}>
            <div className="text-center py-16">
              <p className="text-xl text-zinc-600 dark:text-zinc-400">
                No posts found
                {currentTag && (
                  <>
                    {' '}
                    with tag &quot;{currentTag}&quot;
                  </>
                )}
                .
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
