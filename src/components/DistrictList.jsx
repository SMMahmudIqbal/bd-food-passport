import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, Circle, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import { DISTRICTS_FOOD, toBengaliNumerals } from '../data/foods';
import { getTheme } from '../data/themes';

export default function DistrictList({
  eatenDistricts,
  wishlistDistricts = new Set(),
  onSelectDistrict,
  onToggleEaten,
  onToggleWishlist,
  filterDivision,
  themeId = 'emerald'
}) {
  const [search, setSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const theme = getTheme(themeId);

  const filteredDistricts = useMemo(() => {
    return DISTRICTS_FOOD.filter((d) => {
      // If filtering by wishlist
      if (filterDivision === 'wishlist') {
        if (!wishlistDistricts.has(d.id)) return false;
      } else if (filterDivision && d.divisionBn !== filterDivision) {
        return false;
      }

      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        d.nameBn.includes(q) ||
        d.nameEn.toLowerCase().includes(q) ||
        d.divisionBn.includes(q) ||
        d.divisionEn.toLowerCase().includes(q) ||
        d.foodBn.includes(q) ||
        d.foodEn.toLowerCase().includes(q)
      );
    });
  }, [filterDivision, wishlistDistricts, search]);

  return (
    <div className="w-full glass-panel rounded-3xl p-4 sm:p-5 mt-4">
      {/* Header and Toggle */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-base text-slate-800 dark:text-white">
            {filterDivision === 'wishlist' ? '📌 বাকেট লিস্টের জেলাসমূহ' : 'জেলার তালিকা'}
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full glass-pill text-slate-600 dark:text-slate-300">
            {toBengaliNumerals(filteredDistricts.length)}টি
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ color: theme.accentColor }}
          className="flex items-center gap-1 text-xs font-semibold hover:underline glass-pill px-2.5 py-1 rounded-xl transition"
        >
          <span>{isExpanded ? 'সংক্ষিপ্ত করুন' : 'সব দেখুন'}</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Glass Search Input */}
      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="জেলা বা খাবারের নাম দিয়ে খুঁজুন (যেমন: বগুড়া, রসমালাই, আম, ঢাকা)..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm glass-pill focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 transition"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* District Cards Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto overscroll-contain transition-all duration-200 ${
          isExpanded ? 'max-h-[540px]' : 'max-h-[260px]'
        }`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {filteredDistricts.length === 0 ? (
          <div className="col-span-full py-8 text-center text-sm text-slate-400">
            {filterDivision === 'wishlist'
              ? 'আপনার বাকেট লিস্টে কোনো জেলা যোগ করা হয়নি। জেলা স্পর্শ করে "খেতে চাই 📌" বাটনে চাপুন!'
              : 'কোনো জেলা বা খাবার পাওয়া যায়নি'}
          </div>
        ) : (
          filteredDistricts.map((item) => {
            const isEaten = eatenDistricts.has(item.id);
            const isWishlisted = !isEaten && wishlistDistricts.has(item.id);

            return (
              <div
                key={item.id}
                onClick={() => onSelectDistrict(item.id)}
                className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer glass-card-interactive ${
                  isEaten
                    ? 'bg-white/40 dark:bg-slate-800/40 border'
                    : isWishlisted
                    ? 'bg-amber-500/10 border border-amber-500/30 dark:bg-amber-950/20'
                    : 'glass-pill'
                }`}
                style={isEaten ? { borderColor: `${theme.accentColor}55` } : {}}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-2xl select-none shrink-0 w-8 text-center">
                    {item.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-800 dark:text-white truncate">
                        {item.nameBn}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                        ({item.nameEn})
                      </span>
                      {isWishlisted && (
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                          📌
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate">
                      {item.foodBn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {/* Quick Wishlist Bookmark Toggle */}
                  {!isEaten && onToggleWishlist && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(item.id);
                      }}
                      className={`p-1.5 rounded-xl transition ${
                        isWishlisted
                          ? 'text-amber-500 dark:text-amber-400'
                          : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'
                      }`}
                      title={isWishlisted ? 'বাকেট লিস্ট থেকে সরান' : 'খেতে চাই / বাকেট লিস্টে রাখুন'}
                    >
                      <Bookmark size={17} className={isWishlisted ? 'fill-amber-500' : ''} />
                    </button>
                  )}

                  {/* Eaten Check Toggle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleEaten(item.id);
                    }}
                    className={`p-1.5 rounded-xl transition ${
                      isEaten
                        ? 'text-teal-500 dark:text-teal-400'
                        : 'text-slate-300 dark:text-slate-600 hover:text-teal-500'
                    }`}
                    title={isEaten ? "খেয়েছি (আনমার্ক করতে চাপুন)" : "চিহ্নিত করুন"}
                  >
                    {isEaten ? (
                      <CheckCircle2 size={20} style={{ color: theme.accentColor }} className="fill-current" />
                    ) : (
                      <Circle size={20} className="text-slate-300 dark:text-slate-600 hover:text-slate-500" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
