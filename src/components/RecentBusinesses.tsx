
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star, MapPin, Building2, TrendingUp, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BusinessData } from '@/types/business';

interface RecentBusinessesProps {
  refreshTrigger: number;
}

const RecentBusinesses = ({ refreshTrigger }: RecentBusinessesProps) => {
  const [businesses, setBusinesses] = useState<BusinessData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecentBusinesses = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching recent businesses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentBusinesses();
  }, [refreshTrigger]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-purple-600" />
              Recent Businesses
            </CardTitle>
            <CardDescription>
              Latest businesses analyzed
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchRecentBusinesses}
            disabled={isLoading}
            className="border-gray-200 hover:border-purple-300 hover:bg-purple-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : businesses.length > 0 ? (
          businesses.map((business) => (
            <div
              key={business.id}
              className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg border border-gray-200 hover:border-purple-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                      {business.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{business.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium text-gray-700">{business.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-600">{business.reviews} reviews</span>
                  </div>
                </div>
                
                {business.created_at && (
                  <span className="text-xs text-gray-500">
                    {formatDate(business.created_at)}
                  </span>
                )}
              </div>
              
              <Badge 
                variant="outline" 
                className={`mt-2 text-xs ${
                  business.rating >= 4.0 
                    ? 'border-green-200 text-green-700 bg-green-50' 
                    : business.rating >= 3.5 
                    ? 'border-yellow-200 text-yellow-700 bg-yellow-50'
                    : 'border-red-200 text-red-700 bg-red-50'
                }`}
              >
                {business.rating >= 4.5 ? 'Excellent' : 
                 business.rating >= 4.0 ? 'Good' : 
                 business.rating >= 3.5 ? 'Average' : 'Needs Improvement'}
              </Badge>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm">No businesses analyzed yet</p>
            <p className="text-xs text-gray-400 mt-1">Start by analyzing your first business above</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentBusinesses;
