import { Building2, Globe2, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Globe2, title: "Global Talent Access", desc: "Source candidates from our extensive international network spanning 15+ countries." },
  { icon: ShieldCheck, title: "Compliance Guaranteed", desc: "We handle all legal and regulatory requirements for international hiring." },
  { icon: TrendingUp, title: "Scalable Solutions", desc: "From individual hires to bulk recruitment, we scale with your business needs." },
  { icon: Building2, title: "Industry Expertise", desc: "Specialized recruitment across construction, healthcare, hospitality, and tech." },
];

const EmployerSection = () => (
  <section id="recruitment" className="py-20 md:py-28 bg-background">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-sm font-semibold tracking-wider uppercase text-accent">For Employers</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-6">
            Recruitment Solutions for Global Employers
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Partner with VisaHOBe to access a vetted pool of international talent. 
            We manage the entire hiring lifecycle — from sourcing and screening to visa processing and deployment.
          </p>
          <Button
            size="lg"
            className="bg-gold-gradient text-accent-foreground hover:opacity-90"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Partner With Us
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-card rounded-xl p-6 shadow-card border border-border">
              <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default EmployerSection;
