import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Building, Users, Award, Globe } from "lucide-react";

const institutions = [
  {
    icon: GraduationCap,
    title: "Schools (K-12)",
    description: "Elementary, middle, and high schools looking to modernize their operations"
  },
  {
    icon: Building,
    title: "Colleges & Universities",
    description: "Higher education institutions seeking comprehensive management solutions"
  },
  {
    icon: Users,
    title: "Coaching Centers",
    description: "Test prep and specialized training centers wanting streamlined operations"
  },
  {
    icon: Award,
    title: "Vocational Institutes",
    description: "Trade schools and professional training organizations"
  },
  {
    icon: Globe,
    title: "Online Education Platforms",
    description: "Digital learning platforms requiring integrated management systems"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const AudienceSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 sm:py-32">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 opacity-15 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500 opacity-20 rounded-full blur-2xl animate-ping" style={{ animationDuration: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            One Platform. <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Every Institution.</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Our versatile system is designed to meet the unique needs of every educational environment, from local University/Collages to global online platforms.
          </p>
        </div>

        {/* Top 3 Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {institutions.slice(0, 3).map((institution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative rounded-2xl p-px bg-gradient-to-b from-white/10 to-transparent transition-all duration-300 hover:bg-white/20"
            >
              <div className="relative h-full rounded-[15px] bg-slate-900/85 p-8 backdrop-blur-lg transition-colors duration-300 group-hover:bg-slate-900/90">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-cyan-500/40">
                    <institution.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3 text-center">{institution.title}</h3>
                <p className="text-slate-400 leading-relaxed text-center">{institution.description}</p>
                <div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(400px circle at 50% 0%, rgba(56, 189, 248, 0.15), transparent 80%)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom 2 Cards Centered */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {institutions.slice(3).map((institution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative rounded-2xl p-px bg-gradient-to-b from-white/10 to-transparent transition-all duration-300 hover:bg-white/20"
            >
              <div className="relative h-full rounded-[15px] bg-slate-900/85 p-8 backdrop-blur-lg transition-colors duration-300 group-hover:bg-slate-900/90">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-cyan-500/40">
                    <institution.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3 text-center">{institution.title}</h3>
                <p className="text-slate-400 leading-relaxed text-center">{institution.description}</p>
                <div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(400px circle at 50% 0%, rgba(56, 189, 248, 0.15), transparent 80%)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AudienceSection;
