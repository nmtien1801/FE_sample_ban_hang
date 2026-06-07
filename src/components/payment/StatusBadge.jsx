import React from 'react';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

const MAP = {
  pending: { label: 'Chờ thanh toán', icon: Clock, cls: 'bg-amber-50 text-amber-700 border-amber-100' },
  paid: { label: 'Đã thanh toán', icon: CheckCircle2, cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  expired: { label: 'Hết hạn', icon: XCircle, cls: 'bg-red-50 text-red-600 border-red-100' },
  failed: { label: 'Thất bại', icon: AlertCircle, cls: 'bg-orange-50 text-orange-600 border-orange-100' },
  completed: { label: 'Hoàn thành', icon: CheckCircle2, cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

export default function StatusBadge({ status }) {
  const cfg = MAP[status] || MAP.pending;
  const Icon = cfg.icon;
  return (
    <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border', cfg.cls)}>
      <Icon size={11} />
      {cfg.label}
    </span>
  );
}
