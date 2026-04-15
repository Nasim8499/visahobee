import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { countries, IMG } from '@/data/countries';
import PageTransition from '@/components/PageTransition';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useTheme } from '@/hooks/use-theme';

/* ── Shared Icons ── */
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#003B73" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Animated Counter ── */
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
      <p className="text-2xl sm:text-3xl font-bold text-white font-heading">{count.toLocaleString()}{suffix}</p>
      <p className="text-gray-400 text-[10px] sm:text-xs mt-1">{label}</p>
    </div>
  );
};

/* ── Country Card ── */
const CountryCard = ({ img, country, visa, badge, desc, slug, delay = 0 }: { img: string; country: string; visa: string; badge?: string; desc: string; slug: string; delay?: number; featured?: boolean; flag?: string; region?: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }} whileHover={{ y: -4 }}>
    <Link to={`/countries/${slug}`} className="block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
      <div className="relative h-32 sm:h-44 overflow-hidden">
        <img src={img} alt={country} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {badge && <span className="absolute top-2 left-2 bg-[#003B73] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#003B73]" />
          <span className="text-[#003B73] dark:text-[#177BBB] text-[9px] sm:text-xs font-semibold">{visa}</span>
        </div>
        <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1 font-heading">{country}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-xs leading-relaxed line-clamp-2 mb-2">{desc}</p>
        <div className="flex items-center gap-1 text-[#003B73] dark:text-[#177BBB] text-[9px] sm:text-xs font-semibold">
          <span>View Details</span>
          <ArrowIcon />
        </div>
      </div>
    </Link>
  </motion.div>
);

/* ── Service Card ── */
const ServiceCard = ({ img, title, desc, delay = 0 }: { img: string; title: string; desc: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }} whileHover={{ y: -4 }}>
    <Link to="/services" className="block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
      <div className="relative h-28 sm:h-36 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-1 font-heading">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-xs leading-relaxed line-clamp-2">{desc}</p>
      </div>
    </Link>
  </motion.div>
);

/* ── Testimonial Card ── */
const TestimonialCard = ({ name, role, text, delay = 0 }: { name: string; role: string; text: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }} className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex gap-0.5 mb-3">
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#003B73" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
      ))}
    </div>
    <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs leading-relaxed mb-3 line-clamp-4">"{text}"</p>
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-[#003B73]/15 flex items-center justify-center text-[#003B73] dark:text-[#177BBB] font-bold text-[10px]">{name.split(' ').map(n => n[0]).join('')}</div>
      <div>
        <p className="text-xs font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  </motion.div>
);

/* ── Data ── */
const serviceData = [
  { img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', title: 'Work Permit Processing', desc: 'End-to-end work permit applications for multiple countries.' },
  { img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', title: 'Tourist Visa Assistance', desc: 'Fast-track tourist visa with complete documentation.' },
  { img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', title: 'Business Visa Guidance', desc: 'Business visa support with compliance documentation.' },
  { img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', title: 'Employer Recruitment', desc: 'Full recruitment coordination with overseas employers.' },
  { img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', title: 'Document Preparation', desc: 'Error-free document review and preparation.' },
  { img: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=600&q=80', title: 'Candidate Sourcing', desc: 'Cross-border candidate sourcing and matching.' },
];

const testimonials = [
  { name: 'Rahman Hossain', role: 'Engineer — Singapore', text: 'VisaHOBe made my journey to Singapore seamless. Every step was handled professionally.' },
  { name: 'Fatima Akter', role: 'Healthcare — Australia', text: 'The VisaHOBe team guided me through every requirement. Embassy-ready documentation saved me months.' },
  { name: 'Kamal Uddin', role: 'IT Professional — Serbia', text: 'Clear guidance and transparent communication throughout the entire work permit process.' },
  { name: 'Aminul Islam', role: 'Electrician — Kuwait', text: 'Within 4 weeks my work visa was processed and I was deployed. Highly recommend.' },
];

const faqData = [
  { q: 'What countries does VisaHOBe operate in?', a: 'VisaHOBe provides visa and recruitment services across 10 countries: Singapore, Australia, Serbia, Moldova, Kuwait, Cambodia, Russia, Saudi Arabia, Belarus, and Malaysia.' },
  { q: 'How long does the visa process take?', a: 'Processing times vary by country and visa type. Singapore Work Permits take 1-3 weeks, while Australian Skilled Visas can take 6-18 months.' },
  { q: 'What documents do I need?', a: 'Basic requirements include valid passport (6 months validity), educational certificates, medical examination report, police clearance, and passport photographs.' },
  { q: 'Is VisaHOBe a licensed company?', a: 'Yes. VisaHOBe Pte. Ltd. is Singapore-registered (UEN: 202524173E), incorporated June 3, 2025, under ACRA Code 70201.' },
];

/* ── Hero Slides ── */
const heroSlides = [
  { title1: 'Global', title2: 'Mobility', desc: 'End-to-end visa and recruitment support across 10 countries.' },
  { title1: 'Global', title2: 'Recruitment', desc: 'Connecting skilled professionals with verified employer demand worldwide.' },
  { title1: 'Start', title2: 'Today', desc: 'Free eligibility assessment. 500+ placements. 10 countries.' },
];

export default function Index() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mobileMenu, setMobileMenu] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [showContactForm, setShowContactForm] = useState(false);
  const [showEligibility, setShowEligibility] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [eligResult, setEligResult] = useState<{ score: number; message: string } | null>(null);
  const [heroIdx, setHeroIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [eligForm, setEligForm] = useState({ name: '', nationality: '', destination: '', visaType: '', experience: '' });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const nextHero = useCallback(() => setHeroIdx(p => (p + 1) % heroSlides.length), []);
  useEffect(() => { const t = setInterval(nextHero, 5000); return () => clearInterval(t); }, [nextHero]);

  useEffect(() => {
    const h = () => setPastHero(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const handleEligCheck = () => {
    if (eligForm.name && eligForm.destination && eligForm.visaType) {
      setEligResult({ score: Math.floor(Math.random() * 30) + 65, message: 'Based on your profile, you have a good chance for this visa pathway.' });
    }
  };

  const tabs = ['All', 'Asia', 'Europe', 'Middle East'];
  const filteredCountries = activeTab === 'All' ? countries : countries.filter(c => c.region === activeTab);
  const navLinks = ['Home', 'Countries', 'Services', 'About', 'Contact'];
  const handleNav = (item: string) => {
    if (item === 'Services') { navigate('/services'); setMobileMenu(false); return; }
    if (item === 'About') { navigate('/about'); setMobileMenu(false); return; }
    scrollTo(item === 'Home' ? 'home' : item.toLowerCase());
  };
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase().replace(/\s+/g, ''))?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };
  const slide = heroSlides[heroIdx];

  return (
    <div className={`min-h-screen overflow-x-hidden ${isDark ? 'bg-gray-950' : 'bg-[#F5F5F0]'}`}>
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-[#003B73] z-[60] origin-left" style={{ scaleX }} />

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${pastHero ? (isDark ? 'bg-gray-900/95 backdrop-blur-xl shadow-sm' : 'bg-white/95 backdrop-blur-xl shadow-sm') : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <button onClick={() => setMobileMenu(true)} className={`lg:hidden transition-colors ${pastHero ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white/80'}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <Link to="/" className="flex items-center gap-1">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#003B73] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </div>
            <span className={`text-base sm:text-lg font-bold font-heading transition-colors ${pastHero ? (isDark ? 'text-white' : 'text-gray-900') : 'text-white'}`}>VisaHOBe</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(item => (
              <button key={item} onClick={() => handleNav(item)} className={`text-sm font-medium transition-colors ${pastHero ? (isDark ? 'text-gray-400 hover:text-[#177BBB]' : 'text-gray-600 hover:text-[#003B73]') : 'text-white/80 hover:text-white'}`}>
                {item}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <DarkModeToggle className={`${pastHero ? (isDark ? 'text-gray-300 hover:text-[#177BBB]' : 'text-gray-600 hover:text-[#003B73]') : 'text-white/80 hover:text-white'}`} />
            <button onClick={() => setShowContactForm(true)} className={`hidden sm:inline text-xs sm:text-sm font-medium transition-colors px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border ${pastHero ? (isDark ? 'text-gray-300 border-gray-600 hover:border-[#177BBB]' : 'text-gray-600 border-gray-300 hover:border-[#003B73]') : 'text-white border-white/30 hover:bg-white/10'}`}>Contact Us</button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenu(false)}>
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className={`absolute left-0 top-0 bottom-0 w-72 ${isDark ? 'bg-gray-900' : 'bg-white'} p-6`} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8">
                <span className={`font-bold font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Menu</span>
                <button onClick={() => setMobileMenu(false)} className="text-gray-400"><CloseIcon /></button>
              </div>
              {navLinks.map(item => (
                <button key={item} onClick={() => handleNav(item)} className={`block w-full text-left py-3 text-sm font-medium transition-colors border-b ${isDark ? 'text-gray-300 hover:text-[#177BBB] border-gray-800' : 'text-gray-700 hover:text-[#003B73] border-gray-100'}`}>
                  {item}
                </button>
              ))}
              <div className={`mt-8 pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                <button onClick={() => { setMobileMenu(false); setShowContactForm(true); }} className="w-full bg-[#003B73] text-white rounded-full py-2.5 text-sm font-bold">Contact Us</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT MODAL */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setShowContactForm(false); setFormSubmitted(false); }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Thank You!</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Your inquiry has been submitted. We'll contact you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact VisaHOBe</h3>
                    <button onClick={() => setShowContactForm(false)} className="text-gray-400"><CloseIcon /></button>
                  </div>
                  <form onSubmit={e => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4">
                    <input placeholder="Full Name" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-200 text-gray-900'}`} required />
                    <input placeholder="Email Address" type="email" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-200 text-gray-900'}`} required />
                    <input placeholder="Phone Number" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-200 text-gray-900'}`} />
                    <select className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-500'}`}>
                      <option value="">Select Service</option>
                      <option>Work Permit Processing</option>
                      <option>Tourist Visa Assistance</option>
                      <option>Business Visa Guidance</option>
                      <option>Employer Recruitment Support</option>
                      <option>Other</option>
                    </select>
                    <textarea placeholder="Your Message" rows={3} className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors resize-none ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-200 text-gray-900'}`} />
                    <button type="submit" className="w-full bg-[#003B73] text-white rounded-xl py-3 text-sm font-bold hover:bg-[#177BBB] transition-colors">Submit Inquiry</button>
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
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Eligibility Assessment</h3>
                <button onClick={() => { setShowEligibility(false); setEligResult(null); }} className="text-gray-400"><CloseIcon /></button>
              </div>
              <div className="space-y-4">
                <input value={eligForm.name} onChange={e => setEligForm({ ...eligForm, name: e.target.value })} placeholder="Full Name" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-200 text-gray-900'}`} />
                <select value={eligForm.destination} onChange={e => setEligForm({ ...eligForm, destination: e.target.value })} className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-500'}`}>
                  <option value="">Destination Country</option>
                  {countries.map(c => <option key={c.slug}>{c.country}</option>)}
                </select>
                <select value={eligForm.visaType} onChange={e => setEligForm({ ...eligForm, visaType: e.target.value })} className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-500'}`}>
                  <option value="">Visa Type</option>
                  <option>Work Permit</option><option>Visitor Visa</option><option>Business Visa</option><option>Skilled Migration</option>
                </select>
                <button onClick={handleEligCheck} className="w-full bg-[#003B73] text-white rounded-xl py-3 text-sm font-bold hover:bg-[#177BBB] transition-colors">Check Eligibility</button>
                {eligResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-xl p-4 border ${isDark ? 'bg-[#177BBB]/10 border-[#177BBB]/20' : 'bg-[#003B73]/10 border-[#003B73]/20'}`}>
                    <p className={`font-bold text-lg mb-1 font-heading ${isDark ? 'text-[#177BBB]' : 'text-[#003B73]'}`}>{eligResult.score}% Match</p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{eligResult.message}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f172a] to-[#1e1b4b]" />

        {/* World map */}
        <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 0.4, scale: 1 }} transition={{ duration: 2 }}>
          <svg className="w-full h-full max-w-none" viewBox="0 0 1000 500" fill="none">
            <path d="M150 80 L220 60 L280 80 L300 120 L280 180 L240 200 L200 220 L160 200 L120 160 L100 120 Z" fill="rgba(0,59,115,0.12)" stroke="rgba(0,59,115,0.3)" strokeWidth="1"/>
            <path d="M440 70 L500 60 L530 80 L520 120 L490 140 L460 130 L440 100 Z" fill="rgba(0,59,115,0.15)" stroke="rgba(0,59,115,0.4)" strokeWidth="1"/>
            <path d="M560 60 L700 50 L780 80 L800 140 L760 180 L700 200 L640 190 L580 160 L550 120 L540 80 Z" fill="rgba(0,59,115,0.12)" stroke="rgba(0,59,115,0.3)" strokeWidth="1"/>
            {[100,200,300,400].map(y => <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(0,59,115,0.06)" strokeWidth="0.5" strokeDasharray="8 8"/>)}
            {[200,400,600,800].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" stroke="rgba(0,59,115,0.06)" strokeWidth="0.5" strokeDasharray="8 8"/>)}
          </svg>
        </motion.div>

        {/* Animated dots */}
        {[{ x: 65, y: 35 }, { x: 82, y: 68 }, { x: 50, y: 22 }, { x: 56, y: 30 }, { x: 72, y: 45 }, { x: 70, y: 40 }].map((dot, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${dot.x}%`, top: `${dot.y}%` }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}>
            <div className="w-2 h-2 bg-[#003B73] rounded-full" />
            <motion.div className="absolute inset-0 w-2 h-2 bg-[#003B73] rounded-full" animate={{ scale: [1, 3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }} />
          </motion.div>
        ))}

        {/* Flight arcs */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path d="M 10 75 Q 35 30 50 25 Q 65 20 90 45" fill="none" stroke="rgba(0,59,115,0.5)" strokeWidth="0.3" strokeDasharray="2 2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }} />
        </svg>

        {/* Center content */}
        <div className="relative z-20 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#003B73] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
              </div>
              <span className="text-xl sm:text-3xl font-bold text-white font-heading">VisaHOBe</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.h1 key={heroIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-[2.2rem] sm:text-[4rem] md:text-[5rem] font-bold tracking-tighter text-white leading-none font-heading mb-2">
                {slide.title1} <span className="text-[#177BBB]">{slide.title2}</span>
              </motion.h1>
            </AnimatePresence>
            <p className="text-white/40 text-xs sm:text-sm max-w-md mx-auto mt-3 sm:mt-4 mb-6 sm:mb-8">{slide.desc}</p>
          </motion.div>
          <motion.div className="mt-8 sm:mt-12" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" className="mx-auto"><polyline points="6 9 12 15 18 9" /></svg>
          </motion.div>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-20 z-20 bg-gradient-to-t ${isDark ? 'from-gray-950' : 'from-[#F5F5F0]'} to-transparent`} />
      </section>

      {/* ── COUNTRIES ── */}
      <section id="countries" className="pt-12 sm:pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className={`text-center text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Explore Destinations</p>
          <h2 className={`text-center text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none mb-3 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Country-Wise Visa Routes</h2>
          <p className={`text-center text-xs sm:text-sm mb-6 sm:mb-8 max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Comprehensive work visa support across 10 countries with specialized pathways.</p>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className={`rounded-full p-1 flex gap-1 ${isDark ? 'bg-gray-800' : 'bg-[#EDEAE5]'}`}>
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 sm:px-5 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all ${activeTab === tab ? (isDark ? 'bg-gray-700 text-white shadow-md' : 'bg-white text-gray-900 shadow-md') : (isDark ? 'text-gray-500' : 'text-gray-500')}`}>{tab}</button>
              ))}
            </div>
          </div>

          {/* Country Grid - 2 cols mobile, 3 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-5">
            {filteredCountries.map((c, i) => <CountryCard key={c.slug} {...c} delay={i * 0.06} />)}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section id="services" className={`pt-12 sm:pt-16 pb-12 sm:pb-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className={`text-center text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>What We Offer</p>
          <h2 className={`text-center text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none mb-3 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Services</h2>
          <p className={`text-center text-xs sm:text-sm mb-8 max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Comprehensive visa and recruitment solutions tailored to your needs.</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {serviceData.map((s, i) => <ServiceCard key={s.title} {...s} delay={i * 0.08} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/services" className={`inline-flex items-center gap-2 text-sm font-semibold ${isDark ? 'text-[#177BBB] hover:text-[#177BBB]/80' : 'text-[#003B73] hover:text-[#003B73]/80'} transition-colors`}>
              View All Services <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section id="about" className="pt-12 sm:pt-16 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${isDark ? 'bg-[#177BBB]/10 text-[#177BBB]' : 'bg-[#003B73]/10 text-[#003B73]'}`}>Who We Are</span>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>About VisaHOBe</h2>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                VisaHOBe Pte. Ltd. is a Singapore-registered visa and recruitment support company. We serve as a complete "End-to-End" visa travel partner, facilitating transparent and successful international labor migration across 10 countries.
              </p>
              <Link to="/about" className={`inline-flex items-center gap-2 text-sm font-semibold ${isDark ? 'text-[#177BBB]' : 'text-[#003B73]'} transition-colors`}>
                Learn More <ArrowIcon />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={IMG.traveler} alt="VisaHOBe" className="w-full h-48 sm:h-64 md:h-80 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={`pt-12 sm:pt-16 pb-12 sm:pb-16 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className={`text-center text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Success Stories</p>
          <h2 className={`text-center text-2xl sm:text-4xl font-bold tracking-tight leading-none mb-8 sm:mb-10 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>What Our Clients Say</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {testimonials.map((t, i) => <TestimonialCard key={t.name} {...t} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#003B73] py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <AnimatedCounter end={500} suffix="+" label="Successful Placements" />
            <AnimatedCounter end={10} label="Countries Covered" />
            <AnimatedCounter end={6} suffix="+" label="Service Categories" />
            <AnimatedCounter end={100} suffix="%" label="Client Satisfaction" />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={`pt-12 sm:pt-16 pb-12 sm:pb-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`} id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className={`text-center text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Got Questions?</p>
          <h2 className={`text-center text-2xl sm:text-4xl font-bold tracking-tight leading-none mb-8 sm:mb-10 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-[#F5F5F0]'}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className={`text-xs sm:text-sm font-semibold pr-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.q}</span>
                  <motion.svg animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="flex-shrink-0"><polyline points="6 9 12 15 18 9" /></motion.svg>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <p className={`px-4 pb-4 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16" id="contact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className={`text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Ready to Start?</h2>
          <p className={`text-xs sm:text-sm mb-6 sm:mb-8 max-w-lg mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Take the first step towards your international career.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowEligibility(true)} className="bg-[#003B73] text-white rounded-full px-6 sm:px-8 py-3 text-sm font-bold shadow-lg inline-flex items-center justify-center gap-2">
              Check Eligibility <ArrowIcon />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowContactForm(true)} className={`${isDark ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'} rounded-full px-6 sm:px-8 py-3 text-sm font-bold shadow-lg inline-flex items-center justify-center gap-2`}>
              Contact Us <ArrowIcon />
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#003B73] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                </div>
                <span className="text-white font-bold font-heading">VisaHOBe</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">Your trusted global mobility partner across 10 countries.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs mb-3 font-heading">Pages</h4>
              <ul className="space-y-1.5">
                <li><Link to="/" className="text-gray-400 text-xs hover:text-[#177BBB] transition-colors">Home</Link></li>
                <li><Link to="/services" className="text-gray-400 text-xs hover:text-[#177BBB] transition-colors">Services</Link></li>
                <li><Link to="/about" className="text-gray-400 text-xs hover:text-[#177BBB] transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs mb-3 font-heading">Countries</h4>
              <ul className="space-y-1.5">
                {countries.slice(0, 5).map(c => (
                  <li key={c.slug}><Link to={`/countries/${c.slug}`} className="text-gray-400 text-xs hover:text-[#177BBB] transition-colors">{c.country}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs mb-3 font-heading">Contact</h4>
              <ul className="space-y-1.5 text-gray-400 text-xs">
                <li>info@visahobe.com</li>
                <li>68 Circular Road, #02-01</li>
                <li>Singapore 049422</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
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
