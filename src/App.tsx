import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EmotionProvider } from './context/EmotionContext';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { TextInputPage } from './components/TextInputPage';
import { ResultsPage } from './components/ResultsPage';
import { HistoryPage } from './components/HistoryPage';
import { EducationPage } from './components/EducationPage';

function App() {
  return (
    <EmotionProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/input" element={<TextInputPage />} />
            <Route path="/result/:id" element={<ResultsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/education" element={<EducationPage />} />
          </Routes>
        </Layout>
      </Router>
    </EmotionProvider>
  );
}

export default App;