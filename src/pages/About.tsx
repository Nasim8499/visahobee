import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IMG } from '@/data/countries';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useTheme } from '@/hooks/use-theme';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const processSteps = [
  { num: '01', title: 'Free Consultation', desc: 'Share your goals and we\'ll recommend the best visa or recruitment pathway.', icon: '💬' },
  { num: '02', title: 'Document Preparation', desc: 'Our experts guide you through every required document and application form.', icon: '📄' },
  { num: '03', title: 'Application Submission', desc: 'We submit and track your application, keeping you informed at every step.', icon: '🚀' },
  { num: '04', title: 'Approval & Deployment', desc: 'Receive your visa approval and get deployed with full pre-departure support.', icon: '✈️' },
];

const team = [
  { name: 'Professional Case Handling', desc: 'Every application is managed by experienced case officers with deep knowledge of immigration processes.' },
  { name: 'Country-Specific Guidance', desc: 'Dedicated specialists for each destination country ensure accurate and up-to-date advice.' },
  { name: 'Transparent Communication', desc: 'Real-time updates and clear timelines throughout your entire application journey.' },
  { name: 'Multi-Country Coverage', desc: 'Access to opportunities across 10 countries through our extensive partner network.' },
];

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  useScrollToTop();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-[#F5F5F0]'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-[#003B73] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </div>
            <span className={`text-lg font-bold font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>VisaHOBe</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors hidden sm:inline`}>Home</Link>
            <Link to="/services" className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors hidden sm:inline`}>Services</Link>
            <DarkModeToggle className={isDark ? 'text-gray-300 hover:text-[#177BBB]' : 'text-gray-600 hover:text-[#003B73]'} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${isDark ? 'bg-[#177BBB]/10 text-[#177BBB]' : 'bg-[#003B73]/10 text-[#003B73]'}`}>Who We Are</span>
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>
                About VisaHOBe
              </h1>
              <p className={`text-sm sm:text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>VisaHOBe Pte. Ltd.</span> is a Singapore-registered professional visa and recruitment support company, incorporated on <span className={`font-semibold ${isDark ? 'text-[#177BBB]' : 'text-[#003B73]'}`}>June 3, 2025</span>. We serve as a complete "End-to-End" visa travel partner.
              </p>
              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Headquartered at 68 Circular Road, #02-01, Singapore 049422, with our operational hub in Dhaka, Bangladesh.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className={`rounded-xl px-4 py-2.5 ${isDark ? 'bg-[#177BBB]/10' : 'bg-[#003B73]/10'}`}>
                  <p className={`text-xs font-bold ${isDark ? 'text-[#177BBB]' : 'text-[#003B73]'}`}>ACRA Code</p>
                  <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>70201 — Management Consultancy</p>
                </div>
                <div className={`rounded-xl px-4 py-2.5 ${isDark ? 'bg-[#177BBB]/10' : 'bg-[#003B73]/10'}`}>
                  <p className={`text-xs font-bold ${isDark ? 'text-[#177BBB]' : 'text-[#003B73]'}`}>UEN</p>
                  <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>202524173E</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={IMG.traveler} alt="VisaHOBe team" className="w-full h-56 sm:h-72 md:h-96 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`py-16 sm:py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl p-6 sm:p-8 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-[#F5F5F0] border-gray-200'}`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003B73] to-[#177BBB] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></svg>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Mission</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                To simplify international recruitment and visa processes, empowering individuals and businesses to achieve their global aspirations with confidence and transparency.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`rounded-2xl p-6 sm:p-8 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-[#F5F5F0] border-gray-200'}`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003B73] to-[#177BBB] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Vision</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                To be the world's most trusted partner for international mobility, recruitment, and cross-border employment solutions — connecting talent with opportunity worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className={`text-2xl sm:text-4xl font-bold tracking-tight mb-3 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Why Trust VisaHOBe</h2>
            <p className={`text-sm max-w-lg mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Our commitment to excellence sets us apart in global recruitment and visa services.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {team.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`rounded-2xl p-5 sm:p-6 border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} shadow-sm`}>
                <h3 className={`text-sm sm:text-base font-bold mb-2 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.name}</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 sm:py-20 bg-[#003B73]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-heading">Our Process</h2>
            <p className="text-white/60 text-sm max-w-lg mx-auto">A simple, transparent process designed to get you where you need to be.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {processSteps.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 text-white text-sm font-bold">{s.num}</div>
                <p className="text-2xl mb-2">{s.icon}</p>
                <h3 className="text-white font-bold text-sm mb-1.5 font-heading">{s.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#003B73] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </div>
            <span className="text-white font-bold font-heading">VisaHOBe</span>
          </div>
          <p className="text-gray-500 text-xs">© 2025 VisaHOBe Pte. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
