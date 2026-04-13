import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/* ── SVG world map paths (simplified continents) ── */
const WorldMapSVG = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* North America */}
    <path d="M150 80 L220 60 L280 80 L300 120 L280 180 L240 200 L200 220 L160 200 L120 160 L100 120 Z" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.4)" strokeWidth="1"/>
    {/* South America */}
    <path d="M220 250 L260 240 L280 280 L290 340 L270 400 L240 420 L210 380 L200 320 L210 280 Z" fill="rgba(249,115,22,0.12)" stroke="rgba(249,115,22,0.35)" strokeWidth="1"/>
    {/* Europe */}
    <path d="M440 70 L500 60 L530 80 L520 120 L490 140 L460 130 L440 100 Z" fill="rgba(249,115,22,0.18)" stroke="rgba(249,115,22,0.5)" strokeWidth="1"/>
    {/* Africa */}
    <path d="M460 160 L510 150 L540 180 L550 250 L530 320 L500 350 L470 320 L450 260 L440 200 Z" fill="rgba(249,115,22,0.12)" stroke="rgba(249,115,22,0.35)" strokeWidth="1"/>
    {/* Asia */}
    <path d="M560 60 L700 50 L780 80 L800 140 L760 180 L700 200 L640 190 L580 160 L550 120 L540 80 Z" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.4)" strokeWidth="1"/>
    {/* Southeast Asia */}
    <path d="M720 200 L780 190 L820 220 L810 260 L770 280 L730 260 L710 230 Z" fill="rgba(249,115,22,0.12)" stroke="rgba(249,115,22,0.35)" strokeWidth="1"/>
    {/* Australia */}
    <path d="M760 320 L840 310 L880 340 L870 380 L830 400 L780 390 L750 360 Z" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.4)" strokeWidth="1"/>
    {/* Grid lines */}
    {[100,200,300,400].map(y => <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(249,115,22,0.08)" strokeWidth="0.5" strokeDasharray="8 8"/>)}
    {[200,400,600,800].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" stroke="rgba(249,115,22,0.08)" strokeWidth="0.5" strokeDasharray="8 8"/>)}
  </svg>
);

/* ── Animated flight arc ── */
const FlightArc = ({ phase }: { phase: string }) => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
    <motion.path
      d="M 10 75 Q 35 30 50 25 Q 65 20 90 45"
      fill="none"
      stroke="rgba(249,115,22,0.6)"
      strokeWidth="0.4"
      strokeDasharray="2 2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: phase === 'takeoff' ? 0.3 : phase === 'flying' ? 0.7 : 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
    {/* Glow trail */}
    <motion.path
      d="M 10 75 Q 35 30 50 25 Q 65 20 90 45"
      fill="none"
      stroke="rgba(249,115,22,0.2)"
      strokeWidth="1.2"
      filter="url(#glow)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: phase === 'takeoff' ? 0.25 : phase === 'flying' ? 0.65 : 0.95 }}
      transition={{ duration: 1.8, ease: 'easeInOut' }}
    />
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
  </svg>
);

/* ── Dot markers on the map ── */
const MapDots = () => {
  const dots = [
    { x: 65, y: 35, label: 'SG' },  // Singapore
    { x: 82, y: 68, label: 'AU' },  // Australia
    { x: 50, y: 22, label: 'RS' },  // Serbia
    { x: 48, y: 25, label: 'MD' },  // Moldova
    { x: 56, y: 30, label: 'KW' },  // Kuwait
    { x: 72, y: 45, label: 'KH' },  // Cambodia
    { x: 60, y: 18, label: 'RU' },  // Russia
    { x: 54, y: 32, label: 'SA' },  // Saudi Arabia
    { x: 47, y: 20, label: 'BY' },  // Belarus
    { x: 70, y: 40, label: 'MY' },  // Malaysia
  ];
  return (
    <>
      {dots.map((dot, i) => (
        <motion.div
          key={dot.label}
          className="absolute"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4, type: 'spring' }}
        >
          <div className="relative">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <motion.div
              className="absolute inset-0 w-2 h-2 bg-orange-500 rounded-full"
              animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          </div>
        </motion.div>
      ))}
    </>
  );
};

interface FlightIntroProps {
  countryName: string;
  flag: string;
  onComplete: () => void;
}

export default function FlightIntro({ countryName, flag, onComplete }: FlightIntroProps) {
  const [phase, setPhase] = useState<'takeoff' | 'flying' | 'landing' | 'done'>('takeoff');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('flying'), 600);
    const t2 = setTimeout(() => setPhase('landing'), 2200);
    const t3 = setTimeout(() => setPhase('done'), 3200);
    const t4 = setTimeout(() => onComplete(), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onComplete}
        >
          {/* Dark gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: phase === 'takeoff'
                ? 'linear-gradient(135deg, #0a0a1a 0%, #0f172a 50%, #1e1b4b 100%)'
                : phase === 'flying'
                ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
                : 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #0c0a09 100%)'
            }}
            transition={{ duration: 1.2 }}
          />

          {/* World Map Background */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ 
              opacity: phase === 'landing' ? 0.3 : 0.6,
              scale: phase === 'takeoff' ? 1.3 : phase === 'flying' ? 1.1 : 0.9
            }}
            transition={{ duration: 2 }}
          >
            <WorldMapSVG className="w-full h-full max-w-none" />
          </motion.div>

          {/* Map Dots */}
          <MapDots />

          {/* Flight Arc */}
          <FlightArc phase={phase} />

          {/* Animated particles along the path */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                y: [0, -30],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* Airplane */}
          <motion.div
            className="absolute z-10"
            initial={{ x: '-40vw', y: '30vh', rotate: -35, scale: 0.5 }}
            animate={
              phase === 'takeoff'
                ? { x: '-15vw', y: '10vh', rotate: -25, scale: 0.8 }
                : phase === 'flying'
                ? { x: '5vw', y: '-5vh', rotate: -10, scale: 1 }
                : { x: '25vw', y: '5vh', rotate: 5, scale: 0.9 }
            }
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path d="M58 6L28 36M58 6L40 58L28 36M58 6L6 24L28 36" fill="rgba(249,115,22,0.2)" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* Engine trail */}
            <motion.div
              className="absolute -bottom-1 -left-4 w-12 h-2 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.6))' }}
              animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.8, 1.4, 0.8] }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
          </motion.div>

          {/* Destination text */}
          <motion.div
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              phase === 'landing'
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: phase === 'flying' ? 0.5 : 0, scale: 0.9, y: 20 }
            }
            transition={{ duration: 0.8, delay: phase === 'landing' ? 0.3 : 0 }}
          >
            <motion.span
              className="text-5xl sm:text-7xl block mb-4"
              animate={{ scale: phase === 'landing' ? [1, 1.15, 1] : 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {flag}
            </motion.span>
            <motion.h2
              className="text-2xl sm:text-4xl font-bold text-white tracking-wide"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Flying to {countryName}
            </motion.h2>
            <motion.p
              className="text-orange-400/70 text-sm mt-2"
              style={{ fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'landing' ? 1 : 0 }}
              transition={{ delay: 0.6 }}
            >
              Tap anywhere to skip
            </motion.p>
            <motion.div
              className="mt-4 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'landing' ? 1 : 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/60 text-xs" style={{ fontFamily: 'var(--font-body)' }}>Arriving...</span>
            </motion.div>
          </motion.div>

          {/* Bottom gradient */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.1), transparent)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'landing' ? 1 : 0.3 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
