import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Brain, MessageCircle, Sparkles } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Deteksi Emosi Cerdas
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Tulis ekspresi atau unek-unekmu hari ini, dan biarkan sistem kami membantu mengenali 
            emosi yang terkandung di dalamnya. Pahami perasaanmu dengan lebih baik.
          </p>
          
          <button
            onClick={() => navigate('/input')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-pink-700"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Mulai Deteksi Emosi
            </span>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Analisis Mendalam
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Sistem AI kami menganalisis teks dengan algoritma canggih untuk mendeteksi 
              nuansa emosi yang tersembunyi dalam tulisanmu.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-green-100 rounded-full">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Dukungan Empatik
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Dapatkan insight dan saran yang membantu untuk memahami dan mengelola 
              emosimu dengan lebih baik setiap harinya.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-purple-100 rounded-full">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Pelacakan Pola
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Lihat perubahan pola emosimu dari waktu ke waktu dan kenali 
              tren perasaan untuk refleksi diri yang lebih baik.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Siap Memulai Perjalanan Pemahaman Diri?
          </h2>
          <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
            Ekspresikan perasaanmu tanpa sensor. Sistem kami akan membantu mengidentifikasi 
            dan memahami emosi yang kamu rasakan dengan pendekatan yang empatik dan mendukung.
          </p>
          <button
            onClick={() => navigate('/input')}
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Coba Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}