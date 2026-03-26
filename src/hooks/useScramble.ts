import { useState, useRef, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>[]{}';

export function useScramble(target: string, duration = 600) {
  const [display, setDisplay] = useState(target);
  const frame = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    if (frame.current) clearInterval(frame.current);
    const start = Date.now();
    const len = target.length;

    frame.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const resolved = Math.floor(progress * len);

      setDisplay(
        target
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < resolved) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (progress >= 1) {
        setDisplay(target);
        clearInterval(frame.current!);
      }
    }, 40);
  }, [target, duration]);

  const reset = useCallback(() => {
    if (frame.current) clearInterval(frame.current);
    setDisplay(target);
  }, [target]);

  return { display, scramble, reset };
}
