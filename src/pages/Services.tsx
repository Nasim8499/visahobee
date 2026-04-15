import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useTheme } from '@/hooks/use-theme';

const services = [
  { img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', title: 'Work Permit Processing', desc: 'End-to-end work permit application processing for multiple countries with embassy-ready documentation.', features: ['Multi-country support', 'Embassy-ready docs', 'Real-time tracking', 'Expert case officers'] },
  { img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', title: 'Tourist Visa Assistance', desc: 'Fast-track tourist visa processing with complete travel documentation and itinerary planning.', features: ['Fast processing', 'Itinerary planning', 'Travel insurance', 'Document checklist'] },
  { img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', title: 'Business Visa Guidance', desc: 'Business visa support including meeting scheduling, invitation letters, and compliance documentation.', features: ['Invitation letters', 'Meeting scheduling', 'Compliance docs', 'Multi-entry support'] },
  { img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', title: 'Employer Recruitment', desc: 'Full recruitment coordination — candidate sourcing, screening, and placement with overseas employers.', features: ['Candidate sourcing', 'Screening & vetting', 'Placement support', 'Onboarding help'] },
  { img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', title: 'Document Preparation', desc: 'Thorough review and preparation of all visa-related documents to minimize errors and rejections.', features: ['Error-free docs', 'Translation services', 'Notarization', 'Apostille support'] },
  { img: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=600&q=80', title: 'Candidate Sourcing', desc: 'Cross-border candidate sourcing and matching with verified employer demands worldwide.', features: ['Global network', 'Skills matching', 'Pre-screening', 'Background checks'] },
];

export default function Services() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
            <Link to="/about" className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors hidden sm:inline`}>About</Link>
            <DarkModeToggle className={isDark ? 'text-gray-300 hover:text-[#177BBB]' : 'text-gray-600 hover:text-[#003B73]'} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${isDark ? 'bg-[#177BBB]/10 text-[#177BBB]' : 'bg-[#003B73]/10 text-[#003B73]'}`}>What We Offer</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-4 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Services
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className={`text-sm sm:text-base max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Comprehensive visa and recruitment solutions tailored to your needs — from document preparation to final deployment.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl overflow-hidden border group hover:-translate-y-1 transition-all duration-300 ${isDark ? 'bg-gray-900 border-gray-800 hover:border-[#177BBB]/30' : 'bg-white border-gray-100 hover:border-[#003B73]/20'} shadow-sm hover:shadow-xl`}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className={`text-base sm:text-lg font-bold mb-2 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.title}</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{s.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {s.features.map(f => (
                      <div key={f} className="flex items-center gap-1.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-[#177BBB]/10' : 'bg-[#003B73]/10'}`}>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#177BBB' : '#003B73'} strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[#003B73]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 font-heading">Need a Custom Solution?</h2>
          <p className="text-white/60 text-sm mb-8 max-w-lg mx-auto">Contact us for tailored visa and recruitment packages designed for your specific needs.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-white text-[#003B73] rounded-full px-8 py-3 text-sm font-bold hover:bg-gray-100 transition-colors">
            Contact Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
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
