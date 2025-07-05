
import React, { useState } from 'react';
import BusinessForm from './BusinessForm';
import BusinessCard from './BusinessCard';
import { BusinessData } from '@/types/business';

const BusinessDashboard = () => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleFormSubmit = async (name: string, location: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulated business data
      const mockData: BusinessData = {
        name,
        location,
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        reviews: Math.floor(50 + Math.random() * 500),
        headline: generateHeadline(name, location)
      };
      
      setBusinessData(mockData);
    } catch (error) {
      console.error('Error fetching business data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateHeadline = async () => {
    if (!businessData) return;
    
    setIsRegenerating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newHeadline = generateHeadline(businessData.name, businessData.location);
      setBusinessData({
        ...businessData,
        headline: newHeadline
      });
    } catch (error) {
      console.error('Error regenerating headline:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  const generateHeadline = (name: string, location: string): string => {
    const headlines = [
      `Why ${name} is ${location}'s Best Kept Secret in 2025`,
      `${name}: Transforming ${location}'s Local Business Scene`,
      `Discover Why ${name} is ${location}'s Top-Rated Choice`,
      `${name} Leads the Way in ${location}'s Competitive Market`,
      `How ${name} Became ${location}'s Most Trusted Business`,
      `${name}: Your Premium Destination in ${location}`,
      `The Story Behind ${location}'s Fastest Growing Business: ${name}`,
      `${name} Sets New Standards for Excellence in ${location}`,
    ];
    
    return headlines[Math.floor(Math.random() * headlines.length)];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <BusinessForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      
      {(businessData || isLoading) && (
        <BusinessCard
          data={businessData}
          isLoading={isLoading}
          isRegenerating={isRegenerating}
          onRegenerateHeadline={handleRegenerateHeadline}
        />
      )}
    </div>
  );
};

export default BusinessDashboard;
