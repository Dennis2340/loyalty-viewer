import React from 'react';
import BrandRegistrationForm from '@/components/BrandRegistrationForm';
import NavigationLinks from '@/components/NavigationLink';

const RegisterBrandPage = () => {
  return (
    <>
    <NavigationLinks/>
    <div className="min-h-screen flex items-center justify-center bg-blue-50 mt-[-20]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Register a New Brand</h1>
        <BrandRegistrationForm />
      </div>
    </div>
    </>
  );
};

export default RegisterBrandPage;
