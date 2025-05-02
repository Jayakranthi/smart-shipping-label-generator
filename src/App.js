import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import AddressFormPage from './components/pages/AddressFormPage';
import PreviewLabelPage from './components/pages/PreviewLabelPage';
import SuccessPage from './components/pages/SuccessPage';
import SettingsPage from './components/pages/SettingsPage';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-label" element={<AddressFormPage />} />
            <Route path="/preview-label/:id" element={<PreviewLabelPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;