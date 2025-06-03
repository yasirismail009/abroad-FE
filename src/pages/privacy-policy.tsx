import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

export default function PrivacyPolicy() {
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-8 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Privacy Policy
          </h1>

          <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Google AdSense
              </h2>
              <p className="mb-4">
                We use Google AdSense to display advertisements on our scholarship platform. Google AdSense uses cookies to serve ads based on your prior visits to our website and other sites. You can opt out of personalized advertising by visiting Google&apos;s Ads Settings page.
              </p>
              <p>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the internet. You may opt out of personalized advertising by visiting Ads Settings.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Information We Collect
              </h2>
              <p className="mb-4">
                We collect information that you provide directly to us, including when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create a scholarship application account</li>
                <li>Submit scholarship applications</li>
                <li>Upload academic documents and transcripts</li>
                <li>Provide personal and educational information</li>
                <li>Communicate with scholarship administrators</li>
                <li>Subscribe to scholarship notifications</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and evaluate scholarship applications</li>
                <li>Verify academic credentials and eligibility</li>
                <li>Communicate about application status and results</li>
                <li>Send scholarship opportunities and updates</li>
                <li>Improve our scholarship matching algorithms</li>
                <li>Maintain academic and financial records</li>
                <li>Comply with educational and legal requirements</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Information Sharing
              </h2>
              <p className="mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Scholarship selection committees</li>
                <li>Educational institutions for verification</li>
                <li>Financial aid offices when required</li>
                <li>Legal authorities when mandated by law</li>
                <li>Service providers who assist in our operations</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Data Security
              </h2>
              <p className="mb-4">
                We implement robust security measures to protect your sensitive academic and personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of all sensitive data</li>
                <li>Secure document storage and transmission</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Secure authentication protocols</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Your Rights
              </h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of communications</li>
                <li>Export your application data</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or your data, please contact our Privacy Officer at{' '}
                <a href="mailto:privacy@globalscholarships.com" className="text-blue-500 hover:text-blue-600">
                  privacy@globalscholarships.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 