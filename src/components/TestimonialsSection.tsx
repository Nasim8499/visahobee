import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Software Engineer, Singapore",
    text: "VisaHOBe made my Singapore work permit process incredibly smooth. Their team handled everything professionally and kept me informed at every stage.",
  },
  {
    name: "Sarah Mitchell",
    role: "HR Director, Australia",
    text: "As an employer, finding the right international talent was always a challenge until we partnered with VisaHOBe. Their screening process is exceptional.",
  },
  {
    name: "Ahmed Al-Rashid",
    role: "Construction Manager, Kuwait",
    text: "From document preparation to deployment, VisaHOBe provided outstanding support. I highly recommend them for anyone looking to work abroad.",
  },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-28 bg-muted/50">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold tracking-wider uppercase text-accent">Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
          What Our Clients Say
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-card rounded-xl p-8 shadow-card border border-border">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
            <div>
              <div className="font-semibold text-foreground">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
