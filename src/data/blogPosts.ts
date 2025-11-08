export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  isFeatured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '5 Ways to Make a Difference in Your Community',
    slug: '5-ways-to-make-a-difference',
    excerpt: 'Discover simple yet impactful ways to contribute to your local community and create positive change.',
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">
          Making a positive impact in your community doesn't always require grand gestures. 
          Sometimes, the smallest actions can create the most significant change. Here are five 
          simple yet powerful ways you can make a difference today.
        </p>
        <h2 class="text-2xl font-bold mt-8 mb-4">1. Volunteer Your Time</h2>
        <p class="text-lg leading-relaxed">
          Local organizations are always in need of volunteers. Whether it's helping at a food bank, 
          mentoring youth, or cleaning up local parks, your time is one of the most valuable 
          contributions you can make.
        </p>
      </div>
    `,
    publishedAt: '2023-10-20',
    readTime: '4 min read',
    author: 'Alex Johnson',
    category: 'Community',
    tags: ['volunteering', 'community', 'impact'],
    image: '/src/assets/community.jpg',
    isFeatured: true
  },
  {
    id: 2,
    title: 'The Importance of Sustainable Development',
    slug: 'sustainable-development-importance',
    excerpt: 'Learn why sustainable development is crucial for our future and how you can contribute to a greener planet.',
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">
          Sustainable development is about meeting the needs of the present without compromising 
          the ability of future generations to meet their own needs. It's a crucial approach in 
          today's world where environmental concerns are more pressing than ever.
        </p>
      </div>
    `,
    publishedAt: '2023-10-15',
    readTime: '6 min read',
    author: 'Sarah Williams',
    category: 'Sustainability',
    tags: ['sustainability', 'environment', 'development'],
    image: '/src/assets/sustainability.jpg'
  }
];
