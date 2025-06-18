import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, X } from "lucide-react";
import { motion } from "framer-motion";

const comparisons = [
  {
    traditional: "Limited to admin tasks",
    smartschool: "Supports teaching, learning, mentorship, and growth"
  },
  {
    traditional: "Static data entry & manual reporting",
    smartschool: "AI-powered real-time analytics, auto-generated reports"
  },
  {
    traditional: "Complex, IT-heavy setups",
    smartschool: "User-friendly, mobile-first design"
  },
  {
    traditional: "Separate tools for different needs",
    smartschool: "Unified platform for admin, teachers, students & parents"
  },
  {
    traditional: "No mentorship or student development",
    smartschool: "Built-in mentorship tracking & skill development features"
  },
  {
    traditional: "Poor communication tools",
    smartschool: "Centralized communication hub with instant notifications"
  },
  {
    traditional: "Hard to scale or customize",
    smartschool: "Fully customizable & future-proof architecture"
  }
];

const BeyondSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const rowVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Glowing Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 opacity-15 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-red-500 opacity-10 rounded-full blur-2xl animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-cyan-500 opacity-12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white opacity-20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Beyond ERP — A Complete{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Educational Growth Platform
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed opacity-90">
            Traditional school software focuses on managing tasks. Pragyan AI helps you build a connected, intelligent, future-ready institution.
          </p>
        </motion.div>

        {/* Comparison Card */}
        <motion.div
          className="group"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Card className="relative shadow-2xl border-0 overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-white/10">
            <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent rounded-2xl group-hover:border-white/20 transition-all duration-300 pointer-events-none -z-10" />
            <span className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin" style={{ animationDuration: '6s' }} />

            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 pb-4 md:p-10 md:pb-4 border-r border-white/10">
                  <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
                    <X className="w-7 h-7" />
                    Traditional ERP
                  </h3>
                </div>
                <div className="p-8 pb-4 md:p-10 md:pb-4">
                  <h3 className="text-2xl font-bold text-green-400 flex items-center gap-3">
                    <CheckCircle className="w-7 h-7" />
                    Pragyan AI
                  </h3>
                </div>
              </div>

              {/* Row Comparison */}
              <div className="space-y-px">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={rowVariants}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, amount: 0.8 }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    className="grid md:grid-cols-2 cursor-pointer transition-colors duration-300"
                    style={{
                      background: hoveredIndex === index ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
                    }}
                  >
                    <div className="p-4 pl-8 md:pl-10 border-r border-white/10 flex items-start gap-4 transition-opacity duration-300" style={{ opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.5 }}>
                      <X className="h-6 w-6 text-red-500/70 mt-1 flex-shrink-0" />
                      <p className="text-slate-400 leading-relaxed">{item.traditional}</p>
                    </div>
                    <div className="p-4 pl-8 md:pl-10 flex items-start gap-4 transition-opacity duration-300" style={{ opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.5 }}>
                      <CheckCircle className="h-6 w-6 text-green-500/80 mt-1 flex-shrink-0" />
                      <p className="text-slate-200 font-medium leading-relaxed">{item.smartschool}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Text */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="relative inline-block">
            <p className="relative text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed bg-black/20 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10">
              Pragyan AI is not just a tool to manage operations. It's a{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                digital partner
              </span>
              {" "}that helps institutions nurture talent, simplify complexity, and lead confidently into the future of education.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeyondSection;
