import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import aiResumeImage from '../assets/ai-resume-white.png'; // Ensure this image exists

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-purple-700 via-blue-800 to-indigo-900 text-white flex flex-col font-sans relative overflow-hidden"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.15 }}
      variants={{ hidden: {}, visible: {} }}
    >
      {/* Decorative background bubbles */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 bg-blue-400 opacity-20 rounded-full filter blur-3xl z-0"
        variants={fadeIn}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 opacity-20 rounded-full filter blur-3xl z-0"
        variants={fadeIn}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Header */}
      <motion.header
        className="relative z-10 flex items-center px-6 py-4 max-w-7xl mx-auto w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-md"
        variants={fadeIn}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-9 h-9 text-green-400"
          >
            <path d="M13 2L9 22L6.5 13H2V11H8.5L10 17L14 2L17.5 11H22V13H16.5L13 2Z" />
          </svg>
          <h1 className="text-3xl font-bold text-green-300 tracking-tight">JobPulse</h1>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20 gap-12 flex-grow">
        <motion.div
          className="flex-1 space-y-6 bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold leading-snug text-white"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Level Up Your Resume with <br />
            <span className="bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent">
              AI-Powered Analysis
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-200 leading-relaxed max-w-lg"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Get instant feedback on formatting, keyword matching, and relevance. Start your journey to a better job today.
          </motion.p>
          <motion.button
            onClick={() => navigate('/login')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="relative bg-white/5 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/10"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img
              src={aiResumeImage}
              alt="AI Resume Analysis"
              className="w-full max-w-md md:max-w-lg drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="relative z-10 text-center py-5 text-sm text-gray-300 bg-white/5 backdrop-blur-md border-t border-white/10 mt-auto"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        © {new Date().getFullYear()} <span className="font-semibold text-green-300">JobPulse</span>. Made with 💚 and AI.
      </motion.footer>
    </motion.div>
  );
}
