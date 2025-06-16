import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Ready to Transform Your Institution?
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join thousands of educational institutions already using Pragyan AI to create smarter, more connected learning environments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg group font-semibold">
            <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Schedule a Demo
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg group font-semibold">
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;