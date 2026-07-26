import React, { useState, useEffect } from 'react';
import {
  AppLanguage,
  FormAnalysisResult,
  RequiredDocument,
  ScreenState,
  UserAnswer,
  SampleFormTemplate,
} from './types';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { UploadModal } from './components/UploadModal';
import { AnalysisLoading } from './components/AnalysisLoading';
import { FormOverview } from './components/FormOverview';
import { GuidedFilling } from './components/GuidedFilling';
import { SummaryReview } from './components/SummaryReview';
import { FormExportPreview } from './components/FormExportPreview';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<AppLanguage>('en');
  const [screenState, setScreenState] = useState<ScreenState>('landing');

  const [analysisResult, setAnalysisResult] = useState<FormAnalysisResult | null>(null);
  const [documents, setDocuments] = useState<RequiredDocument[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswer>>({});
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastUploadedImage, setLastUploadedImage] = useState<string | null>(null);

  // Automatically scroll to top whenever screen view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screenState]);

  // Analyze Image via Server Route
  const analyzeFormImage = async (base64Image: string) => {
    setScreenState('analysis');
    setErrorMsg(null);
    setLastUploadedImage(base64Image);

    try {
      const res = await fetch('/api/analyze-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Image,
          targetLanguage: currentLang,
        }),
      });

      const json = await res.json();

      if (json.success && json.data) {
        setAnalysisResult(json.data);
        setDocuments(json.data.documents || []);
        setUserAnswers({});
        setScreenState('guided');
      } else {
        throw new Error(json.error || 'Could not parse form image.');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMsg(
        err.message ||
          'Failed to analyze form image. Please ensure image has good lighting and text is visible.'
      );
      setScreenState('upload');
    }
  };

  // Select Sample Form Template
  const handleSelectSample = (sample: SampleFormTemplate) => {
    setErrorMsg(null);
    setAnalysisResult(sample.data);
    setDocuments(sample.data.documents || []);
    setUserAnswers({});
    setScreenState('guided');
  };

  // Toggle Document Ready Checkbox
  const handleToggleDocumentReady = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, isReady: !d.isReady } : d))
    );
  };

  // Save/Update Field Answer
  const handleSaveAnswer = (fieldId: string, answer: UserAnswer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [fieldId]: answer,
    }));
  };

  const handleUpdateSingleAnswer = (fieldId: string, newValue: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [fieldId]: {
        fieldId,
        value: newValue,
        isConfirmed: true,
      },
    }));
  };

  // Reset to Landing
  const handleReset = () => {
    setScreenState('landing');
    setAnalysisResult(null);
    setDocuments([]);
    setUserAnswers({});
    setErrorMsg(null);
    setLastUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FBFF] via-white to-[#F8FBFF] font-sans text-[#1F2937] flex flex-col selection:bg-blue-200 selection:text-blue-900">
      
      {/* Sticky Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={(lang) => setCurrentLang(lang)}
        screenState={screenState}
        onNavigate={(screen) => setScreenState(screen)}
        onReset={handleReset}
      />

      {/* Global Error Banner if any */}
      {errorMsg && screenState === 'upload' && (
        <div className="max-w-4xl mx-auto px-4 pt-4 w-full">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-sm flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            {lastUploadedImage && (
              <button
                onClick={() => analyzeFormImage(lastUploadedImage)}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs shrink-0 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry AI</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {screenState === 'landing' && (
          <LandingHero
            currentLang={currentLang}
            onStartUpload={() => setScreenState('upload')}
            onSelectSample={handleSelectSample}
          />
        )}

        {screenState === 'upload' && (
          <UploadModal
            currentLang={currentLang}
            onImageSelected={analyzeFormImage}
            onSelectSample={handleSelectSample}
            onCancel={() => setScreenState('landing')}
          />
        )}

        {screenState === 'analysis' && (
          <AnalysisLoading currentLang={currentLang} />
        )}

        {screenState === 'overview' && analysisResult && (
          <FormOverview
            currentLang={currentLang}
            analysis={analysisResult}
            documents={documents}
            onToggleDocumentReady={handleToggleDocumentReady}
            onStartGuidedFilling={() => setScreenState('guided')}
            onBack={() => setScreenState('landing')}
          />
        )}

        {screenState === 'guided' && analysisResult && (
          <GuidedFilling
            currentLang={currentLang}
            analysis={analysisResult}
            userAnswers={userAnswers}
            documents={documents}
            onSaveAnswer={handleSaveAnswer}
            onFinishGuidedFilling={() => setScreenState('summary')}
            onBackToOverview={() => setScreenState('overview')}
          />
        )}

        {screenState === 'summary' && analysisResult && (
          <SummaryReview
            currentLang={currentLang}
            analysis={analysisResult}
            userAnswers={userAnswers}
            documents={documents}
            onUpdateAnswer={handleUpdateSingleAnswer}
            onReset={handleReset}
            onBackToGuided={() => setScreenState('guided')}
            onOpenExportPreview={() => setScreenState('export')}
          />
        )}

        {screenState === 'export' && analysisResult && (
          <FormExportPreview
            currentLang={currentLang}
            analysis={analysisResult}
            userAnswers={userAnswers}
            formImageUrl={lastUploadedImage || analysisResult.imagePreviewUrl}
            onUpdateAnswer={handleUpdateSingleAnswer}
            onBackToSummary={() => setScreenState('summary')}
            onStartNewForm={handleReset}
          />
        )}
      </main>

    </div>
  );
}
