import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BACKEND_URL } from "../api";

export default function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || id === "undefined") {
      setError("Invalid candidate ID");
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/candidates/getCandidateById/${id}`
        );
        const result = await res.json();

        if (res.ok && result.success) {
          setData(result.data);
        } else {
          setError(result.message || "Something went wrong");
        }
      } catch {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900 text-white text-xl font-semibold"
      >
        Loading result...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900 text-red-400 font-bold text-lg"
      >
        {error}
      </motion.div>
    );
  }

  const roleDisplay = data.jobId?.title
    ? data.jobId.title.charAt(0).toUpperCase() + data.jobId.title.slice(1)
    : "No role selected";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900 px-6 py-10 text-white font-sans relative overflow-hidden"
    >
      {/* Decorative background bubbles */}
      <div className="absolute top-[-5rem] left-[-5rem] w-[30rem] h-[30rem] bg-blue-400 opacity-20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-[-5rem] right-[-5rem] w-[30rem] h-[30rem] bg-green-400 opacity-20 rounded-full blur-3xl z-0"></div>

      <div className="relative z-10 flex justify-between items-center mb-10 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-cyan-300"
        >
          🎯 Your Resume Report
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          onClick={() => navigate("/dashboard")}
          className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:bg-white/20 transition-all duration-300"
        >
          Back to Home
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-8"
      >
        {/* Score Panel */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-6 col-span-1">
          <h2 className="text-xl font-semibold text-white mb-4">Your Resume Score</h2>
          <div className="text-center mb-4">
            <p className="text-5xl font-bold text-cyan-300">{data.score}/100</p>
            <p className="text-sm text-gray-300 mt-2">Based on selected job role:</p>
            <p className="text-md font-medium text-white/90 mt-1 capitalize">{roleDisplay}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-sm text-gray-200 mb-4">
            This score reflects how well your resume aligns with the job description you selected. It considers keyword match, structure, and clarity.
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-200">Relevance</span>
              <span className={`px-2 py-1 rounded font-medium text-sm text-white/90 ${
                data.score >= 85
                  ? "bg-cyan-500"
                  : data.score >= 65
                  ? "bg-yellow-400 text-yellow-900"
                  : "bg-red-400 text-red-900"
              }`}>
                {data.score >= 85 ? "Excellent" : data.score >= 65 ? "Good" : "Needs Work"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-200">ATS Readability</span>
              <span className="bg-cyan-500 text-white px-2 py-1 rounded">✓ Passed</span>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-300 border-t border-white/20 pt-4">
            Improve by adding measurable achievements, role-specific keywords, and avoiding generic phrases.
          </div>
        </div>

        {/* Summary Panel */}
        <div className="col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">📋 Resume Review Summary</h2>
          <p className="text-gray-200 mb-6 text-sm">
            Your resume was analyzed against the selected role. Below is a brief summary of strengths and improvement areas:
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white/10 p-5 rounded-lg border border-white/20 text-gray-100">
              <h4 className="text-cyan-300 font-semibold mb-2">✅ Strengths</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>High keyword relevance</li>
                <li>Well structured and ATS-friendly</li>
                <li>Clear formatting and readable content</li>
              </ul>
            </div>

            <div className="bg-white/10 p-5 rounded-lg border border-white/20 text-gray-100">
              <h4 className="text-yellow-300 font-semibold mb-2">📌 Improvements</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Include more measurable achievements</li>
                <li>Add role-specific skills & keywords</li>
                <li>Avoid repeated phrases or jargon</li>
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 bg-cyan-400/10 p-6 text-center rounded-lg border border-cyan-400/30 text-white"
          >
            <p className="font-medium mb-2">
              ✨ Want a higher score? Boost your impact by fine-tuning your resume’s content and structure.
            </p>
            <button
              onClick={() => navigate(`/guide/${id}`)}
              className="mt-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              Explore Resume Building Tips
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
