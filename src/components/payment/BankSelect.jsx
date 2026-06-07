import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Building2 } from 'lucide-react';
import clsx from 'clsx';

// Hook nội bộ fetch danh sách ngân hàng
function useBanks() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_KEY = 'vietqr_banks_v2';
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try { setBanks(JSON.parse(cached)); setLoading(false); return; } catch { }
    }
    fetch('https://api.vietqr.io/v2/banks')
      .then(r => r.json())
      .then(data => {
        const list = (data.data || []).filter(b => b.transferSupported === 1);
        setBanks(list);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(list));
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  return { banks, loading };
}

export default function BankSelect({ value, onChange, error }) {
  const { banks, loading } = useBanks();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  const selected = banks.find(b => b.bin === value);

  const filtered = query
    ? banks.filter(b =>
      b.shortName.toLowerCase().includes(query.toLowerCase()) ||
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.bin.includes(query)
    )
    : banks;

  useEffect(() => {
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={clsx(
          'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-sm',
          'bg-slate-50/60 outline-none transition-all text-left',
          'hover:border-slate-300 focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500',
          error ? 'border-red-300' : 'border-slate-200',
          open && 'border-emerald-500 ring-2 ring-emerald-500/15 bg-white'
        )}
      >
        {selected ? (
          <span className="flex items-center gap-2.5 min-w-0">
            <img
              src={selected.logo}
              alt={selected.shortName}
              className="w-6 h-6 object-contain rounded shrink-0"
              onError={e => (e.target.style.display = 'none')}
            />
            <span className="font-semibold text-slate-800 shrink-0">{selected.shortName}</span>
            <span className="text-slate-400 text-xs truncate">{selected.name}</span>
          </span>
        ) : (
          <span className="flex items-center gap-2 text-slate-400">
            <Building2 size={15} />
            {loading ? 'Đang tải...' : 'Chọn ngân hàng'}
          </span>
        )}
        <ChevronDown size={15} className={clsx('text-slate-400 shrink-0 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-100/80 overflow-hidden">
          {/* Search */}
          <div className="p-2.5 border-b border-slate-50">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tìm ngân hàng..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-100 text-slate-700 placeholder-slate-400 outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* List */}
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="p-4 text-center text-xs text-slate-400">Không tìm thấy</p>
            ) : (
              filtered.map(bank => (
                <button
                  key={bank.bin}
                  type="button"
                  onClick={() => { onChange(bank.bin, bank); setOpen(false); setQuery(''); }}
                  className={clsx(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-50',
                    bank.bin === value && 'bg-emerald-50'
                  )}
                >
                  <img
                    src={bank.logo}
                    alt={bank.shortName}
                    className="w-6 h-6 object-contain rounded shrink-0"
                    onError={e => (e.target.style.display = 'none')}
                  />
                  <span className={clsx(
                    'text-xs font-semibold w-16 shrink-0',
                    bank.bin === value ? 'text-emerald-700' : 'text-slate-700'
                  )}>
                    {bank.shortName}
                  </span>
                  <span className="text-xs text-slate-400 truncate">{bank.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
