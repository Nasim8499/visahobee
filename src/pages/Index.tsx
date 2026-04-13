import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import {
  ArrowRight,
  Award,
  Briefcase,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Globe2,
  HeadphonesIcon,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import { countries, IMG } from '@/data/countries';
import DarkModeToggle from '@/components/DarkModeToggle';

type RegionFilter = 'All' | 'Asia' | 'Europe' | 'Middle East';

const navLinks = [
  { label: 'Home', target: 'home' },
  { label: 'Countries', target: 'countries' },
  { label: 'Services', target: 'services' },
  { label: 'For Employers', target: 'foremployers' },
  { label: 'Process', target: 'process' },
  { label: 'About', target: 'about' },
  { label: 'Contact', target: 'contact' },
];

const services: Array<{ icon: LucideIcon; img: string; title: string; desc: string }> = [
  {
    icon: FileText,
    img: IMG.globevisa,
    title: 'Work Permit Processing',
    desc: 'End-to-end work permit coordination with employer-ready paperwork and embassy-focused documentation support.',
  },
  {
    icon: Globe2,
    img: IMG.traveler,
    title: 'Visitor & Tourist Visas',
    desc: 'Visitor visa planning with document guidance, itinerary support, and structured pre-submission checks.',
  },
  {
    icon: Briefcase,
    img: IMG.jobboard,
    title: 'Business Visa Guidance',
    desc: 'Business travel support for meetings, investor pathways, and cross-border commercial mobility requirements.',
  },
  {
    icon: Users,
    img: IMG.team,
    title: 'Employer Recruitment Support',
    desc: 'Candidate sourcing, shortlisting, and onboarding coordination for employers hiring across multiple markets.',
  },
  {
    icon: Search,
    img: IMG.dashboard,
    title: 'Document Review & Assessment',
    desc: 'Structured document screening that highlights missing items, risk areas, and next-step requirements early.',
  },
  {
    icon: Send,
    img: IMG.malaysia,
    title: 'Application Submission Guidance',
    desc: 'Step-by-step filing support with process tracking, timeline visibility, and coordinated follow-ups.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Consultation & Matching',
    desc: 'We review your goals, profile, and destination preferences to identify the strongest pathway.',
  },
  {
    step: '02',
    title: 'Document Preparation',
    desc: 'Our team organizes the paperwork, validates requirements, and flags issues before submission.',
  },
  {
    step: '03',
    title: 'Employer & Case Coordination',
    desc: 'We align employer demand, supporting records, and visa workflow so every file moves together.',
  },
  {
    step: '04',
    title: 'Submission & Updates',
    desc: 'You receive clear status updates as the application moves through processing and review.',
  },
  {
    step: '05',
    title: 'Approval & Next Steps',
    desc: 'Once approved, we help you prepare for travel, deployment, and the transition ahead.',
  },
];

const trustItems: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  {
    icon: ShieldCheck,
    title: 'Professional Case Handling',
    desc: 'Applications are organized with a consistent workflow that reduces missed details and rework.',
  },
  {
    icon: Award,
    title: 'Country-Specific Guidance',
    desc: 'Every destination has different rules, fees, and timelines — we tailor the route accordingly.',
  },
  {
    icon: Clock3,
    title: 'Transparent Timelines',
    desc: 'Clients know what happens next, what is pending, and where the process currently stands.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Responsive Support',
    desc: 'Candidates and employers can reach the team quickly when documents or clarifications are needed.',
  },
];

const testimonials = [
  {
    name: 'Rahman Hossain',
    role: 'Construction Engineer — Singapore',
    text: 'VisaHOBe made my move to Singapore much clearer. The team kept every requirement organized and the process felt transparent from start to finish.',
  },
  {
    name: 'Fatima Akter',
    role: 'Healthcare Worker — Australia',
    text: 'The documentation checklist and review support saved me a lot of confusion. I always knew what step came next and what I needed to prepare.',
  },
  {
    name: 'Kamal Uddin',
    role: 'IT Professional — Serbia',
    text: 'The country-specific guidance was the biggest value for me. They explained the route clearly and helped me avoid mistakes before submission.',
  },
  {
    name: 'Aminul Islam',
    role: 'Electrician — Kuwait',
    text: 'Everything from employer coordination to visa updates felt structured. I appreciated how quickly the team responded whenever I had questions.',
  },
  {
    name: 'Nasrin Begum',
    role: 'Supervisor — Cambodia',
    text: 'My case was handled carefully and the instructions were easy to follow. The support before travel also helped me feel more prepared.',
  },
  {
    name: 'Mizanur Rahman',
    role: 'Software Developer — Malaysia',
    text: 'The process felt organized from day one. I had a clear checklist, realistic timeline, and consistent updates until approval.',
  },
];

const faqData = [
  {
    q: 'What countries does VisaHOBe currently support?',
    a: 'VisaHOBe currently highlights 10 destinations: Singapore, Australia, Serbia, Moldova, Kuwait, Cambodia, Russia, Saudi Arabia, Belarus, and Malaysia. Each country has its own visa routes, processing pace, and document expectations.',
  },
  {
    q: 'Do you support work, business, and visitor visa routes?',
    a: 'Yes. The homepage covers multiple visa categories including work permits, business visas, visitor or tourist routes, and supporting employer recruitment workflows depending on the destination country.',
  },
  {
    q: 'How does the recruitment support work for employers?',
    a: 'Employers can work with VisaHOBe for sourcing, screening, documentation flow, and coordination across the hiring timeline. The goal is to align candidate readiness with immigration requirements.',
  },
  {
    q: 'What documents are usually required to get started?',
    a: 'Most routes begin with a valid passport, education or experience records, photographs, and destination-specific forms. Some cases also require medicals, police clearance, or employer-issued documents.',
  },
  {
    q: 'How do I begin the process?',
    a: 'You can start by exploring a destination, reviewing the relevant visa pathway, and then contacting the team through the homepage form for a guided next step.',
  },
];

const stats = [
  { value: '10', label: 'Countries covered' },
  { value: '500+', label: 'Placement journeys' },
  { value: '24h', label: 'Response window' },
  { value: 'End-to-end', label: 'Guided support' },
];

const starRow = Array.from({ length: 5 });

function SectionIntro({
  eyebrow,
  title,
  description,
  centered = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto mb-10 max-w-2xl text-center sm:mb-12' : 'mb-8 max-w-2xl'}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-[1.95rem] font-bold leading-none text-foreground sm:text-[3rem] md:text-[3.5rem]">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
    </div>
  );
}

function CountryCard({ country }: { country: (typeof countries)[number] }) {
  return (
    <Link
      to={`/countries/${country.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-32 overflow-hidden sm:h-40">
        <img
          src={country.img}
          alt={`${country.country} visa support`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span className="rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-foreground backdrop-blur sm:text-[11px]">
            {country.flag} {country.region}
          </span>
          {country.badge ? (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground sm:text-[11px]">
              {country.badge}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[11px]">{country.visa}</p>
        <h3 className="mt-2 font-heading text-sm font-bold text-foreground sm:text-lg">{country.country}</h3>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">{country.desc}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary sm:text-sm">
          View Details
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function ServiceCard({ item }: { item: (typeof services)[number] }) {
  const Icon = item.icon;

  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-28 overflow-hidden sm:h-36">
        <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-heading text-sm font-bold text-foreground sm:text-lg">{item.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</p>
      </div>
    </article>
  );
}

function TrustCard({ item }: { item: (typeof trustItems)[number] }) {
  const Icon = item.icon;

  return (
    <article className="rounded-[1.6rem] border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-heading text-sm font-bold text-foreground sm:text-lg">{item.title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</p>
    </article>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <article className="rounded-[1.6rem] border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="flex gap-1 text-primary">
        {starRow.map((_, index) => (
          <svg key={index} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">“{testimonial.text}”</p>
      <div className="mt-5 border-t border-border pt-4">
        <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
      </div>
    </article>
  );
}

export default function Index() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredCountries =
    activeRegion === 'All' ? countries : countries.filter((country) => country.region === activeRegion);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Globe2 className="h-4 w-4" />
            </div>
            <span className="font-heading text-lg font-bold text-foreground sm:text-xl">
              Visa<span className="text-primary">HOBe</span>
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <DarkModeToggle className="text-muted-foreground hover:text-foreground" />
            <button
              onClick={() => scrollTo('contact')}
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 lg:inline-flex"
            >
              Contact Us
            </button>
            <button
              onClick={() => setMobileMenu((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenu}
            >
              {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenu ? (
          <div className="border-t border-border bg-background lg:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollTo(link.target)}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="mt-3 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                Contact Us
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <main className="overflow-x-hidden">
        <section id="home" className="relative scroll-mt-24 overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-primary/15 blur-3xl sm:h-80 sm:w-80" />
            <div className="absolute left-0 top-1/3 h-56 w-56 rounded-full bg-secondary blur-3xl sm:h-72 sm:w-72" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
                  <Globe2 className="h-4 w-4 text-primary" />
                  Global mobility for work, visitor, and business pathways
                </span>
                <h1 className="mt-6 max-w-xl font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  A clearer route to your <span className="text-primary">next country, visa, and opportunity</span>.
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  VisaHOBe supports international movement across 10 destinations with structured recruitment guidance,
                  work permit processing, visitor and business visa assistance, and document preparation that keeps every
                  step understandable.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => scrollTo('countries')}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Explore Countries
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    Speak With Our Team
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-[1.25rem] border border-border bg-card p-4 shadow-sm">
                      <p className="font-heading text-lg font-bold text-foreground sm:text-xl">{stat.value}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] border border-border/70" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
                  <img
                    src={IMG.globevisa}
                    alt="Global visa and recruitment guidance"
                    className="h-[20rem] w-full object-cover sm:h-[28rem]"
                  />
                  <div className="grid gap-3 border-t border-border bg-background/95 p-4 backdrop-blur sm:grid-cols-2 sm:p-5">
                    {['Work visa routes', 'Visitor & tourist support', 'Business mobility guidance', 'Employer hiring coordination'].map((item) => (
                      <div key={item} className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="countries" className="scroll-mt-24 py-16 sm:py-20">
          <FadeIn className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionIntro
              eyebrow="Explore Destinations"
              title="Country-wise visa routes"
              description="Browse destination-specific pages covering work permit, visitor, and business pathways with supporting country details and industry notes."
            />

            <div className="mb-8 flex justify-center sm:mb-10">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-card p-1 shadow-sm">
                {(['All', 'Asia', 'Europe', 'Middle East'] as RegionFilter[]).map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`rounded-full px-3 py-2 text-[11px] font-semibold transition-all sm:px-5 sm:text-xs ${
                      activeRegion === region
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-5">
              {filteredCountries.map((country) => (
                <CountryCard key={country.slug} country={country} />
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="services" className="scroll-mt-24 bg-muted/50 py-16 sm:py-20">
          <FadeIn className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionIntro
              eyebrow="What We Offer"
              title="Services built around real travel and recruitment workflows"
              description="The homepage now renders as plain HTML while still covering the major visa, documentation, and employer-support topics clients need to review."
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {services.map((item) => (
                <ServiceCard key={item.title} item={item} />
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="foremployers" className="scroll-mt-24 py-16 sm:py-20">
          <FadeIn className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <SectionIntro
                eyebrow="For Employers"
                title="Recruitment support for global hiring"
                description="VisaHOBe helps employers coordinate candidate sourcing, documentation, and relocation-related steps without losing visibility across the process."
                centered={false}
              />
              <div className="grid grid-cols-2 gap-3">
                {['Candidate sourcing', 'Document preparation', 'Employer coordination', 'Compliance guidance'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-medium text-foreground sm:text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollTo('contact')}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start an Employer Inquiry
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
              <img src={IMG.team} alt="Employer and recruitment coordination" className="h-72 w-full object-cover sm:h-96" />
            </div>
          </FadeIn>
        </section>

        <section id="process" className="scroll-mt-24 bg-muted/50 py-16 sm:py-20">
          <FadeIn className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionIntro
              eyebrow="How It Works"
              title="A structured process without motion-heavy wrappers"
              description="The invisible section issue has been isolated by moving the homepage back to straightforward section markup and regular layout flow."
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-5">
              {processSteps.map((step) => (
                <article key={step.step} className="rounded-[1.6rem] border border-border bg-card p-4 shadow-sm sm:p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <h3 className="mt-4 font-heading text-sm font-bold text-foreground sm:text-lg">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{step.desc}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="py-16 sm:py-20">
          <FadeIn className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionIntro
              eyebrow="Why VisaHOBe"
              title="Trust signals that stay visible on every screen"
              description="Each trust card now renders in normal document flow, making the section stable again on mobile and desktop."
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {trustItems.map((item) => (
                <TrustCard key={item.title} item={item} />
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="about" className="scroll-mt-24 bg-muted/50 py-16 sm:py-20">
          <FadeIn className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <SectionIntro
                eyebrow="About VisaHOBe"
                title="A Singapore-registered visa and recruitment support company"
                description="The company supports cross-border movement with a practical, document-first approach built around clarity, transparency, and destination-specific guidance."
                centered={false}
              />
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">VisaHOBe Pte. Ltd.</span> is positioned as an end-to-end travel,
                  visa, and recruitment partner for people and employers navigating international mobility.
                </p>
                <p>
                  The current content spans work permit routes, visitor and business mobility, country pages, supporting documentation,
                  and employer hiring coordination across a growing destination network.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">UEN</p>
                    <p className="mt-2 text-sm font-medium text-foreground">202524173E</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Base</p>
                    <p className="mt-2 text-sm font-medium text-foreground">Singapore</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
              <img src={IMG.traveler} alt="Traveler supported by VisaHOBe" className="h-72 w-full object-cover sm:h-96" />
            </div>
          </FadeIn>
        </section>

        <section className="bg-muted/50 py-16 sm:py-20">
          <FadeIn className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionIntro
              eyebrow="Success Stories"
              title="Feedback from clients across different routes"
              description="The testimonial cards now live in a regular responsive grid, avoiding the collapsed layout issue caused by animated wrappers."
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} />
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="py-16 sm:py-20">
          <FadeIn className="mx-auto max-w-3xl px-4 sm:px-6">
            <SectionIntro
              eyebrow="Frequently Asked Questions"
              title="Answers that stay readable without any motion dependency"
              description="Common questions remain expandable, but the interaction now uses plain React state and standard HTML layout."
            />
            <div className="space-y-3">
              {faqData.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <article key={faq.q} className="overflow-hidden rounded-[1.4rem] border border-border bg-card shadow-sm">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-semibold text-foreground">{faq.q}</span>
                      <ChevronDown className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen ? (
                      <div className="border-t border-border px-4 py-4 text-sm leading-relaxed text-muted-foreground sm:px-5">
                        {faq.a}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </FadeIn>
        </section>

        <section id="contact" className="scroll-mt-24 bg-muted/50 py-16 sm:py-20">
          <FadeIn className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionIntro
              eyebrow="Contact"
              title="Ready to start your next move?"
              description="Use the form below to share your destination, visa type, or recruitment need — the section is now fully restored as standard layout markup."
            />

            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[1.8rem] border border-border bg-card p-6 shadow-sm sm:p-8">
                <h3 className="font-heading text-xl font-bold text-foreground">Talk to VisaHOBe</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Share your destination, planned visa route, or employer requirement and the team will guide you to the right next step.
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'info@visahobe.com' },
                    { icon: Phone, label: 'Phone', value: '+65 8888 8888' },
                    { icon: MapPin, label: 'Office', value: 'Singapore' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-border bg-background p-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                          <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-border bg-card p-6 shadow-sm sm:p-8">
                {formSubmitted ? (
                  <div className="flex h-full min-h-[20rem] flex-col items-center justify-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-heading text-2xl font-bold text-foreground">Thanks for reaching out</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      Your message has been captured locally in the form flow, and the section remains visually stable after removing motion wrappers.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-6 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        required
                        placeholder="Full name"
                        className="h-12 rounded-2xl border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Email address"
                        className="h-12 rounded-2xl border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        placeholder="Destination country"
                        className="h-12 rounded-2xl border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      />
                      <select className="h-12 rounded-2xl border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-primary">
                        <option value="">Select visa type</option>
                        <option>Work visa</option>
                        <option>Visitor visa</option>
                        <option>Business visa</option>
                        <option>Recruitment support</option>
                      </select>
                    </div>
                    <textarea
                      rows={6}
                      placeholder="Tell us about your plan or requirement"
                      className="w-full rounded-3xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Send Message
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Globe2 className="h-4 w-4" />
                </div>
                <span className="font-heading text-lg font-bold text-foreground">
                  Visa<span className="text-primary">HOBe</span>
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Global mobility guidance across work permits, visitor visas, business travel, and employer recruitment support.
              </p>
            </div>

            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {navLinks.map((link) => (
                  <li key={link.target}>
                    <button onClick={() => scrollTo(link.target)} className="transition-colors hover:text-foreground">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">Featured Countries</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {countries.slice(0, 5).map((country) => (
                  <li key={country.slug}>
                    <Link to={`/countries/${country.slug}`} className="transition-colors hover:text-foreground">
                      {country.country}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">Contact</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>info@visahobe.com</li>
                <li>68 Circular Road, #02-01</li>
                <li>Singapore 049422</li>
                <li>UEN: 202524173E</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© 2025 VisaHOBe Pte. Ltd. All rights reserved.</p>
            <p>Homepage restored with plain HTML sections and no framer-motion dependency.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
