import { useState } from "react";
import {
  FaRegUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import illustration from "../assets/login-image.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/user/createUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        navigate("/dashboard");
      } else {
        alert(data.msg || "Signup failed");
      }
    } catch {
      alert("Server error");
    }
    setLoading(false);
  };

  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-green-400";

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-700 via-blue-800 to-indigo-900 text-white px-4 py-10 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.15 }}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      {/* Background Bubbles */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl z-0"
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl z-0"
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        {/* Left Image */}
        <motion.div
          className="hidden md:flex items-center justify-center bg-white/10 border-r border-white/20 p-6"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img
            src={illustration}
            alt="Signup Illustration"
            className="w-full max-w-sm object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Right Form */}
        <motion.form
          onSubmit={handleSignup}
          className="p-8 md:p-10 flex flex-col justify-center space-y-5"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-200 text-center mb-2"
            variants={fadeInUp}
          >
            Create Account
          </motion.h2>

          {/* Name */}
          <motion.div variants={fadeInUp}>
            <label className="block mb-2 text-sm text-gray-200">
              Full Name
            </label>
            <div className="relative">
              <FaRegUser className={iconClass} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full p-4 pl-12 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeInUp}>
            <label className="block mb-2 text-sm text-gray-200">Email</label>
            <div className="relative">
              <FaEnvelope className={iconClass} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full p-4 pl-12 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div variants={fadeInUp}>
            <label className="block mb-2 text-sm text-gray-200">Phone</label>
            <div className="relative">
              <FaPhone className={iconClass} />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                className="w-full p-4 pl-12 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div variants={fadeInUp}>
            <label className="block mb-2 text-sm text-gray-200">Password</label>
            <div className="relative">
              <FaLock className={iconClass} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
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
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl bg-blue-500 text-white font-semibold tracking-wide transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            variants={fadeInUp}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>

          <motion.p
            className="text-center text-sm text-gray-300 mt-2"
            variants={fadeInUp}
          >
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-300 font-semibold hover:underline"
            >
              Log in
            </a>
          </motion.p>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}
