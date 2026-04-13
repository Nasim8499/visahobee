import { MapPin, ArrowUpRight } from "lucide-react";

const countries = [
  { name: "Singapore", flag: "🇸🇬", desc: "Premier business hub with streamlined work permit processes.", tags: ["Work Permits", "S Pass", "EP"] },
  { name: "Australia", flag: "🇦🇺", desc: "Skilled migration pathways and employer-sponsored visas.", tags: ["Skilled Visa", "TSS", "PR"] },
  { name: "Serbia", flag: "🇷🇸", desc: "Growing European market with accessible work visa options.", tags: ["Work Visa", "Residence"] },
  { name: "Moldova", flag: "🇲🇩", desc: "Emerging opportunities with simplified employment permits.", tags: ["Employment", "Permits"] },
  { name: "Kuwait", flag: "🇰🇼", desc: "Oil-rich economy with high-demand recruitment sectors.", tags: ["Work Visa", "NOC"] },
  { name: "Cambodia", flag: "🇰🇭", desc: "Fast-growing Southeast Asian economy with business visas.", tags: ["Business Visa", "Work Permit"] },
];

const CountriesSection = () => (
  <section id="countries" className="py-20 md:py-28 bg-background">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold tracking-wider uppercase text-accent">Destinations</span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
          Featured Countries
        </h2>
        <p className="text-muted-foreground text-lg">
          We specialize in recruitment and visa services across key global markets.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((c) => (
          <div
            key={c.name}
            className="group bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-accent/30 cursor-pointer hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{c.flag}</span>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-foreground">{c.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <MapPin className="w-3 h-3" />
                    Available
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{c.desc}</p>
            <div className="flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CountriesSection;
