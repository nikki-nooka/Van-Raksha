import React, { useState, useCallback } from 'react';
import { analyzeImage } from '../services/geminiService';
import type { AnalysisResult } from '../types';
import { UploadIcon, ShieldCheckIcon, LightBulbIcon, MapPinIcon } from '../constants';
import Card from './ui/Card';
import AnalysisInProgressAnimation from './animations/AnalysisInProgressAnimation';

interface ImageAnalyzerProps {
  onThreatDetected: (threatName:string) => void;
}

const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({ onThreatDetected }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const processFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
        setImageFile(file);
        setResults([]);
        setError(null);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    } else {
        setError("Please drop or select a valid image file (PNG, JPG, WEBP).");
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
        processFile(file);
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!imageFile) {
      setError("Please select an image file first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      try {
        const base64String = (reader.result as string).split(',')[1];
        const analysisResults = await analyzeImage(base64String);

        if (analysisResults.length > 0) {
          onThreatDetected(analysisResults[0].threatName);
          // Wait for the main animation to play before showing results
          setTimeout(() => {
            setResults(analysisResults);
            setIsLoading(false);
          }, 3500); // Updated to match new animation duration
        } else {
          setResults([]);
          setIsLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        setError("Failed to read the image file.");
        setIsLoading(false);
    }
  }, [imageFile, onThreatDetected]);
  
  const getConfidenceClass = (confidence: 'High' | 'Medium' | 'Low') => {
    switch (confidence) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const ResultSection: React.FC<{icon: React.ReactNode; title: string; children: React.ReactNode}> = ({icon, title, children}) => (
    <div>
        <h4 className="flex items-center text-md font-semibold text-slate-700 mb-2">
            {icon}
            <span className="ml-2">{title}</span>
        </h4>
        <div className="text-sm text-slate-600 space-y-2">{children}</div>
    </div>
  );
  
  const InitialStateDisplay = () => (
    <div className="text-center h-full flex flex-col items-center justify-center p-4">
        <img src="https://media1.tenor.com/m/a71c85j4t2gAAAAC/world-scan-scanning.gif" alt="Satellite scanning the globe" className="w-40 h-40 object-contain" />
        <p className="text-slate-500 mt-4">Upload an image to begin analysis.</p>
    </div>
  );
  
  const NoThreatsDisplay = () => (
    <div className="text-center h-full flex flex-col items-center justify-center p-4">
        <img src="https://media.tenor.com/m/pQy6ABOd90MAAAAC/forest-nature.gif" alt="Lush, healthy forest" className="w-full max-w-sm h-48 object-cover rounded-lg" />
        <div className="mt-4 p-2 bg-green-50 rounded-lg">
             <p className="font-semibold text-green-700">No threats detected.</p>
             <p className="text-sm text-green-600">The analyzed area appears to be safe and healthy.</p>
        </div>
    </div>
  );

  return (
    <Card className="w-full">
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side: Upload */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <label 
              htmlFor="file-upload" 
              className={`relative cursor-pointer w-full aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50/50 hover:border-emerald-400'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg p-1" />
              ) : (
                <div className="text-center p-4 pointer-events-none">
                  <UploadIcon className="mx-auto h-10 w-10 text-slate-400" />
                  <p className="mt-2 text-sm text-slate-600">
                    <span className="font-semibold text-emerald-600">Drag & drop or click to upload</span>
                  </p>
                  <p className="text-xs text-slate-500">Satellite or ground-level photos</p>
                </div>
              )}
              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
            </label>
            <button
              onClick={handleAnalyze}
              disabled={!imageFile || isLoading}
              className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
            >
              {isLoading ? <span className="text-white">Analyzing...</span> : 'Analyze Image'}
            </button>
          </div>

          {/* Right Side: Results */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Analysis Report</h3>
            <div className="flex-grow bg-slate-50/70 rounded-lg p-4 min-h-[20rem] overflow-y-auto border border-slate-200 relative">
              {isLoading && <AnalysisInProgressAnimation imagePreview={imagePreview} />}
              {error && <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">{error}</div>}
              {!isLoading && !error && results.length === 0 && !imageFile && <InitialStateDisplay />}
              {!isLoading && !error && results.length === 0 && imageFile && <NoThreatsDisplay />}
              {!isLoading && !error && results.length > 0 && (
                <div className="space-y-6">
                  {results.map((result, index) => (
                    <div 
                      key={index}
                      className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm opacity-0 animate-materialize"
                      style={{ animationDelay: `${index * 200}ms`}}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-bold text-emerald-700">{result.threatName}</h4>
                        <span className={`text-xs font-semibold px-2.5 py-1 border rounded-full ${getConfidenceClass(result.confidence)}`}>
                          {result.confidence} Confidence
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">{result.description}</p>
                      
                      <div className="space-y-4">
                          <ResultSection icon={<LightBulbIcon className="w-5 h-5 text-yellow-600"/>} title="Potential Causes">
                             <p>{result.causes}</p>
                          </ResultSection>

                          <ResultSection icon={<MapPinIcon className="w-5 h-5 text-blue-600"/>} title="Predicted Impact">
                             <p>{result.predictedImpact}</p>
                          </ResultSection>

                          <ResultSection icon={<ShieldCheckIcon className="w-5 h-5 text-green-600"/>} title="Precautions & Safety Measures">
                            <ul className="list-disc list-inside space-y-1">
                                {result.precautions.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                          </ResultSection>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ImageAnalyzer;