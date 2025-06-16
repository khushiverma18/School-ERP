
import AudienceSection from "../components/Audiencesection";
import BeyondSection from "../components/Beyondsection";
import CTASection from "../components/Ctasection";
import FeaturesSection from "../components/Feature";
import Footer from "../components/footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MissionSection from "../components/Missionsection";
import WhySection from "../components/whySection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero/>
      <WhySection />
      <FeaturesSection />
      <BeyondSection/>
      <AudienceSection />
      <MissionSection/>
      <CTASection/>
      <Footer/>
    </div>
  );
};

export default Index;