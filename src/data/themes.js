// Bangladesh Food Passport - Selectable Visual Themes
// Supports 5 distinct liquid glass palettes for the app & passport card

export const THEMES = [
  {
    id: 'emerald',
    nameBn: 'রাজকীয় পান্না',
    nameEn: 'Royal Emerald',
    icon: '🌿',
    gradientBg: 'radial-gradient(circle at 20% 20%, #064e3b 0%, #022c22 45%, #011914 100%)',
    previewGradient: 'from-emerald-700 via-teal-800 to-emerald-950',
    accentColor: '#10b981',
    goldAccent: '#d4af37',
    primaryBtn: 'linear-gradient(135deg, #0d9488 0%, #059669 50%, #0284c7 100%)',
    badgeGlow: 'rgba(20, 184, 166, 0.4)',
    mapFill1: '#14b8a6',
    mapFill2: '#06b6d4',
    mapFill3: '#38bdf8',
    mapStroke: '#38bdf8',
    progressBar: 'from-teal-400 via-cyan-400 to-[#d4af37]',
    ambientOrbs: {
      orb1: 'from-teal-400/25 via-emerald-300/20 to-cyan-400/20 dark:from-teal-600/15 dark:via-emerald-700/10 dark:to-cyan-600/15',
      orb2: 'from-sky-400/20 via-teal-300/15 to-emerald-400/20 dark:from-sky-700/15 dark:via-teal-800/10 dark:to-emerald-800/15',
      orb3: 'from-emerald-300/20 via-amber-200/10 to-teal-200/15 dark:from-teal-900/15 dark:via-emerald-950/10 dark:to-transparent'
    },
    textColor: 'text-emerald-300',
    subTextColor: 'text-emerald-200',
    borderColor: 'border-emerald-500/30',
    glowColor: 'bg-teal-400/15',
    tagColor: '#f42a41'
  },
  {
    id: 'sapphire',
    nameBn: 'মধ্যরাত নীল',
    nameEn: 'Midnight Sapphire',
    icon: '💎',
    gradientBg: 'radial-gradient(circle at 20% 20%, #172554 0%, #0f172a 50%, #020617 100%)',
    previewGradient: 'from-blue-700 via-indigo-900 to-slate-950',
    accentColor: '#38bdf8',
    goldAccent: '#93c5fd',
    primaryBtn: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #0284c7 100%)',
    badgeGlow: 'rgba(56, 189, 248, 0.4)',
    mapFill1: '#0284c7',
    mapFill2: '#38bdf8',
    mapFill3: '#60a5fa',
    mapStroke: '#93c5fd',
    progressBar: 'from-blue-400 via-sky-400 to-indigo-300',
    ambientOrbs: {
      orb1: 'from-blue-500/25 via-indigo-400/20 to-sky-400/20 dark:from-blue-700/15 dark:via-indigo-800/10 dark:to-sky-700/15',
      orb2: 'from-indigo-400/20 via-sky-400/15 to-blue-500/20 dark:from-indigo-800/15 dark:via-sky-900/10 dark:to-blue-900/15',
      orb3: 'from-sky-300/20 via-blue-200/10 to-indigo-200/15 dark:from-indigo-950/20 dark:via-blue-950/10 dark:to-transparent'
    },
    textColor: 'text-sky-300',
    subTextColor: 'text-sky-200',
    borderColor: 'border-sky-500/30',
    glowColor: 'bg-sky-400/15',
    tagColor: '#2563eb'
  },
  {
    id: 'ruby',
    nameBn: 'লাল মখমল',
    nameEn: 'Imperial Ruby',
    icon: '🌹',
    gradientBg: 'radial-gradient(circle at 20% 20%, #4c0519 0%, #2a0812 50%, #110206 100%)',
    previewGradient: 'from-rose-800 via-red-950 to-neutral-950',
    accentColor: '#fb7185',
    goldAccent: '#f59e0b',
    primaryBtn: 'linear-gradient(135deg, #e11d48 0%, #be123c 50%, #d97706 100%)',
    badgeGlow: 'rgba(244, 63, 94, 0.4)',
    mapFill1: '#e11d48',
    mapFill2: '#f43f5e',
    mapFill3: '#fb7185',
    mapStroke: '#fecdd3',
    progressBar: 'from-rose-500 via-red-400 to-amber-300',
    ambientOrbs: {
      orb1: 'from-rose-500/25 via-red-400/20 to-amber-400/20 dark:from-rose-700/15 dark:via-red-800/10 dark:to-amber-700/15',
      orb2: 'from-pink-400/20 via-rose-400/15 to-orange-400/20 dark:from-pink-800/15 dark:via-rose-900/10 dark:to-orange-900/15',
      orb3: 'from-rose-300/20 via-amber-200/10 to-red-200/15 dark:from-rose-950/20 dark:via-red-950/10 dark:to-transparent'
    },
    textColor: 'text-rose-300',
    subTextColor: 'text-rose-200',
    borderColor: 'border-rose-500/30',
    glowColor: 'bg-rose-400/15',
    tagColor: '#e11d48'
  },
  {
    id: 'amber',
    nameBn: 'গোধূলি সোনালী',
    nameEn: 'Sunset Amber',
    icon: '✨',
    gradientBg: 'radial-gradient(circle at 20% 20%, #451a03 0%, #291004 50%, #140701 100%)',
    previewGradient: 'from-amber-700 via-orange-900 to-stone-950',
    accentColor: '#f59e0b',
    goldAccent: '#fde047',
    primaryBtn: 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #eab308 100%)',
    badgeGlow: 'rgba(245, 158, 11, 0.4)',
    mapFill1: '#d97706',
    mapFill2: '#f59e0b',
    mapFill3: '#fbbf24',
    mapStroke: '#fef08a',
    progressBar: 'from-amber-500 via-orange-400 to-yellow-300',
    ambientOrbs: {
      orb1: 'from-amber-500/25 via-orange-400/20 to-yellow-400/20 dark:from-amber-700/15 dark:via-orange-800/10 dark:to-yellow-700/15',
      orb2: 'from-yellow-400/20 via-amber-400/15 to-orange-400/20 dark:from-yellow-800/15 dark:via-amber-900/10 dark:to-orange-900/15',
      orb3: 'from-orange-300/20 via-yellow-200/10 to-amber-200/15 dark:from-amber-950/20 dark:via-yellow-950/10 dark:to-transparent'
    },
    textColor: 'text-amber-300',
    subTextColor: 'text-amber-200',
    borderColor: 'border-amber-500/30',
    glowColor: 'bg-amber-400/15',
    tagColor: '#d97706'
  },
  {
    id: 'cyber',
    nameBn: 'সাইবার নিয়ন',
    nameEn: 'Cyber Neon',
    icon: '⚡',
    gradientBg: 'radial-gradient(circle at 20% 20%, #2e1065 0%, #15092a 50%, #080212 100%)',
    previewGradient: 'from-purple-800 via-indigo-950 to-slate-950',
    accentColor: '#a855f7',
    goldAccent: '#22d3ee',
    primaryBtn: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #06b6d4 100%)',
    badgeGlow: 'rgba(168, 85, 247, 0.4)',
    mapFill1: '#7c3aed',
    mapFill2: '#a855f7',
    mapFill3: '#06b6d4',
    mapStroke: '#67e8f9',
    progressBar: 'from-purple-500 via-fuchsia-400 to-cyan-300',
    ambientOrbs: {
      orb1: 'from-purple-500/25 via-fuchsia-400/20 to-cyan-400/20 dark:from-purple-700/15 dark:via-fuchsia-800/10 dark:to-cyan-700/15',
      orb2: 'from-cyan-400/20 via-purple-400/15 to-fuchsia-400/20 dark:from-cyan-800/15 dark:via-purple-900/10 dark:to-fuchsia-900/15',
      orb3: 'from-violet-300/20 via-cyan-200/10 to-fuchsia-200/15 dark:from-violet-950/20 dark:via-cyan-950/10 dark:to-transparent'
    },
    textColor: 'text-purple-300',
    subTextColor: 'text-cyan-200',
    borderColor: 'border-purple-500/30',
    glowColor: 'bg-purple-500/15',
    tagColor: '#7c3aed'
  }
];

export function getTheme(id) {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}
