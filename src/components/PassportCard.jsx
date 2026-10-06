import React from 'react';
import { DISTRICT_PATHS, MAP_WIDTH, MAP_HEIGHT } from '../data/districts-map';
import { getRank, toBengaliNumerals } from '../data/foods';
import { getTheme } from '../data/themes';
import { getUnlockedBadges } from '../data/badges';

export default function PassportCard({
  eatenDistricts,
  userName,
  userPhoto,
  cardRef,
  themeId = 'emerald',
  cardFormat = 'post', // 'post' (4:5) | 'story' (9:16) | 'boarding_pass'
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
  const badges = getUnlockedBadges(eatenDistricts);
  const unlockedBadges = badges.filter((b) => b.isUnlocked);

  // ==========================================
  // EXPORT LAYOUTS (Exact Pixels for Download)
  // ==========================================
  if (isExport) {
    // ----------------------------------------
    // 1. STORY FORMAT (1080x1920, 9:16)
    // ----------------------------------------
    if (cardFormat === 'story') {
      return (
        <div
          ref={cardRef}
          style={{
            width: '1080px',
            height: '1920px',
            background: theme.gradientBg
          }}
          className="text-white flex flex-col justify-between p-14 relative select-none overflow-hidden font-bengali"
        >
          {/* Ambient Glows */}
          <div className={`absolute -top-32 -left-32 w-[700px] h-[700px] ${theme.glowColor} rounded-full blur-[120px] pointer-events-none`}></div>
          <div className={`absolute top-[40%] -right-32 w-[750px] h-[750px] ${theme.glowColor} rounded-full blur-[140px] pointer-events-none`}></div>
          <div className="absolute -bottom-32 left-[25%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Border Frames */}
          <div className="absolute inset-6 border border-white/20 rounded-[40px] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></div>
          <div
            className="absolute inset-9 rounded-[32px] pointer-events-none"
            style={{ border: `1px solid ${theme.goldAccent}44` }}
          ></div>

          {/* Header */}
          <div className="relative z-10 text-center space-y-2.5 border-b border-white/15 pb-6 pt-2">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl" style={{ color: theme.goldAccent }}>★</span>
              <span
                className="text-lg tracking-[0.3em] font-bold uppercase"
                style={{ color: theme.goldAccent }}
              >
                PEOPLE'S REPUBLIC OF BANGLADESH
              </span>
              <span className="text-2xl" style={{ color: theme.goldAccent }}>★</span>
            </div>
            <h2 className="text-6xl font-black tracking-tight text-white drop-shadow-md">
              বাংলাদেশ ফুড পাসপোর্ট
            </h2>
            <p className={`text-xl ${theme.subTextColor} tracking-widest uppercase font-semibold`}>
              INSTAGRAM & FACEBOOK STORY • {theme.nameEn.toUpperCase()}
            </p>
          </div>

          {/* Profile & Rank Compartment */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 20px 40px rgba(0,0,0,0.3)'
            }}
            className="relative z-10 flex items-center justify-between gap-6 p-7 rounded-3xl"
          >
            <div className="relative shrink-0">
              <div
                style={{
                  width: '136px',
                  height: '136px',
                  borderColor: theme.goldAccent
                }}
                className="rounded-2xl border-2 overflow-hidden bg-black/40 shadow-xl flex items-center justify-center aspect-square shrink-0"
              >
                {userPhoto ? (
                  <img src={userPhoto} alt="User" className="w-full h-full object-cover aspect-square block" />
                ) : (
                  <span className="text-6xl">🍲</span>
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

            <div className="flex-1 space-y-1.5 text-left min-w-0">
              <span className={`text-sm font-semibold uppercase tracking-widest ${theme.textColor} block`}>
                পাসপোর্টধারী / HOLDER
              </span>
              <h3 className="text-5xl font-extrabold text-white truncate max-w-[480px]">
                {userName || 'ভোজনপ্রেমী পর্যটক'}
              </h3>
              <div className={`flex items-center gap-6 pt-1 text-base ${theme.subTextColor}`}>
                <span>নম্বর: <strong className="font-mono text-white">{passportNumber}</strong></span>
                <span>তারিখ: <strong className="text-white">{todayDate}</strong></span>
              </div>
            </div>

            <div className="shrink-0 text-center pl-6 border-l border-white/15">
              <span className="text-sm font-semibold uppercase tracking-wider block mb-1.5" style={{ color: theme.goldAccent }}>
                মর্যাদা / RANK
              </span>
              <div className={`px-7 py-3 rounded-2xl bg-gradient-to-r ${rank.badgeClass} text-white font-black text-2xl shadow-lg border border-white/30`}>
                {rank.titleBn}
              </div>
            </div>
          </div>

          {/* Unlocked Badges Row (Story Highlight) */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.14)'
            }}
            className="relative z-10 p-5 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.goldAccent }}>
                🏆 রন্ধনশিল্পের বিশেষ অর্জনসমূহ ({toBengaliNumerals(unlockedBadges.length)}/{toBengaliNumerals(badges.length)})
              </span>
              <span className="text-xs text-white/60 font-semibold">CULINARY BADGES</span>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-2.5 rounded-2xl text-center flex flex-col items-center gap-1 ${
                    b.isUnlocked
                      ? 'bg-white/15 border border-white/30 shadow-md'
                      : 'bg-black/20 opacity-40 border border-white/5'
                  }`}
                >
                  <span className="text-3xl">{b.emoji}</span>
                  <span className="text-[11px] font-bold text-white truncate w-full">{b.titleBn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bangladesh SVG Map */}
          <div className="relative z-10 flex-1 my-3 flex items-center justify-center">
            <div className="w-[660px] h-[600px] flex items-center justify-center relative">
              <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)]">
                <defs>
                  <linearGradient id={`exportStoryEaten-${theme.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
                        fill={isEaten ? `url(#exportStoryEaten-${theme.id})` : 'rgba(255, 255, 255, 0.08)'}
                        stroke={isEaten ? '#ffffff' : 'rgba(255, 255, 255, 0.18)'}
                        strokeWidth={isEaten ? '6.5' : '3.5'}
                        strokeLinejoin="round"
                      />
                    );
                  })}
                </g>
              </svg>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.09)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
                className="absolute bottom-2 right-4 px-5 py-2.5 rounded-2xl text-base space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span style={{ backgroundColor: theme.accentColor }} className="w-4 h-4 rounded-full inline-block shadow-md"></span>
                  <span className="font-semibold text-white">স্বাদ গ্রহণ: {toBengaliNumerals(eatenCount)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/20 border border-white/30 inline-block"></span>
                  <span className={theme.textColor}>বাকি: {toBengaliNumerals(64 - eatenCount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
            className="relative z-10 p-7 rounded-3xl space-y-4"
          >
            <div className="flex items-end justify-between">
              <div>
                <span className={`text-sm font-semibold uppercase tracking-widest ${theme.textColor} block mb-1`}>
                  ভোজন অগ্রগতি / PROGRESS
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-black text-white tracking-tight">
                    {toBengaliNumerals(eatenCount)}
                    <span className={`text-4xl ${theme.textColor} font-bold`}> / {toBengaliNumerals(64)}</span>
                  </span>
                  <span className={`text-2xl font-bold ${theme.subTextColor}`}>জেলা সম্পন্ন</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-6xl font-black tracking-tight" style={{ color: theme.goldAccent }}>
                  {toBengaliNumerals(percent)}%
                </span>
              </div>
            </div>

            <div className="w-full bg-white/10 h-5 rounded-full overflow-hidden p-[1px] border border-white/20">
              <div
                className={`h-full bg-gradient-to-r ${theme.progressBar} rounded-full shadow-[0_0_12px_rgba(255,255,255,0.4)]`}
                style={{ width: `${Math.max(percent, 3)}%` }}
              ></div>
            </div>
          </div>

          {/* Footer */}
          <div className={`relative z-10 pt-4 flex items-center justify-between border-t border-white/15 ${theme.textColor} text-base`}>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🌐</span>
              <span className="font-semibold text-white">bd-food-passport.vercel.app</span>
              <span className="text-white/40">•</span>
              <span className="text-sm text-white/80">Developed by S. M. Mahmud Iqbal</span>
            </div>
            <span style={{ color: theme.goldAccent }} className="font-semibold tracking-wider uppercase text-sm">
              YOUR STORY • YOUR PASSPORT
            </span>
          </div>
        </div>
      );
    }

    // ----------------------------------------
    // 2. BOARDING PASS FORMAT (1080x1350)
    // ----------------------------------------
    if (cardFormat === 'boarding_pass') {
      return (
        <div
          ref={cardRef}
          style={{
            width: '1080px',
            height: '1350px',
            background: 'radial-gradient(circle at 10% 10%, #0f172a 0%, #020617 100%)'
          }}
          className="text-white flex flex-col justify-between p-12 relative select-none overflow-hidden font-bengali"
        >
          {/* Border Frames */}
          <div className="absolute inset-5 border-2 border-dashed border-white/25 rounded-[32px] pointer-events-none"></div>

          {/* Airline Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-5">
            <div className="flex items-center gap-4">
              <div
                style={{ background: theme.primaryBtn }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
              >
                ✈️
              </div>
              <div>
                <h2 className="text-3xl font-black text-white tracking-wide uppercase">
                  BANGLADESH CULINARY AIRWAYS
                </h2>
                <span className="text-sm tracking-[0.25em] font-bold text-amber-400 block uppercase">
                  OFFICIAL BOARDING PASS • ৬৪ জেলা স্বাদ যাত্রা
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-white/60 block uppercase font-mono">FLIGHT / ফ্লাইট</span>
              <span className="text-3xl font-black text-amber-400 font-mono tracking-wider">BD-64</span>
            </div>
          </div>

          {/* Ticket Body: Flight Grid */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
            className="relative z-10 p-6 rounded-3xl grid grid-cols-4 gap-6 text-left"
          >
            <div>
              <span className="text-xs text-white/60 uppercase block font-medium">PASSENGER / যাত্রী</span>
              <h3 className="text-2xl font-black text-white truncate">{userName || 'ভোজনপ্রেমী পর্যটক'}</h3>
            </div>
            <div>
              <span className="text-xs text-white/60 uppercase block font-medium">GATE / গেট</span>
              <h3 className="text-2xl font-black text-amber-400 font-mono">64-DIST</h3>
            </div>
            <div>
              <span className="text-xs text-white/60 uppercase block font-medium">SEAT / আসন</span>
              <h3 className="text-2xl font-black text-white font-mono">{rank.titleBn}</h3>
            </div>
            <div>
              <span className="text-xs text-white/60 uppercase block font-medium">CLASS / শ্রেণি</span>
              <h3 className="text-2xl font-black text-emerald-400 uppercase font-mono">VIP FOODIE</h3>
            </div>
          </div>

          {/* Center: Map & Ticket details */}
          <div className="relative z-10 flex items-center justify-between gap-8 my-2 flex-1">
            <div className="w-[480px] h-[450px] flex items-center justify-center">
              <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
                <g>
                  {DISTRICT_PATHS.map((item) => {
                    const isEaten = eatenDistricts.has(item.id);
                    return (
                      <path
                        key={item.id}
                        d={item.d}
                        fill={isEaten ? theme.accentColor : 'rgba(255, 255, 255, 0.1)'}
                        stroke={isEaten ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'}
                        strokeWidth={isEaten ? '6' : '3'}
                      />
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* Right Perforated Ticket Stub */}
            <div className="flex-1 space-y-4 pl-6 border-l-2 border-dashed border-white/20">
              <div className="w-24 h-24 rounded-2xl border-2 border-amber-400 overflow-hidden shadow-lg mx-auto bg-black/40">
                {userPhoto ? (
                  <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl flex items-center justify-center h-full">🍲</span>
                )}
              </div>

              <div className="text-center">
                <span className="text-4xl font-black text-white">
                  {toBengaliNumerals(eatenCount)} <span className="text-2xl text-amber-400">/ ৬৪</span>
                </span>
                <span className="text-xs text-white/60 uppercase block mt-1">জেলা সম্পন্ন • {toBengaliNumerals(percent)}%</span>
              </div>

              {/* Barcode Graphic */}
              <div className="pt-2">
                <div className="h-14 w-full bg-white/90 rounded-xl p-2 flex items-center justify-between px-3">
                  {[...Array(38)].map((_, i) => (
                    <div
                      key={i}
                      className="h-full bg-slate-900 rounded-sm"
                      style={{ width: `${(i % 3) + 1.5}px` }}
                    ></div>
                  ))}
                </div>
                <span className="text-[11px] font-mono tracking-widest text-white/60 text-center block mt-1">
                  * BFP-BOARDING-PASS-{passportNumber} *
                </span>
              </div>
            </div>
          </div>

          {/* Boarding Pass Footer */}
          <div className="relative z-10 pt-4 flex items-center justify-between border-t border-white/15 text-sm text-white/70">
            <span>bd-food-passport.vercel.app</span>
            <span className="text-white/40">•</span>
            <span>Developed by S. M. Mahmud Iqbal</span>
            <span className="text-amber-400 font-mono font-bold">READY FOR BOARDING ✓</span>
          </div>
        </div>
      );
    }

    // ----------------------------------------
    // 3. POST FORMAT (1080x1350, 4:5 Default)
    // ----------------------------------------
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
        {/* Glows */}
        <div className={`absolute -top-32 -left-32 w-[600px] h-[600px] ${theme.glowColor} rounded-full blur-[110px] pointer-events-none`}></div>
        <div className={`absolute top-[40%] -right-32 w-[650px] h-[650px] ${theme.glowColor} rounded-full blur-[130px] pointer-events-none`}></div>
        <div className="absolute -bottom-32 left-[25%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[90px] pointer-events-none"></div>

        {/* Frames */}
        <div className="absolute inset-5 border border-white/20 rounded-[32px] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></div>
        <div
          className="absolute inset-7 rounded-[24px] pointer-events-none"
          style={{ border: `1px solid ${theme.goldAccent}44` }}
        ></div>

        {/* Header */}
        <div className="relative z-10 text-center space-y-2 border-b border-white/15 pb-5">
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl" style={{ color: theme.goldAccent }}>★</span>
            <span className="text-base tracking-[0.3em] font-bold uppercase" style={{ color: theme.goldAccent }}>
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

        {/* Profile */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 20px 40px rgba(0,0,0,0.3)'
          }}
          className="relative z-10 flex items-center justify-between gap-6 p-6 rounded-3xl"
        >
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
                <img src={userPhoto} alt="User" className="w-full h-full object-cover aspect-square block" />
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

          <div className="flex-1 space-y-1.5 text-left min-w-0">
            <span className={`text-xs font-semibold uppercase tracking-widest ${theme.textColor} block`}>
              পাসপোর্টধারী / HOLDER NAME
            </span>
            <h3 className="text-4xl font-extrabold text-white truncate max-w-[480px]">
              {userName || 'ভোজনপ্রেমী পর্যটক'}
            </h3>
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

          <div className="shrink-0 text-center pl-6 border-l border-white/15">
            <span className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: theme.goldAccent }}>
              মর্যাদা / RANK
            </span>
            <div className={`px-6 py-2.5 rounded-2xl bg-gradient-to-r ${rank.badgeClass} text-white font-black text-2xl shadow-lg border border-white/30`}>
              {rank.titleBn}
            </div>
            <span className={`text-xs font-bold ${theme.textColor} block mt-1.5 uppercase tracking-wide`}>
              {rank.titleEn}
            </span>
          </div>
        </div>

        {/* Map */}
        <div className="relative z-10 flex-1 my-2 flex items-center justify-center">
          <div className="w-[580px] h-[510px] flex items-center justify-center relative">
            <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
              <defs>
                <linearGradient id={`exportPostEaten-${theme.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
                      fill={isEaten ? `url(#exportPostEaten-${theme.id})` : 'rgba(255, 255, 255, 0.08)'}
                      stroke={isEaten ? '#ffffff' : 'rgba(255, 255, 255, 0.18)'}
                      strokeWidth={isEaten ? '6' : '3.5'}
                      strokeLinejoin="round"
                    />
                  );
                })}
              </g>
            </svg>

            {/* Map Legend */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.09)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
              className="absolute bottom-2 right-4 px-4 py-2 rounded-2xl text-sm space-y-1"
            >
              <div className="flex items-center gap-2">
                <span style={{ backgroundColor: theme.accentColor }} className="w-3.5 h-3.5 rounded-full inline-block shadow-md"></span>
                <span className="font-semibold text-white">স্বাদ গ্রহণ: {toBengaliNumerals(eatenCount)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-white/20 border border-white/30 inline-block"></span>
                <span className={theme.textColor}>বাকি: {toBengaliNumerals(64 - eatenCount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
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
                  <span className={`text-3xl ${theme.textColor} font-bold`}> / {toBengaliNumerals(64)}</span>
                </span>
                <span className={`text-xl font-bold ${theme.subTextColor}`}>জেলা সম্পন্ন</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-5xl font-black tracking-tight" style={{ color: theme.goldAccent }}>
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
        </div>

        {/* Footer */}
        <div className={`relative z-10 pt-3 flex items-center justify-between border-t border-white/15 ${theme.textColor} text-sm`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌐</span>
            <span className="font-semibold tracking-wide text-white">bd-food-passport.vercel.app</span>
            <span className="text-white/40">•</span>
            <span className="text-xs text-white/80 font-medium">Developed by S. M. Mahmud Iqbal</span>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold uppercase tracking-widest block" style={{ color: theme.goldAccent }}>
              আপনার পাসপোর্ট তৈরি করুন • MAKE YOUR PASSPORT
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RESPONSIVE ON-SCREEN PREVIEWS
  // ==========================================

  // Story Format Preview (9:16)
  if (cardFormat === 'story') {
    return (
      <div
        style={{ background: theme.gradientBg }}
        className="w-full max-w-[310px] aspect-[9/16] mx-auto text-white rounded-[28px] p-3.5 flex flex-col justify-between relative select-none overflow-hidden border border-white/25 shadow-2xl font-bengali box-border"
      >
        <div className={`absolute -top-12 -left-12 w-48 h-48 ${theme.glowColor} rounded-full blur-[50px] pointer-events-none`}></div>
        <div className="absolute inset-1.5 border border-white/15 rounded-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center relative z-10 border-b border-white/15 pb-1.5 shrink-0">
          <span style={{ color: theme.goldAccent }} className="text-[8px] font-bold tracking-widest uppercase block">
            STORY FORMAT (৯:১৬)
          </span>
          <h3 className="text-base font-black text-white leading-tight">বাংলাদেশ ফুড পাসপোর্ট</h3>
        </div>

        {/* Holder */}
        <div
          style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)' }}
          className="relative z-10 flex items-center gap-2 p-1.5 rounded-xl shrink-0"
        >
          <div
            style={{ width: '40px', height: '40px', minWidth: '40px', borderColor: theme.goldAccent }}
            className="rounded-lg border overflow-hidden bg-black/40 flex items-center justify-center shrink-0 aspect-square"
          >
            {userPhoto ? <img src={userPhoto} alt="User" className="w-full h-full object-cover" /> : <span className="text-lg">🍲</span>}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h4 className="font-bold text-xs text-white truncate">{userName || 'ভোজনপ্রেমী পর্যটক'}</h4>
            <span className="text-[8px] text-white/60 block font-mono">{passportNumber}</span>
          </div>
          <div className={`px-2 py-0.5 rounded-md bg-gradient-to-r ${rank.badgeClass} text-white font-bold text-[9px]`}>
            {rank.titleBn}
          </div>
        </div>

        {/* Badges preview strip */}
        <div className="relative z-10 flex items-center justify-between gap-1 px-1 shrink-0">
          {badges.slice(0, 5).map((b) => (
            <span
              key={b.id}
              className={`text-sm p-1 rounded-lg ${b.isUnlocked ? 'bg-white/20' : 'opacity-30'}`}
              title={b.titleBn}
            >
              {b.emoji}
            </span>
          ))}
        </div>

        {/* Mini Map */}
        <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center my-1">
          <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="w-full h-full max-h-[170px] object-contain drop-shadow">
            <g>
              {DISTRICT_PATHS.map((item) => {
                const isEaten = eatenDistricts.has(item.id);
                return (
                  <path
                    key={item.id}
                    d={item.d}
                    fill={isEaten ? theme.accentColor : 'rgba(255, 255, 255, 0.1)'}
                    stroke={isEaten ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'}
                    strokeWidth={isEaten ? '5' : '3'}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        {/* Stats */}
        <div
          style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)' }}
          className="relative z-10 p-2 rounded-xl space-y-1 shrink-0"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-black text-white">{toBengaliNumerals(eatenCount)} / ৬৪ জেলা</span>
            <span style={{ color: theme.goldAccent }} className="font-black">{toBengaliNumerals(percent)}%</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${theme.progressBar} rounded-full`} style={{ width: `${percent}%` }}></div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-1 flex items-center justify-between text-[8px] text-white/70 border-t border-white/15 shrink-0">
          <span className="truncate">bd-food-passport.vercel.app</span>
          <span style={{ color: theme.goldAccent }} className="font-semibold">স্টোরি মোড</span>
        </div>
      </div>
    );
  }

  // Boarding Pass Preview
  if (cardFormat === 'boarding_pass') {
    return (
      <div
        style={{ background: 'radial-gradient(circle at 10% 10%, #0f172a 0%, #020617 100%)' }}
        className="w-full max-w-[340px] aspect-[4/5] mx-auto text-white rounded-[28px] p-3.5 flex flex-col justify-between relative select-none overflow-hidden border-2 border-dashed border-white/30 shadow-2xl font-bengali box-border"
      >
        <div className="relative z-10 border-b border-white/20 pb-1.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-base">✈️</span>
            <div>
              <h4 className="font-black text-xs uppercase tracking-wide">CULINARY AIRWAYS</h4>
              <span className="text-[8px] text-amber-400 font-bold block">BOARDING PASS</span>
            </div>
          </div>
          <span className="font-mono font-bold text-amber-400 text-xs">FLIGHT BD-64</span>
        </div>

        {/* Passenger info */}
        <div className="relative z-10 flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
          <div
            style={{ width: '40px', height: '40px', minWidth: '40px' }}
            className="rounded-lg border border-amber-400 overflow-hidden bg-black/40 flex items-center justify-center shrink-0 aspect-square"
          >
            {userPhoto ? <img src={userPhoto} alt="User" className="w-full h-full object-cover" /> : <span className="text-lg">🍲</span>}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <span className="text-[8px] text-white/60 block uppercase font-mono">PASSENGER</span>
            <h4 className="font-extrabold text-xs text-white truncate">{userName || 'ভোজনপ্রেমী পর্যটক'}</h4>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[8px] text-emerald-400 block uppercase font-mono">VIP FOODIE</span>
            <span className="text-[10px] font-bold text-white">{rank.titleBn}</span>
          </div>
        </div>

        {/* Mini Map */}
        <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center my-1">
          <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="w-full h-full max-h-[145px] object-contain drop-shadow">
            <g>
              {DISTRICT_PATHS.map((item) => {
                const isEaten = eatenDistricts.has(item.id);
                return (
                  <path
                    key={item.id}
                    d={item.d}
                    fill={isEaten ? theme.accentColor : 'rgba(255, 255, 255, 0.1)'}
                    stroke={isEaten ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'}
                    strokeWidth={isEaten ? '5' : '3'}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        {/* Stats & Barcode */}
        <div className="relative z-10 p-2 rounded-xl bg-white/5 border border-white/10 space-y-1 shrink-0">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-white">স্বাদ গ্রহণ: {toBengaliNumerals(eatenCount)}/৬৪</span>
            <span className="font-bold text-amber-400">{toBengaliNumerals(percent)}%</span>
          </div>
          <div className="h-5 w-full bg-white/90 rounded p-1 flex items-center justify-between px-2">
            {[...Array(26)].map((_, i) => (
              <div key={i} className="h-full bg-slate-900 rounded-sm" style={{ width: `${(i % 3) + 1}px` }}></div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-1 flex items-center justify-between text-[8px] text-white/60 border-t border-white/15 shrink-0">
          <span>bd-food-passport.vercel.app</span>
          <span className="text-amber-400 font-mono font-bold">BOARDING PASS ✓</span>
        </div>
      </div>
    );
  }

  // Default Post Format Preview (4:5)
  return (
    <div
      style={{ background: theme.gradientBg }}
      className="w-full max-w-[340px] aspect-[4/5] mx-auto text-white rounded-[28px] p-4 flex flex-col justify-between relative select-none overflow-hidden border border-white/25 shadow-2xl font-bengali box-border"
    >
      <div className={`absolute -top-12 -left-12 w-48 h-48 ${theme.glowColor} rounded-full blur-[50px] pointer-events-none`}></div>
      <div className={`absolute -bottom-12 -right-12 w-48 h-48 ${theme.glowColor} rounded-full blur-[50px] pointer-events-none`}></div>
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
              <img src={userPhoto} alt="User" className="w-full h-full object-cover object-center aspect-square block" />
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
          <span className="text-[8px] block uppercase font-medium leading-none mb-0.5" style={{ color: theme.goldAccent }}>
            মর্যাদা
          </span>
          <div className={`px-2 py-0.5 rounded-lg bg-gradient-to-r ${rank.badgeClass} text-white font-black text-[10px] shadow-sm border border-white/20`}>
            {rank.titleBn}
          </div>
        </div>
      </div>

      {/* Mini SVG Map */}
      <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center my-1">
        <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="w-full h-full max-h-[155px] object-contain drop-shadow-md">
          <defs>
            <linearGradient id={`previewPostEaten-${theme.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
                  fill={isEaten ? `url(#previewPostEaten-${theme.id})` : 'rgba(255, 255, 255, 0.1)'}
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
          <span className="font-black text-sm leading-none" style={{ color: theme.goldAccent }}>
            {toBengaliNumerals(percent)}%
          </span>
        </div>

        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden p-[1px]">
          <div className={`h-full bg-gradient-to-r ${theme.progressBar} rounded-full`} style={{ width: `${Math.max(percent, 3)}%` }}></div>
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
