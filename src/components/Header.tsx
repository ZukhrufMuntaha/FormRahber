import React from 'react';
import { AppLanguage, ScreenState } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { FileText, Languages, RefreshCw, HelpCircle, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentLang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  screenState: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  screenState,
  onNavigate,
  onReset,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-12 sm:h-16 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-1.5 sm:gap-3 text-left group focus:outline-hidden shrink-0"
          id="brand-logo-button"
        >
          <div className="w-7 h-7 sm:w-9 sm:h-9 bg-[#2563EB] rounded-[8px] sm:rounded-[10px] flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:bg-[#1D4ED8] transition-colors">
            <div className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 border-2 border-white rounded-xs flex items-center justify-center">
              <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base sm:text-xl font-extrabold tracking-tight text-[#1F2937]">
              FormRahber
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md font-extrabold bg-[#DBEAFE] text-[#2563EB] border border-blue-200">
              AI Rahber
            </span>
          </div>
        </button>

        {/* Right Navigation & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          
          {/* Language Selector */}
          <div className="flex bg-[#F8FBFF] p-0.5 sm:p-1 rounded-full text-[11px] sm:text-xs font-bold border border-[#E5E7EB] shadow-2xs">
            <button
              id="lang-en-btn"
              onClick={() => onLanguageChange('en')}
              className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all ${
                currentLang === 'en'
                  ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              English
            </button>
            
            <button
              id="lang-ur-btn"
              onClick={() => onLanguageChange('ur')}
              className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all ${
                currentLang === 'ur'
                  ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                  : 'text-[#6B7280] hover:text-[#1F2937] font-urdu'
              }`}
            >
              اردو
            </button>

            <button
              id="lang-roman-btn"
              onClick={() => onLanguageChange('roman_urdu')}
              className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all ${
                currentLang === 'roman_urdu'
                  ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              <span className="sm:hidden">Roman</span>
              <span className="hidden sm:inline">Roman Urdu</span>
            </button>
          </div>

          {/* Action buttons when inside a session */}
          {screenState !== 'landing' && (
            <button
              id="start-new-header-btn"
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs font-bold text-[#1F2937] hover:text-[#2563EB] bg-white hover:bg-[#F8FBFF] px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#E5E7EB] shadow-2xs transition-all hover:border-blue-300"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="hidden md:inline">{t.startNewForm}</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
