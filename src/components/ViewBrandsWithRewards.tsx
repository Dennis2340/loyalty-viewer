"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { MyLoader } from "@/components/MyLoader";

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
}

interface Brand {
  id: string;
  name: string;
  description: string;
  rewards: Reward[];
}

const ViewBrandsWithRewards: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBrandsWithRewards = async () => {
      try {
        const response = await fetch("/api/getallbrands");
        if (!response.ok) throw new Error("Failed to fetch brands with rewards.");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        toast({ title: "Error", description: "Failed to load brands and rewards data.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrandsWithRewards();
  }, [toast]);

  return (
    <MaxWidthWrapper>
      <div className="space-y-6">
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Brands and Their Rewards</h2>
          {isLoading ? (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="col-span-1">
                  <MyLoader />
                </div>
              ))}
            </div>
          ) : brands.length > 0 ? (
            <ul className="space-y-4">
              {brands.map((brand) => (
                <li key={brand.id} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900">{brand.name}</h3>
                  <p className="text-gray-700 mb-2">{brand.description}</p>
                  <h4 className="text-md font-semibold text-blue-700">Available Rewards:</h4>
                  <ul className="pl-4 list-disc">
                    {brand.rewards.slice(0, 3).map((reward) => (
                      <li key={reward.id} className="text-gray-600">
                        {reward.title} - {reward.pointsRequired} Points
                      </li>
                    ))}
                    {brand.rewards.length > 3 && (
                      <li className="text-blue-500">...and more</li>
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No brands found.</p>
          )}
        </Card>
      </div>
    </MaxWidthWrapper>
  );
};

export default ViewBrandsWithRewards;
