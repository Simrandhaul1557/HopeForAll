// src/pages/AwarenessResource.tsx
import { useParams } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AwarenessResource = () => {
  const { slug } = useParams();
  
  // In a real app, fetch the resource by slug from your API
  const resource = {
    id: '1',
    title: 'Understanding Our Mission',
    slug: 'understanding-our-mission',
    type: 'article',
    content: `
      <h2>Our Core Mission</h2>
      <p>We are dedicated to making a positive impact in our community through various initiatives and programs...</p>
      <!-- More content would go here -->
    `,
    excerpt: 'Learn about our core mission and how we make a difference in the community.',
    publishedAt: '2023-10-15',
    updatedAt: '2023-10-15',
    tags: ['mission', 'about'],
    isFeatured: true,
    author: 'Jane Doe',
    duration: '5 min read'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-8 -ml-4">
            <a href="/awareness" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Resources
            </a>
          </Button>

          <article className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-6">{resource.title}</h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(resource.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {resource.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {resource.duration}
                  </span>
                )}
                {resource.author && (
                  <span>By {resource.author}</span>
                )}
              </div>

              {resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {resource.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: resource.content }}
            />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AwarenessResource;