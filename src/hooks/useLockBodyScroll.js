import { useEffect } from 'react';

let lockCount = 0;

/** Prevents background scrolling while overlays (menu, modal) are open. */
export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    lockCount += 1;
    document.body.classList.add('is-locked');
    return () => {
      lockCount -= 1;
      if (lockCount === 0) document.body.classList.remove('is-locked');
    };
  }, [locked]);
}
