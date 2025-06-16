import { BarChart3, Bot, Users, Zap, Puzzle } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Real-time academic insights",
    description: "Get instant visibility into student performance and institutional metrics",
  },
  {
    icon: Bot,
    title: "Automated reporting & analytics",
    description: "AI-powered reports that generate themselves, saving hours of manual work",
  },
  {
    icon: Users,
    title: "Mentorship & skill development",
    description: "Track and nurture student growth beyond traditional academic metrics",
  },
  {
    icon: Zap,
    title: "Instant communication & updates",
    description: "Keep your entire school community connected and informed in real-time",
  },
  {
    icon: Puzzle,
    title: "Custom modules for your unique needs",
    description: "Adapt the platform to fit your institution's specific requirements",
  },
];

const FeaturesSection = () => {
  const radius = 250;

  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-300 opacity-20 rounded-full filter blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-purple-300 opacity-20 rounded-full filter blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            A Smarter Way to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Run Your School
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Pragyan AI helps your institution move beyond just managing tasks — it helps you lead with data-driven insights, intelligent automation, and personalized learning support.
          </p>
        </div>

        {/* Circle Layout */}
        <div className="relative w-[600px] h-[600px] mx-auto">
          {/* Center text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            
          </div>

          {/* Rotating Feature Cards */}
          <div className="absolute inset-0 animate-spin-slow origin-center">
            {features.map((feature, index) => {
              const angle = (360 / features.length) * index;
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);

              return (
                <div
                  key={index}
                  className="absolute w-64 p-7  shadow-xl rounded-xl border border-gray-100 text-center transition-all hover:scale-105 hover:shadow-2xl  duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-1xl"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    left: "50%",
                    top: "50%",
                    translate: "-50% -50%",
                  }}
                >
                  <div className="mb-3">
                    <feature.icon className="h-8 w-8 text-blue-600 mx-auto" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
