import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
      <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Country Not Found</h1>
          <Link to="/" className="text-[#003B73] dark:text-[#177BBB] font-semibold hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const otherCountries = countries.filter(c => c.slug !== country.slug).slice(0, 3);

  return (
    <PageTransition>
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-950">
      {/* Flight Intro Animation */}
      {showFlight && country && (
        <FlightIntro countryName={country.country} flag={country.flag} onComplete={handleFlightComplete} />
      )}
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F0]/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-[#003B73] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">VisaHOBe</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:inline">Home</Link>
            <DarkModeToggle className="text-gray-600 dark:text-gray-300 hover:text-[#003B73] dark:text-[#177BBB]" />
            <button onClick={() => setShowContact(true)} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#003B73] dark:text-[#177BBB] transition-colors">Contact Us</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-0 relative">
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          <img src={country.img} alt={country.country} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <div className="max-w-6xl mx-auto">
              <Link to="/" className="inline-flex items-center gap-1 text-white/70 text-sm mb-3 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                All Countries
              </Link>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{country.flag}</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading">{country.country}</h1>
              </div>
              <p className="text-white/80 text-sm sm:text-base max-w-2xl">{country.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Capital', value: country.capital },
              { label: 'Currency', value: country.currency },
              { label: 'Language', value: country.language },
              { label: 'Region', value: country.region },
            ].map(item => (
              <div key={item.label}>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-medium">{item.label}</p>
                <p className="text-gray-900 dark:text-white text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-heading">Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{country.overview}</p>
            </motion.div>

            {/* Visa Types & Fees */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-heading">Visa Types & Fees</h2>
              <div className="space-y-4">
                {country.visaTypes.map((vt) => (
                  <div key={vt.name} className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-3">{vt.name}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400 dark:text-gray-500 text-xs">Processing Time</p>
                        <p className="text-gray-800 dark:text-gray-200 text-sm font-semibold">{vt.processingTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 dark:text-gray-500 text-xs">Fee</p>
                        <p className="text-[#003B73] dark:text-[#177BBB] text-sm font-semibold">{vt.fee}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 dark:text-gray-500 text-xs">Validity</p>
                        <p className="text-gray-800 dark:text-gray-200 text-sm font-semibold">{vt.validity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-heading">Required Documents</h2>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
                <ul className="space-y-3">
                  {country.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#003B73]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckIcon />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Industries */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-heading">Key Industries</h2>
              <div className="flex flex-wrap gap-2">
                {country.industries.map((ind) => (
                  <span key={ind} className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">{ind}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Apply CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gray-900 rounded-2xl p-6 text-center sticky top-24">
              <h3 className="text-white font-bold text-lg mb-2">Apply for {country.country}</h3>
              <p className="text-gray-400 dark:text-gray-500 text-xs mb-5">Get expert guidance for your visa application. Free initial consultation.</p>
              <button onClick={() => setShowContact(true)} className="w-full bg-[#003B73] text-white rounded-full py-3 text-sm font-bold hover:bg-[#177BBB] transition-colors mb-3 flex items-center justify-center gap-2">
                Start Application <ArrowIcon />
              </button>
              <p className="text-gray-500 text-[10px]">Average processing: {country.visaTypes[0]?.processingTime}</p>
            </motion.div>

            {/* Other Countries */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-3">Other Countries</h3>
              <div className="space-y-3">
                {otherCountries.map(c => (
                  <Link key={c.slug} to={`/countries/${c.slug}`} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <img src={c.img} alt={c.country} className="w-14 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-[#003B73] dark:text-[#177BBB] transition-colors">{c.flag} {c.country}</p>
                      <p className="text-xs text-gray-500 truncate">{c.visa}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setShowContact(false); setFormSubmitted(false); }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Your inquiry for {country.country} has been submitted. We'll contact you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Apply for {country.country}</h3>
                  <button onClick={() => setShowContact(false)} className="text-gray-400 hover:text-gray-900"><CloseIcon /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4">
                  <input placeholder="Full Name" className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors" required />
                  <input placeholder="Email Address" type="email" className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors" required />
                  <input placeholder="Phone Number" className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                  <select className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-gray-500" defaultValue={country.visaTypes[0]?.name}>
                    {country.visaTypes.map(vt => <option key={vt.name}>{vt.name}</option>)}
                  </select>
                  <textarea placeholder="Additional details about your application..." rows={3} className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none" />
                  <button type="submit" className="w-full bg-[#003B73] text-white rounded-xl py-3 text-sm font-bold hover:bg-[#177BBB] transition-colors">Submit Application</button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#003B73] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
              </div>
              <span className="text-white font-bold">VisaHOBe</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 text-xs">© 2025 VisaHOBe Pte. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
}
