import { useState, useEffect, useRef } from 'react';
import { timeRemaining } from '../format.js';

export function usePaymentTimer(expiresAt, onExpire) {
  const [remaining, setRemaining] = useState(expiresAt ? timeRemaining(expiresAt) : null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!expiresAt) return;

    const tick = () => {
      const t = timeRemaining(expiresAt);
      setRemaining(t);
      if (!t && onExpire) onExpire();
    };

    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
  }, [expiresAt]);

  return remaining;
}
