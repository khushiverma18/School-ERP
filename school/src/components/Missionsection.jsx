import { Heart, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Teaching",
    desc: "Empowering educators with intelligent tools",
    icon: <Heart className="h-8 w-8 text-white" />,
    color: "from-pink-500 to-red-500",
  },
  {
    title: "Learning",
    desc: "Supporting every student's unique journey",
    icon: <Users className="h-8 w-8 text-white" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Growth",
    desc: "Tracking progress beyond traditional metrics",
    icon: <TrendingUp className="h-8 w-8 text-white" />,
    color: "from-indigo-500 to-purple-500",
  },
];

const MissionSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="absolute -top-24 -left-32 w-[400px] h-[400px] bg-purple-300 opacity-20 rounded-full filter blur-3xl" />
      <div className="absolute -bottom-24 -right-32 w-[400px] h-[400px] bg-blue-400 opacity-20 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Building the Future of{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Connected Education
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-16">
          Our mission is to create a seamless and smart education platform, freeing institutions to focus on learning and growth while we handle the complexity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4 ">
          {features.map((f, index) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              className="p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-white duration-300 hover:-translate-y-2 border-0 shadow-lg p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-1xl"
            >
              <div
                className={`w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-gradient-to-br ${f.color} shadow-md ring-4 ring-white`}
              >
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
