import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import illustration from "../assets/login-image.png"; // replace name later

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("USER", JSON.stringify(data.user));
        setEmail("");
        setPassword("");
        navigate(data.user.role === "ADMIN" ? "/admin" : "/dashboard");
      } else {
        alert(data.msg || "Login failed");
      }
    } catch {
      alert("Server error");
    }
    setLoading(false);
  };

  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-green-400";

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-700 via-blue-800 to-indigo-900 text-white px-4 py-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-2 rounded-xl text-white hover:bg-white/20 transition"
      >
        <FaArrowLeft />
        Back
      </motion.button>

      {/* Background Bubbles */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Illustration */}
        <motion.div
          className="flex items-center justify-center p-8 bg-white/10 border-r border-white/20"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={illustration}
            alt="Login"
            className="w-full max-w-sm object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleLogin}
          className="p-10 md:p-12 space-y-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-200 text-center">Sign in</h2>

          {/* Email Field */}
          <div>
            <label className="block mb-2 text-sm text-gray-200">Email</label>
            <div className="relative">
              <FaRegUser className={iconClass} />
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 pl-12 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-2 text-sm text-gray-200">Password</label>
            <div className="relative">
              <FaLock className={iconClass} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pl-12 pr-12 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-300 hover:text-green-100"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-3 rounded-xl bg-blue-500 text-white font-semibold tracking-wide transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-300">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-green-300 font-semibold hover:underline"
            >
              Sign up
            </a>
          </p>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}
