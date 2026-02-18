import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Target, Beef, Activity } from 'lucide-react';
import useClassificationStore from '../stores/classificationStore';
import StatCard from '../components/common/StatCard';
import { PageSkeleton } from '../components/common/LoadingSkeleton';
import RecentTable from '../components/dashboard/RecentTable';
import { TypePieChart, DailyBarChart } from '../components/dashboard/DistributionChart';

const Dashboard = () => {
  const { dashboard, loading, fetchDashboard } = useClassificationStore();

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  if (loading && !dashboard) return <PageSkeleton />;

  const d = dashboard || {};

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Overview of your classification activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ScanLine} label="Total Scans" value={d.totalClassifications || 0} color="primary" trend={12} />
        <StatCard icon={Target} label="Avg Accuracy" value={d.avgConfidence ? d.avgConfidence * 100 : 0} suffix="%" decimals={1} color="accent" trend={3} />
        <StatCard icon={Beef} label="Animals Classified" value={d.uniqueAnimals || 0} color="blue" />
        <StatCard icon={Activity} label="Avg ATC Score" value={d.avgAtcScore || 0} decimals={1} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TypePieChart data={d.distribution} />
        <DailyBarChart data={d.dailyStats} />
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Classifications</h3>
        <RecentTable classifications={d.recentClassifications} />
      </div>
    </motion.div>
  );
};

export default Dashboard;
