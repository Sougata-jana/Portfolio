import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  Target,
  Users,
} from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="py-32 px-4 max-w-7xl mx-auto scroll-mt-20 bg-gray-100 dark:bg-transparent transition-colors"
    >
      {/* About Me Section */}
      <div className="mb-24">
        <div className="mb-16 pl-4 border-l-4 border-purple-500">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
            About Me
          </h2>
          <p className="text-slate-600 dark:text-white/50 text-lg">
            Get to know me better
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="rounded-3xl bg-gray-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <Code2
                  size={24}
                  className="text-purple-600 dark:text-purple-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Who I Am
              </h3>
            </div>
            <p className="text-slate-700 dark:text-white/70 leading-relaxed mb-4">
              I'm a passionate Full-Stack Developer with expertise in the MERN
              stack (MongoDB, Express.js, React.js, Node.js). I love creating
              intuitive and performant web applications that solve real-world
              problems.
            </p>
            <p className="text-slate-700 dark:text-white/70 leading-relaxed">
              Currently pursuing B.Tech in Computer Science and Engineering at
              Haldia Institute of Technology. I'm constantly learning new
              technologies and improving my skills to stay updated with industry
              trends.
            </p>
          </div>

          <div className="rounded-3xl bg-gray-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                <Target
                  size={24}
                  className="text-blue-600 dark:text-blue-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                What I Do
              </h3>
            </div>
            <ul className="space-y-3 text-slate-700 dark:text-white/70">
              <li className="flex gap-3">
                <span className="text-purple-600 dark:text-purple-400 mt-1">
                  ▹
                </span>
                <span>
                  Build responsive and dynamic frontend applications using
                  React.js
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600 dark:text-purple-400 mt-1">
                  ▹
                </span>
                <span>
                  Develop scalable backend APIs with Node.js and Express.js
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600 dark:text-purple-400 mt-1">
                  ▹
                </span>
                <span>Design and manage databases using MongoDB</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600 dark:text-purple-400 mt-1">
                  ▹
                </span>
                <span>
                  Implement authentication, payment integrations, and cloud
                  services
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Experience Section */}
      <div className="mb-24">
        <div className="mb-16 pl-4 border-l-4 border-pink-500">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Experience
          </h2>
          <p className="text-slate-600 dark:text-white/50 text-lg">
            Professional journey and internships
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gray-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <Briefcase
                  size={24}
                  className="text-purple-600 dark:text-purple-300"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  MERN Stack Development Intern
                </h3>
                <p className="text-purple-700 dark:text-purple-300 font-medium mb-2">
                  Zidio Technologies • Remote
                </p>
                <p className="text-slate-600 dark:text-white/50 text-sm mb-4">
                  April 2025 - May 2025
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-slate-700 dark:text-white/70 ml-16">
              <li className="flex gap-3">
                <span className="text-purple-600 dark:text-purple-400 mt-1">
                  ▹
                </span>
                <span>
                  Developed full-stack web application features using MongoDB,
                  Express.js, React.js, and Node.js
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600 dark:text-purple-400 mt-1">
                  ▹
                </span>
                <span>
                  Built responsive and dynamic frontend components with React.js
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600 dark:text-purple-400 mt-1">
                  ▹
                </span>
                <span>
                  Created and tested RESTful APIs using Node.js and Express.js
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600 dark:text-purple-400 mt-1">
                  ▹
                </span>
                <span>
                  Integrated frontend with backend services and performed API
                  testing using Postman
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600 dark:text-purple-400 mt-1">
                  ▹
                </span>
                <span>
                  Used Git for version control and followed collaborative
                  development workflows
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Education Section */}
      <div className="mb-24">
        <div className="mb-12 pl-4 border-l-4 border-blue-500">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Education
          </h2>
          <p className="text-slate-600 dark:text-white/50 text-lg">
            Academic background
          </p>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gray-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                <GraduationCap
                  size={20}
                  className="text-blue-600 dark:text-blue-300"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  B.Tech in Computer Science and Engineering
                </h3>
                <p className="text-blue-700 dark:text-blue-300 font-medium mb-1">
                  Sanaka Educational Trust’s Group of Institutions, MAKAUT
                </p>
                <p className="text-slate-600 dark:text-white/50 text-sm mb-2">
                  2022 - 2026 • SGPA: 7.67 (Till 7th Semester)
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-gray-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                <GraduationCap
                  size={20}
                  className="text-green-600 dark:text-green-300"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  Higher Secondary (Class XII)
                </h3>
                <p className="text-green-700 dark:text-green-300 font-medium mb-1">
                  Deshdattaabari United High School (HS)
                </p>
                <p className="text-slate-600 dark:text-white/50 text-sm">
                  West Bengal, India • Percentage: 78%
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Achievements & Interests Section */}
      <div>
        <div className="mb-12 pl-4 border-l-4 border-pink-500">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Achievements & Interests
          </h2>
          <p className="text-slate-600 dark:text-white/50 text-lg">
            What drives me forward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl bg-gray-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-xl p-6 hover:bg-gray-300 dark:hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-slate-700 dark:text-white/60">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const achievements = [
  {
    icon: "🏆",
    title: "Hackathon 2024",
    description:
      "Participated in Hackathon 2024, collaborating with teams to build innovative solutions under time constraints.",
  },
  {
    icon: "💼",
    title: "Internship Completion",
    description:
      "Successfully completed Web Development Internship at Zidio Technologies, gaining hands-on MERN stack experience.",
  },
  {
    icon: "💻",
    title: "Coding Projects",
    description:
      "Passionate about building projects and experimenting with new technologies to solve real-world problems.",
  },
  {
    icon: "🚀",
    title: "Continuous Learning",
    description:
      "Always exploring new technologies, frameworks, and best practices in web development.",
  },
  {
    icon: "🤝",
    title: "Teamwork",
    description:
      "Strong communication and collaboration skills, experienced in working with cross-functional teams.",
  },
  {
    icon: "🎯",
    title: "Problem Solving",
    description:
      "Analytical mindset with focus on writing clean, efficient code and debugging complex issues.",
  },
];
