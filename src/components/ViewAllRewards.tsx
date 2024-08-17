"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { MyLoader } from "@/components/MyLoader";

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  brand: {
    id: string;
    name: string;
  };
}

const ViewAllRewards: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await fetch("/api/rewards");
        if (!response.ok) throw new Error("Failed to fetch rewards.");
        const data = await response.json();
        console.log(data)
        setRewards(data);
      } catch (error) {
        toast({ title: "Error", description: "Failed to load rewards data.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewards();
  }, [toast]);



  return (
    <MaxWidthWrapper>
      <div className="space-y-6">
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">All Available Rewards</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <MyLoader key={index} />
              ))}
            </div>
          ) : rewards.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rewards.map((reward) => (
                <Card key={reward.id} className="p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white">
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">{reward.title}</h3>
                  <p className="text-gray-600 mb-4">{reward.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-blue-600 font-semibold">Points: {reward.pointsRequired}</p>
                    <p className="text-gray-500 text-sm">Brand: {reward.brand.name}</p>
                  </div>
                </div>
              </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No rewards found.</p>
          )}
        </Card>
      </div>
    </MaxWidthWrapper>
  );
};

export default ViewAllRewards;
