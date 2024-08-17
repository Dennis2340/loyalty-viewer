"use client"
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Loader2, Trash } from 'lucide-react';
import { useToast } from './ui/use-toast';
import MaxWidthWrapper from './MaxWidthWrapper';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
}

interface ManageRewardsProps {
  brandId: string;
}

const ManageRewards: React.FC<ManageRewardsProps> = ({ brandId }) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [newReward, setNewReward] = useState<Partial<Reward>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const { toast } = useToast();

  useEffect(() => {
    const fetchRewards = async () => {
      const response = await fetch(`/api/brands/${brandId}/rewards`);
      const data = await response.json();
      setRewards(data);
    };

    fetchRewards();
  }, [brandId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/rewards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...newReward, brandId}),
      });

      if (!response.ok) throw new Error('Failed to add reward.');
      toast({ title: 'Reward Added', description: 'The new reward has been added.' });
      setNewReward({});
      setRewards([...rewards, { ...newReward, id: `${Date.now()}` } as Reward]);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add reward.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async(rewardId:string) => {
    try {
        setIsDeleting(true)
        const response = await fetch(`/api/rewards/${rewardId}`, {
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
    <MaxWidthWrapper className='mb-4'>
    <div className="space-y-6">
      <Card className="p-6 mb-20">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Add New Reward</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Reward Title</Label>
            <Input
              id="title"
              value={newReward.title || ''}
              onChange={(e) => setNewReward({ ...newReward, title: e.target.value })}
              placeholder="Enter reward title"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newReward.description || ''}
              onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
              placeholder="Enter reward description"
              required
            />
          </div>
          <div>
            <Label htmlFor="pointsRequired">Points Required</Label>
            <Input
              id="pointsRequired"
              type="number"
              value={newReward.pointsRequired || ''}
              onChange={(e) => setNewReward({ ...newReward, pointsRequired: +e.target.value })}
              placeholder="Enter points required"
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Reward'}
          </Button>
        </form>
      </Card>
      <Card className="p-3 mb-3">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Existing Rewards</h2>
        <ul className="space-y-4">
          {rewards?.map((reward) => (
            <li key={reward.id} className="p-4 flex justify-between border border-gray-200 rounded-lg">
              <div>
              <h3 className="text-lg font-semibold text-blue-900">{reward.title}</h3>
              <p className="text-gray-700">{reward.description}</p>
              <p className="text-blue-700">Points Required: {reward.pointsRequired}</p>
              </div>
              <Button onClick={() => handleDelete(reward.id)} size="sm" variant='destructive'> 
                {isDeleting ?
                <Loader2 className='h-3 w-3'/>: 
                <Trash className='h-4 w-4'/>
                }
             </Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
    </MaxWidthWrapper>
  );
};

export default ManageRewards;
