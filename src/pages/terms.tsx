import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

export default function Terms() {
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-8 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Terms and Conditions
          </h1>

          <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Third-Party Services
              </h2>
              <p className="mb-4">
                Our scholarship platform uses the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>Google AdSense</strong>
                  <p className="mt-2">
                    We use Google AdSense to display advertisements on our platform. By using our service, you agree to comply with Google AdSense&apos;s terms of service. Google AdSense uses cookies to serve ads based on your prior visits to our website and other sites. You can opt out of personalized advertising by visiting Google&apos;s Ads Settings page.
                  </p>
                </li>
                <li>
                  <strong>News API</strong>
                  <p className="mt-2">
                    We use the News API (https://newsapi.org) to provide scholarship-related news and updates. By using our service, you agree to comply with News API&apos;s terms of service. The News API is a third-party service that aggregates news articles from various sources. We do not control the content of the news articles, and we are not responsible for any inaccuracies or issues with the content provided by News API.
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Scholarship Application Terms
              </h2>
              <p className="mb-4">
                By submitting a scholarship application, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Submit authentic academic documents and transcripts</li>
                <li>Meet all eligibility requirements</li>
                <li>Comply with application deadlines</li>
                <li>Maintain academic standards if awarded</li>
                <li>Report any changes in your academic status</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Eligibility Requirements
              </h2>
              <p className="mb-4">
                To be eligible for our scholarships, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be enrolled in or accepted to an accredited institution</li>
                <li>Maintain a minimum GPA as specified for each scholarship</li>
                <li>Meet any specific program or field of study requirements</li>
                <li>Not be in default on any educational loans</li>
                <li>Comply with all application requirements and deadlines</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Scholarship Award Terms
              </h2>
              <p className="mb-4">
                If awarded a scholarship:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Funds will be disbursed according to the specified schedule</li>
                <li>You must maintain eligibility throughout the award period</li>
                <li>You must report any changes in enrollment status</li>
                <li>You may be required to participate in program activities</li>
                <li>You must use funds for educational purposes only</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                User Responsibilities
              </h2>
              <p className="mb-4">
                As a user of our scholarship platform, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain the security of your account credentials</li>
                <li>Update your information as needed</li>
                <li>Not share your account with others</li>
                <li>Not attempt to manipulate the application process</li>
                <li>Report any suspicious activity</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Intellectual Property
              </h2>
              <p className="mb-4">
                All content on this website, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Scholarship descriptions and criteria</li>
                <li>Application forms and processes</li>
                <li>Educational resources and materials</li>
                <li>Platform design and functionality</li>
                <li>Is the property of Global Scholarships and protected by intellectual property laws</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Limitation of Liability
              </h2>
              <p className="mb-4">
                Global Scholarships:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reserves the right to modify or cancel scholarships</li>
                <li>Is not responsible for application processing delays</li>
                <li>Does not guarantee scholarship awards</li>
                <li>Is not liable for third-party actions or decisions</li>
                <li>May update these terms at any time</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h2>
              <p>
                For questions about these Terms and Conditions, please contact our Legal Department at{' '}
                <a href="mailto:legal@globalscholarships.com" className="text-blue-500 hover:text-blue-600">
                  legal@globalscholarships.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 