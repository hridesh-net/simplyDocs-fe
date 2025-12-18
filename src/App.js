import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DocsListPage from './pages/DocsListPage';
import DocViewerPage from './pages/DocViewerPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsListPage />} />
          <Route path="/docs/:slug" element={<DocViewerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
