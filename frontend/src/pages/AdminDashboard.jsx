// ... all imports stay the same
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BACKEND_URL } from "../api";

export default function AdminDashboard() {
  const [jobCount, setJobCount] = useState(0);
  const [candidateList, setCandidateList] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [newJob, setNewJob] = useState({ title: "", description: "", keywords: "" });
  const [view, setView] = useState("stats");
  const [jobList, setJobList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchAllJobs();
    fetchCandidates();
    fetchUsers();
    fetchUsersList();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch(`${BACKEND_URL}/api/jobs/getJobCount`);
    const data = await res.json();
    if (res.ok && data.count !== undefined) setJobCount(data.count);
  };

  const fetchAllJobs = async () => {
    const res = await fetch(`${BACKEND_URL}/api/jobs/getAllJobs`);
    const data = await res.json();
    if (data.success) setJobList(data.jobs || []);
  };

  const fetchCandidates = async () => {
    const res = await fetch(`${BACKEND_URL}/api/candidates/getAllCandidates`);
    const data = await res.json();
    if (data.success) setCandidateList(data.data || []);
  };

  const fetchUsers = async () => {
    const res = await fetch(`${BACKEND_URL}/api/user/getUserCount`);
    const data = await res.json();
    if (res.ok && data.count !== undefined) setUserCount(data.count);
  };

  const fetchUsersList = async () => {
    const res = await fetch(`${BACKEND_URL}/api/user/getAllUsers`);
    const data = await res.json();
    if (data.success) setUserList(data.users || []);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BACKEND_URL}/api/jobs/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newJob.title,
        description: newJob.description,
        keywords: newJob.keywords.split(",").map((kw) => kw.trim()),
      }),
    });
    const data = await res.json();
    if (data.success) {
      setNewJob({ title: "", description: "", keywords: "" });
      fetchJobs();
      fetchAllJobs();
      alert("Job added successfully");
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job role?")) {
      const res = await fetch(`${BACKEND_URL}/api/jobs/delete/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchAllJobs();
        fetchJobs();
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const res = await fetch(`${BACKEND_URL}/api/user/deleteUser/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
        fetchUsersList();
      }
    }
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900 p-8 text-white font-sans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <motion.h1 className="text-3xl font-bold text-green-300">Admin Dashboard</motion.h1>
        <motion.button onClick={logout} whileTap={{ scale: 0.95 }} className="px-5 py-2 rounded-xl font-semibold text-white bg-white/10 border border-white/20 shadow-md hover:bg-white/20">
          Logout
        </motion.button>
      </div>

      {/* View Toggle */}
      <div className="flex gap-4 mb-8">
        {["stats", "resumes", "addJob"].map((type) => (
          <motion.button
            key={type}
            onClick={() => setView(type)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg transition-all ${
              view === type ? "bg-green-500" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {type === "stats" ? "Overview" : type === "resumes" ? "View Resumes" : "Add Job Role"}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Overview */}
        {view === "stats" && (
          <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <StatCard value={jobCount} label="Job Roles" color="green" />
              <StatCard value={candidateList.length} label="Resumes Submitted" color="orange" />
              <StatCard value={userCount} label="Total Users" color="yellow" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Job Roles</h3>
                <ul className="text-gray-200 space-y-2">
                  {jobList.map((job) => (
                    <li key={job._id} className="flex justify-between items-center">
                      {job.title}
                      <button onClick={() => handleDeleteJob(job._id)} className="text-red-400 text-sm hover:underline">
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Users</h3>
                <ul className="text-gray-200 space-y-2">
                  {userList.map((user) => (
                    <li key={user._id} className="flex justify-between items-center">
                      {user.name} — {user.email}
                      <button onClick={() => handleDeleteUser(user._id)} className="text-red-400 text-sm hover:underline">
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Resume List */}
        {view === "resumes" && (
          <motion.div key="resumes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="bg-white/10 p-6 rounded-xl backdrop-blur">
            <h2 className="text-xl font-semibold text-white mb-4">Submitted Resumes</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-left bg-white/20">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Job Title</th>
                    <th className="p-3">Score</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateList.map((c) => (
                    <tr key={c._id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-3">{c.name || "N/A"}</td>
                      <td className="p-3">{c.email || "N/A"}</td>
                      <td className="p-3">{c.jobTitle}</td>
                      <td className="p-3 text-orange-300 font-semibold">{c.score}</td>
                      <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
                      <td className="p-3">
                        <button onClick={() => setSelectedCandidate(c)} className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 text-white text-xs">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedCandidate && (
              <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div className="bg-[#1e1e2f] text-white p-6 rounded-xl w-[90%] max-w-md shadow-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 text-green-400">Candidate Details</h3>
                  <p><strong>Name:</strong> {selectedCandidate.name || "N/A"}</p>
                  <p><strong>Email:</strong> {selectedCandidate.email || "N/A"}</p>
                  <p><strong>Job Title:</strong> {selectedCandidate.jobTitle}</p>
                  <p><strong>Matched Skills:</strong> {(selectedCandidate.keywordsMatched || []).join(", ")}</p>
                  <p><strong>Score:</strong> <span className="text-orange-400 font-bold">{selectedCandidate.score}</span></p>
                  <div className="mt-6 text-right">
                    <button onClick={() => setSelectedCandidate(null)} className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Add Job View */}
        {view === "addJob" && (
          <motion.div key="addJob" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="mb-10 bg-white/10 p-6 rounded-xl backdrop-blur">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Job Role</h2>
            <form onSubmit={handleAddJob} className="space-y-4">
              <input type="text" required placeholder="Job Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:ring-green-400" />
              <textarea required placeholder="Job Description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:ring-green-400" />
              <textarea required placeholder="Comma separated keywords (e.g. HTML, CSS, JavaScript)" value={newJob.keywords} onChange={(e) => setNewJob({ ...newJob, keywords: e.target.value })} className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:ring-green-400" />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition">
                Add Job
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Helper Components
const StatCard = ({ value, label, color }) => (
  <div className="bg-white/10 p-6 rounded-xl text-center backdrop-blur">
    <p className={`text-5xl font-bold text-${color}-300`}>{value}</p>
    <p className="mt-2 text-gray-300">{label}</p>
  </div>
);
