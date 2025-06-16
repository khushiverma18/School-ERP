import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Building, Users, Award, Globe } from "lucide-react";

const institutions = [
  {
    icon: GraduationCap,
    title: "Schools (K-12)",
    description: "Elementary, middle, and high schools looking to modernize their operations"
  },
  {
    icon: Building,
    title: "Colleges & Universities",
    description: "Higher education institutions seeking comprehensive management solutions"
  },
  {
    icon: Users,
    title: "Coaching Centers",
    description: "Test prep and specialized training centers wanting streamlined operations"
  },
  {
    icon: Award,
    title: "Vocational Institutes",
    description: "Trade schools and professional training organizations"
  },
  {
    icon: Globe,
    title: "Online Education Platforms",
    description: "Digital learning platforms requiring integrated management systems"
  }
];

const AudienceSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            One Platform. <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Every Institution.</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {institutions.map((institution, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-1xl">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <institution.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{institution.title}</h3>
                <p className="text-gray-600 leading-relaxed">{institution.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;