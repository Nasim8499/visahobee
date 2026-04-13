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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.02, rootMargin: '0px 0px 50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? undefined : 0,
        transform: visible ? undefined : 'translateY(24px)',
        transition: visible ? 'opacity 0.6s ease-out, transform 0.6s ease-out' : undefined,
        transitionDelay: visible && delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
