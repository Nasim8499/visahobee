import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="py-20 md:py-28 bg-hero-gradient relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
    <div className="container relative z-10 text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mb-6">
        Ready to Start Your Global Journey?
      </h2>
      <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-10">
        Whether you're a job seeker looking for international opportunities or an employer seeking 
        top global talent — VisaHOBe is here to help.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-gold-gradient text-accent-foreground hover:opacity-90 text-base px-8 h-13"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          Get Started Today
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 h-13"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          Contact Us
        </Button>
      </div>
    </div>
  </section>
);

export default CTASection;
