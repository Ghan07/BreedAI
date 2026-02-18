import User from '../models/User.js';

export const ensureDemoAccount = async () => {
  try {
    const exists = await User.findOne({ email: 'demo@example.com' });
    if (!exists) {
      await User.create({
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'password123',
        role: 'user',
        organization: 'Demo Account',
        isDemo: true,
        demoClassifications: 0,
      });
      console.log('Demo account created: demo@example.com / password123');
    } else if (!exists.isDemo) {
      exists.isDemo = true;
      await exists.save();
    }
  } catch (error) {
    console.error('Failed to seed demo account:', error.message);
  }
};
