export interface EmotionResult {
  id: string;
  text: string;
  emotion: EmotionType;
  confidence: number;
  description: string;
  advice: string;
  timestamp: Date;
  userFeedback?: 'positive' | 'negative';
  userSuggestion?: string;
}

export type EmotionType = 'joy' | 'sadness' | 'anger' | 'fear' | 'love' | 'surprise';

export interface EmotionConfig {
  name: string;
  indonesianName: string;
  color: string;
  bgColor: string;
  icon: string;
  description: string;
  examples: string[];
}

export const EMOTIONS: Record<EmotionType, EmotionConfig> = {
  joy: {
    name: 'Joy',
    indonesianName: 'Kegembiraan',
    color: 'text-yellow-600',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    icon: '😊',
    description: 'Perasaan bahagia, puas, dan penuh semangat',
    examples: [
      'Aku sangat senang hari ini!',
      'Terima kasih untuk semua dukungannya',
      'Akhirnya berhasil mencapai target yang diimpikan'
    ]
  },
  sadness: {
    name: 'Sadness',
    indonesianName: 'Kesedihan',
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    icon: '😢',
    description: 'Perasaan sedih, kecewa, atau kehilangan',
    examples: [
      'Aku merasa lelah dan tidak semangat',
      'Hari ini sangat berat bagiku',
      'Rasanya seperti semuanya tidak berjalan dengan baik'
    ]
  },
  anger: {
    name: 'Anger',
    indonesianName: 'Kemarahan',
    color: 'text-red-600',
    bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
    icon: '😠',
    description: 'Perasaan marah, kesal, atau frustrasi',
    examples: [
      'Aku sangat kesal dengan situasi ini',
      'Tidak fair! Kenapa harus begini?',
      'Sudah tidak tahan dengan perlakuan seperti ini'
    ]
  },
  fear: {
    name: 'Fear',
    indonesianName: 'Ketakutan',
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
    icon: '😰',
    description: 'Perasaan takut, cemas, atau khawatir',
    examples: [
      'Aku takut akan gagal',
      'Cemas memikirkan apa yang akan terjadi',
      'Khawatir tidak bisa memenuhi ekspektasi'
    ]
  },
  love: {
    name: 'Love',
    indonesianName: 'Cinta',
    color: 'text-pink-600',
    bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
    icon: '❤️',
    description: 'Perasaan cinta, sayang, atau kasih sayang',
    examples: [
      'Aku sangat menyayangi keluargaku',
      'Terima kasih sudah selalu ada untukku',
      'Rasa syukur yang mendalam untuk semua kebaikan ini'
    ]
  },
  surprise: {
    name: 'Surprise',
    indonesianName: 'Kejutan',
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    icon: '😲',
    description: 'Perasaan terkejut, kagum, atau heran',
    examples: [
      'Wow, aku tidak menyangka!',
      'Benar-benar mengejutkan!',
      'Tidak bisa percaya ini terjadi'
    ]
  }
};