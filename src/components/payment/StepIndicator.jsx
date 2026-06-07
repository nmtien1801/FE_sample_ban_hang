import React from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

const STEPS = [
  { id: 1, label: 'Thông tin' },
  { id: 2, label: 'Quét QR' },
  { id: 3, label: 'Xác nhận' },
];

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center w-full">
      {STEPS.map((step, i) => {
        const done = current > step.id;
        const active = current === step.id;

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all duration-300',
                done && 'bg-emerald-600 border-emerald-600 text-white',
                active && 'bg-white border-emerald-600 text-emerald-600',
                !done && !active && 'bg-white border-slate-200 text-slate-400'
              )}>
                {done ? <Check size={13} strokeWidth={2.5} /> : step.id}
              </div>
              <span className={clsx(
                'text-[11px] font-medium whitespace-nowrap transition-colors',
                active ? 'text-emerald-600' : done ? 'text-slate-500' : 'text-slate-400'
              )}>
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className={clsx(
                'flex-1 h-[1.5px] mx-2 mb-5 transition-colors duration-500',
                current > step.id ? 'bg-emerald-500' : 'bg-slate-100'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
