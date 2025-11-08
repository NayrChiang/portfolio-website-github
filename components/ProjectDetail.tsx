'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaArrowLeft, FaExpand } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import ModelViewer from '@/components/ModelViewer'
import { Project } from '@/data/projects'

interface ProjectDetailProps {
  project: Project
}

// Video component with auto-pause on scroll out
function AutoPauseVideo({ src, ...props }: React.VideoHTMLAttributes<HTMLVideoElement> & { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Video is out of viewport - pause
            if (!video.paused) {
              video.pause()
            }
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of video is visible
      }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  return <video ref={videoRef} src={src} {...props} />
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [imageErrors, setImageErrors] = useState<{ [key: string | number]: boolean }>({})
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null)
  const [showAllConcepts, setShowAllConcepts] = useState(false)

  const handleImageError = (index: string | number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  const openImageModal = (src: string, alt: string) => {
    setEnlargedImage({ src, alt })
  }

  const closeImageModal = () => {
    setEnlargedImage(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      
      {/* Image Modal */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
          onClick={closeImageModal}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeImageModal()
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Close"
          >
            ×
          </button>
          <div 
            className="relative max-w-7xl max-h-[90vh] pointer-events-none" 
          >
            <div 
              className="relative w-full h-full pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={enlargedImage.src}
                alt={enlargedImage.alt}
                width={1920}
                height={1080}
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
                sizes="(max-width: 1920px) 100vw, 1920px"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600/90 to-primary-800/90 backdrop-blur-md text-white py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors"
          >
            <FaArrowLeft />
            <span>Back to Projects</span>
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {project.title}
          </motion.h1>
          {project.course && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 mb-6"
            >
              {project.course} {project.institution && `• ${project.institution}`}{' '}
              {project.year && `• ${project.year}`}
            </motion.p>
          )}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/80 max-w-3xl"
          >
            {project.fullDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 mt-8 flex-wrap"
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
              >
                <FaGithub />
                View on GitHub
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Core Concepts - Always Displayed at Top */}
          {project.technologies && project.technologies.length > 0 && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                Core Concepts
              </h2>
              <div className="flex flex-wrap gap-3">
                {(showAllConcepts || project.technologies.length <= 5
                  ? project.technologies
                  : project.technologies.slice(0, 5)
                ).map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.technologies.length > 5 && (
                <button
                  onClick={() => setShowAllConcepts(!showAllConcepts)}
                  className="mt-4 px-4 py-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  {showAllConcepts ? 'Show Less' : `Show ${project.technologies.length - 5} More`}
                </button>
              )}
            </motion.section>
          )}

          {/* Custom Layout for MIE444 Robot Project */}
          {project.slug === 'autonomous-maze-robot' ? (
            <>
              {/* Brief Project Objective or Page Description */}
              {project.objective ? (
                <motion.section variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-primary-600 dark:text-primary-400">
                    Objectives
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.objective}
                  </p>
                </motion.section>
              ) : null}

              {/* Robot Photo and CAD Model - Side by Side with increased height */}
              {(project.photos && project.photos.length > 0) ||
              (project.cadModels && project.cadModels.length > 0) ? (
                <motion.section variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                    Robot Design
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Robot Photo */}
                    {project.photos && project.photos.length > 0 && (() => {
                      const firstPhoto = project.photos[0];
                      return (
                        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                          <div 
                            className="relative w-full bg-gray-200 dark:bg-gray-700"
                            style={{ aspectRatio: '3/4' }}
                            onClick={() => openImageModal(firstPhoto.src, firstPhoto.alt)}
                          >
                            {!imageErrors[`photo-0`] ? (
                              <>
                                <Image
                                  src={firstPhoto.src}
                                  alt={firstPhoto.alt}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  onError={() => handleImageError(`photo-0`)}
                                  unoptimized
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                    <div className="bg-black/70 rounded-full p-3">
                                      <FaExpand className="text-white text-xl" />
                                    </div>
                                    <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                      Click to enlarge
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                <div className="text-center">
                                  <p className="text-lg mb-2">Image Not Found</p>
                                  <p className="text-sm">{firstPhoto.alt}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          {firstPhoto.caption && (
                            <div className="p-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                {firstPhoto.caption}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* CAD Model */}
                    {project.cadModels && project.cadModels.length > 0 && (() => {
                      const firstCadModel = project.cadModels[0];
                      return (
                        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                          <div className="relative w-full bg-gray-200 dark:bg-gray-700" style={{ aspectRatio: '3/4' }}>
                            {firstCadModel.model3d ? (
                              // 3D Model Viewer
                              <div className="w-full h-full">
                                <ModelViewer
                                  src={firstCadModel.model3d}
                                  alt={firstCadModel.alt}
                                  autoRotate={true}
                                  cameraControls={true}
                                  className="w-full h-full"
                                />
                              </div>
                            ) : (
                              // Fallback to 2D Image
                              <div
                                className="cursor-pointer hover:shadow-xl transition-shadow w-full h-full group"
                                onClick={() => openImageModal(firstCadModel.src, firstCadModel.alt)}
                              >
                                {!imageErrors[`cad-0`] ? (
                                  <>
                                    <Image
                                      src={firstCadModel.src}
                                      alt={firstCadModel.alt}
                                      fill
                                      className="object-cover"
                                      sizes="(max-width: 768px) 100vw, 50vw"
                                      onError={() => handleImageError(`cad-0`)}
                                      unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                        <div className="bg-black/70 rounded-full p-3">
                                          <FaExpand className="text-white text-xl" />
                                        </div>
                                        <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                          Click to enlarge
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                    <div className="text-center">
                                      <p className="text-lg mb-2">Image Not Found</p>
                                      <p className="text-sm">{firstCadModel.alt}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          {firstCadModel.caption && (
                            <div className="p-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                {firstCadModel.caption}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </motion.section>
              ) : null}

              {/* Technical Implementation - Organized by Strategy */}
              {project.technicalImplementation && (
                <motion.section variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                    Engineering Approach
                  </h2>
                  <div className="space-y-6">
                    {/* Obstacle Avoidance Strategy */}
                    {project.technicalImplementation.trainingDetails && (
                      <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                          Obstacle Avoidance Strategy
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                          {project.technicalImplementation.trainingDetails
                            .filter((item) =>
                              item.toLowerCase().includes('obstacle') ||
                              item.toLowerCase().includes('angle') ||
                              item.toLowerCase().includes('sensor threshold') ||
                              item.toLowerCase().includes('simmer')
                            )
                            .map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Localization & Navigation Strategy */}
                    {project.technicalImplementation.trainingDetails && (
                      <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                          Localization & Navigation Strategy
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                          {project.technicalImplementation.trainingDetails
                            .filter(
                              (item) =>
                                item.toLowerCase().includes('localization') ||
                                item.toLowerCase().includes('probability') ||
                                item.toLowerCase().includes('path planning') ||
                                item.toLowerCase().includes('heading')
                            )
                            .map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Block Delivery Strategy */}
                    {project.technicalImplementation.trainingDetails && (
                      <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                          Block Delivery Strategy
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                          {project.technicalImplementation.trainingDetails
                            .filter(
                              (item) =>
                                item.toLowerCase().includes('block') ||
                                item.toLowerCase().includes('gripper') ||
                                item.toLowerCase().includes('servo') ||
                                item.toLowerCase().includes('scanning')
                            )
                            .map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Sensor Integration */}
                    {project.technicalImplementation.dataPreprocessing && (
                      <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                          Sensor Integration & Data Processing
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                          {project.technicalImplementation.dataPreprocessing.map(
                            (item, idx) => (
                              <li key={idx}>{item}</li>
                            )
                          )}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </motion.section>
              )}

              {/* System Architecture Overview */}
              <motion.section variants={itemVariants} className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                  System Architecture
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      Hardware Components
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• Arduino Uno microcontrollers (sensors & motor control)</li>
                      <li>• 7 ultrasonic sensors (HC-SR04)</li>
                      <li>• 2 IR sensors (block detection & floor pattern)</li>
                      <li>• 2 DC motors with H-bridge (L298N)</li>
                      <li>• 2 SG90 servo motors (gripper & lift)</li>
                      <li>• HC-05 Bluetooth module</li>
                      <li>• Custom 3D-printed chassis</li>
                    </ul>
                  </motion.div>
                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      Software & Control
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• Arduino C/C++ firmware</li>
                      <li>• MATLAB control algorithms</li>
                      <li>• Bluetooth serial communication (9600 baud)</li>
                      <li>• Probability-based localization (Monte Carlo)</li>
                      <li>• Fixed path planning system</li>
                      <li>• Real-time obstacle avoidance</li>
                      <li>• SimMer simulation environment</li>
                    </ul>
                  </motion.div>
                </div>
              </motion.section>

              {/* Simulation Video */}
              {project.videos && project.videos.find(v => v.type === 'simulation') && (
                <motion.section variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                    Simulation Demonstration
                  </h2>
                  <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    {(() => {
                      const simVideo = project.videos.find(v => v.type === 'simulation')
                      return simVideo ? (
                        <>
                          <div className="relative w-full aspect-video bg-gray-900">
                            <AutoPauseVideo
                              src={simVideo.src}
                              controls
                              controlsList="nodownload"
                              className="w-full h-full object-contain"
                              poster={simVideo.thumbnail}
                              preload="metadata"
                              playsInline
                              loop
                            >
                              <source src={simVideo.src} type="video/mp4" />
                              Your browser does not support the video tag.
                            </AutoPauseVideo>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                              {simVideo.title}
                            </h3>
                            {simVideo.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {simVideo.description}
                              </p>
                            )}
                          </div>
                        </>
                      ) : null
                    })()}
                  </motion.div>
                </motion.section>
              )}

              {/* Final Results with Performance Summary and Actual Demonstration Video */}
              {project.results && (
                <motion.section variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                    Final Results & Performance
                  </h2>
                  
                  {/* Performance Summary - Moved Below Video */}
                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      Performance Summary
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• <strong>Obstacle Avoidance:</strong> Perfect collision-free navigation achieved</li>
                      <li>• <strong>Localization:</strong> Successfully navigated from block 30 to loading zone in demonstration</li>
                      <li>• <strong>Block Detection:</strong> Functional - successfully identified load location using scanning sequence</li>
                      <li>• <strong>Block Manipulation:</strong> Limited due to gripper design constraints (insufficient torque, weak connection)</li>
                      <li>• <strong>Integration:</strong> Code organization challenges prevented full integration of load detection/pickup</li>
                    </ul>
                  </motion.div>

                  {/* Actual Demonstration Video */}
                  {project.videos && project.videos.find(v => v.type === 'operation') && (
                    <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                      {(() => {
                        const opVideo = project.videos.find(v => v.type === 'operation')
                        return opVideo ? (
                          <>
                            <div className="relative w-full aspect-video bg-gray-900">
                              <AutoPauseVideo
                                src={opVideo.src}
                                controls
                                controlsList="nodownload"
                                className="w-full h-full object-contain"
                                poster={opVideo.thumbnail}
                                preload="metadata"
                                playsInline
                                loop
                              >
                                <source src={opVideo.src} type="video/mp4" />
                                Your browser does not support the video tag.
                              </AutoPauseVideo>
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                {opVideo.title}
                              </h3>
                              {opVideo.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {opVideo.description}
                                </p>
                              )}
                            </div>
                          </>
                        ) : null
                      })()}
                    </motion.div>
                  )}
                </motion.section>
              )}

            </>
          ) : (
            <>
              {/* Default Layout for Other Projects */}

              {/* Quick Introduction - For barcelona-logo-projection */}
              {project.slug === 'barcelona-logo-projection' && (project as any).pageDescription && (
                <motion.section variants={itemVariants} className="mb-12">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {(project as any).pageDescription}
                  </p>
                </motion.section>
              )}

              {/* Objective */}
              {project.slug !== 'barcelona-logo-projection' && project.objective && (
                <motion.section variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-primary-600 dark:text-primary-400">
                    Objectives
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {project.objective}
                  </p>
                  {/* AFSD Process Schematic Image for MIE519 project */}
                  {project.slug === 'additive-friction-stir-deposition' && project.images && project.images[0] && (() => {
                    const firstImage = project.images[0];
                    return (
                      <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                        <div 
                          className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                          onClick={() => openImageModal(firstImage.src, firstImage.alt)}
                        >
                          {!imageErrors['objective-img'] ? (
                            <>
                              <Image
                                src={firstImage.src}
                                alt={firstImage.alt}
                                fill
                                className="object-contain"
                                sizes="(max-width: 1024px) 100vw, 100vw"
                                onError={() => handleImageError('objective-img')}
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                  <div className="bg-black/70 rounded-full p-3">
                                    <FaExpand className="text-white text-xl" />
                                  </div>
                                  <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                    Click to enlarge
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                              <div className="text-center">
                                <p className="text-lg mb-2">Image Not Found</p>
                                <p className="text-sm">{firstImage.alt}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        {firstImage.caption && (
                          <div className="p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                              {firstImage.caption}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })()}
                </motion.section>
              )}

              {/* Key Features & Functionalities */}
              {project.keyFeaturesAndFunctionalities && project.keyFeaturesAndFunctionalities.length > 0 && (
                <motion.section variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                    Key Features & Functionalities
                  </h2>
                  <div className="space-y-6">
                    {project.keyFeaturesAndFunctionalities.map((feature, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-4 text-primary-700 dark:text-primary-300">
                          {feature.title}
                        </h3>
                        <ul className="space-y-2">
                          {feature.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-gray-700 dark:text-gray-300 leading-relaxed flex items-start">
                              <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* System Design */}
              {project.systemDesign && project.systemDesign.length > 0 && (
                <motion.section variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                    System Design
                  </h2>
                  <div className="space-y-6">
                    {project.systemDesign.map((design, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-4 text-primary-700 dark:text-primary-300">
                          {design.title}
                        </h3>
                        <ul className="space-y-2">
                          {design.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-gray-700 dark:text-gray-300 leading-relaxed flex items-start">
                              <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  {/* Robot Photo and CAD Model - Side by Side (for MEAM 5100) */}
                  {project.slug === 'meam5100-autonomous-robot' &&
                  project.photos &&
                  project.photos.length > 0 &&
                  project.cadModels &&
                  project.cadModels.length > 0 && (() => {
                    const firstPhoto = project.photos[0];
                    const firstCadModel = project.cadModels[0];
                    return (
                      <div className="mt-8 grid md:grid-cols-2 gap-6">
                        {/* Robot Photo */}
                        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                          <div 
                            className="relative w-full bg-gray-200 dark:bg-gray-700"
                            style={{ aspectRatio: '3/4' }}
                            onClick={() => openImageModal(firstPhoto.src, firstPhoto.alt)}
                          >
                            {!imageErrors[`photo-meam5100-0`] ? (
                              <>
                                <Image
                                  src={firstPhoto.src}
                                  alt={firstPhoto.alt}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  onError={() => handleImageError(`photo-meam5100-0`)}
                                  unoptimized
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                    <div className="bg-black/70 rounded-full p-3">
                                      <FaExpand className="text-white text-xl" />
                                    </div>
                                    <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                      Click to enlarge
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                <div className="text-center">
                                  <p className="text-lg mb-2">Image Not Found</p>
                                  <p className="text-sm">{firstPhoto.alt}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          {firstPhoto.caption && (
                            <div className="p-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                {firstPhoto.caption}
                              </p>
                            </div>
                          )}
                        </div>

                      {/* CAD Model */}
                      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                        <div className="relative w-full bg-gray-200 dark:bg-gray-700" style={{ aspectRatio: '3/4' }}>
                          <div
                            className="cursor-pointer hover:shadow-xl transition-shadow w-full h-full group"
                            onClick={() => openImageModal(firstCadModel.src, firstCadModel.alt)}
                          >
                            {!imageErrors[`cad-meam5100-0`] ? (
                              <>
                                <Image
                                  src={firstCadModel.src}
                                  alt={firstCadModel.alt}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  onError={() => handleImageError(`cad-meam5100-0`)}
                                  unoptimized
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                    <div className="bg-black/70 rounded-full p-3">
                                      <FaExpand className="text-white text-xl" />
                                    </div>
                                    <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                      Click to enlarge
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                <div className="text-center">
                                  <p className="text-lg mb-2">Image Not Found</p>
                                  <p className="text-sm">{firstCadModel.alt}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        {firstCadModel.caption && (
                          <div className="p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                              {firstCadModel.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    );
                  })()}
                </motion.section>
              )}

              {/* Performance & Results */}
              {project.performanceAndResults && (
                <motion.section variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                    Performance & Results
                  </h2>
                  <div className="space-y-6">
                    {/* Videos */}
                    {project.performanceAndResults.videos && project.performanceAndResults.videos.length > 0 && (
                      <div className="grid md:grid-cols-3 gap-6">
                        {project.performanceAndResults.videos.map((video, idx) => (
                          <div key={idx} className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                            <div className="relative w-full aspect-video bg-gray-900">
                              <AutoPauseVideo
                                src={video.src}
                                controls
                                controlsList="nodownload"
                                className="w-full h-full object-contain"
                                preload="metadata"
                                playsInline
                                loop
                              >
                                <source src={video.src} type="video/mp4" />
                              </AutoPauseVideo>
                            </div>
                            {video.title && (
                              <div className="p-4">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {video.title}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Performance Metrics */}
                    {project.performanceAndResults.metrics && project.performanceAndResults.metrics.length > 0 && (
                      <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <ul className="space-y-3">
                          {project.performanceAndResults.metrics.map((metric, idx) => (
                            <li key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed flex items-start">
                              <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                              <span>{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.section>
              )}

          {/* Dataset with Figures 2 & 8 */}
          {project.dataset && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                Dataset
              </h2>
              <div className="space-y-6">
                {/* First Row: Two Pictures Side by Side */}
                {project.images && project.images.length >= 2 && (() => {
                  const firstImage = project.images[0];
                  const secondImage = project.images[1];
                  return (
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Figure 2 */}
                      {firstImage && (
                        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                          <div 
                            className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                            onClick={() => openImageModal(firstImage.src, firstImage.alt)}
                          >
                            {!imageErrors[0] ? (
                              <>
                                <Image
                                  src={firstImage.src}
                                  alt={firstImage.alt}
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  onError={() => handleImageError(0)}
                                  unoptimized
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                    <div className="bg-black/70 rounded-full p-3">
                                      <FaExpand className="text-white text-xl" />
                                    </div>
                                    <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                      Click to enlarge
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                <div className="text-center">
                                  <p className="text-lg mb-2">Image Not Found</p>
                                  <p className="text-sm">{firstImage.alt}</p>
                                  <p className="text-xs mt-2 text-gray-500 dark:text-gray-600">
                                    Please add: {firstImage.src}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          {firstImage.caption && (
                            <div className="p-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                {firstImage.caption}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Figure 8 */}
                      {secondImage && (
                        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                          <div 
                            className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                            onClick={() => openImageModal(secondImage.src, secondImage.alt)}
                          >
                            {!imageErrors[1] ? (
                              <>
                                <Image
                                  src={secondImage.src}
                                  alt={secondImage.alt}
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  onError={() => handleImageError(1)}
                                  unoptimized
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                    <div className="bg-black/70 rounded-full p-3">
                                      <FaExpand className="text-white text-xl" />
                                    </div>
                                    <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                      Click to enlarge
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                <div className="text-center">
                                  <p className="text-lg mb-2">Image Not Found</p>
                                  <p className="text-sm">{secondImage.alt}</p>
                                  <p className="text-xs mt-2 text-gray-500 dark:text-gray-600">
                                    Please add: {secondImage.src}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          {secondImage.caption && (
                            <div className="p-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                {secondImage.caption}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Second Row: Dataset Description (Full Width) */}
                <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className={`text-xl font-semibold mb-2 ${project.slug === 'dog-breed-classification-cnn' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>
                    {project.dataset.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.dataset.description}
                  </p>
                  {project.dataset.configurations && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                        Configurations:
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                        {project.dataset.configurations.map((config, idx) => (
                          <li key={idx}>{config}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* Architectures */}
          {project.architectures && (
            <motion.section variants={itemVariants} className="mb-12 -mx-4 px-4">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                Model Architectures
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.architectures.map((arch, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-primary-600 dark:text-primary-400">
                      {arch.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {arch.description}
                    </p>
                    {arch.details && (
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {arch.details.map((detail, detailIdx) => (
                          <li key={detailIdx}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Design and Analysis Methodology - Skip for barcelona-logo-projection */}
          {project.designAndAnalysisMethodology && project.slug !== 'barcelona-logo-projection' && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                {project.slug === 'mie320-tensile-test' ? 'Engineering Process' : 'Engineering Approach'}
              </h2>
              <div className="space-y-6">
                {project.designAndAnalysisMethodology.designApproach && (
                  <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      {project.slug === 'mie320-tensile-test' ? 'Design & Simulation Setup' : 'System Architecture & Hardware Design'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {project.designAndAnalysisMethodology.designApproach.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}

                {project.designAndAnalysisMethodology.componentSelection && project.slug !== 'whac-a-mole-embedded-game' && (
                  <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      {project.slug === 'mie320-tensile-test' ? 'Design Iteration & FEA Analysis' : 'Component Selection'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {project.designAndAnalysisMethodology.componentSelection.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}

                {project.designAndAnalysisMethodology.stressAndFatigueAnalysis && (
                  <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      {project.slug === 'mie320-tensile-test' 
                        ? 'Experimental Testing & Validation' 
                        : project.slug === 'whac-a-mole-embedded-game' 
                        ? 'Embedded Software Design' 
                        : 'Filtering & Protection Enhancements'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {project.designAndAnalysisMethodology.stressAndFatigueAnalysis.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}

                {project.designAndAnalysisMethodology.deflectionAndSlope && (
                  <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      Deflection and Slope
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {project.designAndAnalysisMethodology.deflectionAndSlope.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}

                {project.designAndAnalysisMethodology.simulationAndValidation && (
                  <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      {project.slug === 'mie320-tensile-test' ? 'Refinement & Final Design' : 'Testing & Optimization'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {project.designAndAnalysisMethodology.simulationAndValidation.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}

          {/* FEA and Sample Images - For MIE320 Project */}
          {project.slug === 'mie320-tensile-test' && project.images && project.images.length >= 2 && (() => {
            const firstImage = project.images[0];
            const secondImage = project.images[1];
            return (
              <motion.section variants={itemVariants} className="mb-12">
                <div className="grid md:grid-cols-3 gap-6 items-stretch">
                  {/* FEA Result - Left 2/3 */}
                  {firstImage && (
                    <div className="md:col-span-2 bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group flex flex-col">
                      <div 
                        className="relative w-full flex-1 min-h-[500px] bg-gray-200 dark:bg-gray-700"
                        onClick={() => openImageModal(firstImage.src, firstImage.alt)}
                      >
                        {!imageErrors['mie320-0'] ? (
                          <>
                            <Image
                              src={firstImage.src}
                              alt={firstImage.alt}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 66vw"
                              onError={() => handleImageError('mie320-0')}
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                <div className="bg-black/70 rounded-full p-3">
                                  <FaExpand className="text-white text-xl" />
                                </div>
                                <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                  Click to enlarge
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                            <div className="text-center">
                              <p className="text-lg mb-2">Image Not Found</p>
                              <p className="text-sm">{firstImage.alt}</p>
                              <p className="text-xs mt-2 text-gray-500 dark:text-gray-600">
                                Please add: {firstImage.src}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      {firstImage.caption && (
                        <div className="p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            {firstImage.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Actual Sample - Right 1/3 */}
                  {secondImage && (
                    <div className="md:col-span-1 bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group flex flex-col">
                      <div 
                        className="relative w-full flex-1 min-h-[500px] bg-gray-200 dark:bg-gray-700"
                        onClick={() => openImageModal(secondImage.src, secondImage.alt)}
                      >
                        {!imageErrors['mie320-1'] ? (
                          <>
                            <Image
                              src={secondImage.src}
                              alt={secondImage.alt}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 33vw"
                              onError={() => handleImageError('mie320-1')}
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                <div className="bg-black/70 rounded-full p-3">
                                  <FaExpand className="text-white text-xl" />
                                </div>
                                <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                  Click to enlarge
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                            <div className="text-center">
                              <p className="text-lg mb-2">Image Not Found</p>
                              <p className="text-sm">{secondImage.alt}</p>
                              <p className="text-xs mt-2 text-gray-500 dark:text-gray-600">
                                Please add: {secondImage.src}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      {secondImage.caption && (
                        <div className="p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            {secondImage.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.section>
            );
          })()}

          {/* Circuit Design Images - For Portable Oscilloscope Project */}
          {project.slug === 'mie346-design-assignments' && project.images && project.images.length >= 2 && (
            <motion.section variants={itemVariants} className="mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                {project.images.slice(0, 2).map((img, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
                  >
                    <div 
                      className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                      onClick={() => openImageModal(img.src, img.alt)}
                    >
                      {!imageErrors[`circuit-${idx}`] ? (
                        <>
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={() => handleImageError(`circuit-${idx}`)}
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                              <div className="bg-black/70 rounded-full p-3">
                                <FaExpand className="text-white text-xl" />
                              </div>
                              <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                Click to enlarge
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                          <div className="text-center">
                            <p className="text-lg mb-2">Image Not Found</p>
                            <p className="text-sm">{img.alt}</p>
                            <p className="text-xs mt-2 text-gray-500 dark:text-gray-600">
                              Please add: {img.src}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    {img.caption && (
                      <div className="p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                          {img.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Design Process - For CNC Milling Machine Only */}
          {project.slug === 'home-cnc-milling-machine' && project.technicalImplementation && project.technicalImplementation.trainingDetails && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                Design Process
              </h2>
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    {project.technicalImplementation.trainingDetails.map(
                      (item, idx) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* Technical Implementation */}
          {project.technicalImplementation && project.slug !== 'home-cnc-milling-machine' && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                {project.slug === 'additive-friction-stir-deposition' ? 'Engineering Analysis' : 'Technical Implementation'}
              </h2>
              <div className={project.slug === 'dog-breed-classification-cnn' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}>
                {project.technicalImplementation.dataPreprocessing && (
                  <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      {project.slug === 'additive-friction-stir-deposition' ? 'Process Overview & Methodology' : 'Data Preprocessing'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {project.technicalImplementation.dataPreprocessing.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}

                {project.technicalImplementation.dataAugmentation && (
                  <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      {project.slug === 'additive-friction-stir-deposition' ? 'Material Selection & Process Parameters' : 'Data Augmentation'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {project.technicalImplementation.dataAugmentation.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}

                {project.technicalImplementation.trainingDetails && (
                  <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      {project.slug === 'additive-friction-stir-deposition' 
                        ? 'Experimental Design & Comparative Analysis' 
                        : 'Training Details'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {project.technicalImplementation.trainingDetails.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}

                {project.technicalImplementation.modelEvaluation && (
                  <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      {project.slug === 'additive-friction-stir-deposition' ? 'Microstructural & Mechanical Evaluation' : 'Model Evaluation'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {project.technicalImplementation.modelEvaluation.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}

                {project.technicalImplementation.otherSections && (
                  <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                      {project.slug === 'additive-friction-stir-deposition' ? 'Post-Processing & Validation' : 'Additional Details'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {project.technicalImplementation.otherSections.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}

          {/* Video Demonstration - Above Results for Gearbox and Whac-A-Mole Projects */}
          {(project.slug === 'two-stage-gearbox-shaft-design' || project.slug === 'whac-a-mole-embedded-game') && project.videos && project.videos.length > 0 && (() => {
            const firstVideo = project.videos[0];
            return (
              <motion.section variants={itemVariants} className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                  Video Demonstration
                </h2>
                <div className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                  <div className="relative w-full aspect-video bg-gray-900">
                    <AutoPauseVideo
                      src={firstVideo.src}
                      controls
                      controlsList="nodownload"
                      className="w-full h-full object-contain"
                      poster={firstVideo.thumbnail}
                      preload="metadata"
                      playsInline
                      loop
                    >
                      <source src={firstVideo.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </AutoPauseVideo>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {firstVideo.title}
                    </h3>
                    {firstVideo.description && (
                      <p className="text-gray-600 dark:text-gray-400">
                        {firstVideo.description}
                      </p>
                    )}
                  </div>

                {/* Performance Metrics under video for Whac-A-Mole */}
                {project.slug === 'whac-a-mole-embedded-game' && project.results && (
                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-8 m-4 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-6 text-primary-600 dark:text-primary-400">
                      Performance Metrics
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {project.results.otherMetrics?.map((metric, idx) => (
                        <div key={idx}>
                          <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            {metric.label}
                          </h4>
                          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.section>
            );
          })()}

          {/* Results Section - Different layout for MIE519 vs other projects */}
          {project.slug !== 'home-cnc-milling-machine' && project.slug !== 'whac-a-mole-embedded-game' && project.slug !== 'barcelona-logo-projection' && (project.results || project.slug === 'additive-friction-stir-deposition') && (
          <motion.section variants={itemVariants} className="mb-12">
            {project.slug !== 'additive-friction-stir-deposition' && project.slug !== 'mie346-design-assignments' && project.slug !== 'mie320-tensile-test' && (
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                {project.slug === 'two-stage-gearbox-shaft-design'
                  ? 'Results'
                  : 'Results'}
              </h2>
            )}
            
            {project.slug === 'mie320-tensile-test' ? (
              /* MIE320 Layout: Video (3/4) and Performance Metrics (1/4) */
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                  Testing Results
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Testing Video - Left 3/4 */}
                  {project.videos && project.videos.length > 0 && (() => {
                    const firstVideo = project.videos[0];
                    return (
                      <div className="md:col-span-3 bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                        <div className="relative w-full aspect-video bg-gray-900">
                          <AutoPauseVideo
                            src={firstVideo.src}
                            controls
                            controlsList="nodownload"
                            className="w-full h-full object-contain"
                            preload="metadata"
                            playsInline
                            loop
                          >
                            <source src={firstVideo.src} type="video/mp4" />
                            Your browser does not support the video tag.
                          </AutoPauseVideo>
                        </div>
                        <div className="p-4">
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            {firstVideo.title}
                          </h3>
                          {firstVideo.description && (
                            <p className="text-gray-600 dark:text-gray-400">
                              {firstVideo.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                  {/* Performance Metrics - Right 1/4 */}
                  {project.results && (
                    <div className="md:col-span-1">
                      <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-6 hover:shadow-lg transition-shadow h-full">
                        <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                          Test Metrics
                        </h3>
                        <div className="space-y-4">
                          {project.results.otherMetrics?.map((metric, idx) => (
                            <div key={idx}>
                              <h4 className="text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                                {metric.label}
                              </h4>
                              <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                {metric.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            ) : project.slug === 'mie346-design-assignments' ? (
              /* MIE346 Layout: Key Features in 2x4 format */
              <div className="space-y-6">
                {project.results && (
                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-8 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-6 text-primary-600 dark:text-primary-400">
                      Key Features
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {project.results.otherMetrics?.map((metric, idx) => (
                        <div key={idx}>
                          <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            {metric.label}
                          </h4>
                          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ) : project.slug === 'two-stage-gearbox-shaft-design' ? (
              /* Gearbox Layout: FEA Images in 1x2 format */
              <div className="space-y-6">
                {/* FEA Shaft and Gear Images - Side by Side (1x2 format) */}
                {project.images && project.images.length >= 2 && (() => {
                  const firstImage = project.images[0];
                  const secondImage = project.images[1];
                  return (
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* FEA Shaft Analysis */}
                      {firstImage && (
                        <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                          <div 
                            className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                            onClick={() => openImageModal(firstImage.src, firstImage.alt)}
                          >
                            {!imageErrors['fea-shaft'] ? (
                              <>
                                <Image
                                  src={firstImage.src}
                                  alt={firstImage.alt}
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  onError={() => handleImageError('fea-shaft')}
                                  unoptimized
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                    <div className="bg-black/70 rounded-full p-3">
                                      <FaExpand className="text-white text-xl" />
                                    </div>
                                    <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                      Click to enlarge
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                <div className="text-center">
                                  <p className="text-lg mb-2">Image Not Found</p>
                                  <p className="text-sm">{firstImage.alt}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          {firstImage.caption && (
                            <div className="p-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                {firstImage.caption}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* FEA Gear Analysis */}
                      {secondImage && (
                        <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                          <div 
                            className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                            onClick={() => openImageModal(secondImage.src, secondImage.alt)}
                          >
                            {!imageErrors['fea-gear'] ? (
                              <>
                                <Image
                                  src={secondImage.src}
                                  alt={secondImage.alt}
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  onError={() => handleImageError('fea-gear')}
                                  unoptimized
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                    <div className="bg-black/70 rounded-full p-3">
                                      <FaExpand className="text-white text-xl" />
                                    </div>
                                    <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                      Click to enlarge
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                <div className="text-center">
                                  <p className="text-lg mb-2">Image Not Found</p>
                                  <p className="text-sm">{secondImage.alt}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          {secondImage.caption && (
                            <div className="p-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                {secondImage.caption}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  );
                })()}

                {/* Performance Metrics Below Images */}
                {project.results && (
                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-8 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-6 text-primary-600 dark:text-primary-400">
                      Performance Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {project.results.otherMetrics?.map((metric, idx) => (
                        <div key={idx}>
                          <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            {metric.label}
                          </h4>
                          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ) : project.slug === 'additive-friction-stir-deposition' ? (
              /* MIE519 Layout: Images in Technical Analysis Section */
              <div className="space-y-6">
                {/* Grain Microscopy Image */}
                {project.images && project.images[1] && (() => {
                  const secondImage = project.images[1];
                  return (
                    <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                      <div 
                        className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                        onClick={() => openImageModal(secondImage.src, secondImage.alt)}
                      >
                        {!imageErrors['grain-microscopy'] ? (
                          <>
                            <Image
                              src={secondImage.src}
                              alt={secondImage.alt}
                              fill
                              className="object-contain"
                              sizes="(max-width: 1024px) 100vw, 100vw"
                              onError={() => handleImageError('grain-microscopy')}
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                <div className="bg-black/70 rounded-full p-3">
                                  <FaExpand className="text-white text-xl" />
                                </div>
                                <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                  Click to enlarge
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                            <div className="text-center">
                              <p className="text-lg mb-2">Image Not Found</p>
                              <p className="text-sm">{secondImage.alt}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      {secondImage.caption && (
                        <div className="p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                            {secondImage.caption}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })()}

                {/* Tensile and Yield Strength Comparison (1x2 format) with Performance Metrics Below */}
                {project.images && project.images.length >= 3 && (() => {
                  const thirdImage = project.images[2];
                  const fourthImage = project.images[3];
                  return (
                    <div className="space-y-6">
                      {/* Tensile and Yield Strength Images - Side by Side (1x2 format) */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Tensile Strength Comparison */}
                        {fourthImage && (
                          <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                            <div 
                              className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                              onClick={() => openImageModal(fourthImage.src, fourthImage.alt)}
                            >
                              {!imageErrors['tensile-strength'] ? (
                                <>
                                  <Image
                                    src={fourthImage.src}
                                    alt={fourthImage.alt}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    onError={() => handleImageError('tensile-strength')}
                                    unoptimized
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                      <div className="bg-black/70 rounded-full p-3">
                                        <FaExpand className="text-white text-xl" />
                                      </div>
                                      <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                        Click to enlarge
                                      </span>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                  <div className="text-center">
                                    <p className="text-lg mb-2">Image Not Found</p>
                                    <p className="text-sm">{fourthImage.alt}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            {fourthImage.caption && (
                              <div className="p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                  {fourthImage.caption}
                                </p>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* Yield Strength Comparison */}
                        {thirdImage && (
                          <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                            <div 
                              className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                              onClick={() => openImageModal(thirdImage.src, thirdImage.alt)}
                            >
                              {!imageErrors['yield-strength'] ? (
                                <>
                                  <Image
                                    src={thirdImage.src}
                                    alt={thirdImage.alt}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    onError={() => handleImageError('yield-strength')}
                                    unoptimized
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                      <div className="bg-black/70 rounded-full p-3">
                                        <FaExpand className="text-white text-xl" />
                                      </div>
                                      <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                        Click to enlarge
                                      </span>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                  <div className="text-center">
                                    <p className="text-lg mb-2">Image Not Found</p>
                                    <p className="text-sm">{thirdImage.alt}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            {thirdImage.caption && (
                              <div className="p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                  {thirdImage.caption}
                                </p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* Default Layout for Other Projects */
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Column: Training Result Image (270 Epochs) */}
                {project.images && project.images.length >= 3 && project.images[2] && (() => {
                  const thirdImage = project.images[2];
                  return (
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                      <h3 className="text-xl font-semibold mb-4 p-4 pb-0 text-primary-600 dark:text-primary-400">
                        Training Results
                      </h3>
                      <div 
                        className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                        onClick={() => openImageModal(thirdImage.src, thirdImage.alt)}
                      >
                        {!imageErrors[2] ? (
                          <>
                            <Image
                              src={thirdImage.src}
                              alt={thirdImage.alt}
                              fill
                              className="object-contain"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              onError={() => handleImageError(2)}
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                <div className="bg-black/70 rounded-full p-3">
                                  <FaExpand className="text-white text-xl" />
                                </div>
                                <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                  Click to enlarge
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                            <div className="text-center">
                              <p className="text-lg mb-2">Image Not Found</p>
                              <p className="text-sm">{thirdImage.alt}</p>
                              <p className="text-xs mt-2 text-gray-500 dark:text-gray-600">
                                Please add: {thirdImage.src}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      {thirdImage.caption && (
                        <div className="p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                            {thirdImage.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Right Column: Results Metrics */}
                {project.results && project.slug !== 'whac-a-mole-embedded-game' && (
                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-8 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-6 text-primary-600 dark:text-primary-400">
                      Performance Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {project.results.baselineAccuracy && (
                        <div>
                          <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Baseline Accuracy
                          </h4>
                          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {project.results.baselineAccuracy}
                          </p>
                        </div>
                      )}
                      {project.results.validationAccuracy && (
                        <div>
                          <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Final Validation Accuracy
                          </h4>
                          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {project.results.validationAccuracy}
                          </p>
                        </div>
                      )}
                      {project.results.testAccuracy && (
                        <div>
                          <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Test Accuracy
                          </h4>
                          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {project.results.testAccuracy}
                          </p>
                        </div>
                      )}
                      {project.results.epochs && (
                        <div>
                          <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Training Epochs
                          </h4>
                          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {project.results.epochs}
                          </p>
                        </div>
                      )}
                      {project.results.otherMetrics?.map((metric, idx) => (
                        <div key={idx}>
                          <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            {metric.label}
                          </h4>
                          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.section>
          )}

          {/* Robot Photos */}
          {project.photos && project.photos.length > 0 && project.slug !== 'meam5100-autonomous-robot' && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                Robot Photos
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden"
                  >
                    <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700">
                      {!imageErrors[`photo-${idx}`] ? (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onError={() => handleImageError(`photo-${idx}`)}
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                          <div className="text-center">
                            <p className="text-lg mb-2">Image Not Found</p>
                            <p className="text-sm">{photo.alt}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {photo.caption && (
                      <div className="p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          {photo.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* CAD Models */}
          {project.cadModels && project.cadModels.length > 0 && project.slug !== 'meam5100-autonomous-robot' && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                CAD Models
              </h2>
              <div className={project.slug === 'home-cnc-milling-machine' ? 'w-full' : 'grid md:grid-cols-2 gap-6'}>
                {project.cadModels.map((cad, idx) => (
                  <div
                    key={idx}
                    className={`bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group ${project.slug === 'home-cnc-milling-machine' ? 'w-full' : ''}`}
                  >
                    <div 
                      className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                      onClick={() => openImageModal(cad.src, cad.alt)}
                    >
                      {!imageErrors[`cad-${idx}`] ? (
                        <>
                          <Image
                            src={cad.src}
                            alt={cad.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={() => handleImageError(`cad-${idx}`)}
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                              <div className="bg-black/70 rounded-full p-3">
                                <FaExpand className="text-white text-xl" />
                              </div>
                              <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                Click to enlarge
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                          <div className="text-center">
                            <p className="text-lg mb-2">Image Not Found</p>
                            <p className="text-sm">{cad.alt}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {cad.caption && (
                      <div className="p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          {cad.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Engineering Drawings - For CNC Milling Machine Project */}
          {project.slug === 'home-cnc-milling-machine' && project.images && project.images.length > 0 && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                Engineering Drawings
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
                  >
                    <div 
                      className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700"
                      onClick={() => openImageModal(img.src, img.alt)}
                    >
                      {!imageErrors[`eng-drawing-${idx}`] ? (
                        <>
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={() => handleImageError(`eng-drawing-${idx}`)}
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                              <div className="bg-black/70 rounded-full p-3">
                                <FaExpand className="text-white text-xl" />
                              </div>
                              <span className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded">
                                Click to enlarge
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                          <div className="text-center">
                            <p className="text-lg mb-2">Image Not Found</p>
                            <p className="text-sm">{img.alt}</p>
                            <p className="text-xs mt-2 text-gray-500 dark:text-gray-600">
                              Please add: {img.src}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    {img.caption && (
                      <div className="p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          {img.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Videos Section - Custom layout for barcelona-logo-projection */}
          {project.videos && project.videos.length > 0 && project.slug === 'barcelona-logo-projection' && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                Projects
              </h2>
              <div className="space-y-8">
                {project.videos.map((video, idx) => (
                  <div key={idx} className="grid md:grid-cols-3 gap-6">
                    {/* Video/GIF Block - Left 2/3 */}
                    <div className="md:col-span-2 bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="relative w-full aspect-video bg-gray-900">
                        {video.src.endsWith('.gif') ? (
                          <img
                            src={video.src}
                            alt={video.title}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <AutoPauseVideo
                            src={video.src}
                            controls
                            controlsList="nodownload"
                            className="w-full h-full object-contain"
                            poster={video.thumbnail}
                            preload="metadata"
                            playsInline
                            loop
                          >
                            <source src={video.src} type="video/mp4" />
                            Your browser does not support the video tag.
                          </AutoPauseVideo>
                        )}
                      </div>
                    </div>
                    {/* Description and Skills Block - Right 1/3 */}
                    <div className="md:col-span-1">
                      <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg p-4 h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-primary-600 dark:text-primary-400">
                            {video.title}
                          </h3>
                          {video.projectDescription && (
                            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                              {video.projectDescription}
                            </p>
                          )}
                          {!video.projectDescription && video.description && (
                            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                              {video.description}
                            </p>
                          )}
                        </div>
                        {video.skills && video.skills.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">
                              Skills
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {video.skills.map((skill, skillIdx) => (
                                <span
                                  key={skillIdx}
                                  className="px-2 py-0.5 bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200 rounded text-xs font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Videos - Only show for projects that don't have video above Results */}
          {project.slug !== 'two-stage-gearbox-shaft-design' && project.slug !== 'whac-a-mole-embedded-game' && project.slug !== 'mie320-tensile-test' && project.slug !== 'barcelona-logo-projection' && project.videos && project.videos.length > 0 && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                Videos
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.videos.map((video, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden"
                  >
                    <div className="relative w-full aspect-video bg-gray-900">
                      <AutoPauseVideo
                        src={video.src}
                        controls
                        controlsList="nodownload"
                        className="w-full h-full object-contain"
                        poster={video.thumbnail}
                        preload="metadata"
                        playsInline
                        loop
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </AutoPauseVideo>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {video.description}
                        </p>
                      )}
                      {video.type && (
                        <span className="inline-block mt-2 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                          {video.type === 'simulation'
                            ? 'Simulation'
                            : video.type === 'operation'
                            ? 'Operation'
                            : 'Other'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

            </>
          )}

          {/* Key Achievements - Always Displayed at the End (if exists) */}
          {project.keyAchievements && project.keyAchievements.length > 0 && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                Key Achievements
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.keyAchievements.map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-3 bg-gray-50 dark:bg-slate-800 rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {achievement}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Back Button - Common for all projects */}
          <motion.div variants={itemVariants} className="mt-12">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FaArrowLeft />
              <span>Back to All Projects</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

