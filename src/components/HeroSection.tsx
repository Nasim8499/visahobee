import { ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground/90 text-sm font-medium mb-6 backdrop-blur-sm border border-accent/30">
            <Globe className="w-4 h-4" />
            Global Recruitment & Visa Partner
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight mb-6">
            Your Trusted Global{" "}
            <span className="text-gradient-gold">Recruitment & Visa</span>{" "}
            Partner
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/75 leading-relaxed mb-10 max-w-2xl">
            From work permits and visa applications to overseas hiring and document guidance — 
            we provide comprehensive international mobility support for individuals and employers worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gold-gradient text-accent-foreground hover:opacity-90 text-base px-8 h-13"
              onClick={() => scrollTo("countries")}
            >
              Explore Countries
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 h-13"
              onClick={() => scrollTo("process")}
            >
              Apply Now
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-primary-foreground/15">
            {[
              { value: "15+", label: "Countries Served" },
              { value: "5,000+", label: "Successful Placements" },
              { value: "98%", label: "Approval Rate" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-serif font-bold text-gradient-gold">{s.value}</div>
                <div className="text-sm text-primary-foreground/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
