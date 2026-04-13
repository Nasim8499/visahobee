import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useSpring } from 'framer-motion';

const IMG = {
  singapore: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1e226a98a-3d48-4cd9-a261-e2c515240501.png',
  australia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1407c1d01-0fe5-4305-8290-55ea36062e8b.png',
  serbia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1a4d74935-a868-49d3-838d-73b1d18bfe84.png',
  moldova: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/183ff4d9d-8365-442d-9f7a-de92d43be916.png',
  kuwait: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/170442829-3643-4d17-9e28-93878c4a5d21.png',
  cambodia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1215156d0-ec37-4db9-94dc-535c541efc85.png',
  russia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1b958e265-a0b7-441a-8142-046e20b6db4d.png',
  saudiarabia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1120c4a36-6d91-462a-8710-c4120f6637c3.png',
  belarus: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1b296953f-dabb-40b6-8204-0bc692b2d2fc.png',
  malaysia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1ad75cf6c-e29d-4314-929c-3e5f29cfcb8a.png',
  team: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/12f790113-5d41-4344-a934-ba661dd20e65.png',
  traveler: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1c1c9765a-67c0-4d7d-9e3c-9125f60102b1.png',
  dashboard: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1b39dd3e6-0972-49ff-b00c-d277bf119e8f.png',
  jobboard: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1fff525fc-cc2c-4ffc-92d4-612e7dee3bcf.png',
  globevisa: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/10f608b8c-1d1b-42c7-a4b4-d9654794c134.png',
};

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const PlaneSVG = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="currentColor">
    <path d="M58 8L6 30l18 6 4 18 8-12 12 6z" />
  </svg>
);

const VisaStampSVG = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none">
    <rect x="5" y="15" width="70" height="50" rx="8" stroke="#F97316" strokeWidth="3" strokeDasharray="6 4" />
    <text x="40" y="38" textAnchor="middle" fill="#F97316" fontSize="14" fontWeight="bold">VISA</text>
    <text x="40" y="55" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">APPROVED</text>
  </svg>
);

const StarRating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= rating ? '#F97316' : '#E5E7EB'} stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const SectionWrap = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.section ref={ref} id={id} className={className} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: 'easeOut' }}>
      {children}
    </motion.section>
  );
};

const Floating = ({ children, delay = 0, dur = 4, yR = 15, className = "" }: { children: React.ReactNode; delay?: number; dur?: number; yR?: number; className?: string }) => (
  <motion.div className={className} animate={{ y: [-yR, yR, -yR] }} transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}>
    {children}
  </motion.div>
);

const AnimatedCounter = ({ end, suffix = "", label = "" }: { end: number; suffix?: string; label?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const inc = end / 125;
    const t = setInterval(() => { s += inc; if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [inView, end]);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl font-bold text-white">{count.toLocaleString()}{suffix}</p>
      <p className="text-gray-400 text-xs mt-1">{label}</p>
    </div>
  );
};

interface CountryCardProps {
  img: string;
  country: string;
  visa: string;
  badge?: string;
  desc: string;
  delay?: number;
  featured?: boolean;
}

const CountryCard = ({ img, country, visa, badge, desc, delay = 0 }: CountryCardProps) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.4 }} whileHover={{ y: -6 }} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
    <div className="relative h-44 overflow-hidden">
      <img src={img} alt={country} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      {badge && (
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
          {badge}
        </span>
      )}
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-orange-500" />
        <span className="text-orange-600 text-xs font-semibold">{visa}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{country}</h3>
      <p className="text-gray-500 text-xs leading-relaxed mb-3">{desc}</p>
      <div className="flex items-center gap-1 text-orange-500 text-xs font-semibold">
        <span>Learn More</span>
        <ArrowIcon />
      </div>
    </div>
  </motion.div>
);

const ServiceCard = ({ icon, title, desc, delay = 0 }: { icon: React.ReactNode; title: string; desc: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.4 }} whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
      {icon}
    </div>
    <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
  </motion.div>
);

const TrustItem = ({ icon, title, delay = 0 }: { icon: React.ReactNode; title: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.3 }} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-800">{title}</span>
  </motion.div>
);

const TestimonialCard = ({ name, role, text, rating = 5, delay = 0 }: { name: string; role: string; text: string; rating?: number; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.4 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <StarRating rating={rating} />
    <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-5">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

const ProcessStep = ({ num, title, desc, icon, delay = 0 }: { num: string; title: string; desc: string; icon: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: '-20px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.4 }} className="text-center">
      <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-3 text-sm font-bold">
        {num}
      </div>
      <p className="text-2xl mb-2">{icon}</p>
      <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
      <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
    </motion.div>
  );
};

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ServiceIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    work: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>,
    tourist: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
    business: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
    recruitment: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    document: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    sourcing: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  };
  return <>{icons[type] || icons.work}</>;
};

const TrustIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    case: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    country: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    document: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
    support: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" /><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>,
    transparent: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    multi: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  };
  return <>{icons[type] || icons.case}</>;
};

export default function Index() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('All');
  const [countrySliderIdx, setCountrySliderIdx] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showEligibility, setShowEligibility] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [eligResult, setEligResult] = useState<{ score: number; message: string } | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const countries = [
    { img: IMG.singapore, country: 'Singapore', visa: 'Work Permit / IPA', badge: 'Top Destination', desc: 'Work Permit and In-Principle Approval support for skilled & semi-skilled workers entering Singapore\'s thriving economy.', featured: true },
    { img: IMG.australia, country: 'Australia', visa: 'Visitor / Business / Skilled', badge: 'High Value', desc: 'Complete visa pathways including Visitor, Business, and Skilled migration routes to Australia.', featured: true },
    { img: IMG.serbia, country: 'Serbia', visa: 'Work Permit', badge: 'European Gateway', desc: 'Work permit support for Serbia — an emerging European gateway for international professionals.', featured: true },
    { img: IMG.moldova, country: 'Moldova', visa: 'Recruitment Pipeline', badge: 'New Route', desc: 'Structured recruitment pipeline for Moldova, connecting candidates with verified employer demand.' },
    { img: IMG.kuwait, country: 'Kuwait', visa: 'Employer Demand Route', desc: 'Kuwait employer demand route — fast-track processing for confirmed job placements.' },
    { img: IMG.cambodia, country: 'Cambodia', visa: 'Business Setup + Work', badge: 'Fast Track', desc: 'Business setup assistance combined with work route processing for Cambodia.' },
    { img: IMG.russia, country: 'Russia', visa: 'Work Permit', desc: 'Work permit processing for Russia, covering multiple industry sectors and employment types.' },
    { img: IMG.saudiarabia, country: 'Saudi Arabia', visa: 'Work Visa', desc: 'Saudi Arabia work visa services for construction, healthcare, and technology sectors.' },
    { img: IMG.belarus, country: 'Belarus', visa: 'Work Permit', desc: 'Belarus work permit processing with employer coordination and documentation support.' },
    { img: IMG.malaysia, country: 'Malaysia', visa: 'Employment Pass', badge: 'ASEAN Hub', desc: 'Malaysia Employment Pass for skilled professionals entering the ASEAN economic hub.' },
  ];

  const services = [
    { icon: <ServiceIcon type="work" />, title: 'Work Permit Processing', desc: 'End-to-end work permit application processing for multiple countries with embassy-ready documentation.' },
    { icon: <ServiceIcon type="tourist" />, title: 'Tourist Visa Assistance', desc: 'Fast-track tourist visa processing with complete travel documentation and itinerary planning.' },
    { icon: <ServiceIcon type="business" />, title: 'Business Visa Guidance', desc: 'Business visa support including meeting scheduling, invitation letters, and compliance documentation.' },
    { icon: <ServiceIcon type="recruitment" />, title: 'Employer Recruitment Support', desc: 'Full recruitment coordination — candidate sourcing, screening, and placement with overseas employers.' },
    { icon: <ServiceIcon type="document" />, title: 'Document Review & Preparation', desc: 'Thorough review and preparation of all visa-related documents to minimize errors and rejections.' },
    { icon: <ServiceIcon type="sourcing" />, title: 'International Candidate Sourcing', desc: 'Cross-border candidate sourcing and matching with verified employer demands worldwide.' },
  ];

  const trustItems = [
    { icon: <TrustIcon type="case" />, title: 'Professional Case Handling' },
    { icon: <TrustIcon type="country" />, title: 'Country-Specific Guidance' },
    { icon: <TrustIcon type="document" />, title: 'Structured Document Workflow' },
    { icon: <TrustIcon type="support" />, title: 'Client and Employer Support' },
    { icon: <TrustIcon type="transparent" />, title: 'Transparent Communication' },
    { icon: <TrustIcon type="multi" />, title: 'Multi-Country Service Coverage' },
  ];

  const testimonials = [
    { name: 'Rahman Hossain', role: 'Construction Engineer — Singapore', text: 'VisaHOBe made my journey to Singapore seamless. From document preparation to IPA approval, every step was handled professionally. I started my new role within 6 weeks of applying.', rating: 5 },
    { name: 'Fatima Akter', role: 'Healthcare Worker — Australia', text: 'I was worried about the complex Subclass 482 process, but the VisaHOBe team guided me through every requirement. Their embassy-ready documentation saved me months of back-and-forth.', rating: 5 },
    { name: 'Kamal Uddin', role: 'IT Professional — Serbia', text: 'The European Gateway route through Serbia was exactly what I needed. VisaHOBe provided clear guidance and transparent communication throughout the entire work permit process.', rating: 5 },
  ];

  const tabs = ['All', 'Asia', 'Europe', 'Middle East'];
  const filteredCountries = activeTab === 'All' ? countries
    : activeTab === 'Asia' ? countries.filter(c => ['Singapore', 'Cambodia', 'Malaysia'].includes(c.country))
    : activeTab === 'Europe' ? countries.filter(c => ['Serbia', 'Moldova', 'Belarus', 'Russia'].includes(c.country))
    : countries.filter(c => ['Kuwait', 'Saudi Arabia', 'Australia'].includes(c.country));

  const [eligForm, setEligForm] = useState({ name: '', nationality: '', destination: '', visaType: '', experience: '' });

  const handleEligCheck = () => {
    if (eligForm.name && eligForm.destination && eligForm.visaType) {
      setEligResult({ score: Math.floor(Math.random() * 30) + 65, message: 'Based on your profile, you have a good chance for this visa pathway. Our team will provide a detailed assessment.' });
    }
  };

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navLinks = ['Home', 'Countries', 'Services', 'For Employers', 'Process', 'About', 'Contact'];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, ''));
    el?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-[60] origin-left" style={{ scaleX }} />

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#F5F5F0]/95 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => setMobileMenu(true)} className="sm:hidden text-sm font-medium text-gray-600">Menu</button>
          <a href="#" className="flex items-center gap-1" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </div>
            <span className="text-lg font-bold text-gray-900">VisaHOBe</span>
          </a>
          <button onClick={() => setShowContactForm(true)} className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">Contact Us</button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenu(false)}>
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-gray-900">Menu</span>
                <button onClick={() => setMobileMenu(false)} className="text-gray-400 hover:text-gray-900"><CloseIcon /></button>
              </div>
              {navLinks.map(item => (
                <button key={item} onClick={() => scrollTo(item === 'Home' ? 'home' : item.toLowerCase().replace(/\s+/g, ''))} className="block w-full text-left py-3 text-gray-700 hover:text-orange-500 text-sm font-medium transition-colors border-b border-gray-100">
                  {item}
                </button>
              ))}
              <div className="mt-8 pt-4 border-t border-gray-100">
                <p className="text-gray-400 text-xs">UEN: 202524173E | Singapore</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT FORM MODAL */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setShowContactForm(false); setFormSubmitted(false); }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-500 text-sm">Your inquiry has been submitted. Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Contact VisaHOBe</h3>
                    <button onClick={() => setShowContactForm(false)} className="text-gray-400 hover:text-gray-900"><CloseIcon /></button>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4">
                    <input placeholder="Full Name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors" required />
                    <input placeholder="Email Address" type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors" required />
                    <input placeholder="Phone Number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-gray-500">
                      <option value="">Select Service</option>
                      <option>Work Permit Processing</option>
                      <option>Tourist Visa Assistance</option>
                      <option>Business Visa Guidance</option>
                      <option>Employer Recruitment Support</option>
                      <option>Document Review</option>
                      <option>Other</option>
                    </select>
                    <textarea placeholder="Your Message" rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none" />
                    <button type="submit" className="w-full bg-orange-500 text-white rounded-xl py-3 text-sm font-bold hover:bg-orange-600 transition-colors">Submit Inquiry</button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ELIGIBILITY MODAL */}
      <AnimatePresence>
        {showEligibility && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setShowEligibility(false); setEligResult(null); }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Eligibility Assessment</h3>
                <button onClick={() => { setShowEligibility(false); setEligResult(null); }} className="text-gray-400 hover:text-gray-900"><CloseIcon /></button>
              </div>
              <div className="space-y-4">
                <input value={eligForm.name} onChange={e => setEligForm({ ...eligForm, name: e.target.value })} placeholder="Full Name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                <select value={eligForm.nationality} onChange={e => setEligForm({ ...eligForm, nationality: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-gray-500">
                  <option value="">Nationality</option>
                  <option>Bangladeshi</option>
                  <option>Indian</option>
                  <option>Pakistani</option>
                  <option>Other</option>
                </select>
                <select value={eligForm.destination} onChange={e => setEligForm({ ...eligForm, destination: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-gray-500">
                  <option value="">Destination Country</option>
                  <option>Singapore</option>
                  <option>Australia</option>
                  <option>Serbia</option>
                  <option>Moldova</option>
                  <option>Kuwait</option>
                  <option>Cambodia</option>
                  <option>Other</option>
                </select>
                <select value={eligForm.visaType} onChange={e => setEligForm({ ...eligForm, visaType: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-gray-500">
                  <option value="">Visa Type</option>
                  <option>Work Permit</option>
                  <option>Visitor Visa</option>
                  <option>Business Visa</option>
                  <option>Skilled Migration</option>
                </select>
                <select value={eligForm.experience} onChange={e => setEligForm({ ...eligForm, experience: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-gray-500">
                  <option value="">Experience Level</option>
                  <option>Entry Level (0-2 years)</option>
                  <option>Mid Level (3-7 years)</option>
                  <option>Senior (8+ years)</option>
                </select>
                <button onClick={handleEligCheck} className="w-full bg-orange-500 text-white rounded-xl py-3 text-sm font-bold hover:bg-orange-600 transition-colors">Check Eligibility</button>
                {eligResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <p className="text-orange-600 font-bold text-lg mb-1">{eligResult.score}% Match</p>
                    <p className="text-gray-600 text-sm">{eligResult.message}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <SectionWrap id="home" className="pt-24 pb-36 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center text-sm font-medium text-gray-600 mb-3">Your Trusted Global Mobility Partner</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="text-center text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-bold tracking-tighter text-gray-900 leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>
            Global
          </motion.h1>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }} className="text-center text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-bold tracking-tighter leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="text-orange-500">Mobility</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center text-sm text-gray-500 mt-4 max-w-xl mx-auto">End-to-end visa and recruitment support across 10 countries — turning global aspirations into reality.</motion.p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="max-w-6xl mx-auto px-4 mt-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src={IMG.globevisa} alt="Global mobility" className="w-full h-56 sm:h-72 md:h-80 object-cover" />
          </div>
          <Floating delay={0} dur={3} yR={15} className="absolute top-6 left-4 sm:left-8 hidden sm:block"><PlaneSVG className="w-12 h-12 text-orange-500 drop-shadow-lg" /></Floating>
          <Floating delay={0.5} dur={4} yR={12} className="absolute top-12 right-4 sm:right-12 hidden sm:block"><VisaStampSVG className="w-14 h-14" /></Floating>
        </motion.div>

        {/* CTA Buttons */}
        <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowEligibility(true)} className="bg-orange-500 text-white rounded-full px-8 py-3.5 text-sm font-bold shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            Check Eligibility
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowContactForm(true)} className="bg-gray-900 text-white rounded-full px-8 py-3.5 text-sm font-bold shadow-lg flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            Contact VisaHOBe
          </motion.button>
        </div>
      </SectionWrap>

      {/* FEATURED COUNTRIES */}
      <SectionWrap id="countries" className="pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm font-medium text-gray-600 mb-2">Explore Destinations</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold tracking-tighter text-gray-900 leading-none mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Country-Wise Visa Routes</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm text-gray-500 mb-8 max-w-xl mx-auto">Comprehensive work visa support across 10 countries with specialized pathways for each destination.</motion.p>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#EDEAE5] rounded-full p-1 flex gap-1">
              {tabs.map(tab => (
                <button key={tab} onClick={() => { setActiveTab(tab); setCountrySliderIdx(0); }} className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-md' : 'text-gray-500'}`}>{tab}</button>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {filteredCountries.map((c, i) => <CountryCard key={c.country} {...c} delay={i * 0.08} />)}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden overflow-hidden">
            <motion.div className="flex" animate={{ x: `-${countrySliderIdx * 100}%` }} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
              {filteredCountries.map(c => (
                <div key={c.country} className="w-full flex-shrink-0 px-2">
                  <CountryCard {...c} featured />
                </div>
              ))}
            </motion.div>
            <div className="flex justify-center gap-2 mt-5">
              {filteredCountries.map((_, i) => (
                <button key={i} onClick={() => setCountrySliderIdx(i)} className={`h-2 rounded-full transition-all ${i === countrySliderIdx ? 'bg-orange-500 w-8' : 'bg-gray-300 w-2'}`} />
              ))}
            </div>
          </div>
        </div>
      </SectionWrap>

      {/* SERVICES */}
      <SectionWrap id="services" className="pt-16 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm font-medium text-gray-600 mb-2">What We Offer</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] font-bold tracking-tighter text-gray-900 leading-none mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>Our Services</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => <ServiceCard key={s.title} {...s} delay={i * 0.1} />)}
          </div>
        </div>
      </SectionWrap>

      {/* EMPLOYER SECTION */}
      <SectionWrap id="foremployers" className="pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-4">For Employers</span>
              <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-bold tracking-tighter text-gray-900 leading-tight mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Recruitment Solutions for Global Employers</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">VisaHOBe supports candidate sourcing, documentation flow, and recruitment coordination for employers seeking qualified international talent. We handle the entire pipeline — from identifying skilled candidates to preparing embassy-ready documentation and coordinating with immigration authorities.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {['Candidate Sourcing', 'Document Preparation', 'Employer Coordination', 'Compliance Support'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="text-gray-700 text-xs font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowContactForm(true)} className="bg-gray-900 text-white rounded-full px-8 py-3 text-sm font-bold shadow-lg inline-flex items-center gap-2">
                Partner With Us <ArrowIcon />
              </motion.button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={IMG.team} alt="Team meeting" className="w-full h-72 sm:h-96 object-cover" />
              </div>
              <Floating delay={0.5} dur={3} yR={10} className="absolute -top-4 -right-4 hidden sm:block"><PlaneSVG className="w-10 h-10 text-orange-500/40" /></Floating>
            </motion.div>
          </div>
        </div>
      </SectionWrap>

      {/* PROCESS */}
      <SectionWrap id="process" className="bg-gray-900 py-20 sm:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm font-medium text-gray-400 mb-3">Simple & Transparent</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] font-bold tracking-tighter text-white leading-none mb-14" style={{ fontFamily: 'Inter, sans-serif' }}>Our Process</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-3 relative">
            <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-orange-500 via-orange-500/50 to-transparent" />
            <ProcessStep num="1" title="Choose Country" desc="Select your target destination from our 10-country network" icon="🌍" delay={0.1} />
            <ProcessStep num="2" title="Submit Documents" desc="Upload your credentials and supporting documents securely" icon="📄" delay={0.2} />
            <ProcessStep num="3" title="Review & Assessment" desc="Expert review of your profile and eligibility assessment" icon="🔍" delay={0.3} />
            <ProcessStep num="4" title="Processing & Updates" desc="Real-time tracking and transparent status updates" icon="⚡" delay={0.4} />
            <ProcessStep num="5" title="Final Outcome" desc="Visa approval and travel preparation guidance" icon="✈️" delay={0.5} />
          </div>
        </div>
      </SectionWrap>

      {/* TRUST SECTION */}
      <SectionWrap className="pt-16 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-bold tracking-tighter text-gray-900 leading-none mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>Why Trust VisaHOBe</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {trustItems.map((t, i) => <TrustItem key={t.title} {...t} delay={i * 0.1} />)}
          </div>
        </div>
      </SectionWrap>

      {/* ABOUT */}
      <SectionWrap id="about" className="pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm font-medium text-gray-600 mb-2">Who We Are</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] font-bold tracking-tighter text-gray-900 leading-none mb-10" style={{ fontFamily: 'Inter, sans-serif' }}>About VisaHOBe</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                <span className="font-bold text-gray-900">VisaHOBe Pte. Ltd.</span> is a Singapore-registered professional visa and recruitment support company, incorporated on <span className="font-semibold text-orange-500">June 3, 2025</span>. As a Private Company Limited by Shares (UEN: 202524173E), we serve as a complete <span className="font-semibold">"End-to-End"</span> visa travel partner.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                Our mission is to simplify the complex journey of cross-border employment and visa acquisition. We specialize in facilitating transparent and successful international labor migration, primarily serving the Bangladeshi market with operations spanning 10 countries.
              </p>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                Headquartered at 68 Circular Road, #02-01, Singapore 049422, with our operational hub in Dhaka, Bangladesh. We are fully foreign-owned and controlled by Bangladeshi nationals, ensuring deep market expertise and cultural understanding.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-orange-50 rounded-xl px-4 py-2">
                  <p className="text-orange-600 text-xs font-bold">ACRA Code</p>
                  <p className="text-gray-700 text-xs">70201 — Management Consultancy</p>
                </div>
                <div className="bg-orange-50 rounded-xl px-4 py-2">
                  <p className="text-orange-600 text-xs font-bold">UEN</p>
                  <p className="text-gray-700 text-xs">202524173E</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={IMG.traveler} alt="Happy traveler" className="w-full h-72 sm:h-96 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrap>

      {/* CLIENT PORTAL PREVIEW */}
      <SectionWrap className="pt-12 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img src={IMG.dashboard} alt="Client portal" className="w-full h-64 sm:h-80 object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2">
              <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-4">Coming Soon</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Client Portal</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Manage your visa applications, track progress in real-time, and access all your documents through our intuitive client portal.</p>
              <ul className="space-y-2 mb-6">
                {['Real-time application tracking', 'Secure document upload & storage', 'Progress notifications', 'Direct communication with your case officer'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                    <div className="w-4 h-4 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0"><CheckIcon /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </SectionWrap>

      {/* JOB BOARD PREVIEW */}
      <SectionWrap className="pt-12 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-4">Job Opportunities</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>International Job Board</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Browse verified job openings across our partner countries. Filter by destination, industry, and experience level to find your perfect opportunity abroad.</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-orange-500 text-white rounded-full px-6 py-2.5 text-sm font-bold shadow-lg shadow-orange-500/30 inline-flex items-center gap-2">
                Browse Jobs <ArrowIcon />
              </motion.button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img src={IMG.jobboard} alt="Job board" className="w-full h-64 sm:h-80 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrap>

      {/* TESTIMONIALS */}
      <SectionWrap className="pt-16 pb-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm font-medium text-gray-600 mb-2">Success Stories</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-bold tracking-tighter text-gray-900 leading-none mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>What Our Clients Say</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => <TestimonialCard key={t.name} {...t} delay={i * 0.15} />)}
          </div>
        </div>
      </SectionWrap>

      {/* STATS */}
      <SectionWrap className="bg-gray-900 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <AnimatedCounter end={500} suffix="+" label="Successful Placements" />
            <AnimatedCounter end={10} label="Countries Covered" />
            <AnimatedCounter end={6} suffix="+" label="Service Categories" />
            <AnimatedCounter end={100} suffix="%" label="Client Satisfaction" />
          </div>
        </div>
      </SectionWrap>

      {/* CTA */}
      <SectionWrap className="pt-20 pb-20" id="contact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] font-bold tracking-tighter text-gray-900 leading-none mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Ready to Start?</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gray-500 text-sm sm:text-base mb-8 max-w-lg mx-auto">Take the first step towards your international career. Our team is ready to guide you through every stage of the process.</motion.p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowEligibility(true)} className="bg-orange-500 text-white rounded-full px-8 py-3.5 text-sm font-bold shadow-lg shadow-orange-500/30 inline-flex items-center justify-center gap-2">
              Check Eligibility <ArrowIcon />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowContactForm(true)} className="bg-gray-900 text-white rounded-full px-8 py-3.5 text-sm font-bold shadow-lg inline-flex items-center justify-center gap-2">
              Contact Us <ArrowIcon />
            </motion.button>
          </div>
        </div>
      </SectionWrap>

      {/* FOOTER */}
      <footer className="bg-gray-900 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                </div>
                <span className="text-white font-bold text-lg">VisaHOBe</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">Your trusted global mobility partner. End-to-end visa and recruitment support across 10 countries.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
              <ul className="space-y-2">
                {['Work Permits', 'Tourist Visas', 'Business Visas', 'Recruitment', 'Document Review'].map(s => (
                  <li key={s} className="text-gray-400 text-xs hover:text-orange-400 cursor-pointer transition-colors">{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Countries</h4>
              <ul className="space-y-2">
                {['Singapore', 'Australia', 'Serbia', 'Moldova', 'Kuwait', 'Cambodia'].map(c => (
                  <li key={c} className="text-gray-400 text-xs hover:text-orange-400 cursor-pointer transition-colors">{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-xs">
                <li>info@visahobe.com</li>
                <li>68 Circular Road, #02-01</li>
                <li>Singapore 049422</li>
                <li>UEN: 202524173E</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">© 2025 VisaHOBe Pte. Ltd. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="text-gray-500 text-xs hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-gray-500 text-xs hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
