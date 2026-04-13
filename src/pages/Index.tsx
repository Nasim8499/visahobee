import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CountriesSection from "@/components/CountriesSection";
import ServicesSection from "@/components/ServicesSection";
import EmployerSection from "@/components/EmployerSection";
import ProcessSection from "@/components/ProcessSection";
import TrustSection from "@/components/TrustSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <CountriesSection />
    <ServicesSection />
    <EmployerSection />
    <ProcessSection />
    <TrustSection />
    <AboutSection />
    <TestimonialsSection />
    <CTASection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
