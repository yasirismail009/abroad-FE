import Link from 'next/link';
import { Scholarship } from '../types/scholarship';
import { useTheme } from '../contexts/ThemeContext';

type ScholarshipCardProps = Pick<Scholarship, 'id' | 'title' | 'description' | 'deadline' | 'degree_level' | 'host_country' | 'financial_benefits' | 'benefits' | 'published_date'>;

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  id,
  title,
  description,
  deadline,
  degree_level,
  host_country,
  financial_benefits,
  benefits,
  published_date,
}) => {
  const { isDarkMode } = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={`group p-4 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-all duration-300 rounded-lg shadow-sm hover:shadow-md`}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <Link 
            href={`/scholarships/${id}`}
            className="block mb-2"
          >
            <h3 className={`text-sm sm:text-base font-semibold line-clamp-2 ${isDarkMode ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-600'} transition-colors`}>
              {title}
            </h3>
          </Link>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3 line-clamp-2`}>{description}</p>
        </div>
        
        <div>
          <div className={`flex flex-wrap gap-2 text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <div className={`flex items-center px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <span className="mr-1">🎓</span>
              {degree_level}
            </div>
            <div className={`flex items-center px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <span className="mr-1">🌍</span>
              {host_country}
            </div>
          </div>
          <div className={`flex justify-between items-center text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              {financial_benefits || (benefits && benefits.length > 0 ? benefits[0] : 'Contact for details')}
            </span>
            <span className={`px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {deadline ? `Deadline: ${deadline}` : `Published: ${formatDate(published_date)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard; 