import { useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setEnabled(true);

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target.closest('a, button, [data-cursor], input, textarea, select, label, .card-accent, .clickable');
      if (target) {
        setHovered(true);
        const text = target.getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`cursor ${hovered ? 'is-hovered' : ''} ${cursorText ? 'is-text' : ''}`}
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      aria-hidden="true"
    >
      <div className="cursor__dot" />
      {cursorText && <span className="cursor__text">{cursorText}</span>}
    </div>
  );
}
