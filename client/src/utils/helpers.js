export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export const getConfidenceColor = (confidence) => {
  if (confidence >= 0.9) return 'text-green-500';
  if (confidence >= 0.75) return 'text-yellow-500';
  return 'text-red-500';
};

export const getConfidenceBg = (confidence) => {
  if (confidence >= 0.9) return 'bg-green-500';
  if (confidence >= 0.75) return 'bg-yellow-500';
  return 'bg-red-500';
};

export const getBCSColor = (score) => {
  if (score <= 3) return '#ef4444';
  if (score <= 5) return '#f59e0b';
  if (score <= 7) return '#10b981';
  return '#3b82f6';
};

export const truncate = (str, n) => (str?.length > n ? str.substring(0, n) + '...' : str);
