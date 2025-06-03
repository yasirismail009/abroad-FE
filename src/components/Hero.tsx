import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Scholarship } from '../types/scholarship';
import { scholarshipService } from '../services/scholarshipService';
import { universityImages } from '../data/universityImages';

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  const router = useRouter();
  const [featuredScholarship, setFeaturedScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [randomImages, setRandomImages] = useState<typeof universityImages>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFeaturedScholarship();
    const shuffled = [...universityImages].sort(() => 0.5 - Math.random());
    setRandomImages(shuffled.slice(0, 3));
  }, []);

  const fetchFeaturedScholarship = async () => {
    try {
      setLoading(true);
      const response = await scholarshipService.getTopScholarships();
      if (response && response.length > 0) {
        setFeaturedScholarship(response[0]);
      }
    } catch (error) {
      console.error('Error fetching featured scholarship:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScholarshipClick = () => {
    if (featuredScholarship) {
      router.push(`/scholarships/${featuredScholarship.id}`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className={`relative min-h-[90vh] ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-900 to-indigo-900'} text-white overflow-hidden`}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-3 h-full">
          {randomImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Discover Your Path to Academic Excellence
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100">
            Find and apply for scholarships from top universities worldwide. Your journey to success starts here.
          </p>

          {/* Search Bar */}
          <motion.form 
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-full p-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scholarships, universities, or countries..."
                className="flex-1 bg-transparent border-none outline-none px-6 py-3 text-white placeholder-blue-200"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </motion.form>

          {/* Featured Scholarship */}
          {loading ? (
            <motion.div 
              className="animate-pulse bg-blue-800/50 backdrop-blur-sm h-48 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          ) : featuredScholarship ? (
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 cursor-pointer hover:bg-white/15 transition-all"
              onClick={handleScholarshipClick}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-3">{featuredScholarship.title}</h2>
                  <p className="text-blue-100 mb-6">{featuredScholarship.description.substring(0, 150)}...</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center bg-blue-500/20 px-4 py-2 rounded-full">
                      <span className="mr-2">🎓</span>
                      {featuredScholarship.degree_level}
                    </div>
                    <div className="flex items-center bg-blue-500/20 px-4 py-2 rounded-full">
                      <span className="mr-2">🌍</span>
                      {featuredScholarship.host_country}
                    </div>
                    <div className="flex items-center bg-blue-500/20 px-4 py-2 rounded-full">
                      <span className="mr-2">⏰</span>
                      Deadline: {featuredScholarship.deadline}
                    </div>
                  </div>
                </div>
                <motion.button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 