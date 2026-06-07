import React, { useState, useEffect, useRef } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

function timeRemaining(expiresAt) {
  const diff = new Date(expiresAt) - new Date();
  if (diff <= 0) return null;
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { mins, secs, formatted: `${mins}:${String(secs).padStart(2, '0')}` };
}

export default function PaymentTimer({ expiresAt, onExpire }) {
  const [remaining, setRemaining] = useState(expiresAt ? timeRemaining(expiresAt) : null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => {
      const r = timeRemaining(expiresAt);
      setRemaining(r);
      if (!r && onExpire) onExpire();
    };
    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
  }, [expiresAt]);

  if (!remaining) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
        <AlertCircle size={12} />
        Hết hạn
      </div>
    );
  }

  const isUrgent = remaining.mins === 0 && remaining.secs <= 60;

  return (
    <div className={clsx(
      'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors',
      isUrgent
        ? 'bg-orange-50 border-orange-100 text-orange-600'
        : 'bg-slate-50 border-slate-100 text-slate-500'
    )}>
      <Clock size={12} className={isUrgent ? 'animate-pulse' : ''} />
      Hết hạn sau
      <span className={clsx('font-mono font-semibold tabular-nums', isUrgent ? 'text-orange-600' : 'text-emerald-600')}>
        {remaining.formatted}
      </span>
    </div>
  );
}
