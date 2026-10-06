// Bangladesh Food Passport - Culinary Badges & Achievements System
// Gamification criteria for unlocking special culinary titles

import { DISTRICTS_FOOD } from './foods';

export const BADGES = [
  {
    id: 'sweet_king',
    titleBn: 'মিষ্টি সম্রাট',
    titleEn: 'Sweet Connoisseur',
    icon: '👑',
    emoji: '🧁',
    descriptionBn: 'ঐতিহ্যবাহী মিষ্টির জেলাগুলোর মধ্যে অন্তত ৪টির বিখ্যাত মিষ্টি চেখে দেখেছেন!',
    districts: [
      'bogura',      // বগুড়ার দই
      'natore',      // নাটোরের কাঁচাগোল্লা
      'cumilla',     // কুমিল্লার রসমালাই
      'tangail',     // টাঙ্গাইলের পোড়াবাড়ীর চমচম
      'mymensingh',   // মুক্তাগাছার মণ্ডা
      'netrokona',   // নেত্রকোণার বালিশ মিষ্টি
      'kushtia',     // কুষ্টিয়ার তিলের খাজা
      'pabna',       // পাবনার প্যারা সন্দেশ
      'meherpur',    // মেহেরপুরের সাবিত্রি মিষ্টি
      'munshiganj'   // ভাগ্যকুলের পাতক্ষীর
    ],
    requiredCount: 4,
    badgeColor: 'from-amber-400 via-yellow-500 to-amber-600',
    borderGlow: '#f59e0b'
  },
  {
    id: 'spice_master',
    titleBn: 'ঝাল ও মেজবান মাস্টার',
    titleEn: 'Spice & Feast Specialist',
    icon: '🌶️',
    emoji: '🔥',
    descriptionBn: 'বাংলাদেশের বিখ্যাত মসলাদার মেজবান ও চুইঝালের অন্তত ৩টি জেলার স্বাদ নিয়েছেন!',
    districts: [
      'chattogram',  // মেজবানি মাংস
      'khulna',      // চুইঝাল খাসি
      'satkhira',    // চুইঝাল ও সন্দেশ
      'bagerhat',    // চুইঝাল হাঁসের মাংস
      'coxsbazar'    // লইট্যা ফ্রাই ও রুপচাঁদা
    ],
    requiredCount: 3,
    badgeColor: 'from-rose-500 via-red-600 to-orange-600',
    borderGlow: '#f43f5e'
  },
  {
    id: 'river_hilsa',
    titleBn: 'নদী ও ইলিশপ্রেমী',
    titleEn: 'River & Hilsa Gourmet',
    icon: '🐟',
    emoji: '🌊',
    descriptionBn: 'পদ্মা-মেঘনা-উপকূলের নদী ও ইলিশের অন্তত ৩টি জেলার খাবার চেখে দেখেছেন!',
    districts: [
      'chandpur',    // রূপালি ইলিশ
      'barishal',    // ইলিশ ও বাকরখানি
      'bhola',       // মহিষের দুধের দধি ও ইলিশ
      'patuakhali',  // পায়রা নদীর তাজা মাছ
      'barguna',     // চুইঝাল মাছ ও পায়েশ
      'munshiganj'   // পদ্মার ইলিশ
    ],
    requiredCount: 3,
    badgeColor: 'from-sky-400 via-cyan-500 to-blue-600',
    borderGlow: '#0ea5e9'
  },
  {
    id: 'mughlai_nawab',
    titleBn: 'নবাবী ভোজনরসিক',
    titleEn: 'Mughlai & Heritage Gourmet',
    icon: '🍛',
    emoji: '✨',
    descriptionBn: 'পুরান ঢাকা, সিলেট বা চট্টগ্রামের ঐতিহ্যবাহী মাংস ও পোলাওয়ের স্বাদ নিয়েছেন!',
    districts: [
      'dhaka',       // কাচ্চি বিরিয়ানি ও বাকরখানি
      'sylhet',      // সাতকড়া বিফ
      'chattogram',  // মেজবানি মাংস
      'brahmanbaria' // তালের বড়া ও ঐতিহ্যবাহী মিষ্টি
    ],
    requiredCount: 2,
    badgeColor: 'from-amber-500 via-yellow-600 to-emerald-600',
    borderGlow: '#d97706'
  },
  {
    id: 'all_divisions',
    titleBn: 'অলিম্পিক এক্সপ্লোরার',
    titleEn: '8-Division Wanderer',
    icon: '🧭',
    emoji: '🗺️',
    descriptionBn: 'বাংলাদেশের আটটি বিভাগের প্রতিটিতে অন্তত একটি জেলার খাবার খেয়েছেন!',
    isDivisionWanderer: true,
    badgeColor: 'from-purple-500 via-indigo-600 to-sky-600',
    borderGlow: '#8b5cf6'
  },
  {
    id: 'division_champ',
    titleBn: 'বিভাগীয় চ্যাম্পিয়ন',
    titleEn: 'Division Champion',
    icon: '🏅',
    emoji: '🏆',
    descriptionBn: 'যেকোনো একটি সম্পূর্ণ বিভাগের সব জেলার খাবার চেখে জয় করেছেন!',
    isDivisionChamp: true,
    badgeColor: 'from-emerald-400 via-teal-500 to-cyan-600',
    borderGlow: '#10b981'
  }
];

// Check which badges are unlocked for a given set of eaten districts
export function getUnlockedBadges(eatenDistricts) {
  const eatenSet = eatenDistricts instanceof Set ? eatenDistricts : new Set(eatenDistricts);
  
  // Group districts by division
  const divisionCounts = {};
  const divisionTotals = {};
  
  DISTRICTS_FOOD.forEach((d) => {
    divisionTotals[d.divisionBn] = (divisionTotals[d.divisionBn] || 0) + 1;
    if (eatenSet.has(d.id)) {
      divisionCounts[d.divisionBn] = (divisionCounts[d.divisionBn] || 0) + 1;
    }
  });

  // Check 8-division explorer (at least 1 eaten in each division)
  const allDivisions = Object.keys(divisionTotals);
  const divisionsVisited = allDivisions.filter((div) => (divisionCounts[div] || 0) >= 1);
  const isAllDivisionsVisited = allDivisions.length > 0 && divisionsVisited.length === allDivisions.length;

  // Check full division champion (100% of any division)
  const fullDivisions = allDivisions.filter(
    (div) => divisionCounts[div] && divisionCounts[div] === divisionTotals[div]
  );
  const hasFullDivision = fullDivisions.length > 0;

  return BADGES.map((badge) => {
    let currentCount = 0;
    let targetCount = badge.requiredCount || 1;
    let isUnlocked = false;

    if (badge.isDivisionWanderer) {
      currentCount = divisionsVisited.length;
      targetCount = allDivisions.length;
      isUnlocked = isAllDivisionsVisited;
    } else if (badge.isDivisionChamp) {
      currentCount = fullDivisions.length;
      targetCount = 1;
      isUnlocked = hasFullDivision;
    } else if (badge.districts) {
      currentCount = badge.districts.filter((id) => eatenSet.has(id)).length;
      isUnlocked = currentCount >= targetCount;
    }

    return {
      ...badge,
      currentCount,
      targetCount,
      isUnlocked,
      completedDivisionName: hasFullDivision ? fullDivisions[0] : null
    };
  });
}
