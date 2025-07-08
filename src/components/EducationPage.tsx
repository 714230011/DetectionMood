import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play } from 'lucide-react';
import { EMOTIONS, EmotionType } from '../types/emotion';
import { detectEmotion } from '../utils/emotionDetector';
import { useEmotion } from '../context/EmotionContext';

export function EducationPage() {
  const navigate = useNavigate();
  const { addEmotionResult } = useEmotion();
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);

  const handleTryExample = (example: string) => {
    const result = detectEmotion(example);
    addEmotionResult(result);
    navigate(`/result/${result.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              Edukasi Emosi
            </h1>
            <p className="text-gray-600 mt-1">
              Pelajari 6 emosi dasar berdasarkan teori psikologi dan coba deteksi dengan contoh kalimat
            </p>
          </div>
        </div>

        {/* Emotion Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(EMOTIONS).map(([key, config]) => (
            <div
              key={key}
              className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedEmotion === key ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => setSelectedEmotion(selectedEmotion === key ? null : key as EmotionType)}
            >
              <div className={`${config.bgColor} p-6 text-center`}>
                <div className="text-4xl mb-3">{config.icon}</div>
                <h3 className={`text-xl font-bold ${config.color} mb-2`}>
                  {config.indonesianName}
                </h3>
                <p className="text-gray-600 text-sm">
                  {config.description}
                </p>
              </div>
              
              {selectedEmotion === key && (
                <div className="p-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-3">Contoh Kalimat:</h4>
                  <div className="space-y-2">
                    {config.examples.map((example, index) => (
                      <div key={index} className="flex items-center justify-between gap-2">
                        <p className="text-sm text-gray-600 flex-1">
                          "{example}"
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTryExample(example);
                          }}
                          className="p-1 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 transition-colors duration-200 flex-shrink-0"
                          title="Coba deteksi"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Educational Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              🧠 Teori Emosi Dasar
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Menurut penelitian psikologi, manusia memiliki enam emosi dasar yang universal. 
                Emosi-emosi ini hadir di semua budaya dan dapat dikenali melalui ekspresi wajah maupun bahasa.
              </p>
              <p>
                Sistem deteksi emosi kami menggunakan analisis pola kata dan konteks untuk 
                mengidentifikasi emosi dominan dalam tulisan. Meski tidak 100% akurat, 
                ini dapat membantu refleksi diri dan pemahaman emosi.
              </p>
              <p>
                Setiap emosi memiliki fungsi penting dalam kehidupan manusia:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Kegembiraan:</strong> Memotivasi dan memperkuat perilaku positif</li>
                <li><strong>Kesedihan:</strong> Membantu pemrosesan kehilangan dan perubahan</li>
                <li><strong>Kemarahan:</strong> Memberi energi untuk menghadapi masalah</li>
                <li><strong>Ketakutan:</strong> Melindungi dari bahaya potensial</li>
                <li><strong>Cinta:</strong> Membangun ikatan dan hubungan sosial</li>
                <li><strong>Kejutan:</strong> Meningkatkan perhatian pada hal baru</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              💡 Tips Mengenali Emosi
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">1. Perhatikan Kata Kunci</h4>
                <p className="text-blue-700 text-sm">
                  Kata-kata yang kamu gunakan sering mencerminkan emosi. Misalnya "lelah", "capek" 
                  biasanya menunjukkan kesedihan atau frustrasi.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <h4 className="font-semibold text-green-800 mb-2">2. Konteks Situasi</h4>
                <p className="text-green-700 text-sm">
                  Ceritakan situasi yang memicu perasaan. Ini membantu sistem memahami 
                  emosi dengan lebih akurat.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-2">3. Intensitas Perasaan</h4>
                <p className="text-purple-700 text-sm">
                  Gunakan kata yang menggambarkan seberapa kuat perasaanmu. "Sedikit sedih" 
                  berbeda dengan "sangat terpukul".
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                <h4 className="font-semibold text-orange-800 mb-2">4. Campuran Emosi</h4>
                <p className="text-orange-700 text-sm">
                  Wajar jika kamu merasakan beberapa emosi sekaligus. Sistem akan mendeteksi 
                  emosi yang paling dominan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Siap Mempraktikkan Pengetahuanmu?
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Sekarang kamu sudah tahu tentang berbagai jenis emosi. Coba tulis perasaanmu sendiri 
            dan lihat apakah sistem dapat mendeteksinya dengan tepat!
          </p>
          <button
            onClick={() => navigate('/input')}
            className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Mulai Deteksi Emosi
          </button>
        </div>
      </div>
    </div>
  );
}