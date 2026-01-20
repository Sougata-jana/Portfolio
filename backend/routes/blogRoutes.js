import express from 'express';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getPublishedBlogs,
  incrementViews
} from '../controllers/blogController.js';

const router = express.Router();

// GET /api/blogs - Get all blogs
router.get('/', getAllBlogs);

// GET /api/blogs/published - Get published blogs
router.get('/published', getPublishedBlogs);

// GET /api/blogs/:id - Get blog by ID
router.get('/:id', getBlogById);

// POST /api/blogs/:id/view - Increment blog views
router.post('/:id/view', incrementViews);

// POST /api/blogs - Create new blog
router.post('/', createBlog);

// PUT /api/blogs/:id - Update blog
router.put('/:id', updateBlog);

// DELETE /api/blogs/:id - Delete blog
router.delete('/:id', deleteBlog);

export default router;
