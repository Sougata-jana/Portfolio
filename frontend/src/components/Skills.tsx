import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Database, 
  Cloud, 
  Layers, 
  Brain, 
  Palette, 
  Smartphone,
  FileText,
  Zap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface Skill {
  category: string;
  categoryColor: string;
  badgeColor: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  linkText: string;
}

export function Skills() {
  const skills: Skill[] = [
    {
      category: "Frontend Mastery",
      categoryColor: "from-blue-500 to-cyan-500",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: <Code2 className="w-6 h-6" />,
      title: "Crafting Pixel-Perfect Interfaces",
      description: "Building responsive, interactive web experiences with modern frameworks. Transforming designs into seamless user interfaces with attention to detail and performance.",
      technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"],
      link: "#projects",
      linkText: "View Projects"
    },
    {
      category: "Backend Development",
      categoryColor: "from-purple-500 to-pink-500",
      badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      icon: <Server className="w-6 h-6" />,
      title: "Building Robust Server Architecture",
      description: "Developing scalable APIs and server-side logic with Node.js and Express.js. Implementing RESTful architecture and secure authentication systems for modern applications.",
      technologies: ["Node.js", "Express.js", "REST APIs", "JWT", "WebSockets", "GraphQL"],
      link: "#projects",
      linkText: "Explore APIs"
    },
    {
      category: "Database Expert",
      categoryColor: "from-yellow-500 to-orange-500",
      badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      icon: <Database className="w-6 h-6" />,
      title: "Managing Data Efficiently",
      description: "Designing optimized database schemas and writing efficient queries. Experience with both SQL and NoSQL databases for different application needs.",
      technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Mongoose", "Prisma"],
      link: "#projects",
      linkText: "Data Solutions"
    },
    {
      category: "Cloud & DevOps",
      categoryColor: "from-slate-500 to-gray-500",
      badgeColor: "bg-slate-500/20 text-slate-400 border-slate-500/30",
      icon: <Cloud className="w-6 h-6" />,
      title: "Deploying at Scale",
      description: "Managing cloud infrastructure and implementing CI/CD pipelines. Experience with containerization, deployment automation, and cloud services.",
      technologies: ["AWS", "Docker", "GitHub Actions", "Vercel", "Netlify", "CI/CD"],
      link: "#projects",
      linkText: "Cloud Projects"
    },
    {
      category: "Full-Stack Wizard",
      categoryColor: "from-orange-500 to-red-500",
      badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      icon: <Layers className="w-6 h-6" />,
      title: "End-to-End Development",
      description: "Seamlessly connecting frontend and backend. Building complete MERN stack applications from database design to user interface deployment.",
      technologies: ["MERN Stack", "Full-Stack Apps", "API Integration", "State Management", "Authentication", "Deployment"],
      link: "#projects",
      linkText: "See Work"
    },
    {
      category: "Problem Solver",
      categoryColor: "from-cyan-500 to-blue-500",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      icon: <Brain className="w-6 h-6" />,
      title: "Algorithmic Excellence",
      description: "Strong foundation in Data Structures & Algorithms. Proficient in multiple programming languages with a passion for solving complex computational challenges.",
      technologies: ["C++", "Java", "Python", "DSA", "Problem Solving", "Optimization"],
      link: "#projects",
      linkText: "Code Samples"
    },
    {
      category: "UI/UX Designer",
      categoryColor: "from-pink-500 to-purple-500",
      badgeColor: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      icon: <Palette className="w-6 h-6" />,
      title: "Creating Beautiful Experiences",
      description: "Designing intuitive user interfaces with focus on user experience. Transforming ideas into high-fidelity prototypes and interactive designs.",
      technologies: ["Figma", "Adobe XD", "Responsive Design", "User Research", "Prototyping", "Design Systems"],
      link: "#projects",
      linkText: "Design Portfolio"
    },
    {
      category: "Mobile Developer",
      categoryColor: "from-green-500 to-emerald-500",
      badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
      icon: <Smartphone className="w-6 h-6" />,
      title: "Cross-Platform Mobile Apps",
      description: "Building performant mobile applications with React Native. Creating native experiences that work seamlessly across iOS and Android platforms.",
      technologies: ["React Native", "Expo", "Mobile UI", "Native APIs", "App Deployment", "Performance"],
      link: "#projects",
      linkText: "Mobile Apps"
    },
    {
      category: "Tech Writer",
      categoryColor: "from-teal-500 to-green-500",
      badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
      icon: <FileText className="w-6 h-6" />,
      title: "Documenting Knowledge",
      description: "Writing technical documentation and sharing insights through blog posts. Helping developers learn through clear explanations and best practices.",
      technologies: ["Technical Writing", "Documentation", "Blogging", "Tutorials", "Best Practices", "Knowledge Sharing"],
      link: "#blog",
      linkText: "Read Blogs"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills-detail" className="min-h-screen py-20 relative bg-gray-100 dark:bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-gradient-to-r dark:from-purple-500/10 dark:to-pink-500/10 border border-purple-300 dark:border-purple-500/20 mb-6"
          >
            <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Comprehensive Skill Set</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-purple-800 to-pink-600 dark:from-purple-200 dark:via-white dark:to-pink-200">
              Tech Stack & Skills
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-white/60 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern web applications. From{' '}
            <span className="text-purple-600 dark:text-yellow-400 font-semibold">frontend interfaces</span> to{' '}
            <span className="text-purple-600 dark:text-yellow-400 font-semibold">backend systems</span>, I leverage 
            cutting-edge technologies to deliver exceptional digital experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="h-full p-6 rounded-2xl bg-gray-200/80 dark:bg-white/5 backdrop-blur-sm border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${skill.badgeColor}`}>
                    {skill.category}
                  </span>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.categoryColor} opacity-20 group-hover:opacity-30 transition-opacity`}>
                    {skill.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all">
                  {skill.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-white/60 text-sm mb-4 leading-relaxed">
                  {skill.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {skill.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-slate-700 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <button
                  onClick={() => scrollToSection(skill.link)}
                  className="cursor-pointer flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white transition-colors group/link"
                >
                  <span>{skill.linkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </button>

                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.categoryColor} opacity-0 group-hover:opacity-10 blur-xl transition-opacity -z-10`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-200 dark:bg-white/5 border border-slate-300 dark:border-white/10">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-slate-700 dark:text-white/80">
              Continuously learning and expanding my skill set
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
