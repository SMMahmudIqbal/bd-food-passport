import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, CreditCard, Award, Volume2, VolumeX, Palette, Check } from 'lucide-react';
import { getRank, toBengaliNumerals } from '../data/foods';
import { isSoundEnabled, setSoundEnabled } from '../utils/audio';
import { THEMES, getTheme } from '../data/themes';

export default function Header({
  eatenCount,
  onOpenCardModal,
  isDarkMode,
  onToggleTheme,
  filterDivision,
  onFilterDivisionChange,
  divisions,
  themeId = 'emerald',
  onSelectTheme
}) {
  const rank = getRank(eatenCount);
  const percent = Math.round((eatenCount / 64) * 100);
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeMenuRef = useRef(null);

  const theme = getTheme(themeId);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setShowThemeMenu(false);
      }
    };
    if (showThemeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showThemeMenu]);

  return (
    <header className="w-full sticky top-0 z-40 px-3 sm:px-6 pt-2.5 sm:pt-3 pb-1.5 transition-colors">
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-3 sm:p-4 transition-all">
        {/* Top bar: Brand, Status Badge, Controls */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Liquid Glow Icon Container */}
            <div
              style={{ background: theme.primaryBtn }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl p-[1px] shadow-lg shrink-0 transition-all"
            >
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

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Stamp Sound FX Toggle Button */}
            <button
              onClick={handleToggleSound}
              className="p-2 sm:p-2.5 rounded-2xl glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-300 active:scale-95 transition"
              title={soundOn ? "সাউন্ড অন (শব্দ বন্ধ করতে চাপুন)" : "সাউন্ড মিউট (শব্দ চালু করতে চাপুন)"}
              aria-label="Toggle Sound"
            >
              {soundOn ? (
                <Volume2 size={17} style={{ color: theme.accentColor }} />
              ) : (
                <VolumeX size={17} className="text-slate-400" />
              )}
            </button>

            {/* Theme Palette Switcher */}
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={() => setShowThemeMenu((prev) => !prev)}
                className="p-2 sm:p-2.5 rounded-2xl glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-300 active:scale-95 transition"
                title={`থিম: ${theme.nameBn} (পরিবর্তন করতে চাপুন)`}
                aria-label="Change Color Theme"
              >
                <Palette size={17} style={{ color: theme.accentColor }} />
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-2xl p-2 shadow-2xl z-50 animate-pop space-y-1">
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    থিম পছন্দ করুন
                  </div>
                  {THEMES.map((t) => {
                    const isSelected = t.id === themeId;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          onSelectTheme && onSelectTheme(t.id);
                          setShowThemeMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                          isSelected
                            ? 'bg-white/70 dark:bg-slate-800/80 text-slate-900 dark:text-white shadow-sm'
                            : 'hover:bg-white/40 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full inline-block shadow-sm"
                            style={{ background: t.primaryBtn }}
                          ></span>
                          <span>{t.nameBn}</span>
                        </div>
                        {isSelected && <Check size={13} style={{ color: theme.accentColor }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Minimalist Dark/Light Mode Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 sm:p-2.5 rounded-2xl glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-300 active:scale-95 transition"
              title={isDarkMode ? "লাইট মোড" : "ডার্ক মোড"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} style={{ color: theme.accentColor }} />}
            </button>

            {/* Liquid Card CTA Button */}
            <button
              onClick={onOpenCardModal}
              style={{ background: theme.primaryBtn }}
              className="liquid-btn-primary flex items-center gap-1.5 py-2 px-3 sm:px-4 rounded-2xl font-semibold text-xs sm:text-sm active:scale-95 transition shadow-md"
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

              <span
                style={{ color: theme.accentColor }}
                className="text-xs font-bold bg-white/50 dark:bg-slate-900/50 px-2 py-0.5 rounded-lg border border-white/40 dark:border-white/10"
              >
                {toBengaliNumerals(percent)}%
              </span>
            </div>
          </div>

          {/* Liquid Tube Progress Bar */}
          <div className="w-full liquid-progress-track h-2 rounded-full overflow-hidden p-[1px]">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${theme.progressBar}`}
              style={{ width: `${Math.max(percent, 2)}%` }}
            ></div>
          </div>
        </div>

        {/* Division Filter Strip (Horizontal scrolling on small screens) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-0.5 no-scrollbar">
          <button
            onClick={() => onFilterDivisionChange('')}
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterDivision === ''
                ? 'shadow-sm text-white'
                : 'glass-pill text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
            style={filterDivision === '' ? { background: theme.primaryBtn } : {}}
          >
            সব বিভাগ
          </button>
          {divisions.map((div) => {
            const isActive = filterDivision === div;
            return (
              <button
                key={div}
                onClick={() => onFilterDivisionChange(div)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'shadow-sm text-white'
                    : 'glass-pill text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60'
                }`}
                style={isActive ? { background: theme.primaryBtn } : {}}
              >
                {div}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
