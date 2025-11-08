import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: Date;
  readTime: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  isFeatured: boolean;
}

// Helper to create a URL-friendly slug
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const blogSchema = new Schema<IBlog>({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true,
    index: true
  },
  excerpt: { 
    type: String, 
    required: [true, 'Excerpt is required'],
    maxlength: [200, 'Excerpt cannot be more than 200 characters']
  },
  content: { 
    type: String, 
    required: [true, 'Content is required'] 
  },
  publishedAt: { 
    type: Date, 
    default: Date.now 
  },
  readTime: { 
    type: String, 
    required: [true, 'Read time is required'] 
  },
  author: { 
    type: String, 
    required: [true, 'Author is required'],
    trim: true
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    trim: true
  },
  tags: [{ 
    type: String,
    trim: true
  }],
  image: { 
    type: String, 
    required: [true, 'Image URL is required'] 
  },
  isFeatured: { 
    type: Boolean, 
    default: false 
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-generate slug from title before saving or validating
blogSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = `${slugify(this.title || '')}-${Date.now().toString(36)}`;
  }
  next();
});

// Also ensure slug is set before validation
blogSchema.pre('validate', function(next) {
  if (!this.slug) {
    this.slug = `${slugify(this.title || '')}-${Date.now().toString(36)}`;
  }
  next();
});

export default mongoose.model<IBlog>('Blog', blogSchema);
