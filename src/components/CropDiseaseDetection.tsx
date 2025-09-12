import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle, Leaf, Eye, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface DiagnosisResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  symptoms: string[];
  treatments: string[];
  prevention: string[];
}

const CropDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockDiagnoses: DiagnosisResult[] = [
    {
      disease: 'Corn Leaf Blight',
      confidence: 87,
      severity: 'medium',
      description: 'Northern corn leaf blight is a fungal disease that affects corn leaves, causing elongated lesions.',
      symptoms: ['Long, elliptical lesions on leaves', 'Gray-green to tan colored spots', 'Lesions may have dark borders'],
      treatments: ['Apply fungicide containing propiconazole', 'Remove infected plant debris', 'Improve air circulation'],
      prevention: ['Use resistant corn varieties', 'Rotate crops annually', 'Avoid overhead irrigation']
    },
    {
      disease: 'Healthy Plant',
      confidence: 94,
      severity: 'low',
      description: 'The plant appears healthy with no visible signs of disease or stress.',
      symptoms: ['Vibrant green coloration', 'No visible lesions or spots', 'Normal leaf structure'],
      treatments: ['Continue current care routine', 'Monitor regularly for changes'],
      prevention: ['Maintain proper nutrition', 'Ensure adequate water management', 'Regular field monitoring']
    },
    {
      disease: 'Soybean Rust',
      confidence: 76,
      severity: 'high',
      description: 'Asian soybean rust is a serious fungal disease that can cause significant yield losses.',
      symptoms: ['Small, reddish-brown pustules on leaves', 'Yellowing and premature leaf drop', 'Reduced pod fill'],
      treatments: ['Apply triazole or strobilurin fungicides', 'Multiple applications may be needed', 'Monitor weather conditions'],
      prevention: ['Plant resistant varieties', 'Scout fields regularly', 'Apply preventive fungicides in high-risk areas']
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDiagnosis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock diagnosis result
    const randomDiagnosis = mockDiagnoses[Math.floor(Math.random() * mockDiagnoses.length)];
    setDiagnosis(randomDiagnosis);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Leaf className="h-5 w-5 mr-2 text-green-600" />
          AI Crop Disease Detection
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>New Analysis</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crop Disease Detection</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center transition-colors duration-300">
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img
                        src={selectedImage}
                        alt="Uploaded crop"
                        className="max-w-full h-64 object-cover rounded-lg mx-auto"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          Upload a photo of your crop
                        </p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                        >
                          Choose File
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {selectedImage && (
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5" />
                        <span>Analyze Image</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Results Section */}
              <div className="space-y-4">
                {diagnosis ? (
                  <div className="space-y-4">
                    {/* Diagnosis Header */}
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {diagnosis.disease}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getSeverityColor(diagnosis.severity)}`}>
                          {getSeverityIcon(diagnosis.severity)}
                          <span>{diagnosis.severity.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Confidence:</span>
                        <div className="flex-1 bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${diagnosis.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {diagnosis.confidence}%
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 transition-colors duration-300">
                      <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Description</h4>
                      <p className="text-sm text-blue-800 dark:text-blue-200">{diagnosis.description}</p>
                    </div>

                    {/* Symptoms */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 transition-colors duration-300">
                      <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2">Symptoms</h4>
                      <ul className="space-y-1">
                        {diagnosis.symptoms.map((symptom, index) => (
                          <li key={index} className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start space-x-2">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Treatments */}
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 transition-colors duration-300">
                      <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">Recommended Treatments</h4>
                      <ul className="space-y-1">
                        {diagnosis.treatments.map((treatment, index) => (
                          <li key={index} className="text-sm text-red-800 dark:text-red-200 flex items-start space-x-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span>{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prevention */}
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 transition-colors duration-300">
                      <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">Prevention Tips</h4>
                      <ul className="space-y-1">
                        {diagnosis.prevention.map((tip, index) => (
                          <li key={index} className="text-sm text-green-800 dark:text-green-200 flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Upload an image and click "Analyze" to get AI-powered disease detection results
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center transition-colors duration-300">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">94%</div>
          <div className="text-sm text-green-700 dark:text-green-300">Healthy Plants</div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center transition-colors duration-300">
          <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">12</div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Analyses This Week</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center transition-colors duration-300">
          <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">87%</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Accuracy Rate</div>
        </div>
      </div>

      {/* Recent Analyses */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Analyses</h3>
        <div className="space-y-3">
          {mockDiagnoses.slice(0, 3).map((result, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg transition-colors duration-300">
              <div className={`p-2 rounded-full ${getSeverityColor(result.severity)}`}>
                {getSeverityIcon(result.severity)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{result.disease}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Confidence: {result.confidence}% • {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(result.severity)}`}>
                {result.severity.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropDiseaseDetection;