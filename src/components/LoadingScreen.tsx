import { useRef, useState } from 'react';

const PLAYBACK_RATE = 0.68;

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const ending = useRef(false);

  const finish = () => {
    if (ending.current) return;
    ending.current = true;
    setLeaving(true);
    window.setTimeout(onDone, 820);
  };

  return (
    <div className={`loading-screen${leaving ? ' loading-screen--leaving' : ''}`} role="status" aria-live="polite">
      <video
        className="loading-video"
        src="/gojo-loader.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedMetadata={(event) => {
          event.currentTarget.playbackRate = PLAYBACK_RATE;
        }}
        onEnded={finish}
        onError={finish}
      />
      <div className="loading-inner">
        <span className="loading-copy">FREE GAZA</span>
        <span className="loading-spinner" aria-hidden="true" />
      </div>
    </div>
  );
}
