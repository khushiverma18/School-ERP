import { CheckCircle, Users, TrendingUp, MessageSquare, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: CheckCircle,
    title: "Simplifies Daily Operations",
    description: "Attendance, reports, scheduling, and communication fully automated and easy to manage.",
  },
  {
    icon: Users,
    title: "Supports Every Role",
    description: "Role-based dashboards for administrators, teachers, parents, and students.",
  },
  {
    icon: TrendingUp,
    title: "Tracks Growth, Not Just Grades",
    description: "Built-in mentorship, skill tracking, and personalized progress monitoring.",
  },
  {
    icon: MessageSquare,
    title: "Keeps Everyone Connected",
    description: "Centralized updates, instant notifications, and clear communication for your entire University/Collages.",
  },
  {
  icon: Settings,
  title: "Grows With You",
  description: "Fully customizable to adapt, scale, evolve, and seamlessly integrate as your institution grows.",
}
];

const WhySection = () => {
  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 opacity-15 rounded-full blur-3xl animate-bounce" style={{animationDuration: '3s'}} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500 opacity-20 rounded-full blur-2xl animate-ping" style={{animationDuration: '4s'}} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white opacity-30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header with enhanced animations */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Smart Features.{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Designed to Amaze.
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed opacity-90">
            Pragyan AI is built to impress simplifying daily University/Collages operations while elevating learning, connection, and growth.
          </p>
        </div>

        {/* Features grid with staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto">
          {features.slice(0,3).map((feature, index) => (
            <Card
              key={index}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-8 hover:rotate-1 rounded-3xl overflow-hidden animate-fade-in"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <CardContent className="p-10 text-center relative z-10">
                {/* Icon with enhanced animations */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-3xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl w-full h-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-2xl">
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                {/* Content with staggered reveal */}
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-cyan-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
              
              {/* Dynamic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
            </Card>
          ))}
        </div>

 <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-10 px-6">
          {features.slice(3).map((feature, index) => (
            <Card
              key={index}
              className="group w-full sm:w-[25rem] relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-8 hover:rotate-1 rounded-3xl overflow-hidden animate-fade-in"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <CardContent className="p-10 text-center relative z-10">
                {/* Icon with enhanced animations */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-3xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl w-full h-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-2xl">
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                {/* Content with staggered reveal */}
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-cyan-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
              
              {/* Dynamic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
            </Card>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-20">
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default WhySection;
