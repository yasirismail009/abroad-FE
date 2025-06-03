import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { scholarshipService } from '../../services/scholarshipService';
import { Scholarship } from '../../types/scholarship';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { useTheme } from '@/contexts/ThemeContext';

const ScholarshipDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (!scholarship) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'Scholarship',
      name: scholarship.title,
      description: scholarship.description,
      provider: {
        '@type': 'Organization',
        name: scholarship.source_website || 'Chulalongkorn University',
      },
      applicationDeadline: scholarship.deadline,
      dateModified: scholarship.updated_at,
      educationalCredentialAwarded: scholarship.degree_level,
      awardAmount: scholarship.financial_benefits || 'Fully Funded',
      eligibilityToApply: scholarship.eligibility.join(', '),
      applicationProcess: scholarship.application_process?.join(', ') || '',
      url: scholarship.website_url,
    };
  };

  useEffect(() => {
    if (id) {
      fetchScholarshipDetails();
    }
  }, [id]);

  const fetchScholarshipDetails = async () => {
    try {
      setLoading(true);
      const response = await scholarshipService.getScholarshipById(Number(id));
      setScholarship(response);
    } catch (error) {
      console.error('Error fetching scholarship details:', error);
      setError('Failed to load scholarship details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-600 bg-red-50 p-6 rounded-lg">{error}</div>
        </div>
      </Layout>
    );
  }

  if (!scholarship) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-gray-600">Scholarship not found.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{`${scholarship.title} - Global Scholarships`}</title>
        <meta name="description" content={scholarship.description.substring(0, 160)} />
        <meta name="keywords" content={`scholarship, ${scholarship.degree_level}, ${scholarship.host_country}, education funding, international students`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={scholarship.title} />
        <meta property="og:description" content={scholarship.description.substring(0, 160)} />
        <meta property="og:url" content={`https://globalscholarships.com/scholarships/${id}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={scholarship.title} />
        <meta name="twitter:description" content={scholarship.description.substring(0, 160)} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://globalscholarships.com/scholarships/${id}`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData()),
          }}
        />
      </Head>

      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Hero Section */}
        <div className="relative h-[400px] w-full">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
              alt="Scholarship Background"
              layout="fill"
              objectFit="cover"
              className="brightness-50"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
              <button
                onClick={() => router.back()}
                className="absolute top-8 left-4 flex items-center text-white hover:text-primary-200 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Scholarships
              </button>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {scholarship.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <span className="mr-2">🎓</span>
                  <span>{scholarship.degree_level}</span>
                </div>
                <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <span className="mr-2">🌍</span>
                  <span>{scholarship.host_country}</span>
                </div>
                <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <span className="mr-2">⏰</span>
                  <span>Deadline: {scholarship.deadline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-8`}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About the Scholarship</h2>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{scholarship.description}</p>
              </div>

              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-8`}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Benefits</h2>
                <ul className="space-y-3">
                  {scholarship.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 mr-2">✓</span>
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-8`}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Eligibility</h2>
                <ul className="space-y-3">
                  {scholarship.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-8`}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Required Documents</h2>
                <ul className="space-y-3">
                  {scholarship.required_documents.map((doc, index) => (
                    <li key={index} className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-primary-600 mr-2">📄</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {scholarship.application_process.length > 0 && (
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-8`}>
                  <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Application Process</h2>
                  <ol className="space-y-4">
                    {scholarship.application_process.map((step, index) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold mr-3">
                          {index + 1}
                        </span>
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <a
                href={scholarship.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScholarshipDetailPage; 