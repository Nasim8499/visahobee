import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCountryBySlug, countries } from '@/data/countries';
import { useState, useCallback } from 'react';
import FlightIntro from '@/components/FlightIntro';
import PageTransition from '@/components/PageTransition';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useTheme } from '@/hooks/use-theme';

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#003B73" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function CountryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const country = getCountryBySlug(slug || '');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showContact, setShowContact] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showFlight, setShowFlight] = useState(true);
  const handleFlightComplete = useCallback(() => setShowFlight(false), []);

  if (!country) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-950' : 'bg-[#F5F5F0]'}`}>
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Country Not Found</h1>
          <Link to="/" className={`font-semibold hover:underline ${isDark ? 'text-[#177BBB]' : 'text-[#003B73]'}`}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  const otherCountries = countries.filter(c => c.slug !== country.slug).slice(0, 3);

  return (
    <PageTransition>
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-[#F5F5F0]'}`}>
      {showFlight && country && (
        <FlightIntro countryName={country.country} flag={country.flag} onComplete={handleFlightComplete} />
      )}

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-900/95' : 'bg-[#F5F5F0]/95'} backdrop-blur-xl shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center gap-1">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#003B73] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </div>
            <span className={`text-base sm:text-lg font-bold font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>VisaHOBe</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/" className={`text-xs sm:text-sm transition-colors hidden sm:inline ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Home</Link>
            <Link to="/services" className={`text-xs sm:text-sm transition-colors hidden sm:inline ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Services</Link>
            <DarkModeToggle className={isDark ? 'text-gray-300 hover:text-[#177BBB]' : 'text-gray-600 hover:text-[#003B73]'} />
            <button onClick={() => setShowContact(true)} className={`text-xs sm:text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-[#177BBB]' : 'text-gray-600 hover:text-[#003B73]'}`}>Contact</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 sm:pt-20 pb-0 relative">
        <div className="relative h-52 sm:h-72 md:h-96 overflow-hidden">
          <img src={country.img} alt={country.country} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
              <Link to="/" className="inline-flex items-center gap-1 text-white/70 text-xs sm:text-sm mb-2 sm:mb-3 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                All Countries
              </Link>
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <span className="text-3xl sm:text-4xl">{country.flag}</span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white font-heading">{country.country}</h1>
              </div>
              <p className="text-white/80 text-xs sm:text-base max-w-2xl">{country.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} border-b`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'Capital', value: country.capital },
              { label: 'Currency', value: country.currency },
              { label: 'Language', value: country.language },
              { label: 'Region', value: country.region },
            ].map(item => (
              <div key={item.label}>
                <p className={`text-[10px] sm:text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</p>
                <p className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">
            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Overview</h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{country.overview}</p>
            </motion.div>

            {/* Visa Types */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Visa Types & Fees</h2>
              <div className="space-y-3 sm:space-y-4">
                {country.visaTypes.map(vt => (
                  <div key={vt.name} className={`rounded-2xl p-4 sm:p-5 border shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <h3 className={`font-bold text-sm sm:text-base mb-2 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{vt.name}</h3>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Processing</p>
                        <p className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{vt.processingTime}</p>
                      </div>
                      <div>
                        <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Fee</p>
                        <p className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-[#177BBB]' : 'text-[#003B73]'}`}>{vt.fee}</p>
                      </div>
                      <div>
                        <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Validity</p>
                        <p className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{vt.validity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Required Documents</h2>
              <div className={`rounded-2xl p-4 sm:p-5 border shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <ul className="space-y-2.5">
                  {country.requirements.map(req => (
                    <li key={req} className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isDark ? 'bg-[#177BBB]/10' : 'bg-[#003B73]/10'}`}>
                        <CheckIcon />
                      </div>
                      <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Industries */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Key Industries</h2>
              <div className="flex flex-wrap gap-2">
                {country.industries.map(ind => (
                  <span key={ind} className={`text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border shadow-sm ${isDark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white text-gray-700 border-gray-200'}`}>{ind}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5 sm:space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gray-900 rounded-2xl p-5 sm:p-6 text-center sticky top-20">
              <h3 className="text-white font-bold text-base sm:text-lg mb-2 font-heading">Apply for {country.country}</h3>
              <p className="text-gray-500 text-[10px] sm:text-xs mb-4 sm:mb-5">Free initial consultation with expert guidance.</p>
              <button onClick={() => setShowContact(true)} className="w-full bg-[#003B73] text-white rounded-full py-2.5 sm:py-3 text-sm font-bold hover:bg-[#177BBB] transition-colors mb-3 flex items-center justify-center gap-2">
                Start Application <ArrowIcon />
              </button>
              <p className="text-gray-600 text-[9px] sm:text-[10px]">Average processing: {country.visaTypes[0]?.processingTime}</p>
            </motion.div>

            <div>
              <h3 className={`font-bold text-sm sm:text-base mb-3 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Other Countries</h3>
              <div className="space-y-2.5 sm:space-y-3">
                {otherCountries.map(c => (
                  <Link key={c.slug} to={`/countries/${c.slug}`} className={`flex items-center gap-3 rounded-xl p-2.5 sm:p-3 border shadow-sm hover:shadow-md transition-shadow group ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <img src={c.img} alt={c.country} className="w-12 sm:w-14 h-8 sm:h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs sm:text-sm font-semibold transition-colors ${isDark ? 'text-white group-hover:text-[#177BBB]' : 'text-gray-900 group-hover:text-[#003B73]'}`}>{c.flag} {c.country}</p>
                      <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{c.visa}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setShowContact(false); setFormSubmitted(false); }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Thank You!</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Your inquiry for {country.country} has been submitted.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>Apply for {country.country}</h3>
                    <button onClick={() => setShowContact(false)} className="text-gray-400"><CloseIcon /></button>
                  </div>
                  <form onSubmit={e => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4">
                    <input placeholder="Full Name" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-200 text-gray-900'}`} required />
                    <input placeholder="Email Address" type="email" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-200 text-gray-900'}`} required />
                    <input placeholder="Phone Number" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-200 text-gray-900'}`} />
                    <select className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-500'}`} defaultValue={country.visaTypes[0]?.name}>
                      {country.visaTypes.map(vt => <option key={vt.name}>{vt.name}</option>)}
                    </select>
                    <textarea placeholder="Additional details..." rows={3} className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003B73] transition-colors resize-none ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-200 text-gray-900'}`} />
                    <button type="submit" className="w-full bg-[#003B73] text-white rounded-xl py-3 text-sm font-bold hover:bg-[#177BBB] transition-colors">Submit Application</button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#003B73] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </div>
            <span className="text-white font-bold font-heading">VisaHOBe</span>
          </div>
          <p className="text-gray-500 text-[10px] sm:text-xs">© 2025 VisaHOBe Pte. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
}
