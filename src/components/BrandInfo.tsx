import React from 'react';
import { Hexagon } from 'lucide-react';
import { Card } from './ui/card'; 
import { Label } from './ui/label';
import Image from 'next/image';

interface BrandInfoProps {
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
}

const BrandInfo: React.FC<BrandInfoProps> = ({ name, description, logoUrl, websiteUrl }) => {
  return (
    <Card className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <img 
        src={logoUrl} 
        alt={`${name} logo`} 
        className="w-16 h-16 rounded-full object-cover" 
        height={200}
        width={200}
        />
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-blue-900">{name}</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
      <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        Visit Website
      </a>
    </Card>
  );
};

export default BrandInfo;
