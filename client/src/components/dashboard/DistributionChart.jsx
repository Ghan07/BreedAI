import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#4f46e5', '#8b5cf6'];

export const TypePieChart = ({ data }) => {
  const chartData = [
    { name: 'Cattle', value: data?.cattle || 0 },
    { name: 'Buffalo', value: data?.buffalo || 0 },
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Classification Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {chartData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: 'var(--tw-bg-opacity, #fff)', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DailyBarChart = ({ data = [] }) => (
  <div className="card">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Activity (Last 30 Days)</h3>
    {data.length === 0 ? (
      <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>
    ) : (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
          <Legend />
          <Bar dataKey="cattle" fill="#4f46e5" name="Cattle" radius={[4, 4, 0, 0]} />
          <Bar dataKey="buffalo" fill="#8b5cf6" name="Buffalo" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
);
