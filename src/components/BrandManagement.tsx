"use client"
import React, { useEffect, useState } from 'react';
import BrandInfo from './BrandInfo';
import ManageRewards from './ManageRewards';
import { useRouter } from 'next/router';

interface Brand {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
}

const BrandManagement = ({brandId}: {brandId:string}) => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (!brandId) return;

    const fetchBrandData = async () => {
      try {
        const response = await fetch(`/api/brands/${brandId}`);
        if (response.ok) {
          const data = await response.json();
          setBrand(data);
        } else {
          console.error('Failed to fetch brand data');
        }
      } catch (error) {
        console.error('Error fetching brand data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrandData();
  }, [brandId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!brand) {
    return <p>Brand not found.</p>;
  }

  return (
    <div className="space-y-6">
      <BrandInfo
        name={brand.name}
        description={brand.description}
        logoUrl={brand.logoUrl}
        websiteUrl={brand.websiteUrl}
      />
      <ManageRewards brandId={brand.id} />
    </div>
  );
};

export default BrandManagement;
