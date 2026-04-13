import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        visible
          ? { opacity: 1, transform: 'translateY(0)', transition: `opacity 0.6s ease-out${delay ? ` ${delay}ms` : ''}, transform 0.6s ease-out${delay ? ` ${delay}ms` : ''}` }
          : { opacity: 0, transform: 'translateY(24px)' }
      }
    >
      {children}
    </div>
  );
}
