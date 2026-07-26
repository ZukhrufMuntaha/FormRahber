import React, { useState, useEffect, useRef } from 'react';
import { AppLanguage, ScreenState } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { FileText, Languages, RefreshCw, HelpCircle, Sparkles, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentLang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  screenState: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  onNavigateHome: () => void;
  onNavigateDemoForms: () => void;
  onNavigateHowItWorks: () => void;
  onNavigateAbout: () => void;
  onStartUpload: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  screenState,
  onNavigate,
  onNavigateHome,
  onNavigateDemoForms,
  onNavigateHowItWorks,
  onNavigateAbout,
  onStartUpload,
  onReset,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const navLabels = {
    en: {
      home: 'Home',
      demoForms: 'Demo Forms',
      howItWorks: 'How it Works',
      about: 'About',
      getStarted: 'Get Started',
    },
    ur: {
      home: 'ہوم',
      demoForms: 'نمونہ فارمز',
      howItWorks: 'یہ کیسے کام کرتا ہے',
      about: 'ہمارے بارے میں',
      getStarted: 'شروع کریں',
    },
    roman_urdu: {
      home: 'Home',
      demoForms: 'Demo Forms',
      howItWorks: 'How it Works',
      about: 'About',
      getStarted: 'Get Started',
    },
  };

  const navT = navLabels[currentLang] || navLabels.en;
  const isUrdu = currentLang === 'ur';

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleGlobalClick = (event: MouseEvent | TouchEvent) => {
      // Check if click was on hamburger button
      const hamburgerBtn = document.getElementById('mobile-hamburger-btn');
      if (hamburgerBtn && hamburgerBtn.contains(event.target as Node)) {
        return;
      }
      setIsMobileMenuOpen(false);
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleGlobalClick);
      document.addEventListener('touchstart', handleGlobalClick);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('touchstart', handleGlobalClick);
    };
  }, [isMobileMenuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-2xs w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-1 sm:gap-4 relative w-full">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => {
              onNavigateHome();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-1 sm:gap-2.5 text-left group focus:outline-hidden shrink-0 cursor-pointer"
            id="brand-logo-button"
          >
            <div className="w-6.5 h-6.5 sm:w-9 sm:h-9 bg-[#2563EB] rounded-[7px] sm:rounded-[10px] flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:bg-[#1D4ED8] transition-colors shrink-0">
              <div className="w-3 h-3 sm:w-4.5 sm:h-4.5 border-2 border-white rounded-xs flex items-center justify-center">
                <FileText className="w-2 h-2 sm:w-3 sm:h-3 stroke-[2.5]" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xs sm:text-xl font-extrabold tracking-tight text-[#1F2937]">
                FormRahber
              </span>
            </div>
          </button>
        </div>

        {/* Center: Navigation Buttons for Desktop */}
        <nav className={`hidden md:flex flex-1 items-center justify-center gap-6 text-sm font-bold ${isUrdu ? 'font-urdu' : ''}`}>
          <button
            id="nav-home-btn"
            onClick={() => {
              onNavigateHome();
            }}
            className="px-2.5 py-1 transition-colors hover:text-[#2563EB] text-[#1F2937] active:text-[#2563EB] focus:text-[#2563EB] cursor-pointer rounded-lg"
          >
            {navT.home}
          </button>

          <button
            id="nav-demo-forms-btn"
            onClick={() => {
              onNavigateDemoForms();
            }}
            className="px-2.5 py-1 transition-colors hover:text-[#2563EB] text-[#1F2937] active:text-[#2563EB] focus:text-[#2563EB] cursor-pointer rounded-lg"
          >
            {navT.demoForms}
          </button>

          <button
            id="nav-how-it-works-btn"
            onClick={() => {
              onNavigateHowItWorks();
            }}
            className="px-2.5 py-1 transition-colors hover:text-[#2563EB] text-[#1F2937] active:text-[#2563EB] focus:text-[#2563EB] cursor-pointer rounded-lg whitespace-nowrap"
          >
            {navT.howItWorks}
          </button>

          <button
            id="nav-about-btn"
            onClick={() => {
              onNavigateAbout();
            }}
            className="px-2.5 py-1 transition-colors hover:text-[#2563EB] text-[#1F2937] active:text-[#2563EB] focus:text-[#2563EB] cursor-pointer rounded-lg"
          >
            {navT.about}
          </button>
        </nav>

        {/* Right Corner: Language Selector, Get Started Button & Hamburger Button */}
        <div className="flex items-center gap-1 sm:gap-3.5 shrink-0 min-w-0">
          
          {/* Language Selector */}
          <div className="flex bg-[#F8FBFF] p-0.5 rounded-full text-[9px] sm:text-xs font-bold border border-[#E5E7EB] shadow-2xs shrink-0">
            <button
              id="lang-en-btn"
              onClick={() => onLanguageChange('en')}
              className={`px-1 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                  : 'text-[#1F2937] hover:text-[#2563EB]'
              }`}
            >
              EN
            </button>
            
            <button
              id="lang-ur-btn"
              onClick={() => onLanguageChange('ur')}
              className={`px-1 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
                currentLang === 'ur'
                  ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                  : 'text-[#1F2937] hover:text-[#2563EB] font-urdu'
              }`}
            >
              اردو
            </button>

            <button
              id="lang-roman-btn"
              onClick={() => onLanguageChange('roman_urdu')}
              className={`px-1 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
                currentLang === 'roman_urdu'
                  ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                  : 'text-[#1F2937] hover:text-[#2563EB]'
              }`}
            >
              <span className="sm:hidden">Rom</span>
              <span className="hidden sm:inline">Roman Urdu</span>
            </button>
          </div>

          {/* Action button when inside session */}
          {screenState !== 'landing' && screenState !== 'about' && (
            <button
              id="start-new-header-btn"
              onClick={onReset}
              className={`hidden md:flex items-center gap-1.5 text-xs font-bold text-[#1F2937] hover:text-[#2563EB] bg-white hover:bg-[#F8FBFF] px-3 py-1.5 rounded-xl border border-[#E5E7EB] shadow-2xs transition-all hover:border-blue-300 cursor-pointer ${isUrdu ? 'font-urdu' : ''}`}
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{t.startNewForm}</span>
            </button>
          )}

          {/* Get Started Button in Right Corner */}
          {(screenState === 'landing' || screenState === 'about') && (
            <button
              id="get-started-header-btn"
              onClick={onStartUpload}
              className={`bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-[11px] sm:text-sm px-2 sm:px-5 py-1 sm:py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${isUrdu ? 'font-urdu' : ''}`}
            >
              <span>{navT.getStarted}</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            id="mobile-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-[12px] bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#1E3A8A] transition-colors cursor-pointer border border-[#E5E7EB] shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E3A8A]" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E3A8A]" />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-[#E5E7EB] shadow-lg py-3 px-4 flex flex-col gap-1.5 z-50 ${isUrdu ? 'font-urdu' : ''}`}>
          <button
            id="mobile-nav-home-btn"
            onClick={() => {
              onNavigateHome();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-sm text-[#1F2937] hover:bg-slate-50 hover:text-[#2563EB] active:text-[#2563EB] transition-colors cursor-pointer"
          >
            {navT.home}
          </button>

          <button
            id="mobile-nav-demo-forms-btn"
            onClick={() => {
              onNavigateDemoForms();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-sm text-[#1F2937] hover:bg-slate-50 hover:text-[#2563EB] active:text-[#2563EB] transition-colors cursor-pointer"
          >
            {navT.demoForms}
          </button>

          <button
            id="mobile-nav-how-it-works-btn"
            onClick={() => {
              onNavigateHowItWorks();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-sm text-[#1F2937] hover:bg-slate-50 hover:text-[#2563EB] active:text-[#2563EB] transition-colors cursor-pointer"
          >
            {navT.howItWorks}
          </button>

          <button
            id="mobile-nav-about-btn"
            onClick={() => {
              onNavigateAbout();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-sm text-[#1F2937] hover:bg-slate-50 hover:text-[#2563EB] active:text-[#2563EB] transition-colors cursor-pointer"
          >
            {navT.about}
          </button>
        </div>
      )}
    </header>
  );
};
