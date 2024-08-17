"use client"
import React, { useState, useEffect } from 'react';
import WelcomePrompt from './WelcomePrompt';
import NavigationLinks from './NavigationLink';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Button } from './ui/button';
import { Delete, Loader2, Trash, X } from 'lucide-react';
import { MyLoader } from './MyLoader';

type Brand = {
  id: string;
  name: string;
  description: string;
};

const MainBrandDashboard = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting,setIsDeleting] = useState(false)
  useEffect(() => {
    // Fetch brand data to check if there are any registered brands
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/brands');
        const brandsData = await response.json();
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleDelete = async(brandId:string) => {
    try {
        setIsDeleting(true)
        const response = await fetch(`/api/brands/${brandId}`, {
            method: 'DELETE',
        })
        if(response.ok){
            setIsDeleting(false)
        }
    } catch (error) {
        setIsDeleting(false) 
        console.log(error)
    }finally{
        setIsDeleting(false)
    }
  }
  return (
    <div>
      <MaxWidthWrapper>
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Brands</h2>
            <Link href="/branddashboard/register">
              <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                Register New Brand
              </button>
            </Link>
          </div>
          {isLoading ? (
           <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
           {[...Array(4)].map((_, index) => (
               <div key={index} className='col-span-1'>
                   <MyLoader />
               </div>
           ))}
           </div>
          ) : brands.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {brands.map((brand) => (
                <div key={brand.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <Link href={`/branddashboard/${brand.id}`} className="text-blue-700 hover:underline text-lg font-semibold">
                    {brand.name}
                  </Link>
                  <div className='flex justify-between'>
                    <p className="text-gray-600 mt-2">{brand.description}</p>
                    <Button onClick={() => handleDelete(brand.id)} size="sm" variant='destructive'> 
                        {isDeleting ?
                        <Loader2 className='h-3 w-3'/>: 
                        <Trash className='h-4 w-4'/>
                        }
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <WelcomePrompt />
          )}
        </main>
      </MaxWidthWrapper>
    </div>
  );
};

export default MainBrandDashboard;
