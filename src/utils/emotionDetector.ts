import { EmotionType, EmotionResult } from '../types/emotion';

interface EmotionPattern {
  keywords: string[];
  weight: number;
}

const emotionPatterns: Record<EmotionType, EmotionPattern[]> = {
  joy: [
    { keywords: ['senang', 'bahagia', 'gembira', 'suka', 'antusias', 'excited', 'amazing', 'wonderful'], weight: 3 },
    { keywords: ['berhasil', 'sukses', 'menang', 'lulus', 'dapat', 'tercapai'], weight: 2.5 },
    { keywords: ['terima kasih', 'syukur', 'grateful', 'blessed', 'appreciate'], weight: 2 },
    { keywords: ['hebat', 'luar biasa', 'fantastic', 'awesome', 'perfect'], weight: 2 }
  ],
  sadness: [
    { keywords: ['sedih', 'lelah', 'capek', 'tired', 'exhausted', 'down'], weight: 3 },
    { keywords: ['kecewa', 'disappointed', 'hurt', 'sakit hati', 'terpukul'], weight: 2.5 },
    { keywords: ['tidak semangat', 'unmotivated', 'hopeless', 'putus asa'], weight: 2.5 },
    { keywords: ['berat', 'sulit', 'susah', 'struggle', 'difficult'], weight: 2 }
  ],
  anger: [
    { keywords: ['marah', 'kesal', 'angry', 'mad', 'furious', 'annoyed'], weight: 3 },
    { keywords: ['benci', 'hate', 'muak', 'sick of', 'fed up'], weight: 2.5 },
    { keywords: ['tidak fair', 'unfair', 'injustice', 'tidak adil'], weight: 2.5 },
    { keywords: ['frustrasi', 'frustrated', 'irritated', 'pissed'], weight: 2 }
  ],
  fear: [
    { keywords: ['takut', 'scared', 'afraid', 'fear', 'terrified'], weight: 3 },
    { keywords: ['cemas', 'anxious', 'worried', 'nervous', 'stress'], weight: 2.5 },
    { keywords: ['khawatir', 'concern', 'panic', 'panik'], weight: 2.5 },
    { keywords: ['ragu', 'doubt', 'uncertain', 'tidak yakin'], weight: 2 }
  ],
  love: [
    { keywords: ['cinta', 'love', 'sayang', 'care', 'caring'], weight: 3 },
    { keywords: ['rindu', 'miss', 'missing', 'kangen'], weight: 2.5 },
    { keywords: ['peduli', 'concern', 'support', 'dukung'], weight: 2 },
    { keywords: ['romantis', 'romantic', 'sweet', 'manis'], weight: 2 }
  ],
  surprise: [
    { keywords: ['wow', 'amazing', 'incredible', 'unbelievable'], weight: 3 },
    { keywords: ['terkejut', 'surprised', 'shocked', 'kaget'], weight: 2.5 },
    { keywords: ['tidak menyangka', 'unexpected', 'sudden'], weight: 2.5 },
    { keywords: ['heran', 'wonder', 'curious', 'penasaran'], weight: 2 }
  ]
};

const emotionAdvice: Record<EmotionType, string[]> = {
  joy: [
    'Bagus sekali! Nikmati momen kebahagiaan ini dan bagikan energi positifmu dengan orang lain.',
    'Kegembiraan yang kamu rasakan adalah hasil dari usaha dan sikap positifmu. Terus pertahankan!',
    'Saat-saat bahagia seperti ini perlu dirayakan. Syukuri pencapaian dan nikmati prosesnya.'
  ],
  sadness: [
    'Tidak apa-apa merasa sedih. Beri waktu untuk diri sendiri dan ingat bahwa perasaan ini akan berlalu.',
    'Kesedihan adalah bagian normal dari hidup. Coba berbicara dengan orang terdekat atau lakukan aktivitas yang menenangkan.',
    'Perasaan ini valid dan wajar. Jangan terlalu keras pada diri sendiri, ambil waktu untuk pulih secara perlahan.'
  ],
  anger: [
    'Kemarahan adalah sinyal bahwa ada sesuatu yang perlu diubah. Coba ambil napas dalam dan pikirkan solusi yang konstruktif.',
    'Wajar merasa kesal, tapi jangan biarkan amarah menguasai. Coba ekspresikan perasaan ini dengan cara yang sehat.',
    'Gunakan energi dari kemarahan ini untuk membuat perubahan positif. Fokus pada apa yang bisa kamu kontrol.'
  ],
  fear: [
    'Ketakutan menunjukkan bahwa kamu peduli pada hasilnya. Coba pecah masalah besar menjadi langkah-langkah kecil.',
    'Rasa takut adalah hal yang normal. Hadapi satu langkah pada satu waktu dan ingat bahwa kamu lebih kuat dari yang kamu kira.',
    'Kecemasan bisa diatasi dengan persiapan dan dukungan. Jangan ragu untuk meminta bantuan orang terdekat.'
  ],
  love: [
    'Cinta dan kasih sayang adalah kekuatan yang indah. Terus ekspresikan perasaan positif ini kepada orang-orang tersayang.',
    'Perasaan cinta menunjukkan kapasitas hatimu untuk peduli. Jaga hubungan-hubungan berharga ini dengan baik.',
    'Kasih sayang yang kamu rasakan adalah berkah. Nikmati kedekatan dan koneksi emosional yang mendalam ini.'
  ],
  surprise: [
    'Kejutan dalam hidup membuat semuanya menarik! Nikmati momen-momen tak terduga yang membawa warna baru.',
    'Rasa kagum menunjukkan bahwa kamu masih terbuka untuk hal-hal baru. Terus jaga rasa ingin tahu dan keajaiban ini.',
    'Surprise menandakan bahwa hidup penuh dengan kemungkinan. Tetap terbuka terhadap pengalaman dan peluang baru.'
  ]
};

export function detectEmotion(text: string): EmotionResult {
  const scores: Record<EmotionType, number> = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    love: 0,
    surprise: 0
  };

  const lowerText = text.toLowerCase();

  // Calculate scores for each emotion
  Object.entries(emotionPatterns).forEach(([emotion, patterns]) => {
    patterns.forEach(pattern => {
      const matches = pattern.keywords.filter(keyword => 
        lowerText.includes(keyword.toLowerCase())
      ).length;
      scores[emotion as EmotionType] += matches * pattern.weight;
    });
  });

  // Find the dominant emotion
  const dominantEmotion = Object.entries(scores).reduce((a, b) => 
    scores[a[0] as EmotionType] > scores[b[0] as EmotionType] ? a : b
  )[0] as EmotionType;

  // Calculate confidence (normalize scores)
  const maxScore = Math.max(...Object.values(scores));
  const confidence = maxScore > 0 ? Math.min((maxScore / 10) * 100, 95) : Math.random() * 30 + 40;

  // Generate description and advice
  const advice = emotionAdvice[dominantEmotion][Math.floor(Math.random() * emotionAdvice[dominantEmotion].length)];
  
  let description = '';
  switch (dominantEmotion) {
    case 'joy':
      description = 'Dari tulisanmu, kamu tampak sedang merasa bahagia dan bersemangat. Energi positif terpancar dari kata-kata yang kamu gunakan.';
      break;
    case 'sadness':
      description = 'Dari tulisanmu, kamu tampak sedang merasa sedih atau lelah. Mungkin karena tekanan atau kekecewaan yang sedang kamu hadapi.';
      break;
    case 'anger':
      description = 'Dari tulisanmu, terasa ada perasaan kesal atau frustrasi. Sepertinya ada situasi yang membuatmu merasa tidak nyaman.';
      break;
    case 'fear':
      description = 'Dari tulisanmu, terasa ada kekhawatiran atau kecemasan. Mungkin kamu sedang menghadapi sesuatu yang membuatmu tidak yakin.';
      break;
    case 'love':
      description = 'Dari tulisanmu, terpancar perasaan kasih sayang dan kepedulian. Kamu tampak menghargai hubungan dan orang-orang di sekitarmu.';
      break;
    case 'surprise':
      description = 'Dari tulisanmu, terasa ada kejutan atau rasa kagum. Sepertinya ada sesuatu yang menarik atau tidak terduga dalam hidupmu.';
      break;
  }

  return {
    id: Date.now().toString(),
    text,
    emotion: dominantEmotion,
    confidence: Math.round(confidence),
    description,
    advice,
    timestamp: new Date()
  };
}