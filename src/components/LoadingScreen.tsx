import { useCallback, useEffect, useRef, useState } from 'react';

const PLAYBACK_RATE = 0.68;
// The intro runs ~6.1s (4.12s clip at 0.68x). This is only a safety net: if the
// video stalls or never decodes, `onEnded`/`onError` never fire and the site would
// otherwise stay behind the loader forever.
const MAX_LOADER_MS = 7500;

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const ending = useRef(false);

  const finish = useCallback(() => {
    if (ending.current) return;
    ending.current = true;
    setLeaving(true);
    window.setTimeout(onDone, 820);
  }, [onDone]);

  useEffect(() => {
    const bail = window.setTimeout(finish, MAX_LOADER_MS);
    return () => window.clearTimeout(bail);
  }, [finish]);

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
