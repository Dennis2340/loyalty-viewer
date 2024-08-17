"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Home, Hexagon, Coins, User } from 'lucide-react';
import Link from 'next/link';

const NavigationLinks = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: <Home /> },
    { href: '/branddashboard', label: 'Dashboard', icon: <Home /> },
    { href: '/brands', label: 'Brands', icon: <Coins /> },
    { href: '/rewards', label: 'Rewards', icon: <Hexagon /> },
    { href: '/userdashboard', label: 'User Dashboard', icon: <User /> },
  ];

  return (
    <nav className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-4 mb-6 space-y-2 md:space-y-0 md:space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
            pathname === item.href ? 'bg-blue-100 text-blue-900 font-semibold' : 'hover:bg-blue-100'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavigationLinks;
