import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMetadata, PaginationInfo } from './types';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts(): BlogPost[] {
  // Ensure posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        description: data.description || '',
        tags: data.tags || [],
        content,
        externalUrl: data.externalUrl,
        score: data.score,
      };
    });

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description || '',
      tags: data.tags || [],
      content,
      externalUrl: data.externalUrl,
      score: data.score,
    };
  } catch (error) {
    return null;
  }
}

export function getPostMetadata(): BlogPostMetadata[] {
  const posts = getAllPosts();
  return posts.map(({ slug, title, date, description, tags, externalUrl, score }) => ({
    slug,
    title,
    date,
    description,
    tags,
    externalUrl,
    score,
  }));
}

export function getSortedPosts(sortBy: 'recent' | 'score' = 'recent'): BlogPostMetadata[] {
  const posts = getPostMetadata();

  if (sortBy === 'score') {
    return posts.sort((a, b) => {
      // Sort by score (highest first), with date as tiebreaker
      const scoreA = a.score ?? 0;
      const scoreB = b.score ?? 0;

      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }

      // If scores are equal, sort by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  // Default: sort by date, newest first
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getPostsByTag(tag: string, sortBy: 'recent' | 'score' = 'recent'): BlogPostMetadata[] {
  const posts = getSortedPosts(sortBy);
  return posts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const posts = getPostMetadata();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  // Custom tag ordering
  const tagOrder = ['starred', 'project', 'figma', 'yap', 'misc1'];

  return Array.from(tagsSet).sort((a, b) => {
    const indexA = tagOrder.indexOf(a);
    const indexB = tagOrder.indexOf(b);

    // If both tags are in the custom order, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If only one is in the custom order, it comes first
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    // If neither is in the custom order, sort alphabetically
    return a.localeCompare(b);
  });
}

export function paginatePosts(
  posts: BlogPostMetadata[],
  page: number = 1,
  postsPerPage: number = 6
): {
  posts: BlogPostMetadata[];
  pagination: PaginationInfo;
} {
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    pagination: {
      currentPage,
      totalPages,
      postsPerPage,
      totalPosts,
    },
  };
}
