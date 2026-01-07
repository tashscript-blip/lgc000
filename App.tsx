import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { IntroSequence } from './components/IntroSequence';
import { Layout } from './components/Layout';

// Pages
import { Home } from './pages/Home';
import { ArsenalPage } from './pages/ArsenalPage';
import { ConstructionFeedPage } from './pages/ConstructionFeedPage';
import { CitadelPage } from './pages/CitadelPage';
import { CouncilPage } from './pages/CouncilPage';
import { ArchivePage } from './pages/ArchivePage';
import { ForgePage } from './pages/ForgePage';
import { TransmissionPage } from './pages/TransmissionPage';
import { FoundationPage } from './pages/FoundationPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only run boot sequence on root path or first visit session
    const hasBooted = sessionStorage.getItem('hasBooted');
    
    if (hasBooted) {
      setBootSequenceComplete(true);
    } else {
      const timer = setTimeout(() => {
        setBootSequenceComplete(true);
        sessionStorage.setItem('hasBooted', 'true');
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!bootSequenceComplete) {
    return <IntroSequence />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arsenal" element={<ArsenalPage />} />
        <Route path="/construction-feed" element={<ConstructionFeedPage />} />
        <Route path="/citadel" element={<CitadelPage />} />
        <Route path="/council" element={<CouncilPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/forge" element={<ForgePage />} />
        <Route path="/transmission" element={<TransmissionPage />} />
        <Route path="/foundation" element={<FoundationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
