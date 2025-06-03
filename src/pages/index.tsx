import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ScholarshipSection from '../components/ScholarshipSection';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';
import { useTheme } from '../contexts/ThemeContext';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <SEO 
        title="Global Scholarships - Find Your Perfect Scholarship"
        description="Discover and apply for scholarships worldwide. Find opportunities for undergraduate, masters, and PhD studies."
        keywords="scholarships, education, study abroad, international scholarships, academic funding"
      />
      <Hero isDarkMode={isDarkMode} />
      <div className="container mx-auto px-4 py-8">
        <AdUnit className="my-8" />
      </div>
      <ScholarshipSection />
    </Layout>
  );
};

export default Home;
