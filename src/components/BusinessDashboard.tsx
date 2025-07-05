
import React, { useState } from 'react';
import BusinessForm from './BusinessForm';
import BusinessCard from './BusinessCard';
import BusinessAnalytics from './BusinessAnalytics';
import RecentBusinesses from './RecentBusinesses';
import { BusinessData } from '@/types/business';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const BusinessDashboard = () => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFormSubmit = async (name: string, location: string) => {
    setIsLoading(true);
    
    try {
      // Check if business already exists
      const { data: existingBusiness } = await supabase
        .from('businesses')
        .select('*')
        .eq('name', name)
        .eq('location', location)
        .single();

      let business;
      
      if (existingBusiness) {
        business = existingBusiness;
        toast({
          title: "Business Found",
          description: "Displaying existing business data from our database.",
        });
      } else {
        // Generate realistic data for new business
        const rating = Math.round((3.5 + Math.random() * 1.5) * 10) / 10;
        const reviews = Math.floor(50 + Math.random() * 500);
        
        // Insert new business
        const { data: newBusiness, error } = await supabase
          .from('businesses')
          .insert({
            name,
            location,
            rating,
            reviews
          })
          .select()
          .single();

        if (error) throw error;
        business = newBusiness;

        // Generate and store SEO headline
        const headline = await generateHeadline(name, location, business.id);
        
        toast({
          title: "Business Added",
          description: "New business profile created successfully!",
        });
      }

      // Get active headline for this business
      const { data: headlineData } = await supabase
        .from('seo_headlines')
        .select('headline')
        .eq('business_id', business.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      let headline = headlineData?.headline;
      if (!headline) {
        headline = await generateHeadline(name, location, business.id);
      }

      setBusinessData({
        id: business.id,
        name: business.name,
        location: business.location,
        rating: parseFloat(business.rating),
        reviews: business.reviews,
        headline: headline
      });

      setRefreshTrigger(prev => prev + 1);
      
    } catch (error) {
      console.error('Error fetching business data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch business data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateHeadline = async (name: string, location: string, businessId?: string): Promise<string> => {
    try {
      // Get random headline template
      const { data: templates } = await supabase
        .from('seo_headlines')
        .select('headline')
        .is('business_id', null)
        .eq('is_active', true);

      if (templates && templates.length > 0) {
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        let headline = randomTemplate.headline
          .replace(/{business_name}/g, name)
          .replace(/{location}/g, location);

        // If we have a business ID, store this headline
        if (businessId) {
          // Deactivate previous headlines
          await supabase
            .from('seo_headlines')
            .update({ is_active: false })
            .eq('business_id', businessId);

          // Insert new active headline
          await supabase
            .from('seo_headlines')
            .insert({
              business_id: businessId,
              headline: headline,
              is_active: true
            });
        }

        return headline;
      }
    } catch (error) {
      console.error('Error generating headline:', error);
    }

    // Fallback headline
    return `${name}: Leading Excellence in ${location}`;
  };

  const handleRegenerateHeadline = async () => {
    if (!businessData) return;
    
    setIsRegenerating(true);
    
    try {
      const newHeadline = await generateHeadline(businessData.name, businessData.location, businessData.id);
      setBusinessData({
        ...businessData,
        headline: newHeadline
      });

      toast({
        title: "Headline Updated",
        description: "New SEO headline generated successfully!",
      });
    } catch (error) {
      console.error('Error regenerating headline:', error);
      toast({
        title: "Error",
        description: "Failed to generate new headline. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <BusinessForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {(businessData || isLoading) && (
            <BusinessCard
              data={businessData}
              isLoading={isLoading}
              isRegenerating={isRegenerating}
              onRegenerateHeadline={handleRegenerateHeadline}
            />
          )}
          
          {businessData && (
            <BusinessAnalytics data={businessData} />
          )}
        </div>

        <div className="space-y-6">
          <RecentBusinesses refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
