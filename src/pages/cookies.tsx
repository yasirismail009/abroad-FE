import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

export default function Cookies() {
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-8 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Cookie Policy
          </h1>

          <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                What Are Cookies
              </h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit our scholarship platform. They help us provide you with a better experience and enable essential functionality for scholarship applications.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                How We Use Cookies
              </h2>
              <p className="mb-4">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Session management for scholarship applications</li>
                <li>Remembering your application progress</li>
                <li>Storing your preferences and settings</li>
                <li>Analyzing platform usage and performance</li>
                <li>Enhancing security and preventing fraud</li>
                <li>Personalizing your scholarship recommendations</li>
                <li>Delivering relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Types of Cookies We Use
              </h2>
              <p className="mb-4">
                Our platform uses the following types of cookies:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>Essential Cookies</strong>
                  <p className="mt-2">
                    Required for basic platform functionality, including:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>User authentication</li>
                    <li>Application form functionality</li>
                    <li>Security features</li>
                  </ul>
                </li>
                <li>
                  <strong>Functional Cookies</strong>
                  <p className="mt-2">
                    Help remember your preferences, such as:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Language settings</li>
                    <li>Application draft saves</li>
                    <li>Display preferences</li>
                  </ul>
                </li>
                <li>
                  <strong>Analytics Cookies</strong>
                  <p className="mt-2">
                    Help us understand how users interact with our platform:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Application completion rates</li>
                    <li>Feature usage statistics</li>
                    <li>Platform performance metrics</li>
                  </ul>
                </li>
                <li>
                  <strong>Advertising Cookies</strong>
                  <p className="mt-2">
                    Used to deliver relevant advertisements:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Personalized ad content</li>
                    <li>Ad performance tracking</li>
                    <li>Frequency capping</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Third-Party Cookies
              </h2>
              <p className="mb-4">
                We use the following third-party services that may set cookies:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>Google Analytics</strong>
                  <p className="mt-2">
                    Helps us understand how users interact with our scholarship platform, including application completion rates and feature usage.
                  </p>
                </li>
                <li>
                  <strong>Google AdSense</strong>
                  <p className="mt-2">
                    We use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to our website and other sites. You can opt out of personalized advertising by visiting Google&apos;s Ads Settings page.
                  </p>
                </li>
                <li>
                  <strong>Security Services</strong>
                  <p className="mt-2">
                    Used to protect against fraud and ensure the security of scholarship applications and personal information.
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Managing Cookies
              </h2>
              <p className="mb-4">
                You can control cookies through your browser settings. However, please note that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Disabling essential cookies may prevent you from completing scholarship applications</li>
                <li>Some features may not function properly without cookies</li>
                <li>Your application progress may not be saved if cookies are disabled</li>
                <li>You may need to re-enter information more frequently</li>
                <li>You can opt out of personalized advertising through Google&apos;s Ads Settings</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h2>
              <p>
                If you have any questions about our Cookie Policy, please contact our Privacy Team at{' '}
                <a href="mailto:yasirismailbusiness@gmail.com" className="text-blue-500 hover:text-blue-600">
                  yasirismailbusiness@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 