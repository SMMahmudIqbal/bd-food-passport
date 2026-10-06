import React, { useState, useCallback } from 'react';
import { DISTRICT_PATHS, MAP_WIDTH, MAP_HEIGHT } from '../data/districts-map';
import { FOOD_BY_ID, toBengaliNumerals } from '../data/foods';
import { getTheme } from '../data/themes';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function MapView({
  eatenDistricts,
  onSelectDistrict,
  selectedDistrictId,
  filterDivision,
  themeId = 'emerald'
}) {
  const [scale, setScale] = useState(1);
  const theme = getTheme(themeId);

  // Reset zoom
  const handleReset = useCallback(() => {
    setScale(1);
  }, []);

  // Zoom In / Out centered without moving position
  const handleZoom = useCallback((delta) => {
    setScale((prev) => {
      const next = Math.min(Math.max(prev + delta, 0.9), 2.5);
      return Number(next.toFixed(2));
    });
  }, []);

  return (
    <div className="relative w-full h-[62vh] sm:h-[68vh] glass-panel rounded-3xl overflow-hidden select-none flex flex-col justify-center items-center shadow-2xl">
      {/* Floating Glass Zoom Controls */}
      <div className="absolute top-3.5 right-3.5 z-20 flex flex-col gap-1.5 glass-panel p-1.5 rounded-2xl shadow-lg">
        <button
          onClick={() => handleZoom(0.25)}
          className="p-2.5 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 active:scale-95 text-slate-700 dark:text-slate-200 transition"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn size={17} />
        </button>
        <button
          onClick={() => handleZoom(-0.25)}
          className="p-2.5 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 active:scale-95 text-slate-700 dark:text-slate-200 transition"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut size={17} />
        </button>
        {scale !== 1 && (
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 active:scale-95 text-slate-700 dark:text-slate-200 transition animate-pop"
            title="Reset Zoom"
            aria-label="Reset Zoom"
          >
            <RotateCcw size={17} />
          </button>
        )}
      </div>

      {/* Floating Glass Instruction Capsule */}
      <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 glass-pill py-1.5 px-3 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 pointer-events-none">
        <span className="flex h-2 w-2 relative">
          <span
            style={{ backgroundColor: theme.accentColor }}
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          ></span>
          <span
            style={{ backgroundColor: theme.accentColor }}
            className="relative inline-flex rounded-full h-2 w-2"
          ></span>
        </span>
        <span>জেলা স্পর্শ করে স্বাদ দেখুন</span>
      </div>

      {/* Fixed Stable Map Canvas (No touch drag/pan movement) */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden touch-manipulation">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="w-full h-full max-w-full max-h-full flex items-center justify-center pointer-events-auto"
        >
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="w-full h-full max-h-[92%] object-contain"
            style={{ maxHeight: '92%' }}
          >
            <defs>
              {/* Dynamic Theme Luminous Gradient for Eaten Districts */}
              <linearGradient id={`liquidEatenGrad-${theme.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.mapFill1} />
                <stop offset="50%" stopColor={theme.mapFill2} />
                <stop offset="100%" stopColor={theme.mapFill3} />
              </linearGradient>

              {/* Luminous Glow Filter for Highlight */}
              <filter id="liquidGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <g id="districts-layer">
              {DISTRICT_PATHS.map((item) => {
                const foodInfo = FOOD_BY_ID[item.id] || {};
                const isEaten = eatenDistricts.has(item.id);
                const isSelected = selectedDistrictId === item.id;
                const matchesFilter = !filterDivision || foodInfo.divisionBn === filterDivision;

                let fillColor = isEaten ? `url(#liquidEatenGrad-${theme.id})` : 'currentColor';
                let strokeColor = isEaten ? theme.mapStroke : 'rgba(148, 163, 184, 0.5)';
                let strokeWidth = isSelected ? '8' : isEaten ? '4' : '3';
                let opacity = matchesFilter ? 1 : 0.3;

                if (isSelected) {
                  strokeColor = '#f43f5e';
                  strokeWidth = '12';
                }

                return (
                  <path
                    key={item.id}
                    id={item.id}
                    d={item.d}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    opacity={opacity}
                    className={`district-path ${
                      !isEaten ? 'text-slate-200/80 dark:text-slate-800/80' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDistrict(item.id);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${foodInfo.nameBn || item.id} - ${foodInfo.foodBn || ''} (${
                      isEaten ? 'খেয়েছি' : 'খাইনি'
                    })`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectDistrict(item.id);
                      }
                    }}
                  />
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* Mini Glass Legend Footer */}
      <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3.5 glass-pill px-3.5 py-1.5 rounded-full text-[11px] text-slate-600 dark:text-slate-300 pointer-events-auto font-medium">
          <div className="flex items-center gap-1.5">
            <span
              style={{ background: theme.primaryBtn }}
              className="w-2.5 h-2.5 rounded-full shadow-sm inline-block"
            ></span>
            <span>খেয়েছি ({toBengaliNumerals(eatenDistricts.size)})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300/80 dark:bg-slate-700/80 inline-block"></span>
            <span>বাকি ({toBengaliNumerals(64 - eatenDistricts.size)})</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center text-[11px] text-slate-400 dark:text-slate-500 glass-pill px-3 py-1 rounded-full">
          স্থির মানচিত্র • সহজে ট্যাপ করুন
        </div>
      </div>
    </div>
  );
}
