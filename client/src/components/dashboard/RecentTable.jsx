import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime, getConfidenceColor } from '../../utils/helpers';
import EmptyState from '../common/EmptyState';
import { ScanLine } from 'lucide-react';

const RecentTable = ({ classifications = [] }) => {
  const navigate = useNavigate();

  if (!classifications.length) {
    return <EmptyState icon={ScanLine} title="No classifications yet" description="Upload an image to get started" action={() => navigate('/classify')} actionLabel="Classify Now" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Date</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Type</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Breed</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Confidence</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">ATC Score</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">BCS</th>
          </tr>
        </thead>
        <tbody>
          {classifications.map((c) => (
            <tr
              key={c._id}
              onClick={() => navigate(`/history/${c._id}`)}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
            >
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{formatDateTime(c.createdAt)}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  c.atcResult.animalType === 'cattle'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                }`}>
                  {c.atcResult.animalType}
                </span>
              </td>
              <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{c.atcResult.breedPrediction}</td>
              <td className={`py-3 px-4 font-semibold ${getConfidenceColor(c.atcResult.confidence)}`}>
                {(c.atcResult.confidence * 100).toFixed(1)}%
              </td>
              <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{c.atcResult.atcScore.toFixed(1)}</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{c.measurements.bodyConditionScore.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTable;
