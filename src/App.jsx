import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import MapView from './components/MapView';
import FoodSheet from './components/FoodSheet';
import DistrictList from './components/DistrictList';
import BadgesSection from './components/BadgesSection';
import PassportCardModal from './components/PassportCardModal';
import Toast from './components/Toast';
import { DISTRICTS_FOOD, FOOD_BY_ID, getRank, toBengaliNumerals } from './data/foods';
import { THEMES, getTheme } from './data/themes';
import { fireStampConfetti, fireMilestoneConfetti } from './utils/confetti';
import { playMilestoneSound } from './utils/audio';
import { Sparkles, Utensils, Award, Compass, Heart } from 'lucide-react';

const STORAGE_KEY_EATEN = 'bd_food_passport_eaten';
const STORAGE_KEY_WISHLIST = 'bd_food_passport_wishlist';
const STORAGE_KEY_USER_NAME = 'bd_food_passport_user_name';
const STORAGE_KEY_USER_PHOTO = 'bd_food_passport_user_photo';
const STORAGE_KEY_MODE = 'bd_food_passport_mode';
const STORAGE_KEY_COLOR_THEME = 'bd_food_passport_color_theme';

export default function App() {
  // Eaten districts set
  const [eatenDistricts, setEatenDistricts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EATEN);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Wishlist / Bucket list districts set
  const [wishlistDistricts, setWishlistDistricts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // User Profile
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_USER_NAME) || '';
  });

  const [userPhoto, setUserPhoto] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_USER_PHOTO) || '';
  });

  // Theme (Light / Dark)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MODE);
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Color Theme (Emerald, Sapphire, Ruby, Amber, Cyber)
  const [colorTheme, setColorTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_COLOR_THEME);
    if (saved && THEMES.some((t) => t.id === saved)) return saved;
    return 'emerald';
  });

  // UI States
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [filterDivision, setFilterDivision] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (title, message = '', type = 'info') => {
    setToast({ title, message, type });
  };

  // Persist Eaten Districts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EATEN, JSON.stringify([...eatenDistricts]));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [eatenDistricts]);

  // Persist Wishlist Districts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify([...wishlistDistricts]));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage:', e);
    }
  }, [wishlistDistricts]);

  // Persist User Name
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER_NAME, userName);
  }, [userName]);

  // Persist User Photo (with safe error handling)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER_PHOTO, userPhoto);
    } catch (e) {
      console.warn('Failed to save photo to localStorage (quota exceeded?):', e);
    }
  }, [userPhoto]);

  // Persist Color Theme
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COLOR_THEME, colorTheme);
  }, [colorTheme]);

  // Sync Dark Mode class with <html> element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEY_MODE, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY_MODE, 'light');
    }
  }, [isDarkMode]);

  // Handle URL hash: #make opens straight into the map or card
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#make') {
        setIsCardModalOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Distinct Divisions list
  const divisions = useMemo(() => {
    return ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];
  }, []);

  // Toggle district eaten status
  const handleToggleEaten = (districtId) => {
    const district = FOOD_BY_ID[districtId];
    setEatenDistricts((prev) => {
      const next = new Set(prev);
      const wasEaten = next.has(districtId);

      if (wasEaten) {
        next.delete(districtId);
        showToast('চিহ্ন মুছে ফেলা হয়েছে', district?.nameBn, 'info');
      } else {
        next.add(districtId);
        // Automatically remove from wishlist if eaten
        setWishlistDistricts((wPrev) => {
          const wNext = new Set(wPrev);
          wNext.delete(districtId);
          return wNext;
        });

        fireStampConfetti();

        const newCount = next.size;
        const newRank = getRank(newCount);

        // Check for rank milestone
        if ([11, 26, 41, 56, 64].includes(newCount)) {
          setTimeout(() => {
            fireMilestoneConfetti();
            playMilestoneSound();
            showToast('🏆 নতুন মর্যাদা আনলকড!', `${toBengaliNumerals(newCount)} জেলা সম্পন্ন! আপনি এখন ${newRank.titleBn}!`, 'milestone');
          }, 300);
        } else {
          showToast('স্বাদ গ্রহণ সম্পন্ন! ✅', `${district?.nameBn} (${district?.foodBn}) যুক্ত হয়েছে`, 'eaten');
        }
      }
      return next;
    });
  };

  // Toggle wishlist status
  const handleToggleWishlist = (districtId) => {
    const district = FOOD_BY_ID[districtId];
    setWishlistDistricts((prev) => {
      const next = new Set(prev);
      if (next.has(districtId)) {
        next.delete(districtId);
        showToast('বাকেট লিস্ট থেকে সরানো হয়েছে', district?.nameBn, 'info');
      } else {
        next.add(districtId);
        showToast('📌 বাকেট লিস্টে যুক্ত হয়েছে!', `${district?.nameBn} (${district?.foodBn})`, 'wishlist');
      }
      return next;
    });
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const rank = getRank(eatenDistricts.size);
  const activeTheme = getTheme(colorTheme);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-teal-500 selection:text-white transition-colors">
      {/* Toast Feedback Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* High-Performance Static Ambient Background (Zero animation overhead, 90fps GPU optimized) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 opacity-70 dark:opacity-40">
        <div
          className={`absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[480px] max-h-[480px] rounded-full bg-gradient-to-tr ${activeTheme.ambientOrbs.orb1} blur-[50px]`}
        />
        <div
          className={`absolute top-[40%] -right-[10%] w-[50vw] h-[50vw] max-w-[480px] max-h-[480px] rounded-full bg-gradient-to-bl ${activeTheme.ambientOrbs.orb2} blur-[50px]`}
        />
      </div>

      {/* Floating Minimalist Liquid Header */}
      <Header
        eatenCount={eatenDistricts.size}
        onOpenCardModal={() => setIsCardModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        filterDivision={filterDivision}
        onFilterDivisionChange={setFilterDivision}
        divisions={divisions}
        wishlistCount={wishlistDistricts.size}
        themeId={colorTheme}
        onSelectTheme={setColorTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-5 py-4 sm:py-6 space-y-4 sm:space-y-5">
        {/* Interactive SVG Map Container */}
        <div id="map-container" className="scroll-mt-24">
          <MapView
            eatenDistricts={eatenDistricts}
            wishlistDistricts={wishlistDistricts}
            onSelectDistrict={(id) => setSelectedDistrictId(id)}
            selectedDistrictId={selectedDistrictId}
            filterDivision={filterDivision}
            themeId={colorTheme}
          />
        </div>

        {/* Liquid Glass Metric Cards Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="glass-panel glass-card-interactive p-3 sm:p-3.5 rounded-2xl flex items-center gap-3">
            <div
              style={{ backgroundColor: `${activeTheme.accentColor}22`, borderColor: `${activeTheme.accentColor}44` }}
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
            >
              <Utensils size={18} style={{ color: activeTheme.accentColor }} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium uppercase tracking-wider">
                স্বাদ গ্রহণ
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                {toBengaliNumerals(eatenDistricts.size)} জেলা
              </span>
            </div>
          </div>

          <div className="glass-panel glass-card-interactive p-3 sm:p-3.5 rounded-2xl flex items-center gap-3">
            <div
              style={{ backgroundColor: `${activeTheme.accentColor}18`, borderColor: `${activeTheme.accentColor}33` }}
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
            >
              <Compass size={18} style={{ color: activeTheme.accentColor }} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium uppercase tracking-wider">
                বাকি আছে
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                {toBengaliNumerals(64 - eatenDistricts.size)} জেলা
              </span>
            </div>
          </div>

          <div className="glass-panel glass-card-interactive p-3 sm:p-3.5 rounded-2xl flex items-center gap-3">
            <div
              style={{ backgroundColor: `${activeTheme.goldAccent}22`, borderColor: `${activeTheme.goldAccent}44` }}
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
            >
              <Award size={18} style={{ color: activeTheme.goldAccent }} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium uppercase tracking-wider">
                মর্যাদা
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-white truncate block">
                {rank.titleBn}
              </span>
            </div>
          </div>

          <div className="glass-panel glass-card-interactive p-3 sm:p-3.5 rounded-2xl flex items-center gap-3">
            <div
              style={{ backgroundColor: `${activeTheme.accentColor}22`, borderColor: `${activeTheme.accentColor}44` }}
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
            >
              <Sparkles size={18} style={{ color: activeTheme.accentColor }} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium uppercase tracking-wider">
                পরবর্তী লক্ষ্য
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
                {eatenDistricts.size < 11
                  ? '১১ (এক্সপ্লোরার)'
                  : eatenDistricts.size < 26
                  ? '২৬ (ভোজনরসিক)'
                  : eatenDistricts.size < 41
                  ? '৪১ (মাস্টার)'
                  : eatenDistricts.size < 56
                  ? '৫৬ (কিংবদন্তি)'
                  : '৬৪ (পূর্ণ জয়!)'}
              </span>
            </div>
          </div>
        </div>

        {/* Culinary Badges & Achievements Section */}
        <BadgesSection
          eatenDistricts={eatenDistricts}
          onSelectDistrict={(id) => setSelectedDistrictId(id)}
          themeId={colorTheme}
        />

        {/* District Search & Complete Listing */}
        <DistrictList
          eatenDistricts={eatenDistricts}
          wishlistDistricts={wishlistDistricts}
          onSelectDistrict={(id) => setSelectedDistrictId(id)}
          onToggleEaten={handleToggleEaten}
          onToggleWishlist={handleToggleWishlist}
          filterDivision={filterDivision}
          themeId={colorTheme}
        />
      </main>

      {/* District Food Details Bottom Sheet */}
      {selectedDistrictId && (
        <FoodSheet
          districtId={selectedDistrictId}
          onClose={() => setSelectedDistrictId(null)}
          isEaten={eatenDistricts.has(selectedDistrictId)}
          onToggleEaten={handleToggleEaten}
          isWishlisted={wishlistDistricts.has(selectedDistrictId)}
          onToggleWishlist={handleToggleWishlist}
          onNavigate={(id) => setSelectedDistrictId(id)}
          themeId={colorTheme}
        />
      )}

      {/* Shareable Passport Card Modal */}
      {isCardModalOpen && (
        <PassportCardModal
          isOpen={isCardModalOpen}
          onClose={() => setIsCardModalOpen(false)}
          eatenDistricts={eatenDistricts}
          userName={userName}
          onUpdateUserName={setUserName}
          userPhoto={userPhoto}
          onUpdateUserPhoto={setUserPhoto}
          themeId={colorTheme}
          onSelectTheme={setColorTheme}
        />
      )}

      {/* Minimal Liquid Glass Footer */}
      <footer className="w-full border-t border-white/60 dark:border-white/5 py-7 text-center text-xs text-slate-400 dark:text-slate-500 space-y-2">
        <p className="flex items-center justify-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
          <span>বাংলাদেশের ঐতিহ্যবাহী খাবারের ভালোবাসায় নির্মিত</span>
          <Heart size={13} className="text-rose-500 fill-rose-500" />
        </p>
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Developed by{' '}
          <a
            href="https://github.com/SMMahmudIqbal"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: activeTheme.accentColor }}
            className="hover:underline font-bold"
          >
            S. M. Mahmud Iqbal
          </a>
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-600">
          মিনিমালিস্টিক লিকুইড গ্লাস থিম • ৫টি বাছাইযোগ্য কালার প্যালেট • বাকেট লিস্ট ও ব্যাজ • PWA অফলাইন সাপোর্ট
        </p>
      </footer>
    </div>
  );
}
