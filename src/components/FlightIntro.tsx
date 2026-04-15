import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FlightIntroProps {
  countryName: string;
  flag: string;
  onComplete: () => void;
}

export default function FlightIntro({ countryName, flag, onComplete }: FlightIntroProps) {
  const [phase, setPhase] = useState<'enter' | 'cruise' | 'arrive' | 'done'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('cruise'), 400);
    const t2 = setTimeout(() => setPhase('arrive'), 1800);
    const t3 = setTimeout(() => setPhase('done'), 2800);
    const t4 = setTimeout(() => onComplete(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onComplete}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0f172a] to-[#1a1033]" />

          <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 0.15, rotate: phase === 'arrive' ? 15 : 0 }} transition={{ duration: 2 }}>
            <svg width="500" height="500" viewBox="0 0 200 200" fill="none" className="w-[80vw] h-[80vw] max-w-[500px] max-h-[500px]">
              <circle cx="100" cy="100" r="90" stroke="#003B73" strokeWidth="0.5" opacity="0.4" />
              <ellipse cx="100" cy="100" rx="60" ry="90" stroke="#003B73" strokeWidth="0.3" opacity="0.3" />
              <ellipse cx="100" cy="100" rx="30" ry="90" stroke="#003B73" strokeWidth="0.3" opacity="0.2" />
              <line x1="10" y1="60" x2="190" y2="60" stroke="#003B73" strokeWidth="0.3" opacity="0.2" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="#003B73" strokeWidth="0.3" opacity="0.3" />
              <line x1="10" y1="140" x2="190" y2="140" stroke="#003B73" strokeWidth="0.3" opacity="0.2" />
            </svg>
          </motion.div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <motion.path
              d="M 15 70 Q 30 30 50 25 Q 70 20 85 50"
              fill="none"
              stroke="#177BBB"
              strokeWidth="0.15"
              strokeDasharray="1 1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: phase === 'enter' ? 0.3 : phase === 'cruise' ? 0.7 : 1, opacity: 0.6 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>

          <motion.div
            className="absolute z-10"
            initial={{ x: '-35vw', y: '25vh', rotate: -40, scale: 0.6, opacity: 0 }}
            animate={
              phase === 'enter'
                ? { x: '-10vw', y: '5vh', rotate: -20, scale: 0.9, opacity: 1 }
                : phase === 'cruise'
                ? { x: '5vw', y: '-5vh', rotate: -5, scale: 1, opacity: 1 }
                : { x: '20vw', y: '5vh', rotate: 10, scale: 0.8, opacity: 0.6 }
            }
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#177BBB" />
            </svg>
          </motion.div>

          <motion.div
            className="relative z-10 text-center px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={phase === 'arrive' ? { opacity: 1, y: 0 } : { opacity: phase === 'cruise' ? 0.4 : 0, y: phase === 'cruise' ? 10 : 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span className="text-5xl sm:text-6xl block mb-3" animate={{ scale: phase === 'arrive' ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
              {flag}
            </motion.span>
            <h2 className="text-xl sm:text-3xl font-bold text-white tracking-wide font-heading">{countryName}</h2>
            <motion.p className="text-white/30 text-xs mt-3" initial={{ opacity: 0 }} animate={{ opacity: phase === 'arrive' ? 1 : 0 }} transition={{ delay: 0.4 }}>
              Tap anywhere to skip
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
