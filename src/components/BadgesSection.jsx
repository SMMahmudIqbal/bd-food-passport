import React, { useState } from 'react';
import { Award, ChevronDown, ChevronUp, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { getUnlockedBadges } from '../data/badges';
import { FOOD_BY_ID, toBengaliNumerals } from '../data/foods';
import { getTheme } from '../data/themes';

export default function BadgesSection({
  eatenDistricts,
  onSelectDistrict,
  themeId = 'emerald'
}) {
  const [expandedBadgeId, setExpandedBadgeId] = useState(null);
  const badges = getUnlockedBadges(eatenDistricts);
  const unlockedCount = badges.filter((b) => b.isUnlocked).length;
  const theme = getTheme(themeId);

  const toggleBadge = (id) => {
    setExpandedBadgeId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: `${theme.accentColor}22`, borderColor: `${theme.accentColor}44` }}
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
          >
            <Award size={18} style={{ color: theme.accentColor }} />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-800 dark:text-white leading-tight">
              বিশেষ অর্জন ও ব্যাজ
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              ঐতিহ্যবাহী স্বাদের মাইলফলক ও উপাধি
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 glass-pill px-3 py-1 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200">
          <Sparkles size={13} style={{ color: theme.goldAccent }} />
          <span>{toBengaliNumerals(unlockedCount)} / {toBengaliNumerals(badges.length)} অর্জিত</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {badges.map((badge) => {
          const isExpanded = expandedBadgeId === badge.id;
          const percent = Math.min(Math.round((badge.currentCount / badge.targetCount) * 100), 100);

          return (
            <div
              key={badge.id}
              onClick={() => toggleBadge(badge.id)}
              className={`p-3.5 rounded-2xl cursor-pointer glass-card-interactive transition-all relative overflow-hidden ${
                badge.isUnlocked
                  ? 'bg-white/60 dark:bg-slate-800/60 border border-white/60 dark:border-white/10 shadow-md'
                  : 'glass-pill opacity-90'
              }`}
              style={
                badge.isUnlocked
                  ? { borderColor: `${badge.borderGlow}55`, boxShadow: `0 8px 24px -6px ${badge.borderGlow}25` }
                  : {}
              }
            >
              {/* Badge Top Row */}
              <div className="flex items-start justify-between gap-2.5 mb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm relative ${
                      badge.isUnlocked
                        ? `bg-gradient-to-tr ${badge.badgeColor} text-white`
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{badge.emoji}</span>
                    {badge.isUnlocked && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                      <span>{badge.titleBn}</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate font-medium">
                      {badge.titleEn}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  {badge.isUnlocked ? (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      আনলকড ✓
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Lock size={10} />
                      <span>{toBengaliNumerals(badge.currentCount)}/{toBengaliNumerals(badge.targetCount)}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 leading-relaxed font-normal">
                {badge.descriptionBn}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200/80 dark:bg-slate-700/80 h-1.5 rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${badge.badgeColor}`}
                  style={{ width: `${Math.max(percent, 4)}%` }}
                ></div>
              </div>

              {/* District breakdown dropdown if expandable */}
              {badge.districts && (
                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                  <span>প্রয়োজনীয় জেলাসমূহ দেখুন</span>
                  {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </div>
              )}

              {/* Expanded District Pills */}
              {isExpanded && badge.districts && (
                <div className="mt-2.5 pt-2 border-t border-white/40 dark:border-white/5 space-y-1.5">
                  <div className="flex flex-wrap gap-1.5">
                    {badge.districts.map((dId) => {
                      const dInfo = FOOD_BY_ID[dId];
                      const isDistrictEaten = eatenDistricts.has(dId);

                      return (
                        <button
                          key={dId}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectDistrict && onSelectDistrict(dId);
                          }}
                          className={`px-2 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition ${
                            isDistrictEaten
                              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                              : 'glass-pill text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-700/60'
                          }`}
                        >
                          <span>{dInfo?.emoji}</span>
                          <span>{dInfo?.nameBn}</span>
                          {isDistrictEaten && <CheckCircle2 size={11} className="text-emerald-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
