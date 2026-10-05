import React, { useState, useRef } from 'react';
import { toPng, toBlob } from 'html-to-image';
import {
  X,
  Download,
  Share2,
  Camera,
  Trash2,
  Copy,
  ExternalLink,
  Loader2
} from 'lucide-react';
import PassportCard from './PassportCard';
import { getRank, toBengaliNumerals } from '../data/foods';

export default function PassportCardModal({
  isOpen,
  onClose,
  eatenDistricts,
  userName,
  onUpdateUserName,
  userPhoto,
  onUpdateUserPhoto
}) {
  const exportCardRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [exportError, setExportError] = useState('');

  if (!isOpen) return null;

  const eatenCount = eatenDistricts.size;
  const rank = getRank(eatenCount);

  // Handle Local Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('অনুগ্রহ করে একটি ছবি ফাইল আপলোড করুন');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onUpdateUserPhoto(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Generate PNG & Download (Crisp 1080x1350)
  const handleDownload = async () => {
    if (!exportCardRef.current || isExporting) return;
    setIsExporting(true);
    setExportError('');

    try {
      if (document.fonts) {
        await document.fonts.ready;
      }
      await new Promise((res) => setTimeout(res, 250));

      const dataUrl = await toPng(exportCardRef.current, {
        width: 1080,
        height: 1350,
        canvasWidth: 1080,
        canvasHeight: 1350,
        pixelRatio: 1,
        cacheBust: true
      });

      const link = document.createElement('a');
      link.download = `bangladesh-food-passport-${userName || 'my-card'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export error:', err);
      setExportError('কার্ড ইমেজ তৈরি করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  // Share using Web Share API
  const handleShare = async () => {
    if (!exportCardRef.current || isExporting) return;
    setIsExporting(true);
    setExportError('');

    try {
      if (document.fonts) {
        await document.fonts.ready;
      }
      await new Promise((res) => setTimeout(res, 250));

      const blob = await toBlob(exportCardRef.current, {
        width: 1080,
        height: 1350,
        canvasWidth: 1080,
        canvasHeight: 1350,
        pixelRatio: 1,
        cacheBust: true
      });

      if (!blob) throw new Error('Failed to generate image blob');

      const file = new File([blob], `bd-food-passport-${userName || 'card'}.png`, { type: 'image/png' });
      const shareData = {
        title: 'বাংলাদেশ ফুড পাসপোর্ট',
        text: `আমি বাংলাদেশের ৬৪ জেলার মধ্যে ${toBengaliNumerals(eatenCount)}টি জেলার ঐতিহ্যবাহী খাবার খেয়েছি! আমার ফুড র‍্যাঙ্ক: ${rank.titleBn}। আপনার পাসপোর্ট তৈরি করুন:`,
        url: window.location.origin
      };

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          ...shareData,
          files: [file]
        });
      } else if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleDownload();
        handleCopyLink();
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share error:', err);
        handleDownload();
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/40 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg glass-panel rounded-[32px] shadow-2xl overflow-hidden my-auto animate-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/60 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪪</span>
            <h3 className="font-bold text-slate-800 dark:text-white text-base">
              আমার ফুড পাসপোর্ট কার্ড
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full glass-pill transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 sm:p-5 max-h-[84vh] overflow-y-auto space-y-4">
          {/* User Inputs (Name & Photo) */}
          <div className="glass-pill p-3.5 rounded-2xl space-y-2.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                আপনার নাম
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => onUpdateUserName(e.target.value)}
                placeholder="নাম লিখুন (যেমন: তানভীর আহমেদ)"
                className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm glass-pill focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-slate-800 dark:text-white"
                maxLength={30}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                আপনার ছবি (ঐচ্ছিক - শুধুই আপনার ফোনে সংরক্ষিত)
              </label>
              <div className="flex items-center gap-2.5">
                <label className="liquid-btn-primary flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition shadow-sm">
                  <Camera size={13} />
                  <span>{userPhoto ? 'ছবি পরিবর্তন করুন' : 'ছবি আপলোড করুন'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {userPhoto && (
                  <button
                    onClick={() => onUpdateUserPhoto('')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-rose-500 hover:text-rose-600 glass-pill transition"
                  >
                    <Trash2 size={12} />
                    <span>মুছুন</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Responsive Preview inside modal */}
          <div className="w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[360px] mx-auto shadow-2xl rounded-3xl overflow-hidden">
            <PassportCard
              eatenDistricts={eatenDistricts}
              userName={userName}
              userPhoto={userPhoto}
              isExport={false}
            />
          </div>

          {/* Hidden/Offscreen 1080x1350 Export Target */}
          <PassportCard
            eatenDistricts={eatenDistricts}
            userName={userName}
            userPhoto={userPhoto}
            cardRef={exportCardRef}
            isExport={true}
          />

          {exportError && (
            <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs rounded-xl text-center font-medium">
              {exportError}
            </div>
          )}

          {/* Action Buttons: Download, Share */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="liquid-btn-primary py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isExporting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>ইমেজ তৈরি হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>PNG ডাউনলোড করুন</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              disabled={isExporting}
              className="py-3 px-4 rounded-2xl glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition disabled:opacity-60 text-slate-800 dark:text-white"
            >
              <Share2 size={16} />
              <span>শেয়ার করুন (Social Share)</span>
            </button>
          </div>

          {/* Footer links */}
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              <Copy size={13} />
              <span>{copiedLink ? 'লিংক কপি হয়েছে! ✓' : 'অ্যাপ লিংক কপি করুন'}</span>
            </button>

            <span>•</span>

            <a
              href="https://bd-food-passport.vercel.app/#make"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:underline font-semibold"
            >
              <span>Make yours</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
