/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation as useRouteLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LocationProvider } from './context/LocationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
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

function ScrollToTop() {
  const { pathname } = useRouteLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <LocationProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans selection:bg-brand-primary selection:text-white">
          <TopBar />
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Location Prefixed Routes */}
              <Route path="/:locationId" element={<Home />} />
              <Route path="/:locationId/dich-vu" element={<Services />} />
              <Route path="/:locationId/dich-vu/:slug" element={<ServiceDetail />} />
              <Route path="/:locationId/bang-gia" element={<Pricing />} />
              <Route path="/:locationId/san-pham" element={<ProductListing />} />
              <Route path="/:locationId/san-pham/:slug" element={<ProductDetail />} />
              <Route path="/:locationId/blog" element={<BlogListing />} />
              <Route path="/:locationId/blog/:slug" element={<BlogDetail />} />
              <Route path="/:locationId/lien-he" element={<Contact />} />

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
            </Routes>
          </main>
          <Footer />
          <FloatingContact />
          <LocationPopup />
        </div>
      </LocationProvider>
    </Router>
  );
}

