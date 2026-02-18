import React from 'react';
import { FileQuestion } from 'lucide-react';

const EmptyState = ({ icon: Icon = FileQuestion, title = 'No data found', description = 'Get started by creating your first entry.', action, actionLabel }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm">{description}</p>
    {action && <button onClick={action} className="btn-primary">{actionLabel || 'Get Started'}</button>}
  </div>
);

export default EmptyState;
