
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Users, Sparkles, RefreshCw, TrendingUp } from 'lucide-react';
import { BusinessData } from '@/types/business';

interface BusinessCardProps {
  data: BusinessData | null;
  isLoading: boolean;
  isRegenerating: boolean;
  onRegenerateHeadline: () => void;
}

const BusinessCard = ({ data, isLoading, isRegenerating, onRegenerateHeadline }: BusinessCardProps) => {
  if (isLoading) {
    return (
      <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Analyzing Your Business...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="text-center text-gray-600">
            <p className="mb-2">Gathering insights from across the web...</p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="w-full shadow-xl border-0 bg-white/90 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.01]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-1">
              {data.name}
            </CardTitle>
            <CardDescription className="text-gray-600 flex items-center gap-1">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {data.location}
              </Badge>
            </CardDescription>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <TrendingUp className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Ratings and Reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-semibold text-gray-900">Google Rating</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">{data.rating}</span>
              <span className="text-gray-600">/5.0</span>
            </div>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(data.rating)
                      ? 'text-yellow-400 fill-current'
                      : i < data.rating
                      ? 'text-yellow-400 fill-current opacity-50'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-900">Total Reviews</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">{data.reviews.toLocaleString()}</span>
              <span className="text-gray-600">reviews</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">Strong online presence</p>
          </div>
        </div>
        
        <Separator />
        
        {/* SEO Headline */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900">AI-Generated SEO Headline</h3>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <p className="text-lg font-medium text-gray-900 leading-relaxed mb-4">
              "{data.headline}"
            </p>
            
            <Button
              onClick={onRegenerateHeadline}
              disabled={isRegenerating}
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
            >
              {isRegenerating ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Regenerate Headline
                </div>
              )}
            </Button>
          </div>
        </div>
        
        {/* Insights */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-2">💡 Quick Insights</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Your rating of {data.rating} is {data.rating >= 4.0 ? 'excellent' : data.rating >= 3.5 ? 'good' : 'needs improvement'}</li>
            <li>• {data.reviews} reviews indicate {data.reviews >= 100 ? 'strong' : data.reviews >= 50 ? 'moderate' : 'growing'} customer engagement</li>
            <li>• SEO headline optimized for local search visibility</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
