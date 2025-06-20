import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import LoginModal from './LoginCard';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const CTASection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
    const openLoginModal = () => {
      setIsLoginModalOpen(true);
      setIsMobileMenuOpen(false);
    };
  
    const closeLoginModal = () => {
      setIsLoginModalOpen(false);
    };

  const springConfig = { damping: 25, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / width - 0.5);
    mouseY.set(y / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative bg-slate-950 py-24 sm:py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Starfield Background */}
      <div
        className="absolute inset-0 opacity-40 animate-move-stars"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='white'%3e%3ccircle r='1.5' cx='16' cy='16'/%3e%3c/svg%3e\")",
        }}
      />

      {/* Aurora Glow */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="absolute inset-0 z-10"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-sky-500/20 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
          style={{ transform: "translateZ(0px)" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
        >
          Ready to Transform Your Institution?
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Join thousands of educational institutions already using Pragyan AI
          to create smarter, more connected learning environments.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Schedule Demo Button */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse group-hover:animate-none"></div>
            <Button onClick={openLoginModal} 
              size="lg"
              className="relative bg-slate-900 text-white hover:bg-slate-800 px-8 py-3 text-lg font-semibold overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Demo
              </span>
            </Button>
          </div>

          {/* Contact Us Button */}
          <Button
            variant="outline"
            size="lg"
            className="border-slate-600 bg-slate-900/50 text-slate-300 hover:text-white hover:border-white px-8 py-3 text-lg font-semibold group relative overflow-hidden backdrop-blur-sm"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative flex items-center">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </motion.div>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </section>
  );
};

export default CTASection;
