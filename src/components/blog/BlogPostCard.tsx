import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/data/blogPosts';

interface BlogPostCardProps extends Omit<BlogPost, 'content'> {}

const BlogPostCard = ({
  title,
  slug,
  excerpt,
  publishedAt,
  readTime,
  category,
  tags,
  image
}: BlogPostCardProps) => {
  return (
    <div className="group">
      <Link to={`/blog/${slug}`} className="block h-full">
        <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
          <div className="aspect-video overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{category}</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
              {excerpt}
            </p>
            <div className="flex items-center justify-between mt-auto pt-2 border-t">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readTime}
              </span>
              <span className="text-sm font-medium text-primary hover:underline">
                Read more →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPostCard;
