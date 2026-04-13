import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { countries, IMG } from '@/data/countries';
import FlightIntro from '@/components/FlightIntro';
import PageTransition from '@/components/PageTransition';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useTheme } from '@/hooks/use-theme';

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

const SectionWrap = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => (
  <motion.section
    id={id}
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.05 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    {children}
  </motion.section>
);

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
      <p className="text-3xl sm:text-4xl font-bold text-white font-heading">{count.toLocaleString()}{suffix}</p>
      <p className="text-gray-400 text-xs mt-1">{label}</p>
    </div>
  );
};

const CountryCard = ({ img, country, visa, badge, desc, slug, delay = 0 }: { img: string; country: string; visa: string; badge?: string; desc: string; slug: string; delay?: number; featured?: boolean }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.4 }} whileHover={{ y: -6 }}>
    <Link to={`/countries/${slug}`} className="block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 group">
      <div className="relative h-36 sm:h-44 overflow-hidden">
        <img src={img} alt={country} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {badge && <span className="absolute top-2 left-2 bg-orange-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
      </div>
      <div className="p-3 sm:p-5">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span className="text-orange-600 dark:text-orange-400 text-[10px] sm:text-xs font-semibold">{visa}</span>
        </div>
        <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white mb-1 font-heading">{country}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs leading-relaxed mb-2 sm:mb-3 line-clamp-2">{desc}</p>
        <div className="flex items-center gap-1 text-orange-500 text-[10px] sm:text-xs font-semibold">
          <span>View Details</span>
          <ArrowIcon />
        </div>
      </div>
    </Link>
  </motion.div>
);

/* ── Service images ── */
const serviceData = [
  { img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', title: 'Work Permit Processing', desc: 'End-to-end work permit application processing for multiple countries with embassy-ready documentation.' },
  { img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', title: 'Tourist Visa Assistance', desc: 'Fast-track tourist visa processing with complete travel documentation and itinerary planning.' },
  { img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', title: 'Business Visa Guidance', desc: 'Business visa support including meeting scheduling, invitation letters, and compliance documentation.' },
  { img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', title: 'Employer Recruitment', desc: 'Full recruitment coordination — candidate sourcing, screening, and placement with overseas employers.' },
  { img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', title: 'Document Preparation', desc: 'Thorough review and preparation of all visa-related documents to minimize errors and rejections.' },
  { img: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=600&q=80', title: 'Candidate Sourcing', desc: 'Cross-border candidate sourcing and matching with verified employer demands worldwide.' },
];

const ServiceCardNew = ({ img, title, desc, delay = 0 }: { img: string; title: string; desc: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.4 }} whileHover={{ y: -4 }} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group">
    <div className="relative h-32 sm:h-40 overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
    <div className="p-4 sm:p-5">
      <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1.5 font-heading">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs leading-relaxed line-clamp-3">{desc}</p>
    </div>
  </motion.div>
);

const TrustItem = ({ icon, title, delay = 0 }: { icon: React.ReactNode; title: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.3 }} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 sm:p-4">
    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center flex-shrink-0">{icon}</div>
    <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">{title}</span>
  </motion.div>
);

const TestimonialCard = ({ name, role, text, rating = 5, delay = 0 }: { name: string; role: string; text: string; rating?: number; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.4 }} className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
    <StarRating rating={rating} />
    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mt-3 sm:mt-4 mb-4 sm:mb-5 line-clamp-4">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-xs sm:text-sm">{name.split(' ').map(n => n[0]).join('')}</div>
      <div>
        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  </motion.div>
);

const ProcessStep = ({ num, title, desc, icon, delay = 0 }: { num: string; title: string; desc: string; icon: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: '-20px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.4 }} className="text-center">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-2 sm:mb-3 text-xs sm:text-sm font-bold">{num}</div>
      <p className="text-xl sm:text-2xl mb-1 sm:mb-2">{icon}</p>
      <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 font-heading">{title}</h3>
      <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">{desc}</p>
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

/* ── Hero Slides ── */
const heroSlides = [
  { subtitle: 'Your Trusted Global Mobility Partner', title1: 'Global', title2: 'Mobility', desc: 'End-to-end visa and recruitment support across 10 countries — turning global aspirations into reality.', img: IMG.globevisa },
  { subtitle: 'International Recruitment Solutions', title1: 'Global', title2: 'Recruitment', desc: 'Connecting skilled professionals with verified employer demand worldwide. From sourcing to deployment.', img: IMG.team },
  { subtitle: 'Your Career, Our Mission', title1: 'Start', title2: 'Today', desc: 'Free eligibility assessment. 500+ successful placements. 10 countries. One trusted partner.', img: IMG.traveler },
];

/* ── FAQ Data ── */
const faqData = [
  { q: 'What countries does VisaHOBe operate in?', a: 'VisaHOBe provides visa and recruitment services across 10 countries: Singapore, Australia, Serbia, Moldova, Kuwait, Cambodia, Russia, Saudi Arabia, Belarus, and Malaysia. Each country has specialized pathways and dedicated case handling.' },
  { q: 'How long does the visa process typically take?', a: 'Processing times vary by country and visa type. For example, Singapore Work Permits take 1-3 weeks, while Australian Skilled Visas can take 6-18 months. We provide specific timelines during your free consultation and keep you updated at every stage.' },
  { q: 'What documents do I need to apply?', a: 'Basic requirements typically include a valid passport (minimum 6 months validity), educational certificates, medical examination report, police clearance, passport photographs, and an employment contract. Specific requirements vary by country — our team guides you through every document needed.' },
  { q: 'How much does your service cost?', a: 'Our service fees depend on the destination country and visa type. We provide a transparent fee breakdown during the initial consultation. Government visa fees are separate and vary by country. There are no hidden charges.' },
  { q: 'Is VisaHOBe a licensed company?', a: 'Yes. VisaHOBe Pte. Ltd. is a Singapore-registered company (UEN: 202524173E) incorporated on June 3, 2025, as a Private Company Limited by Shares. We operate under ACRA Code 70201 — Management Consultancy Services.' },
  { q: 'Can employers partner with VisaHOBe for bulk recruitment?', a: 'Absolutely. We offer end-to-end recruitment solutions for global employers, including candidate sourcing, screening, documentation, visa processing, and deployment coordination. Contact us to discuss your hiring needs.' },
  { q: 'What happens if my visa application is rejected?', a: 'While our thorough documentation process minimizes rejections, if one occurs, we review the reasons, advise on next steps, and can assist with reapplication or alternative pathways at no additional consultation fee.' },
  { q: 'Do you provide post-arrival support?', a: 'Yes. We offer pre-departure briefings and can assist with initial settlement guidance including accommodation, local orientation, and connecting you with community networks in your destination country.' },
];

export default function Index() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [pastHero, setPastHero] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [countrySliderIdx, setCountrySliderIdx] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showEligibility, setShowEligibility] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [eligResult, setEligResult] = useState<{ score: number; message: string } | null>(null);
  const [heroIdx, setHeroIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const nextHero = useCallback(() => setHeroIdx(p => (p + 1) % heroSlides.length), []);
  useEffect(() => { const t = setInterval(nextHero, 5000); return () => clearInterval(t); }, [nextHero]);

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
    { name: 'Aminul Islam', role: 'Electrician — Kuwait', text: 'The employer demand route through Kuwait was fast and transparent. Within 4 weeks my work visa was processed and I was deployed. Highly recommend their services.', rating: 5 },
    { name: 'Nasrin Begum', role: 'Garment Supervisor — Cambodia', text: 'VisaHOBe helped me secure a supervisory position in Cambodia. Their team handled everything from employer matching to travel preparation. Very professional service.', rating: 5 },
    { name: 'Mizanur Rahman', role: 'Software Developer — Malaysia', text: 'Getting my Employment Pass for Malaysia was smooth thanks to VisaHOBe. They navigated the ESD system expertly and my application was approved in just 3 weeks.', rating: 5 },
  ];

  const tabs = ['All', 'Asia', 'Europe', 'Middle East'];
  const filteredCountries = activeTab === 'All' ? countries : countries.filter(c => c.region === activeTab);

  const [eligForm, setEligForm] = useState({ name: '', nationality: '', destination: '', visaType: '', experience: '' });

  const handleEligCheck = () => {
    if (eligForm.name && eligForm.destination && eligForm.visaType) {
      setEligResult({ score: Math.floor(Math.random() * 30) + 65, message: 'Based on your profile, you have a good chance for this visa pathway. Our team will provide a detailed assessment.' });
    }
  };

  useEffect(() => {
    const h = () => {
      setScrollY(window.scrollY);
      setPastHero(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navLinks = ['Home', 'Countries', 'Services', 'For Employers', 'Process', 'About', 'Contact'];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, ''));
    el?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  const slide = heroSlides[heroIdx];

  return (
    <PageTransition>
    <div className={`min-h-screen overflow-x-hidden ${isDark ? 'bg-gray-950' : 'bg-[#F5F5F0]'}`}>
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-[60] origin-left" style={{ scaleX }} />

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${pastHero ? (isDark ? 'bg-gray-900/95 backdrop-blur-xl shadow-sm' : 'bg-white/95 backdrop-blur-xl shadow-sm') : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button onClick={() => setMobileMenu(true)} className={`lg:hidden text-sm font-medium transition-colors ${pastHero ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white/80'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <Link to="/" className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </div>
            <span className={`text-lg font-bold font-heading transition-colors ${pastHero ? (isDark ? 'text-white' : 'text-gray-900') : 'text-white'}`}>VisaHOBe</span>
          </Link>
          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(item => (
              <button key={item} onClick={() => scrollTo(item === 'Home' ? 'home' : item.toLowerCase().replace(/\s+/g, ''))} className={`text-sm font-medium transition-colors ${pastHero ? (isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500') : 'text-white/80 hover:text-white'}`}>
                {item}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <DarkModeToggle className={`${pastHero ? (isDark ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500') : 'text-white/80 hover:text-white'}`} />
            <button onClick={() => setShowContactForm(true)} className={`text-sm font-medium transition-colors px-4 py-2 rounded-full border ${pastHero ? (isDark ? 'text-gray-300 border-gray-600 hover:text-orange-500 hover:border-orange-500' : 'text-gray-600 border-gray-300 hover:text-orange-500 hover:border-orange-500') : 'text-white border-white/30 hover:bg-white/10'}`}>Contact Us</button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenu(false)}>
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-gray-900 font-heading">Menu</span>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Thank You!</h3>
                  <p className="text-gray-500 text-sm">Your inquiry has been submitted. Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 font-heading">Contact VisaHOBe</h3>
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
                <h3 className="text-xl font-bold text-gray-900 font-heading">Eligibility Assessment</h3>
                <button onClick={() => { setShowEligibility(false); setEligResult(null); }} className="text-gray-400 hover:text-gray-900"><CloseIcon /></button>
              </div>
              <div className="space-y-4">
                <input value={eligForm.name} onChange={e => setEligForm({ ...eligForm, name: e.target.value })} placeholder="Full Name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                <select value={eligForm.nationality} onChange={e => setEligForm({ ...eligForm, nationality: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-gray-500">
                  <option value="">Nationality</option>
                  <option>Bangladeshi</option><option>Indian</option><option>Pakistani</option><option>Other</option>
                </select>
                <select value={eligForm.destination} onChange={e => setEligForm({ ...eligForm, destination: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-gray-500">
                  <option value="">Destination Country</option>
                  {countries.map(c => <option key={c.slug}>{c.country}</option>)}
                </select>
                <select value={eligForm.visaType} onChange={e => setEligForm({ ...eligForm, visaType: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-gray-500">
                  <option value="">Visa Type</option>
                  <option>Work Permit</option><option>Visitor Visa</option><option>Business Visa</option><option>Skilled Migration</option>
                </select>
                <select value={eligForm.experience} onChange={e => setEligForm({ ...eligForm, experience: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-gray-500">
                  <option value="">Experience Level</option>
                  <option>Entry Level (0-2 years)</option><option>Mid Level (3-7 years)</option><option>Senior (8+ years)</option>
                </select>
                <button onClick={handleEligCheck} className="w-full bg-orange-500 text-white rounded-xl py-3 text-sm font-bold hover:bg-orange-600 transition-colors">Check Eligibility</button>
                {eligResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <p className="text-orange-600 font-bold text-lg mb-1 font-heading">{eligResult.score}% Match</p>
                    <p className="text-gray-600 text-sm">{eligResult.message}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO — FULL-SCREEN FLIGHT SIMULATOR (no text overlay) ── */}
      <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f172a] to-[#1e1b4b]" />

        {/* Animated world map SVG */}
        <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 0.5, scale: 1 }} transition={{ duration: 2 }}>
          <svg className="w-full h-full max-w-none" viewBox="0 0 1000 500" fill="none">
            <path d="M150 80 L220 60 L280 80 L300 120 L280 180 L240 200 L200 220 L160 200 L120 160 L100 120 Z" fill="rgba(249,115,22,0.12)" stroke="rgba(249,115,22,0.3)" strokeWidth="1"/>
            <path d="M220 250 L260 240 L280 280 L290 340 L270 400 L240 420 L210 380 L200 320 L210 280 Z" fill="rgba(249,115,22,0.08)" stroke="rgba(249,115,22,0.25)" strokeWidth="1"/>
            <path d="M440 70 L500 60 L530 80 L520 120 L490 140 L460 130 L440 100 Z" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.4)" strokeWidth="1"/>
            <path d="M460 160 L510 150 L540 180 L550 250 L530 320 L500 350 L470 320 L450 260 L440 200 Z" fill="rgba(249,115,22,0.08)" stroke="rgba(249,115,22,0.25)" strokeWidth="1"/>
            <path d="M560 60 L700 50 L780 80 L800 140 L760 180 L700 200 L640 190 L580 160 L550 120 L540 80 Z" fill="rgba(249,115,22,0.12)" stroke="rgba(249,115,22,0.3)" strokeWidth="1"/>
            <path d="M720 200 L780 190 L820 220 L810 260 L770 280 L730 260 L710 230 Z" fill="rgba(249,115,22,0.08)" stroke="rgba(249,115,22,0.25)" strokeWidth="1"/>
            <path d="M760 320 L840 310 L880 340 L870 380 L830 400 L780 390 L750 360 Z" fill="rgba(249,115,22,0.12)" stroke="rgba(249,115,22,0.3)" strokeWidth="1"/>
            {[100,200,300,400].map(y => <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(249,115,22,0.06)" strokeWidth="0.5" strokeDasharray="8 8"/>)}
            {[200,400,600,800].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" stroke="rgba(249,115,22,0.06)" strokeWidth="0.5" strokeDasharray="8 8"/>)}
          </svg>
        </motion.div>

        {/* Animated dots for countries */}
        {[
          { x: 65, y: 35 }, { x: 82, y: 68 }, { x: 50, y: 22 }, { x: 48, y: 25 },
          { x: 56, y: 30 }, { x: 72, y: 45 }, { x: 60, y: 18 }, { x: 54, y: 32 },
          { x: 47, y: 20 }, { x: 70, y: 40 },
        ].map((dot, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${dot.x}%`, top: `${dot.y}%` }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 + i * 0.12, type: 'spring' }}>
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <motion.div className="absolute inset-0 w-2 h-2 bg-orange-500 rounded-full" animate={{ scale: [1, 3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }} />
          </motion.div>
        ))}

        {/* Animated flight arcs */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path d="M 10 75 Q 35 30 50 25 Q 65 20 90 45" fill="none" stroke="rgba(249,115,22,0.5)" strokeWidth="0.3" strokeDasharray="2 2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }} />
          <motion.path d="M 15 65 Q 45 45 55 35 Q 75 25 85 55" fill="none" stroke="rgba(249,115,22,0.25)" strokeWidth="0.2" strokeDasharray="1 2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, ease: 'easeInOut', delay: 1.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }} />
        </svg>

        {/* Floating airplane */}
        <motion.div className="absolute z-10" initial={{ x: '-30vw', y: '20vh' }} animate={{ x: ['-30vw', '10vw', '40vw'], y: ['20vh', '-10vh', '15vh'], rotate: [-30, -10, 10] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <path d="M58 6L28 36M58 6L40 58L28 36M58 6L6 24L28 36" fill="rgba(249,115,22,0.15)" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={`p${i}`} className="absolute w-1 h-1 bg-orange-400/60 rounded-full" style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }} animate={{ opacity: [0, 0.7, 0], y: [0, -25] }} transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }} />
        ))}

        {/* Center content — logo + tagline + CTAs */}
        <div className="relative z-20 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-white font-heading">VisaHOBe</span>
            </div>
            <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-bold tracking-tighter text-white leading-none font-heading mb-2">
              Global <span className="text-orange-500">Mobility</span>
            </h1>
            <p className="text-white/40 text-xs sm:text-sm max-w-md mx-auto mt-4 mb-8">Your trusted partner for visa processing & international recruitment across 10 countries.</p>
          </motion.div>


          {/* Scroll indicator */}
          <motion.div className="mt-12" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" className="mx-auto"><polyline points="6 9 12 15 18 9" /></svg>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F5F0] to-transparent z-20" />
      </section>

      {/* FEATURED COUNTRIES */}
      <SectionWrap id="countries" className="pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-xs sm:text-sm font-medium text-gray-600 mb-2">Explore Destinations</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold tracking-tighter text-gray-900 leading-none mb-4 font-heading">Country-Wise Visa Routes</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-xs sm:text-sm text-gray-500 mb-8 max-w-xl mx-auto">Comprehensive work visa support across 10 countries with specialized pathways for each destination.</motion.p>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#EDEAE5] rounded-full p-1 flex gap-1">
              {tabs.map(tab => (
                <button key={tab} onClick={() => { setActiveTab(tab); setCountrySliderIdx(0); }} className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-md' : 'text-gray-500'}`}>{tab}</button>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {filteredCountries.map((c, i) => <CountryCard key={c.slug} {...c} delay={i * 0.08} />)}
          </div>

          {/* Mobile 2-col Grid */}
          <div className="md:hidden grid grid-cols-2 gap-3 mb-8">
            {filteredCountries.map((c, i) => <CountryCard key={c.slug} {...c} delay={i * 0.05} />)}
          </div>
        </div>
      </SectionWrap>

      {/* SERVICES - with images, 2-col mobile */}
      <SectionWrap id="services" className="pt-16 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-xs sm:text-sm font-medium text-gray-600 mb-2">What We Offer</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[2rem] sm:text-[3.5rem] md:text-[4rem] font-bold tracking-tighter text-gray-900 leading-none mb-10 sm:mb-12 font-heading">Our Services</motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {serviceData.map((s, i) => <ServiceCardNew key={s.title} {...s} delay={i * 0.1} />)}
          </div>
        </div>
      </SectionWrap>

      {/* EMPLOYER SECTION */}
      <SectionWrap id="foremployers" className="pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-4">For Employers</span>
              <h2 className="text-[1.8rem] sm:text-[2.5rem] md:text-[3rem] font-bold tracking-tighter text-gray-900 leading-tight mb-4 font-heading">Recruitment Solutions for Global Employers</h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">VisaHOBe supports candidate sourcing, documentation flow, and recruitment coordination for employers seeking qualified international talent.</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
                {['Candidate Sourcing', 'Document Preparation', 'Employer Coordination', 'Compliance Support'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0"><CheckIcon /></div>
                    <span className="text-gray-700 text-[10px] sm:text-xs font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowContactForm(true)} className="bg-gray-900 text-white rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-bold shadow-lg inline-flex items-center gap-2">
                Partner With Us <ArrowIcon />
              </motion.button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={IMG.team} alt="Team meeting" className="w-full h-56 sm:h-72 md:h-96 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrap>

      {/* PROCESS */}
      <SectionWrap id="process" className="bg-gray-900 py-16 sm:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-xs sm:text-sm font-medium text-gray-400 mb-3">Simple & Transparent</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[2rem] sm:text-[3.5rem] md:text-[4rem] font-bold tracking-tighter text-white leading-none mb-10 sm:mb-14 font-heading">Our Process</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 md:gap-3 relative">
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
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[1.8rem] sm:text-[2.5rem] md:text-[3rem] font-bold tracking-tighter text-gray-900 leading-none mb-10 sm:mb-12 font-heading">Why Trust VisaHOBe</motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto">
            {trustItems.map((t, i) => <TrustItem key={t.title} {...t} delay={i * 0.1} />)}
          </div>
        </div>
      </SectionWrap>

      {/* ABOUT */}
      <SectionWrap id="about" className="pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-xs sm:text-sm font-medium text-gray-600 mb-2">Who We Are</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[2rem] sm:text-[3.5rem] md:text-[4rem] font-bold tracking-tighter text-gray-900 leading-none mb-10 font-heading">About VisaHOBe</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl">
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                <span className="font-bold text-gray-900">VisaHOBe Pte. Ltd.</span> is a Singapore-registered professional visa and recruitment support company, incorporated on <span className="font-semibold text-orange-500">June 3, 2025</span>. As a Private Company Limited by Shares (UEN: 202524173E), we serve as a complete <span className="font-semibold">"End-to-End"</span> visa travel partner.
              </p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                Our mission is to simplify the complex journey of cross-border employment and visa acquisition. We specialize in facilitating transparent and successful international labor migration, primarily serving the Bangladeshi market with operations spanning 10 countries.
              </p>
              <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed mb-6">
                Headquartered at 68 Circular Road, #02-01, Singapore 049422, with our operational hub in Dhaka, Bangladesh.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-orange-50 rounded-xl px-4 py-2">
                  <p className="text-orange-600 text-[10px] sm:text-xs font-bold">ACRA Code</p>
                  <p className="text-gray-700 text-[10px] sm:text-xs">70201 — Management Consultancy</p>
                </div>
                <div className="bg-orange-50 rounded-xl px-4 py-2">
                  <p className="text-orange-600 text-[10px] sm:text-xs font-bold">UEN</p>
                  <p className="text-gray-700 text-[10px] sm:text-xs">202524173E</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={IMG.traveler} alt="Happy traveler" className="w-full h-56 sm:h-72 md:h-96 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrap>

      {/* CLIENT PORTAL PREVIEW */}
      <SectionWrap className="pt-12 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img src={IMG.dashboard} alt="Client portal" className="w-full h-48 sm:h-64 md:h-80 object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2">
              <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-4">Coming Soon</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">Client Portal</h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">Manage your visa applications, track progress in real-time, and access all your documents through our intuitive client portal.</p>
              <ul className="space-y-2 mb-6">
                {['Real-time application tracking', 'Secure document upload & storage', 'Progress notifications', 'Direct communication with your case officer'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-4">Job Opportunities</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">International Job Board</h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">Browse verified job openings across our partner countries. Filter by destination, industry, and experience level.</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-orange-500 text-white rounded-full px-6 py-2.5 text-sm font-bold shadow-lg shadow-orange-500/30 inline-flex items-center gap-2">
                Browse Jobs <ArrowIcon />
              </motion.button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img src={IMG.jobboard} alt="Job board" className="w-full h-48 sm:h-64 md:h-80 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrap>

      {/* TESTIMONIALS - 2-col mobile */}
      <SectionWrap className="pt-16 pb-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-xs sm:text-sm font-medium text-gray-600 mb-2">Success Stories</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[1.8rem] sm:text-[2.5rem] md:text-[3rem] font-bold tracking-tighter text-gray-900 leading-none mb-10 sm:mb-12 font-heading">What Our Clients Say</motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {testimonials.map((t, i) => <TestimonialCard key={t.name} {...t} delay={i * 0.1} />)}
          </div>
        </div>
      </SectionWrap>

      {/* STATS */}
      <SectionWrap className="bg-gray-900 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <AnimatedCounter end={500} suffix="+" label="Successful Placements" />
            <AnimatedCounter end={10} label="Countries Covered" />
            <AnimatedCounter end={6} suffix="+" label="Service Categories" />
            <AnimatedCounter end={100} suffix="%" label="Client Satisfaction" />
          </div>
        </div>
      </SectionWrap>

      {/* ── FAQ SECTION ── */}
      <SectionWrap className="pt-16 pb-16 bg-white" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-xs sm:text-sm font-medium text-gray-600 mb-2">Got Questions?</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-[1.8rem] sm:text-[2.5rem] md:text-[3rem] font-bold tracking-tighter text-gray-900 leading-none mb-10 font-heading">Frequently Asked Questions</motion.h2>
          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-[#F5F5F0] rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <motion.svg animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="flex-shrink-0">
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrap>

      {/* CTA */}
      <SectionWrap className="pt-16 sm:pt-20 pb-16 sm:pb-20" id="contact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[2rem] sm:text-[3.5rem] md:text-[4rem] font-bold tracking-tighter text-gray-900 leading-none mb-4 font-heading">Ready to Start?</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8 max-w-lg mx-auto">Take the first step towards your international career. Our team is ready to guide you through every stage of the process.</motion.p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowEligibility(true)} className="bg-orange-500 text-white rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-bold shadow-lg shadow-orange-500/30 inline-flex items-center justify-center gap-2">
              Check Eligibility <ArrowIcon />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowContactForm(true)} className="bg-gray-900 text-white rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-bold shadow-lg inline-flex items-center justify-center gap-2">
              Contact Us <ArrowIcon />
            </motion.button>
          </div>
        </div>
      </SectionWrap>

      {/* FOOTER */}
      <footer className="bg-gray-900 py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                </div>
                <span className="text-white font-bold text-lg font-heading">VisaHOBe</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">Your trusted global mobility partner. End-to-end visa and recruitment support across 10 countries.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs sm:text-sm mb-3 sm:mb-4 font-heading">Services</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {['Work Permits', 'Tourist Visas', 'Business Visas', 'Recruitment', 'Document Review'].map(s => (
                  <li key={s} className="text-gray-400 text-[10px] sm:text-xs hover:text-orange-400 cursor-pointer transition-colors">{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs sm:text-sm mb-3 sm:mb-4 font-heading">Countries</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {countries.slice(0, 6).map(c => (
                  <li key={c.slug}>
                    <Link to={`/countries/${c.slug}`} className="text-gray-400 text-[10px] sm:text-xs hover:text-orange-400 transition-colors">{c.country}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs sm:text-sm mb-3 sm:mb-4 font-heading">Contact</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-[10px] sm:text-xs">
                <li>info@visahobe.com</li>
                <li>68 Circular Road, #02-01</li>
                <li>Singapore 049422</li>
                <li>UEN: 202524173E</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-[10px] sm:text-xs">© 2025 VisaHOBe Pte. Ltd. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="text-gray-500 text-[10px] sm:text-xs hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-gray-500 text-[10px] sm:text-xs hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
}
