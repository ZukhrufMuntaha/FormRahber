import React, { useRef, useState, useCallback } from 'react';
import { AppLanguage, SampleFormTemplate } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { SAMPLE_FORMS } from '../data/sampleForms';
import {
  Upload,
  Camera,
  ArrowLeft,
  FileImage,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface UploadModalProps {
  currentLang: AppLanguage;
  onImageSelected: (base64: string) => void;
  onSelectSample: (sample: SampleFormTemplate) => void;
  onCancel: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  currentLang,
  onImageSelected,
  onSelectSample,
  onCancel,
}) => {
  const t = TRANSLATIONS[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // File Upload Handler
  const handleFileChange = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onImageSelected(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Camera start
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access failed:', err);
      setCameraError('Camera access denied or unavailable on this device.');
    }
  };

  // Camera stop
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Take snapshot
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      stopCamera();
      onImageSelected(dataUrl);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <button
          id="back-to-landing-btn"
          onClick={onCancel}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#1F2937] font-bold text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#DBEAFE] px-3.5 py-1 rounded-full border border-blue-200">
          Form Analysis
        </span>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
          {t.uploadHeader}
        </h1>
        <p className="text-[#6B7280] text-sm max-w-lg mx-auto">
          Upload a clear 1-page photo or capture a snapshot of your blank form.
        </p>
      </div>

      {/* Main Upload Zone */}
      {!isCameraActive ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={`relative border-2 border-dashed rounded-[24px] p-8 sm:p-12 text-center transition-all bg-white ${
            isDragging
              ? 'border-[#2563EB] bg-[#DBEAFE]/40 scale-[1.01]'
              : 'border-[#E5E7EB] hover:border-[#2563EB]'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg,image/png"
            className="hidden"
            id="form-file-input"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />

          <div className="max-w-md mx-auto space-y-5">
            <div className="w-16 h-16 mx-auto rounded-[18px] bg-[#DBEAFE] border border-blue-200 flex items-center justify-center text-[#2563EB] shadow-2xs">
              <Upload className="w-8 h-8 text-[#2563EB]" />
            </div>

            <div className="space-y-1">
              <p className="font-extrabold text-lg text-[#1F2937]">
                {t.dragDropText}
              </p>
              <p className="text-xs text-[#6B7280]">
                Supports JPG, PNG (Max size: 10MB)
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {/* Primary Royal Blue Button */}
              <button
                id="browse-files-btn"
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3.5 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <FileImage className="w-4 h-4" />
                <span>Browse Files</span>
              </button>

              {/* Secondary Button */}
              <button
                id="open-camera-btn"
                onClick={startCamera}
                className="px-6 py-3.5 rounded-[14px] bg-white hover:bg-[#F8FBFF] text-[#2563EB] font-bold text-sm border-2 border-[#2563EB] shadow-2xs transition-colors flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-[#2563EB]" />
                <span>{t.cameraCapture}</span>
              </button>
            </div>

            {cameraError && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-[12px] border border-red-200 text-xs text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{cameraError}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Camera Active View */
        <div className="bg-white rounded-[24px] border border-[#E5E7EB] p-6 space-y-4 shadow-md text-center">
          <div className="relative aspect-4/3 max-w-lg mx-auto bg-black rounded-[18px] overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              id="capture-photo-btn"
              onClick={capturePhoto}
              className="px-8 py-3.5 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Form Snapshot</span>
            </button>

            <button
              id="cancel-camera-btn"
              onClick={stopCamera}
              className="px-6 py-3.5 rounded-[14px] bg-white hover:bg-[#F8FBFF] text-[#6B7280] font-bold text-sm border border-[#E5E7EB]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Or Select Sample Form Section */}
      <div className="pt-6 space-y-4">
        <div className="relative text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E7EB]" />
          </div>
          <div className="relative inline-block px-4 bg-[#F8FBFF] text-xs font-bold text-[#6B7280] uppercase tracking-wider">
            Or test with a sample form
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_FORMS.map((sample) => (
            <button
              key={sample.id}
              id={`upload-sample-btn-${sample.id}`}
              onClick={() => onSelectSample(sample)}
              className="p-4 bg-white rounded-[18px] border border-[#E5E7EB] shadow-2xs hover:shadow-md hover:border-blue-300 transition-all text-left flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#DBEAFE] px-2 py-0.5 rounded-md">
                    {sample.category}
                  </span>
                  <span className="text-xs text-[#10B981] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ready
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#1F2937] group-hover:text-[#2563EB] transition-colors">
                  {sample.title}
                </h4>
              </div>

              <div className="pt-3 flex items-center text-xs font-bold text-[#2563EB]">
                <span>Load Form Demo</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
