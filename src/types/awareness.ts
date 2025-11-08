// src/types/awareness.ts
export type ResourceType = 'article' | 'video' | 'infographic' | 'event' | 'guide';

export interface AwarenessResource {
  id: string;
  title: string;
  slug: string;
  type: ResourceType;
  content: string;
  excerpt: string;
  thumbnailUrl?: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  isFeatured: boolean;
  author?: string;
  duration?: string;
  externalUrl?: string;
}