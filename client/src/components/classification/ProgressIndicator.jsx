import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, ScanLine, Ruler, Brain, FileCheck } from 'lucide-react';

const steps = [
  { icon: ScanLine, label: 'Uploading image...' },
  { icon: Ruler, label: 'Detecting anatomical landmarks...' },
  { icon: Brain, label: 'Running morphometric analysis...' },
  { icon: FileCheck, label: 'Generating ATC classification...' },
];

const ProgressIndicator = ({ active }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!active) { setCurrentStep(0); return; }
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analyzing Image</h3>
      </div>
      <div className="space-y-4">
        {steps.map(({ icon: Icon, label }, i) => {
          const done = i < currentStep;
          const current = i === currentStep;
          return (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i <= currentStep ? 1 : 0.3, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              {done ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : current ? (
                <Loader2 className="w-5 h-5 text-primary-500 animate-spin flex-shrink-0" />
              ) : (
                <Icon className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
              )}
              <span className={`text-sm ${done ? 'text-green-600 dark:text-green-400' : current ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-400'}`}>
                {label}
              </span>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;
