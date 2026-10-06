import React from 'react';
import { DISTRICT_PATHS, MAP_WIDTH, MAP_HEIGHT } from '../data/districts-map';
import { getRank, toBengaliNumerals } from '../data/foods';

export default function PassportCard({
  eatenDistricts,
  userName,
  userPhoto,
  cardRef,
  isExport = false
}) {
  const eatenCount = eatenDistricts.size;
  const rank = getRank(eatenCount);
  const percent = Math.round((eatenCount / 64) * 100);
  const passportNumber = `BFP-${String(eatenCount).padStart(2, '0')}${8492}`;
  const todayDate = new Date().toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (isExport) {
    // Exact 1080x1350 px layout for image generation (Liquid Glass Aesthetic)
    return (
      <div
        ref={cardRef}
        style={{
          width: '1080px',
          height: '1350px',
          position: 'fixed',
          left: '-9999px',
          top: '0',
          zIndex: -100,
          background: 'radial-gradient(circle at 20% 20%, #064e3b 0%, #022c22 45%, #011914 100%)'
        }}
        className="text-white flex flex-col justify-between p-12 relative select-none overflow-hidden font-bengali"
      >
        {/* Liquid Ambient Caustics / Glows */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-teal-400/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-[40%] -right-32 w-[650px] h-[650px] bg-cyan-400/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-32 left-[25%] w-[500px] h-[500px] bg-emerald-400/15 rounded-full blur-[90px] pointer-events-none"></div>

        {/* Minimalist Liquid Glass Border Frames */}
        <div className="absolute inset-5 border border-white/20 rounded-[32px] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></div>
        <div className="absolute inset-7 border border-[#d4af37]/30 rounded-[24px] pointer-events-none"></div>

        {/* --- HEADER --- */}
        <div className="relative z-10 text-center space-y-2 border-b border-white/15 pb-5">
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl text-[#d4af37]">★</span>
            <span className="text-base tracking-[0.3em] text-[#d4af37] font-bold uppercase">
              PEOPLE'S REPUBLIC OF BANGLADESH
            </span>
            <span className="text-2xl text-[#d4af37]">★</span>
          </div>
          <h2 className="text-5xl font-black tracking-tight text-white drop-shadow-md">
            বাংলাদেশ ফুড পাসপোর্ট
          </h2>
          <p className="text-lg text-emerald-200/90 tracking-widest uppercase font-semibold">
            OFFICIAL CULINARY HERITAGE PASSPORT
          </p>
        </div>

        {/* --- PROFILE & PASSPORT HOLDER (Liquid Glass Compartment) --- */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 20px 40px rgba(0,0,0,0.3)'
          }}
          className="relative z-10 flex items-center justify-between gap-6 p-6 rounded-3xl"
        >
          {/* Photo */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 rounded-2xl border-2 border-[#d4af37] overflow-hidden bg-emerald-950 shadow-xl flex items-center justify-center">
              {userPhoto ? (
                <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-2">
                  <span className="text-5xl block mb-1">🍲</span>
                  <span className="text-xs text-emerald-300 font-bold uppercase">ভোজনপ্রেমী</span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-2.5 -right-2.5 transform rotate-[-10deg]">
              <div className="bg-[#f42a41] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg border border-white/40 uppercase tracking-wider">
                VERIFIED
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-1.5 text-left">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300 block">
                পাসপোর্টধারী / HOLDER NAME
              </span>
              <h3 className="text-4xl font-extrabold text-white truncate max-w-[460px]">
                {userName || 'ভোজনপ্রেমী পর্যটক'}
              </h3>
            </div>
            <div className="flex items-center gap-8 pt-1 text-base text-emerald-200">
              <div>
                <span className="text-xs text-emerald-400 uppercase tracking-wide block">পাসপোর্ট নম্বর</span>
                <span className="font-mono font-bold tracking-wider">{passportNumber}</span>
              </div>
              <div>
                <span className="text-xs text-emerald-400 uppercase tracking-wide block">ইস্যুর তারিখ</span>
                <span className="font-semibold">{todayDate}</span>
              </div>
            </div>
          </div>

          {/* Rank Badge */}
          <div className="shrink-0 text-center pl-6 border-l border-white/15">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] block mb-1.5">
              মর্যাদা / RANK
            </span>
            <div
              className={`px-6 py-2.5 rounded-2xl bg-gradient-to-r ${rank.badgeClass} text-white font-black text-2xl shadow-lg border border-white/30`}
            >
              {rank.titleBn}
            </div>
            <span className="text-xs font-bold text-emerald-300 block mt-1.5 uppercase tracking-wide">
              {rank.titleEn}
            </span>
          </div>
        </div>

        {/* --- MAP OF BANGLADESH --- */}
        <div className="relative z-10 flex-1 my-2 flex items-center justify-center">
          <div className="w-[580px] h-[510px] flex items-center justify-center relative">
            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
            >
              <defs>
                <linearGradient id="exportLiquidEaten" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <g>
                {DISTRICT_PATHS.map((item) => {
                  const isEaten = eatenDistricts.has(item.id);
                  return (
                    <path
                      key={item.id}
                      d={item.d}
                      fill={isEaten ? 'url(#exportLiquidEaten)' : 'rgba(255, 255, 255, 0.08)'}
                      stroke={isEaten ? '#ffffff' : 'rgba(255, 255, 255, 0.18)'}
                      strokeWidth={isEaten ? '6' : '3.5'}
                      strokeLinejoin="round"
                    />
                  );
                })}
              </g>
            </svg>

            {/* Map Legend (Liquid Pill) */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.09)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
              className="absolute bottom-2 right-4 px-4 py-2 rounded-2xl text-sm space-y-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 inline-block shadow-md"></span>
                <span className="font-semibold text-white">
                  স্বাদ গ্রহণ: {toBengaliNumerals(eatenCount)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-white/20 border border-white/30 inline-block"></span>
                <span className="text-emerald-300">
                  বাকি: {toBengaliNumerals(64 - eatenCount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- STATS & COMPLETION BAR (Liquid Glass Panel) --- */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2)'
          }}
          className="relative z-10 p-6 rounded-3xl space-y-3.5"
        >
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300 block mb-1">
                ভোজন অগ্রগতি / PROGRESS
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black text-white tracking-tight">
                  {toBengaliNumerals(eatenCount)}
                  <span className="text-3xl text-emerald-400 font-bold">
                    {' '}
                    / {toBengaliNumerals(64)}
                  </span>
                </span>
                <span className="text-xl font-bold text-emerald-200">জেলা সম্পন্ন</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-5xl font-black text-[#d4af37] tracking-tight">
                {toBengaliNumerals(percent)}%
              </span>
            </div>
          </div>

          <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden p-[1px] border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-[#d4af37] rounded-full shadow-[0_0_12px_rgba(20,184,166,0.5)]"
              style={{ width: `${Math.max(percent, 3)}%` }}
            ></div>
          </div>

          <p className="text-base text-emerald-200/90 text-center font-medium">
            {eatenCount === 64
              ? 'অভিনন্দন! আপনি সমগ্র বাংলাদেশের ৬৪ জেলার অবিস্মরণীয় স্বাদ জয় করেছেন!'
              : `আরও ${toBengaliNumerals(64 - eatenCount)}টি জেলার বিখ্যাত খাবার চেখে দেখার রোমাঞ্চকর অভিযান বাকি!`}
          </p>
        </div>

        {/* --- FOOTER & LINK --- */}
        <div className="relative z-10 pt-3 flex items-center justify-between border-t border-white/15 text-emerald-300 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌐</span>
            <span className="font-semibold tracking-wide text-white">
              bd-food-passport.vercel.app
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs text-emerald-300/80 font-medium">
              Developed by S. M. Mahmud Iqbal
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest block">
              আপনার পাসপোর্ট তৈরি করুন • MAKE YOUR PASSPORT
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Responsive on-screen card preview (Minimalist Liquid Glass)
  return (
    <div
      style={{
        background: 'radial-gradient(circle at 20% 20%, #064e3b 0%, #022c22 55%, #011914 100%)'
      }}
      className="w-full aspect-[4/5] text-white rounded-[28px] p-4 sm:p-5 flex flex-col justify-between relative select-none overflow-hidden border border-white/25 shadow-2xl font-bengali"
    >
      {/* Specular Inner Highlight Border */}
      <div className="absolute inset-2 border border-white/15 rounded-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="text-center relative z-10 border-b border-white/15 pb-2">
        <div className="flex items-center justify-center gap-1.5 text-[#d4af37] text-[9px] tracking-widest font-semibold uppercase">
          <span>★</span>
          <span>BANGLADESH FOOD PASSPORT</span>
          <span>★</span>
        </div>
        <h3 className="text-lg font-black text-white leading-tight">
          বাংলাদেশ ফুড পাসপোর্ট
        </h3>
      </div>

      {/* Profile & Rank Compartment */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}
        className="relative z-10 flex items-center gap-3 p-2.5 rounded-2xl"
      >
        <div className="relative shrink-0">
          <div className="w-13 h-13 rounded-xl border border-[#d4af37] overflow-hidden bg-emerald-950 flex items-center justify-center shadow-md">
            {userPhoto ? (
              <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl">🍲</span>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-[9px] text-emerald-300 block uppercase font-medium">পাসপোর্টধারী</span>
          <h4 className="font-extrabold text-sm text-white truncate">
            {userName || 'ভোজনপ্রেমী পর্যটক'}
          </h4>
          <span className="text-[9px] text-emerald-400 block font-mono">{passportNumber}</span>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[8px] text-[#d4af37] block uppercase font-medium">মর্যাদা</span>
          <div
            className={`px-2.5 py-1 rounded-xl bg-gradient-to-r ${rank.badgeClass} text-white font-black text-[11px] shadow-sm border border-white/20`}
          >
            {rank.titleBn}
          </div>
        </div>
      </div>

      {/* Mini SVG Map Representation */}
      <div className="relative z-10 flex-1 my-1.5 flex items-center justify-center min-h-[130px]">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="w-full h-full max-h-[170px] sm:max-h-[200px] object-contain drop-shadow-md"
        >
          <g>
            {DISTRICT_PATHS.map((item) => {
              const isEaten = eatenDistricts.has(item.id);
              return (
                <path
                  key={item.id}
                  d={item.d}
                  fill={isEaten ? '#14b8a6' : 'rgba(255, 255, 255, 0.1)'}
                  stroke={isEaten ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'}
                  strokeWidth={isEaten ? '5' : '3'}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Stats Summary */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}
        className="relative z-10 p-2.5 rounded-2xl space-y-1.5"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white">
              {toBengaliNumerals(eatenCount)}
            </span>
            <span className="text-xs text-emerald-400 font-bold">/ {toBengaliNumerals(64)} জেলা</span>
          </div>
          <span className="font-black text-base text-[#d4af37]">
            {toBengaliNumerals(percent)}%
          </span>
        </div>

        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-[#d4af37] rounded-full"
            style={{ width: `${Math.max(percent, 3)}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-1.5 flex items-center justify-between text-[8px] sm:text-[9px] text-emerald-300 border-t border-white/15">
        <span className="truncate">bd-food-passport.vercel.app</span>
        <span className="text-white/40">•</span>
        <span className="text-emerald-300/80 truncate">Dev: S. M. Mahmud Iqbal</span>
        <span className="text-[#d4af37] font-semibold shrink-0">ভোজন পাসপোর্ট</span>
      </div>
    </div>
  );
}
