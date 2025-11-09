'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { projectsData } from '@/data/projects'
import { useState } from 'react'
import { getAssetPath } from '@/utils/path'

const INITIAL_PROJECTS_COUNT = 4

// 定义要隐藏的项目 slug
const HIDDEN_PROJECTS = [
  'whac-a-mole-embedded-game',
  'home-cnc-milling-machine',
  'additive-friction-stir-deposition',
  'meam5100-autonomous-robot',
]

// 定义显示项目的顺序
const VISIBLE_PROJECT_ORDER = [
  'autonomous-maze-robot',
  'two-stage-gearbox-shaft-design',
  'mie346-design-assignments',
  'mie320-tensile-test',
  'barcelona-logo-projection',
  'dog-breed-classification-cnn',
]

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  
  // 按指定顺序收集可见项目，过滤掉 undefined
  const visibleProjectsInOrder = VISIBLE_PROJECT_ORDER.map(slug => 
    projectsData.find(p => p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => p !== undefined)
  
  // 过滤掉隐藏项目，使它们不在列表中显示
  const visibleProjects = visibleProjectsInOrder.filter(
    p => !HIDDEN_PROJECTS.includes(p.slug)
  )
  
  const projects = showAll ? visibleProjects : visibleProjects.slice(0, INITIAL_PROJECTS_COUNT)
  const hasMoreProjects = visibleProjects.length > INITIAL_PROJECTS_COUNT

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <section
      id="projects"
      className="py-20 px-4 bg-white dark:bg-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg"
          >
            Some of my recent work
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={getAssetPath(project.image)}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold drop-shadow-lg">
                      {project.title}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      View Details
                      <FaArrowRight />
                    </Link>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            <FaGithub />
                            Code
                          </a>
                        )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* See More Button */}
          {hasMoreProjects && !showAll && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center mt-12"
            >
              <button
                onClick={() => setShowAll(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
              >
                See More Projects
                <FaArrowRight />
              </button>
            </motion.div>
          )}

          {/* Show Less Button */}
          {showAll && hasMoreProjects && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center mt-12"
            >
              <button
                onClick={() => {
                  setShowAll(false)
                  window.scrollTo({ top: document.getElementById('projects')?.offsetTop || 0, behavior: 'smooth' })
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium text-lg"
              >
                Show Less
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
