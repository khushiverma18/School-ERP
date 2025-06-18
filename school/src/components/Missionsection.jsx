import React, { useRef } from "react";
import { Heart, Users, TrendingUp } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// Features to showcase
const features = [
  {
    title: "Teaching",
    desc: "Empowering educators with intelligent tools that adapt and inspire.",
    icon: <Heart className="h-10 w-10" />,
    color: "rgba(236, 72, 153, 0.8)", // Pink
  },
  {
    title: "Learning",
    desc: "Supporting every student's unique journey with personalized pathways.",
    icon: <Users className="h-10 w-10" />,
    color: "rgba(56, 189, 248, 0.8)", // Sky Blue
  },
  {
    title: "Growth",
    desc: "Tracking progress beyond traditional metrics with holistic analytics.",
    icon: <TrendingUp className="h-10 w-10" />,
    color: "rgba(139, 92, 246, 0.8)", // Violet
  },
];

// TiltCard component for 3D hover effect and glow
const TiltCard = ({ feature, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const glowX = useTransform(x, (v) => v * 100 + 50);
  const glowY = useTransform(y, (v) => v * 100 + 50);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className="relative p-8 bg-slate-900/60 backdrop-blur-lg rounded-3xl shadow-2xl shadow-black/40 border border-white/10"
    >
      {/* Inner Content */}
      <motion.div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="text-center"
      >
        <div
          className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl"
          style={{
            background: feature.color.replace("0.8", "0.15"),
            color: feature.color.replace("rgba", "rgb").replace(", 0.8", ""),
            border: `1px solid ${feature.color.replace("0.8", "0.3")}`,
          }}
        >
          {feature.icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
        <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
      </motion.div>

      {/* Radial Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-4 rounded-3xl"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, ${feature.color}, transparent 60%)`
          ),
          opacity: useTransform(y, [-0.5, 0.5], [0.5, 0.5]),
        }}
      />
    </motion.div>
  );
};

// Main Section
const MissionSection = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Glowing Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 opacity-15 rounded-full blur-3xl animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500 opacity-20 rounded-full blur-2xl animate-ping" style={{ animationDuration: "4s" }} />
      </div>

      {/* Section Content */}
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Building the Future of{" "}
          <span className="bg-gradient-to-r from-sky-400 to-violet-500 bg-clip-text text-transparent">
            Connected Education
          </span>
        </h2>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-20">
          Our mission is to create a seamless and smart platform, freeing institutions to focus on what matters most: learning and growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16" style={{ perspective: "1000px" }}>
          {features.map((f, i) => (
            <TiltCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
