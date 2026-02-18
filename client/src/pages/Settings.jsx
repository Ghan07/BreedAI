import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Moon, Sun, Bell, Ruler, Lock, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../stores/authStore';
import useThemeStore from '../stores/themeStore';
import { authAPI } from '../services/api';

const Settings = () => {
  const { user, updateProfile } = useAuthStore();
  const { dark, toggle } = useThemeStore();
  const [name, setName] = useState(user?.name || '');
  const [organization, setOrganization] = useState(user?.organization || '');
  const [emailNotifications, setEmailNotifications] = useState(user?.settings?.emailNotifications ?? true);
  const [measurementUnit, setMeasurementUnit] = useState(user?.settings?.measurementUnit || 'metric');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async () => {
    setSaving(true);
    const res = await updateProfile({ name, organization, settings: { emailNotifications, measurementUnit } });
    if (res.success) toast.success('Profile updated');
    setSaving(false);
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) { toast.error('Fill in both password fields'); return; }
    if (newPassword.length < 6) { toast.error('New password must be at least 6 characters'); return; }
    try {
      await authAPI.changePassword({ currentPassword, newPassword });
      toast.success('Password changed');
      setCurrentPassword('');
      setNewPassword('');
    } catch { /* error handled by interceptor */ }
  };

  return (
    <motion.div className="space-y-6 max-w-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your profile and preferences</p>
      </div>

      {/* Profile */}
      <div className="card space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5 text-primary-500" /> Profile
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
          <input type="email" value={user?.email || ''} disabled className="input-field opacity-60 cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
            <Building2 className="w-4 h-4" /> Organization
          </label>
          <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} className="input-field" placeholder="Research Institute" />
        </div>
      </div>

      {/* Preferences */}
      <div className="card space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {dark ? <Moon className="w-5 h-5 text-primary-500" /> : <Sun className="w-5 h-5 text-amber-500" />}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</p>
              <p className="text-xs text-gray-500">Toggle dark/light appearance</p>
            </div>
          </div>
          <button onClick={toggle} className={`relative w-12 h-6 rounded-full transition-colors ${dark ? 'bg-primary-600' : 'bg-gray-300'}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${dark ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary-500" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</p>
              <p className="text-xs text-gray-500">Receive classification updates</p>
            </div>
          </div>
          <button onClick={() => setEmailNotifications(!emailNotifications)} className={`relative w-12 h-6 rounded-full transition-colors ${emailNotifications ? 'bg-primary-600' : 'bg-gray-300'}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-primary-500" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Measurement Unit</p>
              <p className="text-xs text-gray-500">Metric (cm) or Imperial (in)</p>
            </div>
          </div>
          <select value={measurementUnit} onChange={(e) => setMeasurementUnit(e.target.value)} className="input-field w-32 text-sm">
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
        </div>
        <button onClick={handleSaveProfile} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Password */}
      <div className="card space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary-500" /> Change Password
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Current Password</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field" placeholder="At least 6 characters" />
        </div>
        <button onClick={handleChangePassword} className="btn-secondary flex items-center gap-2">
          <Lock className="w-4 h-4" /> Update Password
        </button>
      </div>
    </motion.div>
  );
};

export default Settings;
