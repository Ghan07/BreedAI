import React from 'react';
import { motion } from 'framer-motion';

const GaugeChart = ({ value, max = 9, label = 'Body Condition Score', size = 160 }) => {
  const pct = (value / max) * 100;
  const radius = (size - 20) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const color = value <= 3 ? '#ef4444' : value <= 5 ? '#f59e0b' : value <= 7 ? '#10b981' : '#3b82f6';

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        <path
          d={`M 10 ${size / 2 + 10} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2 + 10}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-gray-200 dark:text-gray-700"
        />
        <motion.path
          d={`M 10 ${size / 2 + 10} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2 + 10}`}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <text x={size / 2} y={size / 2} textAnchor="middle" className="fill-gray-900 dark:fill-white text-2xl font-bold" fontSize="28" fontWeight="700">
          {value.toFixed(1)}
        </text>
        <text x={size / 2} y={size / 2 + 18} textAnchor="middle" className="fill-gray-500 text-xs" fontSize="11">
          / {max}
        </text>
      </svg>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );
};

export default GaugeChart;
