import React, { useState, useRef, useCallback } from 'react';
import { DISTRICT_PATHS, MAP_WIDTH, MAP_HEIGHT } from '../data/districts-map';
import { FOOD_BY_ID, toBengaliNumerals } from '../data/foods';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function MapView({
  eatenDistricts,
  onSelectDistrict,
  selectedDistrictId,
  filterDivision
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const touchDistanceRef = useRef(null);

  // Reset zoom and pan
  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Zoom In / Out
  const handleZoom = useCallback((delta) => {
    setScale((prev) => {
      const next = Math.min(Math.max(prev + delta, 0.8), 4);
      return Number(next.toFixed(2));
    });
  }, []);

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    handleZoom(delta);
  };

  // Pointer / Mouse drag handlers
  const handlePointerDown = (e) => {
    if (e.button && e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Mobile Touch Gestures
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistanceRef.current = dist;
    } else if (e.touches.length === 1) {
      dragStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchDistanceRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / touchDistanceRef.current;
      setScale((prev) => Math.min(Math.max(prev * ratio, 0.8), 4));
      touchDistanceRef.current = dist;
    } else if (e.touches.length === 1 && !touchDistanceRef.current) {
      setPosition({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y
      });
    }
  };

  const handleTouchEnd = () => {
    touchDistanceRef.current = null;
  };

  return (
    <div className="relative w-full h-[62vh] sm:h-[68vh] glass-panel rounded-3xl overflow-hidden select-none flex flex-col justify-center items-center shadow-2xl">
      {/* Floating Glass Map Controls */}
      <div className="absolute top-3.5 right-3.5 z-20 flex flex-col gap-1.5 glass-panel p-1.5 rounded-2xl shadow-lg">
        <button
          onClick={() => handleZoom(0.3)}
          className="p-2.5 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 active:scale-95 text-slate-700 dark:text-slate-200 transition"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn size={17} />
        </button>
        <button
          onClick={() => handleZoom(-0.3)}
          className="p-2.5 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 active:scale-95 text-slate-700 dark:text-slate-200 transition"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut size={17} />
        </button>
        <button
          onClick={handleReset}
          className="p-2.5 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 active:scale-95 text-slate-700 dark:text-slate-200 transition"
          title="Reset View"
          aria-label="Reset View"
        >
          <RotateCcw size={17} />
        </button>
      </div>

      {/* Floating Glass Instruction Capsule */}
      <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 glass-pill py-1.5 px-3 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
        </span>
        <span>জেলা বেছে নিন ও স্বাদ স্ট্যাম্প দিন</span>
      </div>

      {/* Map Interactive Canvas */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none overflow-hidden ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
          className="w-full h-full max-w-full max-h-full flex items-center justify-center pointer-events-auto"
        >
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="w-full h-full max-h-[92%] object-contain"
            style={{ maxHeight: '92%' }}
          >
            <defs>
              {/* Liquid Luminous Gradient for Eaten Districts */}
              <linearGradient id="liquidEatenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              {/* Liquid Uneaten Frosted Glass Fill for Light Mode */}
              <linearGradient id="liquidUneatenLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.7" />
              </linearGradient>

              {/* Liquid Uneaten Frosted Glass Fill for Dark Mode */}
              <linearGradient id="liquidUneatenDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.75" />
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

                // Color calculations:
                let fillColor = isEaten ? 'url(#liquidEatenGrad)' : 'currentColor';
                let strokeColor = isEaten ? '#38bdf8' : 'rgba(148, 163, 184, 0.5)';
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
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-teal-500 to-sky-400 shadow-sm inline-block"></span>
            <span>খেয়েছি ({toBengaliNumerals(eatenDistricts.size)})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300/80 dark:bg-slate-700/80 inline-block"></span>
            <span>বাকি ({toBengaliNumerals(64 - eatenDistricts.size)})</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center text-[11px] text-slate-400 dark:text-slate-500 glass-pill px-3 py-1 rounded-full">
          পিঞ্চ বা স্ক্রল করে জুম করুন
        </div>
      </div>
    </div>
  );
}
