import React, { useState } from 'react';
import { Download, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

// Build deeplink đúng format: thêm app=<shortName viết thường>
function buildDeeplink(baseDeeplink, bankShortName) {
  if (!baseDeeplink) return null;
  if (!bankShortName) return baseDeeplink;
  try {
    const url = new URL(baseDeeplink);
    url.searchParams.set('app', bankShortName.toLowerCase());
    return url.toString();
  } catch {
    const sep = baseDeeplink.includes('?') ? '&' : '?';
    return `${baseDeeplink}${sep}app=${bankShortName.toLowerCase()}`;
  }
}

export default function QRDisplay({ qrImageUrl, qrDataURL, deeplink, bankShortName, accountInfo, amount, addInfo, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const src = qrDataURL || qrImageUrl;
  const deeplinkWithApp = buildDeeplink(deeplink, bankShortName);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(deeplink || src || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { }
  };

  const download = () => {
    if (!src) return;
    const a = document.createElement('a');
    a.href = src;
    a.download = `vietqr-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* QR frame */}
      <div className="relative p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
        {!imgLoaded && (
          <div className="w-44 h-44 rounded-xl bg-slate-100 animate-pulse" />
        )}
        <img
          src={src}
          alt="VietQR Code"
          onLoad={() => setImgLoaded(true)}
          className={clsx(
            'w-44 h-44 rounded-xl object-contain transition-opacity duration-300',
            imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-3'
          )}
        />
        {/* VietQR badge */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-600 text-white text-[9px] font-semibold rounded-full tracking-wide">
          VietQR
        </div>
      </div>

      {/* Account info */}
      {accountInfo && (
        <div className="text-center mt-1">
          <p className="font-semibold text-sm text-slate-800">{accountInfo.accountName}</p>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{accountInfo.accountNo}</p>
          {accountInfo.bankName && (
            <p className="text-[11px] text-slate-400 mt-0.5">{accountInfo.bankName}</p>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 w-full">
        <button
          onClick={download}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors"
        >
          <Download size={13} /> Tải QR
        </button>
        <button
          onClick={copyLink}
          className={clsx(
            'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-medium transition-colors',
            copied
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          )}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Đã sao chép' : 'Sao chép'}
        </button>
      </div>

      {deeplinkWithApp && (
        <a
          href={deeplinkWithApp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
        >
          <ExternalLink size={13} /> Mở app ngân hàng
        </a>
      )}

      {onRegenerate && (
        <button
          onClick={onRegenerate}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          <RefreshCw size={12} /> Tạo mã mới
        </button>
      )}
    </div>
  );
}