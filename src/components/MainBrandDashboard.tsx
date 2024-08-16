"use client"
import React, { useState, useEffect } from 'react';
import WelcomePrompt from './WelcomePrompt'; // Import the welcome prompt
import BrandInfo from './BrandInfo';
import ManageRewards from './ManageRewards';
import ViewPoints from './ViewPoints';
import NavigationLinks from './NavigationLink';

const MainBrandDashboard = () => {
  const [hasBrands, setHasBrands] = useState<boolean>(false);

  useEffect(() => {
    // Fetch brand data to check if there are any registered brands
    const fetchBrands = async () => {
      const response = await fetch('/api/brands');
      const brands = await response.json();
      setHasBrands(brands.length > 0);
    };

    fetchBrands();
  }, []);

  return (
    <div>
      <NavigationLinks />
      <main className="p-6">
        {hasBrands ? (
          <div>
            <BrandInfo name='dennis' description='This is to test the brand logo' websiteUrl='https://xplain-ai.net' logoUrl=''/>
            <ManageRewards />
          </div>
        ) : (
          <WelcomePrompt />
        )}
      </main>
    </div>
  );
};

export default MainBrandDashboard;
