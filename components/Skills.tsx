'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Robotics',
    skills: [
      { name: 'Rotations & Rigid Transformations', level: 1.0 }, // MEAM 6200, MEAM 5200
      { name: 'Quadrotor Dynamics', level: 0.5 }, // MEAM 6200
      { name: 'Path Planning', level: 0.5 }, // MEAM 6200
      { name: 'Trajectory Planning', level: 0.5 }, // MEAM 6200
      { name: 'Graph Search Algorithms (A*)', level: 0.5 }, // MEAM 6200
      { name: 'SLAM', level: 0.5 }, // MEAM 6200
      { name: 'Visual Odometry', level: 0.5 }, // MEAM 6200, CIS 5800
      { name: 'Kalman Filtering', level: 0.5 }, // MEAM 6200
      { name: 'Forward/Inverse Kinematics', level: 0.5 }, // MEAM 5200
      { name: 'Jacobians', level: 0.5 }, // MEAM 5200
      { name: 'Manipulator Control', level: 0.5 }, // MEAM 5200
      { name: 'ROS', level: 0.5 }, // MEAM 5200
      { name: 'Gazebo Simulation', level: 0.5 }, // MEAM 5200
      { name: 'PID Control', level: 1.0 }, // MIE404, MIE312, MEAM 5100
      { name: 'State Space Control', level: 0.5 }, // MEAM 6200
      { name: 'LQR', level: 0.5 }, // MEAM 6200
      { name: 'System Modeling', level: 1.5 }, // MIE312, MIE334, MIE342
      { name: 'Stability Analysis', level: 1.5 }, // MIE312, MIE334, MIE342
    ],
  },
  {
    title: 'Embedded Systems',
    skills: [
      { name: 'Arduino', level: 1.0 }, // MIE438, MIE444, MEAM 5100
      { name: 'C/C++', level: 1.0 }, // MIE438, MIE444, MEAM 5100
      { name: 'ESP32', level: 0.5 }, // MEAM 5100
      { name: 'STM32', level: 0.5 }, // MEAM 5100
      { name: 'Microcontroller Architecture', level: 0.5 }, // MIE438
      { name: 'Interrupts & Timers', level: 0.5 }, // MIE438
      { name: 'I2C/SPI/UART', level: 0.5 }, // MIE438, MEAM 5100
      { name: 'ADC/DAC', level: 0.5 }, // MIE438
      { name: 'Motor Control', level: 0.5 }, // MIE444, MEAM 5100
      { name: 'Sensor Integration', level: 0.5 }, // MIE444, MEAM 5100
      { name: 'PWM Control', level: 0.5 }, // MIE444, MEAM 5100
      { name: 'Encoder Systems', level: 0.5 }, // MIE404
      { name: 'Bluetooth Communication', level: 0.5 }, // MIE444
      { name: 'ESP-NOW', level: 0.5 }, // MEAM 5100
      { name: 'UDP', level: 0.5 }, // MEAM 5100
      { name: 'Embedded Control Loops', level: 0.5 }, // MIE438
      { name: 'State Machines', level: 0.5 }, // MIE438
      { name: 'Code Optimization', level: 0.5 }, // MIE438
      { name: 'Memory Management', level: 0.5 }, // MIE438
      { name: 'Real-time Systems', level: 1.0 }, // MIE404, MIE444
      { name: 'Embedded Firmware Development', level: 0.5 }, // MEAM 5100
      { name: 'Op-Amp Circuits', level: 0.5 }, // MIE346
      { name: 'Active/Passive Filters', level: 0.5 }, // MIE346
      { name: 'PSPICE/Eagle', level: 0.5 }, // MIE346
      { name: 'PCB Design', level: 0.5 }, // MIE346
    ],
  },
  {
    title: 'Mechanical Engineering',
    skills: [
      { name: 'SolidWorks', level: 1.5 }, // MIE243, MIE301, MIE320
      { name: 'CAD/CAM', level: 1.0 }, // MIE243, MIE301
      { name: 'Engineering Drawing', level: 0.5 }, // MIE243
      { name: 'Mechanism Design', level: 0.5 }, // MIE301
      { name: 'Gear Design', level: 1.0 }, // MIE301, MIE442
      { name: 'Motion Transmission', level: 0.5 }, // MIE301
      { name: 'Reverse Engineering', level: 0.5 }, // MIE243
      { name: 'Mechanics of Materials', level: 0.5 }, // MIE222
      { name: 'Finite Element Analysis (FEA)', level: 0.5 }, // MIE320
      { name: 'Stress Analysis', level: 0.5 }, // MIE222
      { name: 'Load Analysis', level: 0.5 }, // MIE222
      { name: 'Failure Analysis', level: 0.5 }, // MIE222
      { name: 'Fatigue Analysis', level: 0.5 }, // MIE222, MIE442
      { name: 'Shaft Design', level: 0.5 }, // MIE442
      { name: 'Bearing Selection', level: 0.5 }, // MIE442
      { name: 'Fastener Design', level: 0.5 }, // MIE442
      { name: 'Structural Analysis', level: 0.5 }, // MIE320
      { name: 'Mechanism Kinematics', level: 0.5 }, // MIE301
      { name: 'Machine Dynamics', level: 0.5 }, // MIE301
      { name: 'Gear Trains', level: 0.5 }, // MIE301
      { name: 'Vector Loop Analysis', level: 0.5 }, // MIE301
      { name: 'MATLAB Kinematics Modeling', level: 0.5 }, // MIE301
    ],
  },
]

export default function Skills() {
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

  return (
    <section
      id="skills"
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
            Skills
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg"
          >
            Technologies and tools I work with
          </motion.p>

          <div className="grid md:grid-cols-3 max-w-6xl mx-auto gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-primary-600 dark:text-primary-400 font-semibold">
                        {skill.level === 1 ? '1 year' : `${skill.level} years`}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
