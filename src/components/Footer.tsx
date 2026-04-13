import { Globe } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-serif font-bold">Visa<span className="text-gradient-gold">HOBe</span></span>
          </div>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            Your trusted global recruitment & visa partner. Connecting talent with opportunity worldwide.
          </p>
        </div>

        <div>
          <h4 className="font-serif font-semibold mb-4 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            {["Home", "Countries", "Services", "About"].map((l) => (
              <li key={l}>
                <button
                  onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-semibold mb-4 text-sm">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            {["Work Permits", "Tourist Visas", "Business Visas", "Recruitment"].map((s) => (
              <li key={s}><span className="hover:text-primary-foreground transition-colors cursor-pointer">{s}</span></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-semibold mb-4 text-sm">Countries</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            {["Singapore", "Australia", "Serbia", "Moldova", "Kuwait", "Cambodia"].map((c) => (
              <li key={c}><span className="hover:text-primary-foreground transition-colors cursor-pointer">{c}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} VisaHOBe PTE. LTD. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-sm text-primary-foreground/50">
          <Globe className="w-4 h-4" />
          Global Recruitment & Visa Partner
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
