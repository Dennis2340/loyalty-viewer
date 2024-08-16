"use client"
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Loader2 } from 'lucide-react'; // For a loading spinner
import { useToast } from './ui/use-toast';

interface Reward {
  id: number;
  title: string;
  description: string;
  pointsRequired: number;
}

const ManageRewards: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [newReward, setNewReward] = useState<Partial<Reward>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch existing rewards from the server
    const fetchRewards = async () => {
      const response = await fetch('/api/rewards');
      const data = await response.json();
      setRewards(data);
    };

    fetchRewards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rewards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReward),
      });

      if (!response.ok) throw new Error('Failed to add reward.');
      toast({ title: 'Reward Added', description: 'The new reward has been added.' });
      setNewReward({});
      setRewards([...rewards, { ...newReward, id: Date.now() } as Reward]); // Simulate adding reward to list
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add reward.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
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
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Existing Rewards</h2>
        <ul className="space-y-4">
          {rewards.map((reward) => (
            <li key={reward.id} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">{reward.title}</h3>
              <p className="text-gray-700">{reward.description}</p>
              <p className="text-blue-700">Points Required: {reward.pointsRequired}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default ManageRewards;
