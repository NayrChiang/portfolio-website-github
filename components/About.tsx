'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getAssetPath } from '@/utils/path'

export default function About() {
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
      id="about"
      className="py-20 px-4 bg-white dark:bg-slate-900"
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
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg transform rotate-6"></div>
                <div className="relative w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={getAssetPath("/images/profile-picture.JPG")}
                    alt="Chen Hsin Chiang Profile Picture"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm <strong className="text-gray-900 dark:text-white">Chen Hsin Chiang</strong>, a Mechanical & Mechatronics Engineer passionate about building intelligent robotic systems that merge mechanical precision with embedded control.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I hold an <strong>M.S.E. in Mechanical Engineering and Applied Mechanics (Mechatronic & Robotic Systems)</strong> from the University of Pennsylvania, where I focused on autonomous systems, perception, and embedded firmware development.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I hold a <strong>B.A.Sc. in Mechanical Engineering (High Honors)</strong> from the University of Toronto, where I specialized in robotics, control systems, and manufacturing design. My work bridges the intersection of mechanical design, embedded programming, and system integration, turning complex electromechanical ideas into robust, real-world prototypes.
              </p>

            </motion.div>
          </div>

          {/* Highlights Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl">💡</span> Highlights
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Autonomous Systems',
                  description: 'Designed and programmed autonomous systems — from quadcopters with SE(3) control and visual-inertial odometry to robotic arms powered by ROS and AprilTag vision.',
                },
                {
                  title: 'Embedded Firmware Development',
                  description: 'Developed embedded C++ firmware on STM32 for high-voltage EV systems, achieving sub-10 ms fault response and reducing debug time by ~30%.',
                },
                {
                  title: 'Mechanical Design & Optimization',
                  description: 'Engineered load-bearing aluminum structures and performed FEA-driven optimization in SolidWorks and ANSYS, cutting stress concentrations by ~50%.',
                },
                {
                  title: 'Technical Expertise',
                  description: 'Experienced in C++, Python, MATLAB, ROS 2, SolidWorks, ANSYS, and NX, with hands-on expertise in 3D printing, CNC machining, and PCB prototyping.',
                },
              ].map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-primary-50 dark:bg-slate-800 p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-xl font-semibold mb-3 text-primary-600 dark:text-primary-400">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Core Strengths Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl">⚙️</span> Core Strengths
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  category: 'Robotics & Controls',
                  skills: 'ROS 2, EKF, path planning, embedded C++, sensor fusion',
                },
                {
                  category: 'Mechanical Design',
                  skills: 'CAD modeling, FEA, vibration/fatigue analysis',
                },
                {
                  category: 'Prototyping & Manufacturing',
                  skills: 'CNC, additive manufacturing, PCB design',
                },
                {
                  category: 'Programming & Simulation',
                  skills: 'Python, MATLAB, STM32, control algorithms',
                },
              ].map((strength, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-slate-800 dark:to-slate-700 p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-lg font-semibold mb-3 text-primary-600 dark:text-primary-400">
                    {strength.category}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {strength.skills}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
