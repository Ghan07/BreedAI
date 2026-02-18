import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ScanLine, RotateCcw } from 'lucide-react';
import useClassificationStore from '../stores/classificationStore';
import DropZone from '../components/classification/DropZone';
import ProgressIndicator from '../components/classification/ProgressIndicator';
import ResultsPanel from '../components/classification/ResultsPanel';

const Classify = () => {
  const [file, setFile] = useState(null);
  const [animalTag, setAnimalTag] = useState('');
  const [notes, setNotes] = useState('');
  const { classify, classifying, current, clearCurrent } = useClassificationStore();

  const handleClassify = async () => {
    if (!file) { toast.error('Please upload an image first'); return; }
    const formData = new FormData();
    formData.append('image', file);
    if (animalTag) formData.append('animalTag', animalTag);
    if (notes) formData.append('notes', notes);
    try {
      await classify(formData);
      toast.success('Classification complete!');
    } catch {
      toast.error('Classification failed');
    }
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

      {!current && !classifying && (
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
