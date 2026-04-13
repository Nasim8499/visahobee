import { Shield, Award, Clock, HeadphonesIcon } from "lucide-react";

const items = [
  { icon: Shield, title: "Licensed & Regulated", desc: "Fully licensed recruitment and visa consultancy operating within legal frameworks." },
  { icon: Award, title: "Industry Recognized", desc: "Award-winning services trusted by employers and candidates worldwide." },
  { icon: Clock, title: "Fast Processing", desc: "Expedited application processing with real-time tracking and updates." },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Dedicated support team available round the clock for all your queries." },
];

const TrustSection = () => (
  <section className="py-20 md:py-28 bg-muted/50">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold tracking-wider uppercase text-accent">Why Choose Us</span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
          Trusted by Thousands Worldwide
        </h2>
        <p className="text-muted-foreground text-lg">
          Our commitment to excellence sets us apart in global recruitment and visa services.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.title} className="text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-card shadow-card flex items-center justify-center mx-auto mb-5 border border-border">
              <item.icon className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-serif font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
