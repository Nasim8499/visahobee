import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = ["Home", "Countries", "Services", "Recruitment", "Process", "About", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-primary">Visa<span className="text-gradient-gold">HOBe</span></span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => scrollTo("contact")}>
            Employer Inquiry
          </Button>
          <Button size="sm" className="bg-gold-gradient text-accent-foreground hover:opacity-90" onClick={() => scrollTo("process")}>
            Start Application
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-card border-t border-border animate-in slide-in-from-top-2">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => scrollTo("contact")}>Employer Inquiry</Button>
              <Button size="sm" className="bg-gold-gradient text-accent-foreground" onClick={() => scrollTo("process")}>Start Application</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
