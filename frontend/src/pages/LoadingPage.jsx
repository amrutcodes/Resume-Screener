import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const loadingSteps = [
  "Parsing your resume...",
  "Analyzing your experience...",
  "Extracting your skills...",
  "Matching keywords...",
  "Scoring your profile...",
];

export default function LoadingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex < loadingSteps.length) {
      const timer = setTimeout(() => {
        setVisibleSteps((prev) => [...prev, loadingSteps[stepIndex]]);
        setStepIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      const redirectTimer = setTimeout(() => {
        navigate(`/results/${id}`, {
          state: { message: "Resume uploaded and screened successfully!" },
        });
      }, 1500);
      return () => clearTimeout(redirectTimer);
    }
  }, [stepIndex, id, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900 flex items-center justify-center px-6 py-10"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl max-w-6xl w-full p-6 sm:p-10 border border-white/20 flex flex-col md:flex-row gap-8 relative z-10"
      >
        {/* Left Score / Visual */}
        <div className="w-full md:w-1/2 bg-white/10 rounded-2xl p-6 text-white flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-6">Analyzing Score</h2>

          {/* Replaced circular loader with animated pulsing dots */}
          <div className="flex space-x-2 mb-6">
            <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-300"></div>
          </div>

          {/* Progress Categories */}
          <div className="space-y-4 text-sm w-full">
            {["Tailoring", "Content", "Section", "ATS Essentials"].map((label, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{label}</span>
                <div className="w-24 h-5 bg-white/20 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-[-50%] w-full h-full bg-white/40 animate-slide-loading"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Steps */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="w-full md:w-1/2 bg-white/10 rounded-2xl p-6 text-white"
        >
          <h2 className="text-xl font-semibold mb-6">Screening your resume...</h2>
          <div className="space-y-4">
            {loadingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: visibleSteps.includes(step) ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 text-base"
              >
                <FaCheckCircle className="text-green-400 animate-pulse" />
                <span>{step}</span>
              </motion.div>
            ))}
          </div>

          <hr className="mt-6 border-white/20" />

          <div className="text-center text-xs text-white/60 mt-4">
            Powered by <span className="text-green-300 font-medium">AI Resume Screener</span>
          </div>
        </motion.div>

        {/* Glassmorphism Glows */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-400 opacity-20 rounded-full filter blur-3xl z-0"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400 opacity-20 rounded-full filter blur-3xl z-0"></div>
      </motion.div>

      {/* Custom animation style */}
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-slide-loading {
            animation: slide 1.2s infinite linear;
          }
          .delay-150 {
            animation-delay: 0.15s;
          }
          .delay-300 {
            animation-delay: 0.3s;
          }
        `}
      </style>
    </motion.div>
  );
}
