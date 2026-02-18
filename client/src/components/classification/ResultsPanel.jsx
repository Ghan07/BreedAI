import React from 'react';
import { motion } from 'framer-motion';
import { Beef, Ruler, Target, Activity, FileText, Clock } from 'lucide-react';
import ConfidenceBar from '../common/ConfidenceBar';
import GaugeChart from '../common/GaugeChart';

const ResultsPanel = ({ result }) => {
  if (!result) return null;
  const { measurements, atcResult, processingTime, image, createdAt } = result;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="card bg-gradient-to-r from-primary-600 to-primary-800 text-white border-0">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">Classification Complete</h2>
            <p className="text-primary-200 text-sm mt-1">
              Processed in {(processingTime / 1000).toFixed(1)}s • {new Date(createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
            <Target className="w-5 h-5" />
            <span className="text-lg font-bold">ATC Score: {atcResult.atcScore.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image */}
        {image && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <FileText className="w-5 h-5 text-primary-500" /> Analyzed Image
            </h3>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden min-h-[200px]">
              {image.path ? (
                <img
                  src={image.path}
                  alt={image.originalName || 'Analyzed animal'}
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              ) : (
                <div className="p-4 flex items-center justify-center h-full">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <Beef className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">{image.originalName}</p>
                  </div>
                </div>
              )}
              <div className="px-4 py-2 text-center border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">{image.originalName} • {(image.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          </div>
        )}

        {/* Breed Prediction */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <Beef className="w-5 h-5 text-primary-500" /> Breed Prediction
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                atcResult.animalType === 'cattle'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
              }`}>
                {atcResult.animalType.charAt(0).toUpperCase() + atcResult.animalType.slice(1)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Detected Species</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Primary Breed</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{atcResult.breedPrediction}</p>
            </div>
            <ConfidenceBar value={atcResult.confidence} label="Primary Confidence" />
            {atcResult.secondaryBreed && (
              <>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Secondary Match</p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{atcResult.secondaryBreed}</p>
                </div>
                <ConfidenceBar value={atcResult.secondaryConfidence} label="Secondary Confidence" color="bg-gray-400" />
              </>
            )}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Body Condition</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                { emaciated: 'bg-red-100 text-red-700', thin: 'bg-orange-100 text-orange-700', moderate: 'bg-yellow-100 text-yellow-700', good: 'bg-green-100 text-green-700', obese: 'bg-blue-100 text-blue-700' }[atcResult.bodyConditionCategory]
              }`}>
                {atcResult.bodyConditionCategory.charAt(0).toUpperCase() + atcResult.bodyConditionCategory.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Measurements */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <Ruler className="w-5 h-5 text-primary-500" /> Morphometric Measurements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Body Length', value: measurements.bodyLength, unit: 'cm' },
            { label: 'Heart Girth', value: measurements.heartGirth, unit: 'cm' },
            { label: 'Height at Withers', value: measurements.heightAtWithers, unit: 'cm' },
            { label: 'Hip Width', value: measurements.hipWidth, unit: 'cm' },
          ].map(({ label, value, unit }) => (
            <div key={label} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
              <p className="text-xs text-gray-400">{unit}</p>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <GaugeChart value={measurements.bodyConditionScore} />
          </div>
        </div>
      </div>

      {/* Overlay Description */}
      {atcResult.overlayDescription && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Activity className="w-5 h-5 text-primary-500" /> Analysis Report
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{atcResult.overlayDescription}</p>
        </div>
      )}
    </motion.div>
  );
};

export default ResultsPanel;
