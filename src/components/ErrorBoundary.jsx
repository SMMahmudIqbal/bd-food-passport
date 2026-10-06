import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      localStorage.removeItem('bd_food_passport_eaten');
      localStorage.removeItem('bd_food_passport_wishlist');
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 text-white font-bengali">
          <div className="max-w-md w-full glass-panel p-6 rounded-3xl text-center space-y-4 border border-rose-500/30 shadow-2xl bg-slate-800/80">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-white">
              কিছু একটা সমস্যা হয়েছে!
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              অ্যাপটি চালু করতে একটি সাময়িক সমস্যা দেখা দিয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={this.handleReload}
                className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 font-bold text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-lg"
              >
                <RefreshCw size={16} />
                <span>পুনরায় লোড করুন</span>
              </button>
              <button
                onClick={this.handleReset}
                className="text-xs text-slate-400 hover:text-slate-200 py-1 transition"
              >
                ডাটা রিসেট করে শুরু করুন
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
