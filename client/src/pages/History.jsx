import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronLeft, ChevronRight, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import useClassificationStore from '../stores/classificationStore';
import { formatDateTime, getConfidenceColor } from '../utils/helpers';
import { TableSkeleton } from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import ResultsPanel from '../components/classification/ResultsPanel';

const History = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { classifications, pagination, loading, current, fetchClassifications, fetchOne, deleteClassification, clearCurrent } = useClassificationStore();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (id) { fetchOne(id); }
    else { clearCurrent(); fetchClassifications({ page, limit: 10, animalType: typeFilter || undefined }); }
  }, [id, page, typeFilter]);

  const handleDelete = async (cId, e) => {
    e.stopPropagation();
    if (!confirm('Delete this classification?')) return;
    await deleteClassification(cId);
    toast.success('Deleted');
  };

  // Detail view
  if (id && current) {
    return (
      <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => navigate('/history')} className="btn-secondary flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to History
        </button>
        <ResultsPanel result={current} />
      </motion.div>
    );
  }

  // List view
  const filtered = classifications.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.atcResult.breedPrediction.toLowerCase().includes(q) || c.atcResult.animalType.includes(q);
  });

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Classification History</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Browse and search past classifications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" placeholder="Search by breed or type..." />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }} className="input-field pl-10 pr-8 appearance-none">
            <option value="">All Types</option>
            <option value="cattle">Cattle</option>
            <option value="buffalo">Buffalo</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        {loading ? (
          <div className="p-6"><TableSkeleton /></div>
        ) : filtered.length === 0 ? (
          <EmptyState title="No classifications found" description="Try adjusting your filters or classify a new animal." action={() => navigate('/classify')} actionLabel="Classify Now" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Breed</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Confidence</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">ATC</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">BCS</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c._id} onClick={() => navigate(`/history/${c._id}`)} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">{formatDateTime(c.createdAt)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        c.atcResult.animalType === 'cattle' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}>{c.atcResult.animalType}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{c.atcResult.breedPrediction}</td>
                    <td className={`py-3 px-4 font-semibold ${getConfidenceColor(c.atcResult.confidence)}`}>{(c.atcResult.confidence * 100).toFixed(1)}%</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{c.atcResult.atcScore.toFixed(1)}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{c.measurements.bodyConditionScore.toFixed(1)}</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={(e) => handleDelete(c._id, e)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing page {pagination.page} of {pagination.pages} ({pagination.total} total)</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary p-2 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages} className="btn-secondary p-2 disabled:opacity-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default History;
