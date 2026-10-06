import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import MapView from './components/MapView';
import FoodSheet from './components/FoodSheet';
import DistrictList from './components/DistrictList';
import PassportCardModal from './components/PassportCardModal';
import { DISTRICTS_FOOD, getRank, toBengaliNumerals } from './data/foods';
import { fireStampConfetti, fireMilestoneConfetti } from './utils/confetti';
import { Sparkles, Utensils, Award, Compass, Heart } from 'lucide-react';

const STORAGE_KEY_EATEN = 'bd_food_passport_eaten';
const STORAGE_KEY_USER_NAME = 'bd_food_passport_user_name';
const STORAGE_KEY_USER_PHOTO = 'bd_food_passport_user_photo';
const STORAGE_KEY_THEME = 'bd_food_passport_theme';

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

  // User Profile
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_USER_NAME) || '';
  });

  const [userPhoto, setUserPhoto] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_USER_PHOTO) || '';
  });

  // Theme (Light / Dark)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // UI States
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [filterDivision, setFilterDivision] = useState('');

  // Persist Eaten Districts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EATEN, JSON.stringify([...eatenDistricts]));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [eatenDistricts]);

  // Persist User Name
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER_NAME, userName);
  }, [userName]);

  // Persist User Photo
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER_PHOTO, userPhoto);
    } catch (e) {
      console.warn('Failed to save photo to localStorage (quota exceeded?):', e);
    }
  }, [userPhoto]);

  // Sync Dark Mode class with <html> element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'light');
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
    setEatenDistricts((prev) => {
      const next = new Set(prev);
      const wasEaten = next.has(districtId);

      if (wasEaten) {
        next.delete(districtId);
      } else {
        next.add(districtId);
        fireStampConfetti();

        // Check for rank milestone
        const newCount = next.size;
        if ([11, 26, 41, 56, 64].includes(newCount)) {
          setTimeout(() => fireMilestoneConfetti(), 300);
        }
      }
      return next;
    });
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const rank = getRank(eatenDistricts.size);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-teal-500 selection:text-white transition-colors">
      {/* Ambient Floating Liquid Mesh Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[12%] -left-[10%] w-[58vw] h-[58vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-tr from-teal-400/25 via-emerald-300/20 to-cyan-400/20 dark:from-teal-600/15 dark:via-emerald-700/10 dark:to-cyan-600/15 blur-[95px] animate-liquid-1" />
        <div className="absolute top-[35%] -right-[15%] w-[62vw] h-[62vw] max-w-[580px] max-h-[580px] rounded-full bg-gradient-to-bl from-sky-400/20 via-teal-300/15 to-emerald-400/20 dark:from-sky-700/15 dark:via-teal-800/10 dark:to-emerald-800/15 blur-[100px] animate-liquid-2" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] max-w-[480px] max-h-[480px] rounded-full bg-gradient-to-t from-emerald-300/20 via-amber-200/10 to-teal-200/15 dark:from-teal-900/15 dark:via-emerald-950/10 dark:to-transparent blur-[90px]" />
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
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-5 py-4 sm:py-6 space-y-4 sm:space-y-5">
        {/* Interactive SVG Map Container */}
        <div id="map-container" className="scroll-mt-24">
          <MapView
            eatenDistricts={eatenDistricts}
            onSelectDistrict={(id) => setSelectedDistrictId(id)}
            selectedDistrictId={selectedDistrictId}
            filterDivision={filterDivision}
          />
        </div>

        {/* Liquid Glass Metric Cards Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="glass-panel glass-card-interactive p-3 sm:p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
              <Utensils size={18} />
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
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20">
              <Compass size={18} />
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
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Award size={18} />
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
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Sparkles size={18} />
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

        {/* District Search & Complete Listing */}
        <DistrictList
          eatenDistricts={eatenDistricts}
          onSelectDistrict={(id) => setSelectedDistrictId(id)}
          onToggleEaten={handleToggleEaten}
          filterDivision={filterDivision}
        />
      </main>

      {/* District Food Details Bottom Sheet */}
      <FoodSheet
        districtId={selectedDistrictId}
        onClose={() => setSelectedDistrictId(null)}
        isEaten={selectedDistrictId ? eatenDistricts.has(selectedDistrictId) : false}
        onToggleEaten={handleToggleEaten}
        onNavigate={(id) => setSelectedDistrictId(id)}
      />

      {/* Shareable 1080x1350 Passport Card Modal */}
      <PassportCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        eatenDistricts={eatenDistricts}
        userName={userName}
        onUpdateUserName={setUserName}
        userPhoto={userPhoto}
        onUpdateUserPhoto={setUserPhoto}
      />

      {/* Minimal Liquid Glass Footer */}
      <footer className="w-full border-t border-white/60 dark:border-white/5 py-7 text-center text-xs text-slate-400 dark:text-slate-500 space-y-2">
        <p className="flex items-center justify-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
          <span>বাংলাদেশের ঐতিহ্যবাহী খাবারের ভালোবাসায় নির্মিত</span>
          <Heart size={13} className="text-rose-500 fill-rose-500" />
        </p>
        <p className="text-xs font-semibold text-teal-700 dark:text-teal-400">
          Developed by{' '}
          <a
            href="https://github.com/SMMahmudIqbal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-bold text-slate-800 dark:text-white"
          >
            S. M. Mahmud Iqbal
          </a>
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-600">
          মিনিমালিস্টিক লিকুইড গ্লাস থিম • PWA অফলাইন সাপোর্ট • জিরো ব্যাকএন্ড
        </p>
      </footer>
    </div>
  );
}
