import React from 'react';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, MapPin, Store } from 'lucide-react';
import { DISTRICTS_FOOD, toBengaliNumerals } from '../data/foods';
import { getTheme } from '../data/themes';
import { playStampSound } from '../utils/audio';

export default function FoodSheet({
  districtId,
  onClose,
  isEaten,
  onToggleEaten,
  onNavigate,
  themeId = 'emerald'
}) {
  if (!districtId) return null;

  const district = DISTRICTS_FOOD.find((d) => d.id === districtId);
  if (!district) return null;

  const theme = getTheme(themeId);

  const currentIndex = DISTRICTS_FOOD.findIndex((d) => d.id === districtId);
  const prevDistrict = DISTRICTS_FOOD[(currentIndex - 1 + DISTRICTS_FOOD.length) % DISTRICTS_FOOD.length];
  const nextDistrict = DISTRICTS_FOOD[(currentIndex + 1) % DISTRICTS_FOOD.length];

  const handleStampAction = () => {
    if (!isEaten) {
      playStampSound();
    }
    onToggleEaten(district.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg glass-panel rounded-t-[32px] sm:rounded-[32px] sm:mb-6 p-5 sm:p-6 shadow-2xl animate-sheet relative overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Specular Top Border Glow Accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 opacity-90"
          style={{ background: theme.primaryBtn }}
        ></div>

        {/* Drag handle */}
        <div className="w-10 h-1 bg-slate-300/80 dark:bg-slate-700/80 rounded-full mx-auto mb-3 sm:hidden"></div>

        {/* Header with district and close button */}
        <div className="flex items-start justify-between mb-3.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold glass-pill text-slate-700 dark:text-slate-300">
                <MapPin size={11} style={{ color: theme.accentColor }} /> {district.divisionBn} বিভাগ
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {district.nameEn} District
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              {district.nameBn}
              {isEaten && (
                <span
                  style={{ color: theme.accentColor }}
                  className="inline-flex items-center text-xs font-bold glass-pill px-2.5 py-0.5 rounded-full"
                >
                  স্বাদ গ্রহণ সম্পন্ন ✓
                </span>
              )}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full glass-pill transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Signature Food Liquid Spotlight Card */}
        <div className="relative glass-pill rounded-2xl p-4 sm:p-5 mb-3.5 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 glass-panel rounded-2xl shadow-md flex items-center justify-center text-4xl sm:text-5xl select-none">
            {district.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <span
              style={{ color: theme.accentColor }}
              className="text-[10px] font-bold uppercase tracking-wider block mb-0.5"
            >
              সিগনেচার খাবার
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white leading-snug truncate">
              {district.foodBn}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {district.foodEn}
            </p>
          </div>

          {/* Official Passport Stamp Graphic when Eaten */}
          {isEaten && (
            <div className="absolute right-3 -bottom-2 sm:right-5 sm:bottom-2 pointer-events-none transform rotate-[-10deg] animate-stamp">
              <div
                style={{ borderColor: theme.accentColor }}
                className="border border-dashed rounded-xl px-2.5 py-1 glass-panel shadow-md flex flex-col items-center"
              >
                <span
                  style={{ color: theme.accentColor }}
                  className="text-[8px] font-black uppercase tracking-wider"
                >
                  PASSPORT STAMP
                </span>
                <span className="text-[11px] font-bold text-slate-800 dark:text-white">
                  স্বাদ নেওয়া শেষ!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Authentic Shop Recommendations Section ("আসল দোকান কোথায়?") */}
        {district.famousShopBn && (
          <div className="mb-3.5 glass-pill p-3 sm:p-3.5 rounded-2xl flex items-start gap-2.5 border border-amber-500/25 bg-amber-500/5 dark:bg-amber-500/10">
            <Store size={17} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-0.5">
                📍 আসল ও বিখ্যাত দোকান
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                {district.famousShopBn}
              </p>
            </div>
          </div>
        )}

        {/* Cultural Description Note */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 glass-pill p-3.5 rounded-xl">
          {district.descriptionBn}
        </p>

        {/* Action Button: খেয়েছি ✅ with audio FX */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleStampAction}
            style={{ background: theme.primaryBtn }}
            className="flex-1 py-3 px-5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 liquid-btn-primary shadow-lg"
          >
            {isEaten ? (
              <>
                <Check size={18} className="stroke-[3]" />
                <span>খেয়েছি ✅</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>খেয়েছি ✅</span>
              </>
            )}
          </button>

          {isEaten && (
            <button
              onClick={() => onToggleEaten(district.id)}
              className="py-3 px-4 rounded-2xl font-medium text-xs text-rose-500 hover:text-rose-600 glass-pill hover:bg-rose-500/10 transition"
              title="আনমার্ক করুন"
            >
              মুছুন ✕
            </button>
          )}
        </div>

        {/* Prev / Next Quick District Navigation */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/60 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400">
          <button
            onClick={() => onNavigate(prevDistrict.id)}
            className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-slate-200 glass-pill px-3 py-1.5 rounded-xl transition"
          >
            <ArrowLeft size={13} />
            <span>পূর্ববর্তী: {prevDistrict.nameBn}</span>
          </button>

          <button
            onClick={() => onNavigate(nextDistrict.id)}
            className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-slate-200 glass-pill px-3 py-1.5 rounded-xl transition"
          >
            <span>পরবর্তী: {nextDistrict.nameBn}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
