import { FileText, Plane, Briefcase, Users, ClipboardCheck, Search } from "lucide-react";

const services = [
  { icon: FileText, title: "Work Permit Processing", desc: "End-to-end management of work permit applications across multiple jurisdictions." },
  { icon: Plane, title: "Tourist Visa Assistance", desc: "Hassle-free tourist visa processing with expert documentation guidance." },
  { icon: Briefcase, title: "Business Visa Guidance", desc: "Tailored support for business travel visas and investor programs." },
  { icon: Users, title: "Employer Recruitment Support", desc: "Connecting employers with pre-screened international talent pools." },
  { icon: ClipboardCheck, title: "Document Review & Preparation", desc: "Thorough review and preparation of all required legal documents." },
  { icon: Search, title: "International Candidate Sourcing", desc: "Global talent search and screening for specialized positions." },
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28 bg-muted/50">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold tracking-wider uppercase text-accent">What We Offer</span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
          Our Services
        </h2>
        <p className="text-muted-foreground text-lg">
          Comprehensive visa and recruitment solutions tailored to your needs.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="group bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-accent/30 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <s.icon className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-foreground mb-3">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
