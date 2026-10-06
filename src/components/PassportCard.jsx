import React from 'react';
import { DISTRICT_PATHS, MAP_WIDTH, MAP_HEIGHT } from '../data/districts-map';
import { getRank, toBengaliNumerals } from '../data/foods';
import { getTheme } from '../data/themes';

export default function PassportCard({
  eatenDistricts,
  userName,
  userPhoto,
  cardRef,
  themeId = 'emerald',
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

  const theme = getTheme(themeId);

  if (isExport) {
    // Exact 1080x1350 px layout for image generation (Liquid Glass Aesthetic)
    return (
      <div
        ref={cardRef}
        style={{
          width: '1080px',
          height: '1350px',
          background: theme.gradientBg
        }}
        className="text-white flex flex-col justify-between p-12 relative select-none overflow-hidden font-bengali"
      >
        {/* Liquid Ambient Caustics / Glows */}
        <div className={`absolute -top-32 -left-32 w-[600px] h-[600px] ${theme.glowColor} rounded-full blur-[110px] pointer-events-none`}></div>
        <div className={`absolute top-[40%] -right-32 w-[650px] h-[650px] ${theme.glowColor} rounded-full blur-[130px] pointer-events-none`}></div>
        <div className="absolute -bottom-32 left-[25%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[90px] pointer-events-none"></div>

        {/* Minimalist Liquid Glass Border Frames */}
        <div className="absolute inset-5 border border-white/20 rounded-[32px] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></div>
        <div
          className="absolute inset-7 rounded-[24px] pointer-events-none"
          style={{ border: `1px solid ${theme.goldAccent}44` }}
        ></div>

        {/* --- HEADER --- */}
        <div className="relative z-10 text-center space-y-2 border-b border-white/15 pb-5">
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl" style={{ color: theme.goldAccent }}>★</span>
            <span
              className="text-base tracking-[0.3em] font-bold uppercase"
              style={{ color: theme.goldAccent }}
            >
              PEOPLE'S REPUBLIC OF BANGLADESH
            </span>
            <span className="text-2xl" style={{ color: theme.goldAccent }}>★</span>
          </div>
          <h2 className="text-5xl font-black tracking-tight text-white drop-shadow-md">
            বাংলাদেশ ফুড পাসপোর্ট
          </h2>
          <p className={`text-lg ${theme.subTextColor} tracking-widest uppercase font-semibold`}>
            OFFICIAL CULINARY HERITAGE PASSPORT • {theme.nameEn.toUpperCase()}
          </p>
        </div>

        {/* --- PROFILE & PASSPORT HOLDER (Liquid Glass Compartment) --- */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 20px 40px rgba(0,0,0,0.3)'
          }}
          className="relative z-10 flex items-center justify-between gap-6 p-6 rounded-3xl"
        >
          {/* Photo (Strict Sizing to Prevent Layout Overflow) */}
          <div className="relative shrink-0">
            <div
              style={{
                width: '128px',
                height: '128px',
                borderColor: theme.goldAccent
              }}
              className="w-32 h-32 rounded-2xl border-2 overflow-hidden bg-black/40 shadow-xl flex items-center justify-center aspect-square shrink-0"
            >
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt="User"
                  className="w-full h-full object-cover object-center aspect-square block"
                />
              ) : (
                <div className="text-center p-2">
                  <span className="text-5xl block mb-1">🍲</span>
                  <span className={`text-xs ${theme.textColor} font-bold uppercase`}>ভোজনপ্রেমী</span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-2.5 -right-2.5 transform rotate-[-10deg]">
              <div
                style={{ backgroundColor: theme.tagColor }}
                className="text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg border border-white/40 uppercase tracking-wider"
              >
                VERIFIED
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-1.5 text-left min-w-0">
            <div>
              <span className={`text-xs font-semibold uppercase tracking-widest ${theme.textColor} block`}>
                পাসপোর্টধারী / HOLDER NAME
              </span>
              <h3 className="text-4xl font-extrabold text-white truncate max-w-[480px]">
                {userName || 'ভোজনপ্রেমী পর্যটক'}
              </h3>
            </div>
            <div className={`flex items-center gap-8 pt-1 text-base ${theme.subTextColor}`}>
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wide block">পাসপোর্ট নম্বর</span>
                <span className="font-mono font-bold tracking-wider">{passportNumber}</span>
              </div>
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wide block">ইস্যুর তারিখ</span>
                <span className="font-semibold">{todayDate}</span>
              </div>
            </div>
          </div>

          {/* Rank Badge */}
          <div className="shrink-0 text-center pl-6 border-l border-white/15">
            <span
              className="text-xs font-semibold uppercase tracking-wider block mb-1.5"
              style={{ color: theme.goldAccent }}
            >
              মর্যাদা / RANK
            </span>
            <div
              className={`px-6 py-2.5 rounded-2xl bg-gradient-to-r ${rank.badgeClass} text-white font-black text-2xl shadow-lg border border-white/30`}
            >
              {rank.titleBn}
            </div>
            <span className={`text-xs font-bold ${theme.textColor} block mt-1.5 uppercase tracking-wide`}>
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
                <linearGradient id={`exportLiquidEaten-${theme.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={theme.mapFill1} />
                  <stop offset="50%" stopColor={theme.mapFill2} />
                  <stop offset="100%" stopColor={theme.mapFill3} />
                </linearGradient>
              </defs>
              <g>
                {DISTRICT_PATHS.map((item) => {
                  const isEaten = eatenDistricts.has(item.id);
                  return (
                    <path
                      key={item.id}
                      d={item.d}
                      fill={isEaten ? `url(#exportLiquidEaten-${theme.id})` : 'rgba(255, 255, 255, 0.08)'}
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
                <span
                  style={{ backgroundColor: theme.accentColor }}
                  className="w-3.5 h-3.5 rounded-full inline-block shadow-md"
                ></span>
                <span className="font-semibold text-white">
                  স্বাদ গ্রহণ: {toBengaliNumerals(eatenCount)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-white/20 border border-white/30 inline-block"></span>
                <span className={theme.textColor}>
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
              <span className={`text-xs font-semibold uppercase tracking-widest ${theme.textColor} block mb-1`}>
                ভোজন অগ্রগতি / PROGRESS
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black text-white tracking-tight">
                  {toBengaliNumerals(eatenCount)}
                  <span className={`text-3xl ${theme.textColor} font-bold`}>
                    {' '}
                    / {toBengaliNumerals(64)}
                  </span>
                </span>
                <span className={`text-xl font-bold ${theme.subTextColor}`}>জেলা সম্পন্ন</span>
              </div>
            </div>

            <div className="text-right">
              <span
                className="text-5xl font-black tracking-tight"
                style={{ color: theme.goldAccent }}
              >
                {toBengaliNumerals(percent)}%
              </span>
            </div>
          </div>

          <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden p-[1px] border border-white/20">
            <div
              className={`h-full bg-gradient-to-r ${theme.progressBar} rounded-full shadow-[0_0_12px_rgba(255,255,255,0.4)]`}
              style={{ width: `${Math.max(percent, 3)}%` }}
            ></div>
          </div>

          <p className={`text-base ${theme.subTextColor} text-center font-medium`}>
            {eatenCount === 64
              ? 'অভিনন্দন! আপনি সমগ্র বাংলাদেশের ৬৪ জেলার অবিস্মরণীয় স্বাদ জয় করেছেন!'
              : `আরও ${toBengaliNumerals(64 - eatenCount)}টি জেলার বিখ্যাত খাবার চেখে দেখার রোমাঞ্চকর অভিযান বাকি!`}
          </p>
        </div>

        {/* --- FOOTER & LINK --- */}
        <div className={`relative z-10 pt-3 flex items-center justify-between border-t border-white/15 ${theme.textColor} text-sm`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌐</span>
            <span className="font-semibold tracking-wide text-white">
              bd-food-passport.vercel.app
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs text-white/80 font-medium">
              Developed by S. M. Mahmud Iqbal
            </span>
          </div>

          <div className="text-right">
            <span
              className="text-xs font-semibold uppercase tracking-widest block"
              style={{ color: theme.goldAccent }}
            >
              আপনার পাসপোর্ট তৈরি করুন • MAKE YOUR PASSPORT
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Responsive on-screen card preview (Minimalist Liquid Glass)
  // Designed with absolute containment and strict dimensions so photo uploads never break layout
  return (
    <div
      style={{
        background: theme.gradientBg
      }}
      className="w-full max-w-[340px] aspect-[4/5] mx-auto text-white rounded-[28px] p-4 flex flex-col justify-between relative select-none overflow-hidden border border-white/25 shadow-2xl font-bengali box-border"
    >
      {/* Ambient Glows */}
      <div className={`absolute -top-12 -left-12 w-48 h-48 ${theme.glowColor} rounded-full blur-[50px] pointer-events-none`}></div>
      <div className={`absolute -bottom-12 -right-12 w-48 h-48 ${theme.glowColor} rounded-full blur-[50px] pointer-events-none`}></div>

      {/* Specular Inner Highlight Border */}
      <div className="absolute inset-1.5 border border-white/15 rounded-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="text-center relative z-10 border-b border-white/15 pb-2 shrink-0">
        <div
          className="flex items-center justify-center gap-1.5 text-[9px] tracking-widest font-semibold uppercase"
          style={{ color: theme.goldAccent }}
        >
          <span>★</span>
          <span>BANGLADESH FOOD PASSPORT</span>
          <span>★</span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-white leading-tight">
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
        className="relative z-10 flex items-center gap-2.5 p-2 rounded-2xl shrink-0"
      >
        {/* Strict Avatar Dimensions to PREVENT IMAGE OVERFLOW BUG */}
        <div className="relative shrink-0">
          <div
            style={{
              width: '46px',
              height: '46px',
              minWidth: '46px',
              minHeight: '46px',
              maxWidth: '46px',
              maxHeight: '46px',
              borderColor: theme.goldAccent
            }}
            className="rounded-xl border overflow-hidden bg-black/40 flex items-center justify-center shadow-md shrink-0 aspect-square"
          >
            {userPhoto ? (
              <img
                src={userPhoto}
                alt="User"
                className="w-full h-full object-cover object-center aspect-square block"
              />
            ) : (
              <span className="text-xl">🍲</span>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 text-left">
          <span className={`text-[9px] ${theme.textColor} block uppercase font-medium leading-none mb-0.5`}>
            পাসপোর্টধারী
          </span>
          <h4 className="font-extrabold text-xs sm:text-sm text-white truncate leading-tight">
            {userName || 'ভোজনপ্রেমী পর্যটক'}
          </h4>
          <span className="text-[9px] text-white/60 block font-mono leading-none mt-0.5">
            {passportNumber}
          </span>
        </div>

        <div className="text-right shrink-0">
          <span
            className="text-[8px] block uppercase font-medium leading-none mb-0.5"
            style={{ color: theme.goldAccent }}
          >
            মর্যাদা
          </span>
          <div
            className={`px-2 py-0.5 rounded-lg bg-gradient-to-r ${rank.badgeClass} text-white font-black text-[10px] shadow-sm border border-white/20`}
          >
            {rank.titleBn}
          </div>
        </div>
      </div>

      {/* Mini SVG Map Representation (Flexibly sized without pushing layout) */}
      <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center my-1">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="w-full h-full max-h-[155px] object-contain drop-shadow-md"
        >
          <defs>
            <linearGradient id={`previewLiquidEaten-${theme.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.mapFill1} />
              <stop offset="50%" stopColor={theme.mapFill2} />
              <stop offset="100%" stopColor={theme.mapFill3} />
            </linearGradient>
          </defs>
          <g>
            {DISTRICT_PATHS.map((item) => {
              const isEaten = eatenDistricts.has(item.id);
              return (
                <path
                  key={item.id}
                  d={item.d}
                  fill={isEaten ? `url(#previewLiquidEaten-${theme.id})` : 'rgba(255, 255, 255, 0.1)'}
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
        className="relative z-10 p-2 rounded-2xl space-y-1 shrink-0"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-white leading-none">
              {toBengaliNumerals(eatenCount)}
            </span>
            <span className={`text-[10px] ${theme.textColor} font-bold leading-none`}>
              / {toBengaliNumerals(64)} জেলা
            </span>
          </div>
          <span
            className="font-black text-sm leading-none"
            style={{ color: theme.goldAccent }}
          >
            {toBengaliNumerals(percent)}%
          </span>
        </div>

        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden p-[1px]">
          <div
            className={`h-full bg-gradient-to-r ${theme.progressBar} rounded-full`}
            style={{ width: `${Math.max(percent, 3)}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className={`relative z-10 pt-1.5 flex items-center justify-between text-[8px] ${theme.textColor} border-t border-white/15 shrink-0`}>
        <span className="truncate">bd-food-passport.vercel.app</span>
        <span className="text-white/40">•</span>
        <span className="text-white/80 truncate">Dev: S. M. Mahmud Iqbal</span>
        <span style={{ color: theme.goldAccent }} className="font-semibold shrink-0">
          {theme.nameBn}
        </span>
      </div>
    </div>
  );
}
