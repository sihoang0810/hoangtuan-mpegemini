/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation as useRouteLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LocationProvider } from './context/LocationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import LocationPopup from './components/LocationPopup';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Pricing from './pages/Pricing';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import BlogListing from './pages/BlogListing';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

import { HelmetProvider } from 'react-helmet-async';

function ScrollToTop() {
  const { pathname } = useRouteLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useRouteLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-primary selection:text-white">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Location Prefixed Routes */}
          <Route path="/:locationSlug" element={<Home />} />
          <Route path="/:locationSlug/dich-vu" element={<Services />} />
          <Route path="/:locationSlug/dich-vu/:slug" element={<ServiceDetail />} />
          <Route path="/:locationSlug/bang-gia" element={<Pricing />} />
          <Route path="/:locationSlug/san-pham" element={<ProductListing />} />
          <Route path="/:locationSlug/san-pham/:slug" element={<ProductDetail />} />
          <Route path="/:locationSlug/blog" element={<BlogListing />} />
          <Route path="/:locationSlug/blog/:slug" element={<BlogDetail />} />
          <Route path="/:locationSlug/lien-he" element={<Contact />} />
          <Route path="/:locationSlug/dieu-khoan" element={<TermsOfService />} />
          <Route path="/:locationSlug/bao-mat" element={<PrivacyPolicy />} />

          {/* Standard Fallback Routes (handled by LocationContext Redirect) */}
          <Route path="/" element={<Home />} />
          <Route path="/dich-vu" element={<Services />} />
          <Route path="/dich-vu/:slug" element={<ServiceDetail />} />
          <Route path="/bang-gia" element={<Pricing />} />
          <Route path="/san-pham" element={<ProductListing />} />
          <Route path="/san-pham/:slug" element={<ProductDetail />} />
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="/dieu-khoan" element={<TermsOfService />} />
          <Route path="/bao-mat" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
      <FloatingContact />
      <LocationPopup />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="*" element={
            <LocationProvider>
              <ScrollToTop />
              <AppContent />
            </LocationProvider>
          } />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

