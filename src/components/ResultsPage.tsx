import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, History, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { useEmotion } from '../context/EmotionContext';
import { EMOTIONS } from '../types/emotion';

export function ResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEmotionById, updateEmotionFeedback } = useEmotion();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [suggestion, setSuggestion] = useState('');

  const result = id ? getEmotionById(id) : null;

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Hasil tidak ditemukan</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const emotionConfig = EMOTIONS[result.emotion];

  const handleFeedbackSubmit = () => {
    if (feedback) {
      updateEmotionFeedback(result.id, feedback, suggestion);
      setShowFeedback(false);
    }
  };

  return (
    <div className={`min-h-screen ${emotionConfig.bgColor}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/input')}
            className="p-2 hover:bg-white/50 rounded-full transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Hasil Analisis Emosi</h1>
            <p className="text-gray-600 mt-1">Berikut adalah hasil deteksi emosi dari tulisanmu</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Result */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emotion Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">{emotionConfig.icon}</div>
                <h2 className={`text-3xl font-bold ${emotionConfig.color} mb-2`}>
                  {emotionConfig.indonesianName}
                </h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="bg-gray-200 rounded-full h-2 w-32 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {result.confidence}%
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {emotionConfig.description}
                </p>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Analisis Tulisan</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700 italic leading-relaxed">
                  "{result.text}"
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {result.description}
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-3">💡 Saran untuk kamu:</h4>
                <p className="text-blue-700 leading-relaxed">
                  {result.advice}
                </p>
              </div>
            </div>

            {/* User Feedback */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Bagaimana menurutmu?</h3>
              
              {!result.userFeedback && !showFeedback ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    Apakah hasil emosi ini sesuai dengan perasaanmu saat ini?
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setFeedback('positive');
                        setShowFeedback(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      Ya, sesuai
                    </button>
                    <button
                      onClick={() => {
                        setFeedback('negative');
                        setShowFeedback(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                    >
                      <ThumbsDown className="w-5 h-5" />
                      Tidak sesuai
                    </button>
                  </div>
                </div>
              ) : showFeedback ? (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    {feedback === 'positive' 
                      ? 'Senang mendengar hasil analisisnya sesuai! Ada masukan tambahan?' 
                      : 'Terima kasih atas feedbacknya. Apa yang bisa kami perbaiki?'
                    }
                  </p>
                  <textarea
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    placeholder="Masukan atau komentar (opsional)"
                    className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleFeedbackSubmit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Kirim
                    </button>
                    <button
                      onClick={() => setShowFeedback(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">
                    {result.userFeedback === 'positive' 
                      ? '✅ Kamu mengatakan hasil ini sesuai dengan perasaanmu'
                      : '❌ Kamu mengatakan hasil ini tidak sesuai dengan perasaanmu'
                    }
                  </p>
                  {result.userSuggestion && (
                    <p className="text-gray-600 mt-2 italic">
                      "{result.userSuggestion}"
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Aksi Selanjutnya</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/input')}
                  className="w-full flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  Coba Lagi
                </button>
                <button
                  onClick={() => navigate('/history')}
                  className="w-full flex items-center gap-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                >
                  <History className="w-5 h-5" />
                  Lihat Riwayat
                </button>
              </div>
            </div>

            {/* Timestamp */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Detail Analisis</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal:</span>
                  <span className="text-gray-800">
                    {result.timestamp.toLocaleDateString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Waktu:</span>
                  <span className="text-gray-800">
                    {result.timestamp.toLocaleTimeString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Panjang teks:</span>
                  <span className="text-gray-800">
                    {result.text.length} karakter
                  </span>
                </div>
              </div>
            </div>

            {/* Privacy Note */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="text-green-800 text-sm leading-relaxed">
                🔒 <strong>Privasi Terjaga:</strong> Tulisan yang kamu kirim hanya digunakan untuk analisis emosi 
                dan disimpan secara lokal di perangkatmu. Data tidak dikirim ke server eksternal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}