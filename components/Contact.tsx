'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Add form submission logic here, e.g., send to API
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you for your message! I will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

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
      id="contact"
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
            Contact Me
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg"
          >
            Interested in working together? Let's talk!
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: FaEnvelope,
                      label: 'Email',
                      value: 'chenhsin.chiang4@gmail.com',
                      href: 'mailto:chenhsin.chiang4@gmail.com',
                    },
                    {
                      icon: FaMapMarkerAlt,
                      label: 'Location',
                      value: 'Vancouver, BC, Canada',
                      href: '#',
                    },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                        <Icon className="text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {label}
                        </div>
                        <div className="text-gray-900 dark:text-white font-medium">
                          {value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg"
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
