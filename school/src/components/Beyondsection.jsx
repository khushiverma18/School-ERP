import {Card, CardContent} from "@/components/ui/card"
import {CheckCircle, X } from "lucide-react";

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
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Beyond ERP — A Complete <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Educational Growth Platform</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Traditional school software focuses on managing tasks. Pragyan AI helps you build a connected, intelligent, future-ready institution.
          </p>
        </div>
        
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="bg-red-50 p-8">
                <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
                  <X className="mr-3 h-6 w-6" />
                  Traditional ERP
                </h3>
                <div className="space-y-4">
                  {comparisons.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{item.traditional}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8">
                <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                  <CheckCircle className="mr-3 h-6 w-6" />
                 Pragyan AI
                </h3>
                <div className="space-y-4">
                  {comparisons.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{item.smartschool}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Pragyan AI is not just a tool to manage operations. It's a digital partner that helps institutions nurture talent, simplify complexity, and lead confidently into the future of education.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeyondSection