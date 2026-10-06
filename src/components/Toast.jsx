import React, { useEffect } from 'react';
import { CheckCircle2, Bookmark, Award, X, Sparkles } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 2800);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[90vw] sm:max-w-md animate-sheet">
      <div className="glass-panel px-4 py-2.5 rounded-2xl shadow-2xl border border-white/60 dark:border-white/10 flex items-center gap-3 backdrop-blur-xl">
        <div className="shrink-0 text-lg">
          {toast.type === 'milestone' ? (
            <span className="text-xl">🏆</span>
          ) : toast.type === 'wishlist' ? (
            <Bookmark size={18} className="text-amber-500 fill-amber-500" />
          ) : toast.type === 'eaten' ? (
            <CheckCircle2 size={18} className="text-emerald-500" />
          ) : (
            <Sparkles size={18} className="text-teal-500" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white leading-tight truncate">
            {toast.title}
          </p>
          {toast.message && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
              {toast.message}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition shrink-0"
          aria-label="Close Toast"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
