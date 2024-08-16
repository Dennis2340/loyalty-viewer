import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const WelcomePrompt = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/branddashboard/register');
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-semibold text-blue-900">Welcome to the Dashboard</h2>
      <p className="text-gray-700">It looks like you don&apos;t have any brands registered yet.</p>
      <Button onClick={handleRegisterClick} className="mt-4">Register Your Brand</Button>
    </div>
  );
};

export default WelcomePrompt;
