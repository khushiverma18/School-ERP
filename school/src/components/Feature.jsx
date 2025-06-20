import React, { useState, useRef } from "react";
import { BarChart3, Bot, Users, Zap, Puzzle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BarChart3,
    title: "Real-time Insights",
    description: "Get instant visibility into student performance and institutional metrics.",
    color: "#38bdf8", // Sky
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "AI-powered reports that generate themselves, saving hours of manual work.",
    color: "#a78bfa", // Violet
  },
  {
    icon: Users,
    title: "Skill Development",
    description: "Track and nurture student growth beyond traditional academic metrics.",
    color: "#4ade80", // Green
  },
  {
    icon: Zap,
    title: "Instant Updates",
    description: "Keep your entire school community connected and informed in real-time.",
    color: "#facc15", // Yellow
  },
  {
    icon: Puzzle,
    title: "Custom Modules",
    description: "Adapt the platform to fit your institution's specific requirements.",
    color: "#f472b6", // Pink
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Foster a collaborative environment between students, teachers, and parents.",
    color: "#fb923c", // Orange
  },
];

const FeaturesSection = () => {
  const gridRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseMove = (e) => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const cardVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      y: 30,
    },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const spotlightColor =
    hoveredCard !== null ? `${features[hoveredCard].color}20` : "transparent";

  return (
    <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-24 sm:py-32 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 opacity-15 rounded-full blur-3xl animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500 opacity-20 rounded-full blur-2xl animate-ping" style={{ animationDuration: "4s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            An Ecosystem of Intelligence
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Our platform is more than a tool it's a complete ecosystem designed to enhance every aspect of your institution.
          </p>
        </div>

        <div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: "1000px" }}
        >
          {/* Mouse-aware spotlight */}
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-500"
            style={{
              opacity: hoveredCard !== null ? 1 : 0,
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`,
            }}
          />

          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="initial"
              whileInView="visible"
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(i)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative rounded-2xl p-px"
              style={{
                background: `rgba(255, 255, 255, ${hoveredCard === i ? 0.15 : 0.05})`,
                transition: "background 0.3s ease",
              }}
            >
              <motion.div
                className="relative h-full p-6 bg-slate-900/80 backdrop-blur-md rounded-[15px] cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 40px ${feature.color}40`,
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
                style={{
                  opacity: hoveredCard === null || hoveredCard === i ? 1 : 0.5,
                  transition: "opacity 0.3s ease",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div style={{ transform: "translateZ(20px)" }}>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg"
                      style={{
                        background: `${feature.color}20`,
                        color: feature.color,
                        boxShadow: `inset 0 0 10px ${feature.color}40`,
                      }}
                    >
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100">{feature.title}</h3>
                  </div>
                  <motion.p
                    className="text-slate-400 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === i ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
