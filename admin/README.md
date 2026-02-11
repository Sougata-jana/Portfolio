# Portfolio Admin Panel

A modern, feature-rich admin panel for managing your portfolio website content.

## Features

- **Dashboard**: View statistics and quick actions
- **Project Management**: Create, edit, and delete projects with full CRUD operations
- **Blog Management**: Write and publish blog posts with rich editing capabilities
- **AI Chat History**: View conversations from your portfolio AI assistant
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

- Node.js (v18 or higher)
- Backend server running on http://localhost:5000
- MongoDB database configured

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the admin directory:

```env
VITE_API_URL=http://localhost:5000
```

## Running the Admin Panel

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The admin panel will run on http://localhost:5174 (or next available port)

## Usage

### Managing Projects

1. Navigate to the Projects page
2. Click "Add Project" to create a new project
3. Fill in the project details:
   - Title, description, and category
   - Technologies used (comma-separated)
   - GitHub and live URLs
   - Gradient colors for the project card
4. Toggle "Featured Project" to highlight important projects
5. Click "Create Project" to save

### Managing Blogs

1. Navigate to the Blogs page
2. Click "Add Blog" to create a new blog post
3. Fill in the blog details:
   - Title and excerpt (max 200 characters)
   - Full content
   - Category and tags
   - Optional image URL
4. Toggle "Publish immediately" to make the blog public
5. Click "Create Blog" to save

### Publishing/Unpublishing Blogs

- Click the green checkmark icon to publish a draft
- Click the yellow X icon to unpublish a published blog

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - API requests
- **Lucide React** - Icons
- **Vite** - Build tool

## API Endpoints Used

- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/blogs` - Fetch all blogs
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

## Backend Connection

Make sure your backend server is running before using the admin panel:

```bash
cd ../backend
npm run dev
```

## Notes

- The admin panel connects to the same backend API as your main portfolio
- All changes made in the admin panel are immediately reflected on your portfolio website
- Blog posts must be published to appear on the public-facing portfolio
- Projects are always visible on the portfolio (no publish toggle)
