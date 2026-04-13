import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => (
  <section id="contact" className="py-20 md:py-28 bg-background">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <span className="text-sm font-semibold tracking-wider uppercase text-accent">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-6">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Have questions about our services? Ready to start your application? 
            Reach out and our team will respond within 24 hours.
          </p>

          <div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "info@visahobe.com" },
              { icon: Phone, label: "Phone", value: "+65 8888 8888" },
              { icon: MapPin, label: "Office", value: "Singapore" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  <div className="font-medium text-foreground">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
          <h3 className="text-xl font-serif font-semibold text-foreground mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Full Name" className="h-12" />
              <Input placeholder="Email Address" type="email" className="h-12" />
            </div>
            <Input placeholder="Subject" className="h-12" />
            <Textarea placeholder="Your Message" rows={5} />
            <Button className="w-full bg-gold-gradient text-accent-foreground hover:opacity-90 h-12 text-base">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
