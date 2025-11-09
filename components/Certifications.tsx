'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { FaExpand } from 'react-icons/fa'
import { getAssetPath } from '@/utils/path'

export default function Certifications() {
  const [enlargedImage, setEnlargedImage] = useState<{
    src: string
    alt: string
  } | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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

  const openImageModal = (src: string, alt: string) => {
    setEnlargedImage({ src, alt })
  }

  const closeImageModal = () => {
    setEnlargedImage(null)
  }

  const certifications = [
    {
      title: 'Master of Science in Engineering',
      institution: 'University of Pennsylvania',
      description: 'Mechanical Engineering & Applied Mechanics, Mechatronic & Robotic Systems',
      year: '2023-2025',
      image: getAssetPath('/images/upenn_diploma.jpg'),
      alt: 'University of Pennsylvania Master of Science in Engineering Diploma',
    },
    {
      title: 'Bachelor of Applied Science',
      institution: 'University of Toronto',
      description: 'Mechanical Engineering, Minor in Robotics and Mechatronics',
      year: '2018 - 2023',
      image: getAssetPath('/images/uteng-mechanical-composite-2022-2023.jpg'),
      alt: 'UTENG Mechanical Engineering Composite 2022-2023',
    },
    {
      title: 'SOLIDWORKS Mechanical Design Associate',
      institution: 'Dassault Systèmes',
      description: 'Mechanical Design at the level of ASSOCIATE - Academic exam at University of Toronto. Certificate License Code: C-VTBZJQ58HW',
      year: 'November 22, 2019',
      image: getAssetPath('/images/solidworks-certificate.jpg'),
      alt: 'SOLIDWORKS Mechanical Design Associate Certificate - C-VTBZJQ58HW',
    },
  ]

  return (
    <section
      id="certifications"
      className="py-20 px-4 bg-gray-50 dark:bg-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white"
          >
            Certifications & Achievements
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg"
          >
            Academic credentials and professional achievements
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative w-full aspect-[4/3] bg-gray-200 dark:bg-gray-700 cursor-pointer group"
                  onClick={() => openImageModal(cert.image, cert.alt)}
                >
                  <Image
                    src={cert.image}
                    alt={cert.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      // Hide image on error, show placeholder
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
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
                  {/* Placeholder for missing images */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 hidden">
                    <div className="text-center p-4">
                      <p className="text-sm mb-2">Image Not Found</p>
                      <p className="text-xs">{cert.alt}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {cert.institution}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    {cert.description}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {cert.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

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
          <div className="relative max-w-7xl max-h-[90vh] pointer-events-none">
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
    </section>
  )
}

