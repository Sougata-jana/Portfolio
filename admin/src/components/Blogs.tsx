import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, CheckCircle, XCircle, Upload, X } from 'lucide-react';
import { api, API_ENDPOINTS } from '../config/api';

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  published: boolean;
  views: number;
  createdAt: string;
}

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Technology',
    tags: '',
    imageUrl: '',
    published: false,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.BLOGS);
      setBlogs(response.data.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, imageUrl: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setFormData({ ...formData, imageUrl: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };

      if (editingBlog) {
        const response = await api.put(API_ENDPOINTS.BLOG_BY_ID(editingBlog._id), blogData);
        alert(response.data.message || 'Blog updated successfully!');
      } else {
        const response = await api.post(API_ENDPOINTS.BLOGS, blogData);
        alert(response.data.message || 'Blog created successfully!');
      }

      fetchBlogs();
      resetForm();
    } catch (error: unknown) {
      console.error('Error saving blog:', error);
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save blog';
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      await api.delete(API_ENDPOINTS.BLOG_BY_ID(id));
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    try {
      await api.put(API_ENDPOINTS.BLOG_BY_ID(blog._id), {
        ...blog,
        published: !blog.published,
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error toggling publish status:', error);
      alert('Failed to update blog status');
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      category: blog.category,
      tags: blog.tags.join(', '),
      imageUrl: blog.imageUrl || '',
      published: blog.published,
    });
    setImagePreview(blog.imageUrl || '');
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'Technology',
      tags: '',
      imageUrl: '',
      published: false,
    });
    setImagePreview('');
    setEditingBlog(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blogs</h1>
          <p className="text-gray-600">Manage your blog posts</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Blog
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4">
            {editingBlog ? 'Edit Blog' : 'Add New Blog'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload Section - At the Top */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
              <label className="block text-sm font-medium mb-3">Featured Image</label>
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Blog preview"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    title="Remove image"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="mt-3 text-sm text-gray-600 text-center">
                    Click the X to remove and upload a different image
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <label className="cursor-pointer">
                    <span className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-block">
                      Choose Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Upload a featured image for your blog (Max 5MB)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Recommended size: 1200x630px for best results
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Excerpt (max 200 characters)</label>
              <textarea
                required
                maxLength={200}
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                required
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Technology">Technology</option>
                  <option value="Web Development">Web Development</option>
                  <option value="MERN Stack">MERN Stack</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Experience">Experience</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, Node.js, Tutorial"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="published" className="text-sm font-medium">
                Publish immediately
              </label>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {editingBlog ? 'Update' : 'Create'} Blog
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Blog Image Thumbnail */}
              {blog.imageUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{blog.title}</h3>
                  {blog.published ? (
                    <span className="flex items-center gap-1 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Published
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      <XCircle className="w-3 h-3" />
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{blog.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {blog.views} views
                  </span>
                  <span>{blog.category}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                {blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 ml-4 flex-shrink-0">
                <button
                  onClick={() => handleTogglePublish(blog)}
                  className={`p-2 rounded-lg transition-colors ${
                    blog.published
                      ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                  title={blog.published ? 'Unpublish' : 'Publish'}
                >
                  {blog.published ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => handleEdit(blog)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
