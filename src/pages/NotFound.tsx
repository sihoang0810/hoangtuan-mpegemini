import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from '../context/LocationContext';

export default function NotFound() {
  const navigate = useNavigate();
  const { locationSlug, setShowPopup } = useLocation();
  const homePath = locationSlug === 'ho-chi-minh' ? '/ho-chi-minh' : '/bao-loc';

  useEffect(() => {
    // Hide popup automatically on 404 page so it does not block the interaction
    setShowPopup(false);
  }, [setShowPopup]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-12 md:py-16 lg:py-24 sm:px-6 sm:py-24 md:grid-cols-2 lg:px-8">
      <Helmet>
        <title>404 - Không tìm thấy trang</title>
        <meta name="description" content="Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển." />
      </Helmet>
      
      <div className="max-w-max mx-auto text-center">
        <main className="sm:flex sm:justify-center sm:items-center">
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-extrabold text-brand-primary"
          >
            404
          </motion.p>
          <div className="sm:ml-6 sm:pl-6 sm:border-l sm:border-gray-200">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="font-extrabold text-gray-900 tracking-tight">
                Không tìm thấy trang
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
              </p>
            </motion.div>
          </div>
        </main>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex sm:justify-center justify-center space-x-3 sm:space-x-4"
        >
          <Link
            to={homePath}
            onClick={() => console.log('Navigation target:', homePath)}
            className="inline-flex items-center px-4 py-2 border border-brand-primary text-sm font-medium rounded-full text-brand-primary bg-white hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Về trang chủ
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
