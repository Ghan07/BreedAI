import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Building2 } from 'lucide-react';
import BovisionLogo from '../components/common/BovisionLogo';
import toast from 'react-hot-toast';
import useAuthStore from '../stores/authStore';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', organization: '' });
  const { register, loading } = useAuthStore();
  const navigate = useNavigate();

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill in required fields'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    const res = await register(form);
    if (res.success) { toast.success('Account created!'); navigate('/dashboard'); }
  };

  const fields = [
    { key: 'name', label: 'Full Name', type: 'text', icon: User, placeholder: 'Dr. Jane Smith', required: true },
    { key: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'you@example.com', required: true },
    { key: 'organization', label: 'Organization', type: 'text', icon: Building2, placeholder: 'Research Institute (optional)' },
    { key: 'password', label: 'Password', type: 'password', icon: Lock, placeholder: '••••••••', required: true },
    { key: 'confirmPassword', label: 'Confirm Password', type: 'password', icon: Lock, placeholder: '••••••••', required: true },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex mb-6">
            <BovisionLogo size="lg" showTagline />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="text-gray-500 mt-1">Start classifying livestock with AI</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          {fields.map(({ key, label, type, icon: Icon, placeholder, required }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type={type} value={form[key]} onChange={set(key)} className="input-field pl-10" placeholder={placeholder} />
              </div>
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <p className="text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:underline">Sign in</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
