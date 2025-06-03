import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';

export default function Custom404() {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist or has been moved."
        ogType="website"
      />

      <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h1 className={`text-9xl font-extrabold ${isDarkMode ? 'text-gray-700' : 'text-gray-200'}`}>
              404
            </h1>
            <h2 className={`mt-6 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Page Not Found
            </h2>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              The page you are looking for does not exist or has been moved.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => router.back()}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
            >
              Go Back
            </button>

            <button
              onClick={() => router.push('/')}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                isDarkMode 
                  ? 'text-gray-300 bg-gray-800 hover:bg-gray-700 focus:ring-gray-500' 
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
            >
              Return Home
            </button>
          </div>

          <div className={`mt-8 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>Looking for scholarships?</p>
            <button
              onClick={() => router.push('/scholarships')}
              className="mt-2 text-blue-600 hover:text-blue-500 font-medium focus:outline-none focus:underline transition-colors duration-200"
            >
              Browse All Scholarships
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
} 