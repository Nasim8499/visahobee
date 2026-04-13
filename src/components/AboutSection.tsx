import { Target, Eye } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-20 md:py-28 bg-background">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-sm font-semibold tracking-wider uppercase text-accent">About Us</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-6">
            VisaHOBe PTE. LTD.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            VisaHOBe PTE. LTD. is a global recruitment and visa consultancy dedicated to connecting 
            skilled professionals with international opportunities. Headquartered in Singapore, we 
            serve clients and candidates across Asia, Europe, the Middle East, and beyond.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With years of industry expertise and a passion for enabling global mobility, our team 
            provides end-to-end support — from initial consultation to successful deployment. We 
            believe in transparency, integrity, and delivering results that exceed expectations.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="bg-card rounded-xl p-8 shadow-card border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center">
                <Target className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To simplify international recruitment and visa processes, empowering individuals 
              and businesses to achieve their global aspirations with confidence.
            </p>
          </div>
          <div className="bg-card rounded-xl p-8 shadow-card border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center">
                <Eye className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To be the world's most trusted partner for international mobility, recruitment, 
              and cross-border employment solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
