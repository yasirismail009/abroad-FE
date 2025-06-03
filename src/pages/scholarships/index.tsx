import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { scholarshipService } from '../../services/scholarshipService';
import ScholarshipCard from '../../components/ScholarshipCard';
import SearchBar from '../../components/SearchBar';
import { Scholarship } from '../../types/scholarship';
import { useTheme } from '../../contexts/ThemeContext';
import Layout from '@/components/Layout';
import Image from 'next/image';

// Array of student-related images from Unsplash
const studentImages = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60',
];

const ScholarshipsPage: React.FC = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchParams, setSearchParams] = useState({
    query: '',
    filters: {
      degree_level: '',
      host_country: '',
      financial_benefits: '',
    },
  });

  useEffect(() => {
    // Handle URL parameters
    const { search, country, page } = router.query;
    if (search || country) {
      setSearchParams(prev => ({
        query: search as string || prev.query,
        filters: {
          ...prev.filters,
          host_country: country as string || prev.filters.host_country,
        },
      }));
    }
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [router.query]);

  useEffect(() => {
    fetchScholarships();
  }, [currentPage, searchParams]);

  const fetchScholarships = async () => {
    try {
      if (currentPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const response = await scholarshipService.getScholarships(currentPage, searchParams);
      if (currentPage === 1) {
        setScholarships(response.results);
      } else {
        setScholarships(prev => [...prev, ...response.results]);
      }
      setTotalPages(Math.ceil(response.count / 10));
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = (query: string, filters: any) => {
    setSearchParams({ query, filters });
    setCurrentPage(1);
    
    // Update URL with search parameters
    const queryParams = new URLSearchParams();
    if (query) queryParams.set('search', query);
    if (filters.host_country) queryParams.set('country', filters.host_country);
    if (currentPage > 1) queryParams.set('page', currentPage.toString());
    
    router.push({
      pathname: router.pathname,
      search: queryParams.toString(),
    }, undefined, { shallow: true });
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      
      // Update URL with new page number
      const queryParams = new URLSearchParams(router.query as any);
      queryParams.set('page', nextPage.toString());
      
      router.push({
        pathname: router.pathname,
        search: queryParams.toString(),
      }, undefined, { shallow: true });
    }
  };

  return (
    <Layout>
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Available Scholarships
            </h1>

            {/* Search Bar */}
            <SearchBar 
              onSearch={handleSearch} 
              initialQuery={router.query.search as string}
              initialCountry={router.query.country as string}
            />

            {/* Scholarship List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm animate-pulse`}>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {scholarships.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {scholarships.map((scholarship, index) => (
                        <div key={scholarship.id} className={`group relative rounded-xl overflow-hidden transition-all duration-300 ${
                          isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                        } shadow-lg hover:shadow-xl`}>
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
                                <span className="text-emerald-500 font-medium w-40">
                                  {scholarship.benefits?.[0] || 'Benefits available'}
                                </span>
                                <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                  {scholarship.deadline}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Load More Button */}
                    {currentPage < totalPages && (
                      <div className="mt-8 flex justify-center">
                        <button
                          onClick={handleLoadMore}
                          disabled={loadingMore}
                          className={`px-6 py-2 rounded-lg ${
                            isDarkMode 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                        >
                          {loadingMore ? 'Loading...' : 'Load More'}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-xl font-semibold mb-2">No scholarships found</h2>
                    <p>Try adjusting your search criteria or filters</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScholarshipsPage; 