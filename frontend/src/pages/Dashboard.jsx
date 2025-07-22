import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { motion } from "framer-motion";


const pieData = [
  { name: "Saved Time", value: 50 },
  { name: "Reduced Bias", value: 25 },
  { name: "Best Candidates", value: 25 },
];

const barData = [
  { name: "Manual Review", Time: 100 },
  { name: "AI Screening", Time: 20 },
];

const lineData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 72 },
  { month: "Mar", score: 80 },
  { month: "Apr", score: 90 },
];

const radialData = [{ name: "Match Accuracy", uv: 85, fill: "#38bdf8" }];
const COLORS = ["#22c55e", "#38bdf8", "#a855f7"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchJobs();
    const storedUser = JSON.parse(localStorage.getItem("USER"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/jobs/getAllJobs`);
      const data = await res.json();
      if (data.success) setJobs(data.jobs);
    } catch (error) {
      console.error("Failed to fetch jobs");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!resume || !selectedJobId)
      return setMessage("Please select job and upload resume.");

    if (!user?.name || !user?.email)
      return setMessage("User info missing. Please log in again.");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("name", user.name);
    formData.append("email", user.email);

    try {
      const res = await fetch(
        `${BACKEND_URL}/api/candidates/upload/${selectedJobId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok && data.candidateId) {
        navigate(`/loading/${data.candidateId}`, {
          state: { candidateId: data.candidateId },
        });
      } else {
        setMessage(data.message || "Upload failed.");
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("USER");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen w-full bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900 px-6 py-12 text-white overflow-x-hidden"
    >
      <div className="absolute top-10 left-10 w-80 h-80 bg-blue-400 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl z-0" />

      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-lg hover:bg-white/20 border border-white/20 transition z-10"
      >
        Logout
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-24"
      >
        <div className="space-y-6">
          <p className="text-sm text-green-300 font-semibold uppercase">
            Resume Checker
          </p>
          <h1 className="text-5xl font-extrabold text-white">
            Is your resume good enough?
          </h1>
          <p className="text-lg text-gray-200">
            A fast AI-powered checker to help you stand out and land interview calls.
          </p>

          <form
            onSubmit={handleUpload}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl max-w-md space-y-4 shadow-xl"
          >
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full p-3 rounded-md bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            >
              <option value="" disabled hidden>
                Select Job Role
              </option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id} className="text-black">
                  {job.title}
                </option>
              ))}
            </select>

            <div className="relative">
              {!resume ? (
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  required
                  className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none"
                />
              ) : (
                <div className="flex items-center justify-between px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white">
                  <span className="truncate">{resume.name}</span>
                  <button
                    type="button"
                    onClick={() => setResume(null)}
                    className="text-red-400 hover:text-red-600 font-bold text-lg"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {message && (
              <p className="text-red-400 text-sm font-medium">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition duration-200 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Uploading..." : "Upload & Screen Resume"}
            </button>

            <p className="text-xs text-gray-300 text-center">
              🔒 Privacy guaranteed
            </p>
          </form>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hidden md:block"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3039/3039430.png"
            alt="AI analysis"
            className="w-full max-w-md mx-auto drop-shadow-xl"
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mt-10">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-md border border-white/20"
          >
            {i === 0 && (
              <>
                <h3 className="text-xl font-semibold text-center mb-4 text-white">
                  AI Efficiency Benefits
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </>
            )}
            {i === 1 && (
              <>
                <h3 className="text-xl font-semibold text-center mb-4 text-white">
                  Time Comparison
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Bar dataKey="Time" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
            {i === 2 && (
              <>
                <h3 className="text-xl font-semibold text-center mb-4 text-white">
                  Resume Score Trend
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#ccc" />
                    <YAxis domain={[0, 100]} stroke="#ccc" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#a855f7"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}
            {i === 3 && (
              <>
                <h3 className="text-xl font-semibold text-center mb-4 text-white">
                  Keyword Match Accuracy
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RadialBarChart
                    innerRadius="70%"
                    outerRadius="100%"
                    barSize={16}
                    data={radialData}
                  >
                    <RadialBar background clockWise dataKey="uv" />
                    <Legend
                      iconSize={10}
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                    />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
