import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { scholarshipService } from '../services/scholarshipService';
import { Scholarship } from '../types/scholarship';
import { motion } from 'framer-motion';

// Array of student-related images from Unsplash
const studentImages = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60',
];

const ScholarshipSection: React.FC = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopScholarships();
  }, []);

  const fetchTopScholarships = async () => {
    try {
      setLoading(true);
      const response = await scholarshipService.getTopScholarships();
      setScholarships(Array.isArray(response) ? response.slice(1) : []);
    } catch (error) {
      console.error('Error fetching top scholarships:', error);
      setError('Failed to load featured scholarships');
      setScholarships([]);
    } finally {
      setLoading(false);
    }
  };

  const handleScholarshipClick = (scholarship: Scholarship) => {
    router.push(`/scholarships/${scholarship.id}`);
  };

  if (loading) {
    return (
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="animate-pulse">
                <div className={`h-48 rounded-t-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
                <div className={`p-6 rounded-b-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <div className={`h-6 w-3/4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-4`} />
                  <div className={`h-4 w-full rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-2`} />
                  <div className={`h-4 w-2/3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-4`} />
                  <div className="flex justify-between">
                    <div className={`h-4 w-1/4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    <div className={`h-4 w-1/4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (!scholarships || scholarships.length === 0) {
    return (
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No featured scholarships available at the moment.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          More Featured Scholarships
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships?.map((scholarship, index) => (
            <motion.div
              key={scholarship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } shadow-lg hover:shadow-xl`}
              onClick={() => handleScholarshipClick(scholarship)}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={studentImages[index % studentImages.length]}
                  alt="Students studying"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-white'
                  }`}>
                    {scholarship.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 relative">
                <p className={`mb-4 line-clamp-3 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {scholarship.description}
                </p>
                <div className="space-y-3">
                  <div className={`flex flex-wrap gap-3 text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <span className="mr-2">🎓</span>
                      {scholarship.degree_level}
                    </div>
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <span className="mr-2">🌍</span>
                      {scholarship.host_country}
                    </div>
                  </div>
                  <div className={`flex justify-between items-center text-sm mt-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span className="text-emerald-500 font-medium w-40 h-10 overflow-hidden text-ellipsis">
                      {scholarship.benefits?.[0] || 'Benefits available'}
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {scholarship.deadline?scholarship.deadline: 'No deadline'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipSection; 