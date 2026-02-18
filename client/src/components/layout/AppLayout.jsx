import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 p-4 lg:p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </main>
  </div>
);

export default AppLayout;
