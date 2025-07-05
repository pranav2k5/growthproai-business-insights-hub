
import React from 'react';
import BusinessDashboard from '@/components/BusinessDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Local Business Insights Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how your business appears online and get AI-powered SEO insights to grow your local presence
          </p>
        </div>
        <BusinessDashboard />
      </div>
    </div>
  );
};

export default Index;
