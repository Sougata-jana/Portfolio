import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  category: {
    type: String,
    required: true,
    enum: ['Full-Stack', 'Frontend', 'Backend', 'Mobile', 'Other']
  },
  technologies: [{
    type: String,
    required: true
  }],
  imageGradient: {
    type: String,
    default: 'from-blue-500 to-cyan-500'
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'medium'
  },
  githubUrl: {
    type: String,
    required: true
  },
  liveUrl: {
    type: String,
    default: '#'
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
