import { CheckCircle, Users, TrendingUp, MessageSquare, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: CheckCircle,
    title: "Simplifies Daily Operations",
    description: "Attendance, reports, scheduling, and communication — fully automated and easy to manage.",
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
    description: "Centralized updates, instant notifications, and clear communication for your entire school community.",
  },
  {
    icon: Settings,
    title: "Grows With You",
    description: "Fully customizable — adapt, scale, and integrate as your institution evolves.",
  },
];

const WhySection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-100 via-white to-purple-100 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-300 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-400 opacity-20 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            Smart Features.{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              Designed to Amaze.
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pragyan AI is built to impress — simplifying daily school operations while elevating learning, connection, and growth.
          </p>
        </div>

        {/* Circular illusion layout */}
        <div className="flex flex-wrap justify-center items-center gap-10 relative">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="backdrop-blur-md bg-white/50 hover:bg-white/70 transition-all duration-300 border border-white shadow-xl rounded-3xl p-6 w-[280px] hover:scale-105 duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-1xl"
            >
              <CardContent className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg hover:rotate-12 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
