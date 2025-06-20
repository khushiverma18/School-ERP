
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
      <div id="home">
        <Hero />
      </div>
    <div id="features">
        <WhySection />
      </div>
      <div id="ecosystem">
        <FeaturesSection />
      </div>
      <BeyondSection/>
     <div id="about">
        <AudienceSection />
      </div>
      <MissionSection/>
     <div id="contact">
        <CTASection />
      </div>
      <Footer/>
    </div>

  );
};

export default Index;