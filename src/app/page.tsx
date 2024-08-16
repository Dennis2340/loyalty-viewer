import PoweredByGenelineX from '@/components/PoweredByGenelineX';
import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-50">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-blue-300 bg-gradient-to-b from-blue-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-blue-200 lg:p-4">
          Welcome to Loyalty Points Viewer
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-blue-100 via-blue-100 lg:static lg:h-auto lg:bg-none">
          <PoweredByGenelineX/>
        </div>
      </div>

      <div className="relative flex place-items-center">
        <h1 className="text-4xl font-bold text-blue-900">
          Track Your Loyalty Points Effortlessly
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <a
          href="/branddashboard"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-blue-300 hover:bg-blue-100"
        >
          <h2 className="mb-3 text-2xl font-semibold text-blue-900">
            Brand Registration
            <span className="inline-block transition-transform group-hover:translate-x-1">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-blue-700">
            Sign up and list your rewards for users to discover.
          </p>
        </a>

        <a
          href="/userdashboard"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-blue-300 hover:bg-blue-100"
        >
          <h2 className="mb-3 text-2xl font-semibold text-blue-900">
            User Dashboard
            <span className="inline-block transition-transform group-hover:translate-x-1">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-blue-700">
            View the rewards you&apos;ve earned from your favorite brands.
          </p>
        </a>

        <a
          href="/rewards"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-blue-300 hover:bg-blue-100"
        >
          <h2 className="mb-3 text-2xl font-semibold text-blue-900">
            Rewards Display
            <span className="inline-block transition-transform group-hover:translate-x-1">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-blue-700">
            Browse through the available rewards from various brands.
          </p>
        </a>
      </div>
    </main>
  );
}
