export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  externalUrl?: string;
  score?: number;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  externalUrl?: string;
  score?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
  totalPosts: number;
}
