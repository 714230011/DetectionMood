import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Trash2, Calendar, MessageSquare } from 'lucide-react';
import { useEmotion } from '../context/EmotionContext';
import { EMOTIONS } from '../types/emotion';

export function HistoryPage() {
  const navigate = useNavigate();
  const { emotionHistory, deleteEmotionResult } = useEmotion();

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah kamu yakin ingin menghapus data ini?')) {
      deleteEmotionResult(id);
    }
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Riwayat Emosi</h1>
            <p className="text-gray-600 mt-1">
              Berikut adalah rekaman emosi kamu dari tulisan sebelumnya. 
              Kamu bisa melihat perubahan emosimu dari waktu ke waktu.
            </p>
          </div>
        </div>

        {emotionHistory.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Belum ada riwayat emosi
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Mulai deteksi emosi pertamamu untuk melihat pola perasaan dan mendapatkan insight tentang dirimu.
            </p>
            <button
              onClick={() => navigate('/input')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Mulai Deteksi Emosi
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {emotionHistory.length}
                </div>
                <div className="text-sm text-gray-600">Total Analisis</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {emotionHistory.filter(h => h.userFeedback === 'positive').length}
                </div>
                <div className="text-sm text-gray-600">Hasil Akurat</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {new Set(emotionHistory.map(h => h.emotion)).size}
                </div>
                <div className="text-sm text-gray-600">Jenis Emosi</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {Math.round(emotionHistory.reduce((acc, h) => acc + h.confidence, 0) / emotionHistory.length)}%
                </div>
                <div className="text-sm text-gray-600">Rata-rata Akurasi</div>
              </div>
            </div>

            {/* History List */}
            <div className="space-y-4">
              {emotionHistory.map((entry) => {
                const emotionConfig = EMOTIONS[entry.emotion];
                return (
                  <div key={entry.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{emotionConfig.icon}</span>
                            <div>
                              <h3 className={`font-semibold ${emotionConfig.color}`}>
                                {emotionConfig.indonesianName}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                {entry.timestamp.toLocaleDateString('id-ID', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                                <span className="mx-1">•</span>
                                {entry.timestamp.toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            {truncateText(entry.text)}
                          </p>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="bg-gray-200 rounded-full h-2 w-20 overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                                  style={{ width: `${entry.confidence}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">
                                {entry.confidence}%
                              </span>
                            </div>
                            
                            {entry.userFeedback && (
                              <div className="text-sm">
                                {entry.userFeedback === 'positive' ? (
                                  <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                    ✓ Sesuai
                                  </span>
                                ) : (
                                  <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                    ✗ Tidak sesuai
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => navigate(`/result/${entry.id}`)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                            title="Lihat Detail"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                            title="Hapus"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}