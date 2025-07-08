import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { EmotionResult } from '../types/emotion';

interface EmotionContextType {
  emotionHistory: EmotionResult[];
  addEmotionResult: (result: EmotionResult) => void;
  updateEmotionFeedback: (id: string, feedback: 'positive' | 'negative', suggestion?: string) => void;
  deleteEmotionResult: (id: string) => void;
  getEmotionById: (id: string) => EmotionResult | undefined;
}

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

export function useEmotion() {
  const context = useContext(EmotionContext);
  if (context === undefined) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
}

interface EmotionProviderProps {
  children: ReactNode;
}

export function EmotionProvider({ children }: EmotionProviderProps) {
  const [emotionHistory, setEmotionHistory] = useState<EmotionResult[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('emotionHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const withDates = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setEmotionHistory(withDates);
      } catch (error) {
        console.error('Failed to load emotion history:', error);
      }
    }
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem('emotionHistory', JSON.stringify(emotionHistory));
  }, [emotionHistory]);

  const addEmotionResult = (result: EmotionResult) => {
    setEmotionHistory(prev => [result, ...prev]);
  };

  const updateEmotionFeedback = (id: string, feedback: 'positive' | 'negative', suggestion?: string) => {
    setEmotionHistory(prev => prev.map(item => 
      item.id === id 
        ? { ...item, userFeedback: feedback, userSuggestion: suggestion }
        : item
    ));
  };

  const deleteEmotionResult = (id: string) => {
    setEmotionHistory(prev => prev.filter(item => item.id !== id));
  };

  const getEmotionById = (id: string) => {
    return emotionHistory.find(item => item.id === id);
  };

  return (
    <EmotionContext.Provider value={{
      emotionHistory,
      addEmotionResult,
      updateEmotionFeedback,
      deleteEmotionResult,
      getEmotionById
    }}>
      {children}
    </EmotionContext.Provider>
  );
}