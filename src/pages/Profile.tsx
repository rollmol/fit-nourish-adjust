
import React from 'react';
import { motion } from 'framer-motion';
import ProfileForm from '@/components/profile/ProfileForm';
import Header from '@/components/layout/Header';

const Profile: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-12"
    >
      <Header />
      <main>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ProfileForm />
        </div>
      </main>
    </motion.div>
  );
};

export default Profile;
