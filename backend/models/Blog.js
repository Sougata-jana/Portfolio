import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 200
  },
  author: {
    type: String,
    default: 'Sougata Jana'
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Web Development', 'MERN Stack', 'Tutorial', 'Experience', 'Other']
  },
  tags: [{
    type: String
  }],
  imageUrl: {
    type: String,
    default: ''
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
