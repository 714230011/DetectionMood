import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Lightbulb, MessageSquare } from 'lucide-react';
import { detectEmotion } from '../utils/emotionDetector';
import { useEmotion } from '../context/EmotionContext';

export function TextInputPage() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { addEmotionResult } = useEmotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const result = detectEmotion(text);
      addEmotionResult(result);
      setIsAnalyzing(false);
      navigate(`/result/${result.id}`);
    }, 2000);
  };

  const exampleTexts = [
    "Aku merasa lelah dan tidak semangat hari ini karena banyak tugas yang menumpuk.",
    "Senang sekali bisa bertemu teman lama setelah sekian lama tidak jumpa!",
    "Kesal banget sama situasi yang tidak fair ini, sudah berusaha tapi hasilnya mengecewakan.",
    "Deg-degan menunggu hasil ujian, semoga semua usaha selama ini tidak sia-sia."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Ceritakan Perasaanmu</h1>
            <p className="text-gray-600 mt-1">Tuliskan apa pun yang sedang kamu rasakan saat ini</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Input Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Ekspresikan dirimu</h2>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Contoh: Aku merasa lelah dan tidak semangat hari ini karena banyak tugas yang menumpuk. Rasanya seperti tidak ada yang berjalan sesuai rencana..."
                    className="w-full h-48 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 leading-relaxed"
                    disabled={isAnalyzing}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {text.length}/1000 karakter
                    </p>
                    <button
                      type="submit"
                      disabled={!text.trim() || isAnalyzing}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isAnalyzing ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Menganalisis...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Deteksi Emosi
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-blue-800 text-sm flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Sistem kami akan mengolah tulisanmu dan mengidentifikasi emosi utama yang terkandung di dalamnya. 
                    Gunakan bahasa sehari-hari dan ekspresikan perasaanmu dengan bebas.
                  </span>
                </p>
              </div>
            </form>
          </div>

          {/* Sidebar with Examples */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                💡 Contoh Tulisan
              </h3>
              <div className="space-y-3">
                {exampleTexts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setText(example)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-sm text-gray-600 hover:text-blue-700"
                    disabled={isAnalyzing}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">
                📋 Tips Menulis
              </h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  Tuliskan apapun yang sedang kamu rasakan tanpa sensor
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  Gunakan bahasa sehari-hari yang natural
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  Ceritakan konteks atau situasi yang memicu perasaan
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  Tidak yakin? Ceritakan saja kejadian hari ini
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}