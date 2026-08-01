import { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let imageReady = false;
    let minimumTimePassed = false;
    let finished = false;
    const portrait = new Image();

    const finish = () => {
      if (!imageReady || !minimumTimePassed || finished) return;
      finished = true;
      setProgress(100);
      window.setTimeout(() => setLeaving(true), 180);
      window.setTimeout(onDone, 780);
    };

    portrait.onload = () => { imageReady = true; finish(); };
    portrait.onerror = () => { imageReady = true; finish(); };
    portrait.src = '/mr_nguyen.jpg';

    const start = performance.now();
    const progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - start;
      setProgress(Math.min(92, Math.round((elapsed / 1100) * 92)));
    }, 40);
    const minimumTimer = window.setTimeout(() => {
      minimumTimePassed = true;
      window.clearInterval(progressTimer);
      finish();
    }, 1100);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(minimumTimer);
    };
  }, [onDone]);

  return (
    <div className={`loading-screen${leaving ? ' loading-screen--leaving' : ''}`} role="status" aria-live="polite">
      <div className="loading-inner">
        <div className="loading-copy">
          <span>FREE GAZA</span>
          <span>{String(progress).padStart(3, '0')}%</span>
        </div>
        <div className="loading-track" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  );
}
