import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

interface FlightIntroProps {
  countryName: string;
  flag: string;
  countryImage: string;
  onComplete: () => void;
}

// Globe SVG component with rotating continents
const Globe = ({ rotation }: { rotation: number }) => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
    {/* Ocean */}
    <defs>
      <radialGradient id="globe-grad" cx="40%" cy="35%" r="55%">
        <stop offset="0%" stopColor="#1a5276" />
        <stop offset="60%" stopColor="#0f3460" />
        <stop offset="100%" stopColor="#0a1628" />
      </radialGradient>
      <clipPath id="globe-clip">
        <circle cx="100" cy="100" r="88" />
      </clipPath>
      <radialGradient id="globe-shine" cx="35%" cy="30%" r="60%">
        <stop offset="0%" stopColor="white" stopOpacity="0.12" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="#0a1628" />
    <circle cx="100" cy="100" r="88" fill="url(#globe-grad)" />
    
    {/* Continents (simplified) */}
    <g clipPath="url(#globe-clip)" transform={`rotate(${rotation}, 100, 100)`}>
      {/* Grid lines */}
      {[-60, -30, 0, 30, 60].map(lat => (
        <ellipse key={`lat-${lat}`} cx="100" cy={100 - lat * 0.8} rx={88 * Math.cos(lat * Math.PI / 180)} ry={12} stroke="#177BBB" strokeWidth="0.3" opacity="0.2" fill="none" />
      ))}
      {[0, 30, 60, 90, 120, 150].map(lng => (
        <ellipse key={`lng-${lng}`} cx="100" cy="100" rx={20 * Math.cos(lng * Math.PI / 180)} ry="88" stroke="#177BBB" strokeWidth="0.3" opacity="0.15" fill="none" transform={`rotate(${lng}, 100, 100)`} />
      ))}
      
      {/* Simplified continent shapes */}
      {/* Europe/Africa */}
      <path d="M95 45 Q100 42 108 44 L112 50 Q115 55 113 62 L110 68 Q108 72 105 75 L100 80 Q95 85 92 90 L88 95 Q85 100 87 105 L90 108 Q88 112 84 110 L80 105 Q78 98 80 92 L82 85 Q84 78 86 72 L88 65 Q90 58 92 52 Z" fill="#177BBB" opacity="0.25" />
      {/* Asia */}
      <path d="M118 38 Q125 35 135 38 L145 42 Q150 48 148 55 L142 62 Q138 68 130 70 L125 68 Q120 65 118 58 L116 50 Q115 44 118 38 Z" fill="#177BBB" opacity="0.2" />
      {/* Americas */}
      <path d="M55 48 Q58 45 62 46 L66 50 Q68 55 66 62 L62 70 Q58 78 55 85 L52 90 Q50 95 52 100 L55 105 Q53 110 48 108 L45 102 Q44 95 46 88 L48 80 Q50 72 52 65 L54 58 Z" fill="#177BBB" opacity="0.2" />
      {/* Australia */}
      <path d="M140 95 Q145 92 152 94 L156 98 Q158 102 155 106 L150 108 Q145 109 142 106 L140 100 Z" fill="#177BBB" opacity="0.2" />
    </g>
    
    {/* Atmosphere glow */}
    <circle cx="100" cy="100" r="88" fill="url(#globe-shine)" />
    <circle cx="100" cy="100" r="90" stroke="#177BBB" strokeWidth="0.5" opacity="0.3" fill="none" />
    <circle cx="100" cy="100" r="95" stroke="#177BBB" strokeWidth="0.3" opacity="0.1" fill="none" />
  </svg>
);

export default function FlightIntro({ countryName, flag, countryImage, onComplete }: FlightIntroProps) {
  const [phase, setPhase] = useState<'globe' | 'flight' | 'arrive' | 'done'>('globe');
  const [globeRotation, setGlobeRotation] = useState(0);

  useEffect(() => {
    // Rotate globe
    let frame: number;
    const animate = () => {
      setGlobeRotation(r => r + 0.4);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    const t1 = setTimeout(() => setPhase('flight'), 800);
    const t2 = setTimeout(() => setPhase('arrive'), 2200);
    const t3 = setTimeout(() => setPhase('done'), 3400);
    const t4 = setTimeout(() => onComplete(), 3800);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [onComplete]);

  // Generate random stars
  const stars = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 2,
    })), []
  );

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
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#0a1628] to-[#0f172a]" />

          {/* Stars */}
          {stars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2 + star.delay, repeat: Infinity, delay: star.delay }}
            />
          ))}

          {/* Globe */}
          <motion.div
            className="absolute z-10"
            initial={{ scale: 1, opacity: 1, y: 0 }}
            animate={
              phase === 'globe'
                ? { scale: 1, opacity: 1, y: 0 }
                : phase === 'flight'
                ? { scale: 0.5, opacity: 0.4, y: -80 }
                : { scale: 0.3, opacity: 0, y: -120 }
            }
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ width: 'min(60vw, 280px)', height: 'min(60vw, 280px)' }}
          >
            <Globe rotation={globeRotation} />
          </motion.div>

          {/* Flight path arc (visible during flight phase) */}
          <svg className="absolute inset-0 w-full h-full z-20" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <motion.path
              d="M 20 65 Q 35 20 50 18 Q 65 16 80 40"
              fill="none"
              stroke="#177BBB"
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: phase === 'globe' ? 0 : phase === 'flight' ? 0.7 : 1,
                opacity: phase === 'globe' ? 0 : 0.6,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            {/* Dotted trail */}
            {phase !== 'globe' && (
              <motion.path
                d="M 20 65 Q 35 20 50 18 Q 65 16 80 40"
                fill="none"
                stroke="#177BBB"
                strokeWidth="0.4"
                strokeDasharray="0.3 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />
            )}
          </svg>

          {/* Airplane */}
          <motion.div
            className="absolute z-30"
            initial={{ x: '-40vw', y: '20vh', rotate: -35, scale: 0.5, opacity: 0 }}
            animate={
              phase === 'globe'
                ? { x: '-30vw', y: '15vh', rotate: -30, scale: 0.6, opacity: 0.5 }
                : phase === 'flight'
                ? { x: '0vw', y: '-5vh', rotate: -10, scale: 1, opacity: 1 }
                : { x: '25vw', y: '8vh', rotate: 15, scale: 0.7, opacity: 0 }
            }
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_8px_rgba(23,123,187,0.5)]">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#177BBB" />
            </svg>
            {/* Engine trail */}
            <motion.div
              className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-1 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(23,123,187,0.3))' }}
              animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.div>

          {/* Country image reveal (arrive phase) */}
          <motion.div
            className="absolute z-20 rounded-2xl overflow-hidden shadow-2xl"
            style={{ width: 'min(70vw, 320px)', height: 'min(45vw, 200px)' }}
            initial={{ scale: 0.6, opacity: 0, y: 40 }}
            animate={
              phase === 'arrive'
                ? { scale: 1, opacity: 1, y: -20 }
                : { scale: 0.6, opacity: 0, y: 40 }
            }
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img src={countryImage} alt={countryName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>

          {/* Country info text */}
          <motion.div
            className="absolute z-30 text-center px-6 bottom-[18%]"
            initial={{ opacity: 0, y: 30 }}
            animate={phase === 'arrive' ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span
              className="text-4xl sm:text-5xl block mb-2"
              animate={phase === 'arrive' ? { scale: [0.8, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {flag}
            </motion.span>
            <h2 className="text-xl sm:text-3xl font-bold text-white tracking-wide font-heading">
              {countryName}
            </h2>
            <motion.div
              className="w-12 h-0.5 bg-[#177BBB] mx-auto mt-2 rounded-full"
              initial={{ scaleX: 0 }}
              animate={phase === 'arrive' ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            />
            <motion.p
              className="text-white/30 text-xs mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'arrive' ? 1 : 0 }}
              transition={{ delay: 0.6 }}
            >
              Tap anywhere to skip
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
