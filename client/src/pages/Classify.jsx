import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ScanLine, RotateCcw, AlertTriangle } from 'lucide-react';
import useClassificationStore from '../stores/classificationStore';
import useAuthStore from '../stores/authStore';
import DropZone from '../components/classification/DropZone';
import ProgressIndicator from '../components/classification/ProgressIndicator';
import ResultsPanel from '../components/classification/ResultsPanel';

const Classify = () => {
  const [file, setFile] = useState(null);
  const [animalTag, setAnimalTag] = useState('');
  const [notes, setNotes] = useState('');
  const [demoLimitReached, setDemoLimitReached] = useState(false);
  const { classify, classifying, current, clearCurrent } = useClassificationStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleClassify = async () => {
    if (!file) { toast.error('Please upload an image first'); return; }
    const formData = new FormData();
    formData.append('image', file);
    if (animalTag) formData.append('animalTag', animalTag);
    if (notes) formData.append('notes', notes);
    try {
      const result = await classify(formData);
      if (result.demoLimitReached) {
        setDemoLimitReached(true);
        toast.error(result.message);
        return;
      }
      toast.success('Classification complete!');
    } catch {
      toast.error('Classification failed');
    }
  };

  const handleSignUp = () => {
    logout();
    navigate('/register');
  };

  const handleReset = () => {
    setFile(null);
    setAnimalTag('');
    setNotes('');
    clearCurrent();
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Classify Animal</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Upload a side-view image for AI analysis</p>
        </div>
        {current && (
          <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> New Classification
          </button>
        )}
      </div>

      {/* Demo limit banner */}
      {demoLimitReached && (
        <motion.div
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Demo Limit Reached</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            You've used all 3 free demo classifications. Create an account to get unlimited access.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={handleSignUp} className="btn-primary px-6">Create Account</button>
            <Link to="/login" onClick={logout} className="btn-secondary px-6">Log In</Link>
          </div>
        </motion.div>
      )}

      {/* Demo usage indicator */}
      {user?.isDemo && !demoLimitReached && !current && !classifying && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-2.5 flex items-center justify-between">
          <span className="text-sm text-blue-700 dark:text-blue-300">
            Demo mode: {3 - (user.demoClassifications || 0)} classification{3 - (user.demoClassifications || 0) !== 1 ? 's' : ''} remaining
          </span>
          <Link to="/register" onClick={logout} className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400">
            Create account →
          </Link>
        </div>
      )}

      {!current && !classifying && !demoLimitReached && (
        <div className="space-y-6">
          <DropZone file={file} setFile={setFile} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Animal Tag (optional)</label>
              <input type="text" value={animalTag} onChange={(e) => setAnimalTag(e.target.value)} className="input-field" placeholder="e.g. ANM-0001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Notes (optional)</label>
              <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className="input-field" placeholder="Field observations..." />
            </div>
          </div>

          <button onClick={handleClassify} disabled={!file || classifying} className="btn-primary flex items-center gap-2 disabled:opacity-50">
            <ScanLine className="w-5 h-5" /> Start Classification
          </button>
        </div>
      )}

      <ProgressIndicator active={classifying} />
      <ResultsPanel result={current} />
    </motion.div>
  );
};

export default Classify;
