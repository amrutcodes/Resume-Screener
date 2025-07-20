import { FaCheckCircle, FaLightbulb, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import GuideImg from '../assets/guide.jpg';

const tips = [
  { title: 'Tailor for the Role', content: 'Customize your resume for each job by using keywords from the job description.' },
  { title: 'Highlight Achievements', content: 'Focus on what you’ve accomplished rather than just listing duties.' },
  { title: 'Keep It Concise', content: 'Limit your resume to one or two pages with only relevant experience.' },
  { title: 'Use Bullet Points', content: 'Structure your information clearly with bullet points and action verbs.' },
  { title: 'Include Skills Section', content: 'Showcase both technical and soft skills relevant to the job.' },
  { title: 'Optimize for ATS', content: 'Avoid images and stick to readable fonts and formats for applicant tracking systems.' },
  { title: 'Professional Formatting', content: 'Use consistent spacing, clear headings, and readable fonts for a clean look.' },
  { title: 'Add a Summary', content: 'Start with a 2-3 sentence professional summary that captures your strengths.' },
  { title: 'Proofread', content: 'Eliminate typos and grammar errors to maintain professionalism.' },
];

export default function ResumeGuide() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900 px-6 py-16 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-5rem] left-[-5rem] w-[30rem] h-[30rem] bg-blue-400 opacity-20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-[-5rem] right-[-5rem] w-[30rem] h-[30rem] bg-green-400 opacity-20 rounded-full blur-3xl z-0"></div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => navigate(id ? `/results/${id}` : '/dashboard')}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-white hover:bg-white/20 transition"
      >
        <FaArrowLeft />
        Back
      </motion.button>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Smart Resume Tips</h1>
          <p className="text-gray-300">Optimize your resume to stand out and beat ATS systems easily.</p>
        </motion.div>

        {/* Tips and Illustration Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col-reverse md:flex-row gap-10 items-start justify-between"
        >
          {/* Tips Grid */}
          <div className="grid sm:grid-cols-2 gap-6 flex-1">
            {tips.map((tip, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-md flex flex-col gap-3 transition duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 text-green-400">
                  <FaLightbulb className="text-xl" />
                  <h3 className="text-lg font-semibold text-white">{tip.title}</h3>
                </div>
                <p className="text-gray-300 text-sm">{tip.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Custom Illustration */}
          <div className="flex justify-center flex-1">
            <img
              src={GuideImg}
              alt="Resume Illustration"
              className="w-full max-w-xs md:max-w-sm lg:max-w-md drop-shadow-xl"
            />
          </div>
        </motion.div>

        {/* Bonus Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
            <FaCheckCircle className="text-green-400" />
            Bonus Checklist
          </h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-sm pl-2">
            <li>Use clean, ATS-friendly resume templates</li>
            <li>Include recent certifications or online course links</li>
            <li>Stick to 1-2 fonts and limit colors</li>
            <li>Double check your phone number and email</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
