import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanLine, Ruler, Brain, BarChart3, Shield, Zap, ArrowRight, Beef, Moon, Sun } from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import useThemeStore from '../stores/themeStore';

const features = [
  { icon: ScanLine, title: 'AI Image Analysis', desc: 'Upload side-view images and get instant morphometric measurements using advanced computer vision.' },
  { icon: Ruler, title: 'Precise Measurements', desc: 'Automated body length, heart girth, height at withers, and hip width calculations.' },
  { icon: Brain, title: 'Breed Classification', desc: 'Accurate breed identification for cattle and buffaloes with confidence scoring.' },
  { icon: BarChart3, title: 'ATC Scoring', desc: 'Comprehensive Animal Type Classification scoring system for livestock evaluation.' },
  { icon: Shield, title: 'Body Condition', desc: 'Automated body condition scoring from emaciated to obese with visual indicators.' },
  { icon: Zap, title: 'Real-time Results', desc: 'Get classification results in seconds with detailed morphometric overlay analysis.' },
];

const steps = [
  { num: '01', title: 'Upload Image', desc: 'Capture a side-view photo of the animal under field conditions and upload it.' },
  { num: '02', title: 'AI Processes', desc: 'Our AI identifies anatomical landmarks and calculates morphometric measurements.' },
  { num: '03', title: 'Get Results', desc: 'Receive breed classification, ATC score, body measurements, and condition assessment.' },
];

const StatCounter = ({ value, suffix, label }) => {
  const count = useAnimatedCounter(value, 2000);
  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-white">{count}{suffix}</p>
      <p className="text-primary-200 text-sm mt-1">{label}</p>
    </div>
  );
};

const Landing = () => {
  const { dark, toggle } = useThemeStore();

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
            <Beef className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">AnimalATC</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggle} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/login" className="btn-secondary text-sm">Log In</Link>
          <Link to="/register" className="btn-primary text-sm">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 lg:px-12 py-20 lg:py-32 text-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 mb-6">
            🐄 AI-Powered Livestock Classification
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Image-Based Animal Type<br />
            <span className="text-primary-600">Classification System</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Automate morphometric measurement and ATC scoring for cattle and buffaloes from side-view images captured under field conditions.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="btn-primary text-lg px-8 py-3 flex items-center gap-2">
              Start Classifying <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">Demo Account</Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-700 dark:bg-primary-900 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter value={15000} suffix="+" label="Animals Classified" />
          <StatCounter value={94} suffix="%" label="Avg Accuracy" />
          <StatCounter value={50} suffix="+" label="Breeds Supported" />
          <StatCounter value={2} suffix="s" label="Avg Processing" />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-12 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Powerful Features</h2>
          <p className="text-gray-600 dark:text-gray-400">Everything you need for automated livestock classification</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="card hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400">Three simple steps to classify your livestock</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{num}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Join researchers and livestock professionals using AI classification</p>
        <Link to="/register" className="btn-primary text-lg px-10 py-3">Create Free Account</Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
        <p>© 2024 AnimalATC. Image-Based Animal Type Classification System.</p>
      </footer>
    </div>
  );
};

export default Landing;
