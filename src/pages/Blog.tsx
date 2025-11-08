import { useState, useEffect } from 'react';
import { Search, Calendar, Tag as TagIcon, Clock, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { blogPosts } from '@/data/blogPosts';
import axios from 'axios';

const Blog = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    category: 'Technology',
    tags: '',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    readTime: '5 min read',
    isFeatured: false,
    publishedAt: new Date(),
    slug: '' // Will be generated from title
  });
  const [posts, setPosts] = useState(blogPosts);

  // Fetch blog posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        if (response.data) {
          // Combine hardcoded posts with API posts, removing any duplicates by title
          const allPosts = [...blogPosts];
          response.data.forEach((apiPost: any) => {
            if (!allPosts.some(post => post.title === apiPost.title)) {
              allPosts.push({
                ...apiPost,
                date: new Date(apiPost.publishedAt || apiPost.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              });
            }
          });
          setPosts(allPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts, using hardcoded data instead:', error);
        // If API fails, use hardcoded posts
        setPosts(blogPosts);
      }
    };
    
    fetchPosts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Title is required',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.content.trim()) {
      toast({
        title: 'Error',
        description: 'Content is required',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a URL-friendly slug from the title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/--+/g, '-')       // Replace multiple hyphens with single
        .replace(/-+$/, '');        // Remove trailing hyphen
      
      // Prepare the blog post data
      const postData = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        author: formData.author.trim() || 'Admin',
        category: formData.category,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        image: formData.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        readTime: formData.readTime || '5 min read',
        isFeatured: formData.isFeatured || false,
        publishedAt: new Date()
      };
      
      console.log('Submitting blog post:', postData);
      
      const response = await axios.post('http://localhost:5000/api/blogs', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      toast({
        title: 'Success!',
        description: 'Blog post created successfully!',
        variant: 'default',
      });
      
      // Refresh the posts list
      const updatedPosts = await axios.get('http://localhost:5000/api/blogs');
      setPosts(updatedPosts.data);
      
      // Reset form and close modal
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: 'Admin',
        category: 'Technology',
        tags: '',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        readTime: '5 min read',
        isFeatured: false,
        publishedAt: new Date(),
        slug: ''
      });
      setShowCreateForm(false);
      
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      
      if (error.response) {
        // Server responded with an error
        const { data } = error.response;
        
        if (data.errors) {
          // Handle validation errors
          const errorMessages = data.errors.map((err: any) => 
            `${err.field}: ${err.message}`
          ).join('\n');
          
          toast({
            title: 'Validation Error',
            description: errorMessages || 'Please check the form for errors',
            variant: 'destructive',
          });
        } else {
          // Handle other server errors
          toast({
            title: 'Error',
            description: data.message || 'Failed to create blog post',
            variant: 'destructive',
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast({
          title: 'Network Error',
          description: 'Could not connect to the server. Please try again.',
          variant: 'destructive',
        });
      } else {
        // Something happened in setting up the request
        toast({
          title: 'Error',
          description: error.message || 'An unexpected error occurred',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define all available categories
  const allCategories = [
    'All',
    'Community',
    'Education',
    'Environment',
    'Health',
    'Technology',
    'Events',
    'Success Stories',
    'Volunteer Spotlight',
    'Fundraising',
    'News',
    'Research',
    'Advocacy',
    'Partnerships'
  ];
  
  // Get unique categories from posts and combine with default categories
  const postCategories = Array.from(new Set(posts.map(post => post.category)));
  const categories = Array.from(new Set([...allCategories, ...postCategories]));

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    if (!post) return false; // Skip any undefined posts
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, stories, and updates from our community
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-3xl mx-auto mb-8 flex justify-end">
            <Button onClick={() => setShowCreateForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </div>

          <div className="max-w-3xl mx-auto mb-12 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              <div className="w-full flex justify-center mb-2">
                <div className="inline-flex flex-wrap gap-2 justify-center">
                  {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full text-sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="w-full flex justify-center">
                <div className="inline-flex flex-wrap gap-2 justify-center">
                  {categories.slice(Math.ceil(categories.length / 2)).map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full text-sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} {...post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found. Try a different search term or category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Create Blog Post Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Blog Post</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowCreateForm(false)}
                  className="rounded-full h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-300">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter post title"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-300">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.category}
                      onValueChange={(value) => setFormData({...formData, category: value})}
                    >
                      <SelectTrigger className="w-full bg-gray-800 text-white border-gray-700">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {categories
                          .filter(cat => cat !== 'All')
                          .sort()
                          .map((category) => (
                            <SelectItem key={category} value={category}>
                              <div className="flex items-center gap-2">
                                {category === 'Community' && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                                {category === 'Education' && <span className="h-2 w-2 rounded-full bg-green-500"></span>}
                                {category === 'Environment' && <span className="h-2 w-2 rounded-full bg-emerald-500"></span>}
                                {category === 'Health' && <span className="h-2 w-2 rounded-full bg-red-500"></span>}
                                {category === 'Technology' && <span className="h-2 w-2 rounded-full bg-purple-500"></span>}
                                {category === 'Events' && <span className="h-2 w-2 rounded-full bg-yellow-500"></span>}
                                {category === 'Success Stories' && <span className="h-2 w-2 rounded-full bg-pink-500"></span>}
                                {category === 'Volunteer Spotlight' && <span className="h-2 w-2 rounded-full bg-indigo-500"></span>}
                                {category === 'Fundraising' && <span className="h-2 w-2 rounded-full bg-orange-500"></span>}
                                {category === 'News' && <span className="h-2 w-2 rounded-full bg-cyan-500"></span>}
                                {category === 'Research' && <span className="h-2 w-2 rounded-full bg-amber-500"></span>}
                                {category === 'Advocacy' && <span className="h-2 w-2 rounded-full bg-rose-500"></span>}
                                {category === 'Partnerships' && <span className="h-2 w-2 rounded-full bg-violet-500"></span>}
                                <span>{category}</span>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="excerpt" className="text-sm font-medium text-gray-300">
                    Excerpt <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="A short summary of your post"
                    rows={2}
                    className="w-full"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="content" className="text-sm font-medium text-gray-300">
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog post content here..."
                    rows={6}
                    className="w-full min-h-[150px] bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="author" className="text-sm font-medium text-gray-300">
                      Author <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Author name"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="readTime" className="text-sm font-medium text-gray-300">
                      Read Time <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="readTime"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 5 min read"
                      className="w-full"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="tags" className="text-sm font-medium text-gray-300">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Comma-separated tags (e.g., react, javascript, webdev)"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Separate tags with commas
                  </p>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="image" className="text-sm font-medium text-gray-300">
                    Image URL <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full"
                    required
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-400 mb-1">Image Preview:</p>
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="h-24 w-auto rounded-md object-cover border border-gray-200 dark:border-gray-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                  />
                  <Label htmlFor="isFeatured" className="text-sm font-medium text-gray-300">
                    Feature this post on the homepage
                  </Label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCreateForm(false)}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Publishing...
                      </>
                    ) : 'Publish Post'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
