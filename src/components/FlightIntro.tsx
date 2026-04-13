import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const PlaneIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M58 6L28 36M58 6L40 58L28 36M58 6L6 24L28 36" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface FlightIntroProps {
  countryName: string;
  flag: string;
  onComplete: () => void;
}

export default function FlightIntro({ countryName, flag, onComplete }: FlightIntroProps) {
  const [phase, setPhase] = useState<'takeoff' | 'flying' | 'landing' | 'done'>('takeoff');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('flying'), 400);
    const t2 = setTimeout(() => setPhase('landing'), 1800);
    const t3 = setTimeout(() => setPhase('done'), 2800);
    const t4 = setTimeout(() => onComplete(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Sky gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: phase === 'takeoff'
                ? 'linear-gradient(180deg, #0c1445 0%, #1a237e 40%, #283593 100%)'
                : phase === 'flying'
                ? 'linear-gradient(180deg, #0a0e2a 0%, #1a1f4e 30%, #3949ab 100%)'
                : 'linear-gradient(180deg, #1565c0 0%, #42a5f5 50%, #e3f2fd 100%)'
            }}
            transition={{ duration: 1 }}
          />

          {/* Stars (visible during takeoff/flying) */}
          {(phase === 'takeoff' || phase === 'flying') && (
            <>
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 60}%`,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </>
          )}

          {/* Clouds during landing */}
          {phase === 'landing' && (
            <>
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div
                  key={`cloud-${i}`}
                  className="absolute bg-white/40 rounded-full blur-xl"
                  style={{
                    width: 120 + i * 40,
                    height: 40 + i * 15,
                    left: `${10 + i * 18}%`,
                  }}
                  initial={{ top: '-20%', opacity: 0 }}
                  animate={{ top: `${30 + i * 12}%`, opacity: 0.6 }}
                  transition={{ duration: 1.2, delay: i * 0.15 }}
                />
              ))}
            </>
          )}

          {/* Flight path trail */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M -10 85 Q 30 60 50 40 Q 70 20 110 15"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.3"
              strokeDasharray="1 1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: phase === 'takeoff' ? 0.3 : phase === 'flying' ? 0.8 : 1 }}
              transition={{ duration: 1.5 }}
            />
          </svg>

          {/* Airplane */}
          <motion.div
            className="absolute z-10"
            initial={{ x: '-30vw', y: '40vh', rotate: -30, scale: 0.6 }}
            animate={
              phase === 'takeoff'
                ? { x: '-10vw', y: '15vh', rotate: -25, scale: 0.9 }
                : phase === 'flying'
                ? { x: '5vw', y: '-5vh', rotate: -15, scale: 1.1 }
                : { x: '20vw', y: '10vh', rotate: 5, scale: 1 }
            }
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <PlaneIcon className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-2xl" />
            {/* Engine glow */}
            <motion.div
              className="absolute -bottom-2 -left-2 w-8 h-3 bg-orange-400 rounded-full blur-md"
              animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [1, 1.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Destination text */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              phase === 'landing'
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: phase === 'flying' ? 0.6 : 0, scale: 0.9, y: 20 }
            }
            transition={{ duration: 0.8, delay: phase === 'landing' ? 0.3 : 0 }}
          >
            <motion.span
              className="text-5xl sm:text-7xl block mb-3"
              animate={{ scale: phase === 'landing' ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {flag}
            </motion.span>
            <motion.h2
              className="text-2xl sm:text-4xl font-bold text-white tracking-wide"
              style={{ fontFamily: 'Inter, sans-serif', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              Flying to {countryName}
            </motion.h2>
            <motion.div
              className="mt-4 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'landing' ? 1 : 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/70 text-sm">Arriving...</span>
            </motion.div>
          </motion.div>

          {/* Bottom ground line on landing */}
          {phase === 'landing' && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-900/40 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
