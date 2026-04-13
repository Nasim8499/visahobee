import { MessageSquare, FileSearch, Send, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: MessageSquare, step: "01", title: "Free Consultation", desc: "Share your goals and we'll recommend the best visa or recruitment pathway." },
  { icon: FileSearch, step: "02", title: "Document Preparation", desc: "Our experts guide you through every required document and application form." },
  { icon: Send, step: "03", title: "Application Submission", desc: "We submit and track your application, keeping you informed every step of the way." },
  { icon: CheckCircle2, step: "04", title: "Approval & Deployment", desc: "Receive your visa approval and get deployed with full pre-departure support." },
];

const ProcessSection = () => (
  <section id="process" className="py-20 md:py-28 bg-hero-gradient">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold tracking-wider uppercase text-accent">How It Works</span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mt-3 mb-4">
          Our Streamlined Process
        </h2>
        <p className="text-primary-foreground/70 text-lg">
          A simple, transparent process designed to get you where you need to be.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div key={s.title} className="relative">
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-primary-foreground/15" />
            )}
            <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-8 border border-primary-foreground/10 text-center hover:bg-primary-foreground/10 transition-colors">
              <div className="text-xs font-bold text-accent tracking-widest mb-4">{s.step}</div>
              <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-5">
                <s.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-serif font-semibold text-primary-foreground mb-3">{s.title}</h3>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
