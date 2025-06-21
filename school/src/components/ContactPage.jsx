import React, { useState, useEffect, useRef } from 'react';
import { Mail, User, Phone, Calendar, MessageSquareText, Rocket, BrainCircuit, Cable, Code, X } from "lucide-react";
import { motion } from 'framer-motion';
import clsx from 'clsx';
import VanillaTilt from 'vanilla-tilt'; // VanillaTilt को इम्पोर्ट करें

// --- ServiceCard कंपोनेंट CoPage के अंदर ही परिभाषित है ---
const ServiceCard = ({ icon: Icon, title, desc, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    // 3D टिल्ट इफ़ेक्ट को इनिशियलाइज़ करें
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
        perspective: 1000,
        scale: 1.02,
      });
    }

    const card = cardRef.current;
    // माउस-ट्रैकिंग स्पॉटलाइट के लिए इवेंट लिस्नर
    const handleMouseMove = (e) => {
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      }
    };

    card.addEventListener('mousemove', handleMouseMove);

    // क्लीनअप फंक्शन
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      if (card && card.vanillaTilt) {
        card.vanillaTilt.destroy();
      }
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="service-card rounded-2xl p-8 flex flex-col items-center text-center"
      variants={cardVariants}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative z-10 w-full h-full flex flex-col items-center">
        <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-5 border border-slate-600">
          <Icon className="h-10 w-10 text-blue-300" />
        </div>
        <h3 className="text-white font-bold text-xl mb-3" style={{ transform: 'translateZ(20px)' }}>{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>{desc}</p>
      </div>
    </motion.div>
  );
};


// --- मुख्य CoPage कंपोनेंट ---
const CoPage = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", date: "", message: "" });

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Request Submitted:", formData);
    alert("Your request has been submitted successfully!");
    setFormData({ name: "", email: "", phone: "", date: "", message: "" });
    onClose();
  };

  const services = [
    { icon: Rocket, title: "Innovative R&D", desc: "Where innovation meets precision, turning ideas into impactful solutions." },
    { icon: BrainCircuit, title: "Data Analytics & AI", desc: "Enabling smarter, faster decisions with AI-powered analytics." },
    { icon: Cable, title: "Data Modeling", desc: "Building precision models that drive confident forecasting and optimization." },
    { icon: Code, title: "Scalable Development", desc: "Turning visionary ideas into robust, scalable solutions that accelerate growth." },
  ];
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto backdrop-blur-md">
      <div className="font-inter bg-slate-900 text-slate-200 min-h-full overflow-x-hidden">

        {/* Hero Section */}
<section className="relative text-center py-36 md:py-44 px-6 overflow-hidden bg-slate-950">
  {/* Close Button */}
  <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 bg-slate-800/50 p-2 rounded-full hover:text-red-500 z-50 transition">
    <X className="w-6 h-6" />
  </button>

  {/* Background Effects */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    {/* Aurora glows */}
    <div className="absolute top-[-100px] left-[-80px] w-[420px] h-[420px] bg-purple-600 blur-glow rounded-full animate-aurora" />
    <div className="absolute bottom-[-120px] right-[-100px] w-[480px] h-[480px] bg-blue-500 blur-glow rounded-full animate-orbit opacity-30" />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[220px] h-[220px] bg-indigo-400 blur-glow rounded-full opacity-25 animate-float" />
    
    {/* Star particles */}
    <div className="absolute inset-0 bg-[url('/starfield.svg')] opacity-30 animate-stars" />
  </div>

  {/* Content */}
  <motion.div
    className="relative z-10"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-indigo-200 to-blue-200 drop-shadow-[0_0_30px_rgba(147,51,234,0.6)] animate-glow-text">
      MythoQuantum Explorers
    </h1>
    <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300 mt-6 animate-fade-in">
      Pioneering the future through innovative research, advanced analytics,
      <br className="hidden md:block" /> and transformative solutions.
    </p>

    <motion.button
      onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
      className="mt-10 px-8 py-3 font-semibold rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl ring-2 ring-purple-500/50 ring-offset-2 ring-offset-slate-900 hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] transition-all duration-300"
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.96 }}
    >
      Get in Touch
    </motion.button>
  </motion.div>
</section>


        <main className="container mx-auto px-6 py-20 md:py-28 space-y-28">

          {/* Founder Section */}
          <motion.section className="text-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <motion.h2 className="text-3xl md:text-4xl font-bold text-white inline-block mb-12" variants={titleVariants}>
              Meet Our Founder
              <span className="block h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 mx-auto rounded-full"></span>
            </motion.h2>
            <div className="bg-slate-800/50 max-w-3xl mx-auto rounded-2xl p-10 shadow-2xl border border-slate-700">
              <motion.div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold ring-4 ring-slate-700 shadow-lg" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                AJ
              </motion.div>
              <div className="text-3xl font-bold mt-6 mb-1">Ashish Jha</div>
              <div className="text-blue-400 font-semibold mb-4">Founder & CEO</div>
              <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                A visionary leader driving innovation at the intersection of quantum computing and advanced analytics. Ashish founded MythoQuantum Explorers to push the boundaries of what's possible.
              </p>
            </div>
          </motion.section>

          {/* Services Section */}
          <motion.section className="text-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <motion.h2 className="text-3xl md:text-4xl font-bold text-white inline-block mb-16" variants={titleVariants}>
              Our Core Services
              <span className="block h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 mx-auto rounded-full"></span>
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service.title} icon={service.icon} title={service.title} desc={service.desc} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section id="contact" className="text-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-12" variants={titleVariants}>
              Schedule a Demo
              <span className="block h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 mx-auto rounded-full"></span>
            </motion.h2>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700 space-y-6">
              {[
                { name: 'name', type: 'text', placeholder: 'Your Name', icon: User, required: true },
                { name: 'email', type: 'email', placeholder: 'Your Email', icon: Mail, required: true },
                { name: 'phone', type: 'tel', placeholder: 'Phone Number (Optional)', icon: Phone, required: false },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type={field.type} name={field.name} placeholder={field.placeholder} value={formData[field.name]} onChange={handleChange} required={field.required}
                    className={clsx(
                      "w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg outline-none transition duration-300",
                      "focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
                      field.type === 'date' && !formData.date && "text-slate-400"
                    )}
                  />
                </div>
              ))}
              <div className="relative">
                <MessageSquareText className="absolute left-4 top-5 text-slate-400" size={20} />
                <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg resize-none outline-none transition duration-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" rows={4} />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 font-bold rounded-lg shadow-lg"
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(139, 92, 246, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                Send Request
              </motion.button>
            </form>
          </motion.section>
        </main>

        <footer className="text-center text-sm text-slate-500 py-8 border-t border-slate-800">
          © {new Date().getFullYear()} MythoQuantum Explorers. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default CoPage;