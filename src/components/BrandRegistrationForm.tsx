"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const BrandRegistrationForm = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, logoUrl, websiteUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to register brand.');
      }

      toast({
        title: "Brand Registered",
        description: "Your brand has been registered successfully.",
      });

      // Optionally redirect or update the UI to show the new brand's info
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error Occurred",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name" className="text-gray-700">Brand Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the brand name..."
          className="mt-1 block w-full"
          required
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-gray-700">Brand Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a brief description..."
          className="mt-1 block w-full"
          required
        />
      </div>

      <div>
        <Label htmlFor="logoUrl" className="text-gray-700">Logo URL</Label>
        <Input
          id="logoUrl"
          type="url"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="https://example.com/logo.png"
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <Label htmlFor="websiteUrl" className="text-gray-700">Website URL</Label>
        <Input
          id="websiteUrl"
          type="url"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder="https://example.com/logo.png"
          className="mt-1 block w-full"
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className='h-4 w-4 animate-spin'/> : 'Register Brand'}
      </Button>
    </form>
  );
};

export default BrandRegistrationForm;
