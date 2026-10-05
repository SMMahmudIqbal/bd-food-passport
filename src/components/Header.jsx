import React from 'react';
import { Sparkles, Moon, Sun, CreditCard, Award } from 'lucide-react';
import { getRank, toBengaliNumerals } from '../data/foods';

export default function Header({
  eatenCount,
  onOpenCardModal,
  isDarkMode,
  onToggleTheme,
  filterDivision,
  onFilterDivisionChange,
  divisions
}) {
  const rank = getRank(eatenCount);
  const percent = Math.round((eatenCount / 64) * 100);

  return (
    <header className="w-full sticky top-0 z-40 px-3 sm:px-6 pt-2.5 sm:pt-3 pb-1.5 transition-colors">
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-3 sm:p-4 transition-all">
        {/* Top bar: Brand, Status Badge, Controls */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Liquid Glow Icon Container */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-teal-500/90 via-emerald-500/80 to-sky-500/90 p-[1px] shadow-lg shadow-teal-500/20 shrink-0">
              <div className="w-full h-full rounded-[15px] bg-white/30 dark:bg-slate-900/40 backdrop-blur-md flex items-center justify-center text-xl select-none">
                🍲
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                  বাংলাদেশ ফুড পাসপোর্ট
                </h1>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                ৬৪ জেলার ঐতিহ্যবাহী স্বাদের মানচিত্র
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Minimalist Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 sm:p-2.5 rounded-2xl glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-300 active:scale-95 transition"
              title={isDarkMode ? "লাইট মোড" : "ডার্ক মোড"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-teal-600" />}
            </button>

            {/* Liquid Card CTA Button */}
            <button
              onClick={onOpenCardModal}
              className="liquid-btn-primary flex items-center gap-1.5 py-2 px-3.5 sm:px-4 rounded-2xl font-semibold text-xs sm:text-sm active:scale-95 transition"
            >
              <CreditCard size={15} />
              <span>আমার কার্ড</span>
            </button>
          </div>
        </div>

        {/* Minimalist Liquid Counter & Progress Tube */}
        <div className="glass-pill p-3 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {toBengaliNumerals(eatenCount)}
                <span className="text-slate-400 dark:text-slate-500 font-bold text-sm sm:text-base">
                  {' '}
                  / {toBengaliNumerals(64)}
                </span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden xs:inline">
                জেলা সমাপ্ত
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Minimal Rank Pill */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${rank.badgeClass} shadow-sm border border-white/20`}
              >
                <Award size={13} />
                <span>{rank.titleBn}</span>
              </div>

              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-lg border border-teal-500/20">
                {toBengaliNumerals(percent)}%
              </span>
            </div>
          </div>

          {/* Liquid Tube Progress Bar */}
          <div className="w-full liquid-progress-track h-2 rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full liquid-progress-bar rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(percent, 2.5)}%` }}
            ></div>
          </div>
        </div>

        {/* Liquid Division Filter Pills */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar pb-0.5">
          <button
            onClick={() => onFilterDivisionChange('')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              filterDivision === ''
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md scale-100 font-semibold'
                : 'glass-pill text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-800/70'
            }`}
          >
            সব বিভাগ
          </button>

          {divisions.map((divName) => (
            <button
              key={divName}
              onClick={() => onFilterDivisionChange(divName)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                filterDivision === divName
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md font-semibold'
                  : 'glass-pill text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-800/70'
              }`}
            >
              {divName}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
