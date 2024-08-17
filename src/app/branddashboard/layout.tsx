import NavigationLinks from '@/components/NavigationLink';
import React from 'react'

interface Props {}

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
            <NavigationLinks/>
            {children}
        </body>
      </html>
    );
  }