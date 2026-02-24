import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, BookOpen, MessageSquare, TrendingUp } from 'lucide-react';
import { api, API_ENDPOINTS } from '../config/api';

interface Stats {
  projects: number;
  blogs: number;
  publishedBlogs: number;
  totalViews: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    blogs: 0,
    publishedBlogs: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, blogsRes] = await Promise.all([
        api.get(API_ENDPOINTS.PROJECTS),
        api.get(API_ENDPOINTS.BLOGS),
      ]);

      const blogs = blogsRes.data.data || [];
      const publishedBlogs = blogs.filter((blog: { published: boolean }) => blog.published);
      const totalViews = blogs.reduce((sum: number, blog: { views?: number }) => sum + (blog.views || 0), 0);

      setStats({
        projects: projectsRes.data.data?.length || 0,
        blogs: blogs.length,
        publishedBlogs: publishedBlogs.length,
        totalViews,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderGit2,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Blogs',
      value: stats.blogs,
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Published Blogs',
      value: stats.publishedBlogs,
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your portfolio admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${card.bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="#/projects"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <FolderGit2 className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Manage Projects</h3>
            <p className="text-sm text-gray-600">Add or edit your projects</p>
          </a>
          <a
            href="#/blogs"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <BookOpen className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Manage Blogs</h3>
            <p className="text-sm text-gray-600">Create or edit blog posts</p>
          </a>
          <a
            href="#/ai-chat"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <MessageSquare className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">AI Chat History</h3>
            <p className="text-sm text-gray-600">View chat conversations</p>
          </a>
        </div>
      </div>
    </div>
  );
}
