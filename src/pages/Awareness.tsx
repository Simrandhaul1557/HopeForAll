// src/pages/Awareness.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Film, Image, Calendar, FileText, Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock data
const mockResources = [
  {
    id: '1',
    title: 'Understanding Our Mission',
    slug: 'understanding-our-mission',
    type: 'article' as const,
    excerpt: 'Learn about our core mission and how we make a difference in the community.',
    content: '...',
    publishedAt: '2023-10-15',
    updatedAt: '2023-10-15',
    tags: ['mission', 'about'],
    isFeatured: true,
    author: 'Jane Doe'
  },
  // Add more mock resources as needed
];

const resourceTypeIcons = {
  article: <BookOpen className="w-5 h-5" />,
  video: <Film className="w-5 h-5" />,
  infographic: <Image className="w-5 h-5" />,
  event: <Calendar className="w-5 h-5" />,
  guide: <FileText className="w-5 h-5" />
};

const Awareness = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesTag = selectedTag === 'all' || resource.tags.includes(selectedTag);
    
    return matchesSearch && matchesType && matchesTag;
  });

  const allTags = Array.from(new Set(mockResources.flatMap(resource => resource.tags)));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Resources & Information</h1>
          <p className="text-muted-foreground mb-8">
            Educational materials and resources about our work and impact.
          </p>

          {/* Search and Filter Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="infographic">Infographics</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Link to={`/awareness/${resource.slug}`} key={resource.id} className="group">
                <Card className="h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    {resource.thumbnailUrl ? (
                      <img 
                        src={resource.thumbnailUrl} 
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="p-8 text-muted-foreground">
                        {resourceTypeIcons[resource.type]}
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        {resourceTypeIcons[resource.type]}
                        {resource.type}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(resource.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {resource.excerpt}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No resources found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  setSelectedTag('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Awareness;