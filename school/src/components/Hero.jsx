import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Modern university campus"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-purple-900/80"></div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Pragyan AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-4 font-medium">
            The Intelligent Platform for Modern Education
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pragyan AI Start Here
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            One powerful platform to simplify management, support learning, and connect your entire institution — all powered by AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg group">
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;