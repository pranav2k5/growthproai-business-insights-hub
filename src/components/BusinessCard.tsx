
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Users, Sparkles, RefreshCw, TrendingUp, Award, MapPin, Building2, Calendar } from 'lucide-react';
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
      <Card className="w-full shadow-2xl border-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 animate-pulse"></div>
        <CardHeader className="text-center relative z-10">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <div className="relative">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 animate-ping"></div>
            </div>
            AI Business Analysis in Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 relative z-10">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-purple-600/30 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700 font-medium">Gathering comprehensive business insights...</p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {['Reviews', 'SEO Analysis', 'Market Data'].map((item, index) => (
                <div key={item} className="bg-white/50 p-3 rounded-lg animate-pulse" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="h-2 bg-gray-200 rounded mb-2"></div>
                  <div className="h-1 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600 bg-green-50 border-green-200';
    if (rating >= 4.0) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (rating >= 3.5) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getReviewsStatus = (reviews: number) => {
    if (reviews >= 200) return { text: 'Exceptional online presence', color: 'text-green-600' };
    if (reviews >= 100) return { text: 'Strong customer engagement', color: 'text-blue-600' };
    if (reviews >= 50) return { text: 'Growing customer base', color: 'text-yellow-600' };
    return { text: 'Building online presence', color: 'text-gray-600' };
  };

  const reviewsStatus = getReviewsStatus(data.reviews);

  return (
    <Card className="w-full shadow-2xl border-0 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.01] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 to-purple-600/3"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Building2 className="w-7 h-7 text-blue-600" />
              {data.name}
            </CardTitle>
            <CardDescription className="text-gray-600 flex items-center gap-2 text-lg">
              <MapPin className="w-4 h-4 text-purple-500" />
              <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200 px-3 py-1">
                {data.location}
              </Badge>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-3 py-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              Active
            </Badge>
            <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200">
              <Calendar className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8 relative z-10">
        {/* Enhanced Ratings and Reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className={`p-6 rounded-xl border-2 ${getRatingColor(data.rating)} transition-all duration-300 hover:shadow-lg`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <Award className="w-3 h-3 text-yellow-600 absolute -top-1 -right-1" />
              </div>
              <span className="font-bold text-gray-900 text-lg">Google Rating</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-gray-900">{data.rating}</span>
              <span className="text-lg text-gray-600">/5.0</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
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
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-gray-900 text-lg">Customer Reviews</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-gray-900">{data.reviews.toLocaleString()}</span>
              <span className="text-lg text-gray-600">reviews</span>
            </div>
            <p className={`text-sm font-medium ${reviewsStatus.color}`}>{reviewsStatus.text}</p>
          </div>
        </div>
        
        <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        
        {/* Enhanced SEO Headline Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <div className="absolute inset-0 bg-purple-500 rounded-full opacity-20 animate-ping"></div>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Generated SEO Headline
            </h3>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 p-6 rounded-xl border-2 border-purple-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
            <blockquote className="text-xl font-semibold text-gray-900 leading-relaxed mb-6 relative z-10 italic">
              "{data.headline}"
            </blockquote>
            
            <Button
              onClick={onRegenerateHeadline}
              disabled={isRegenerating}
              variant="outline"
              className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 relative z-10 group"
            >
              {isRegenerating ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating New Headline...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  Generate New Headline
                  <Sparkles className="w-4 h-4 opacity-70" />
                </div>
              )}
            </Button>
          </div>
        </div>
        
        {/* Enhanced Business Insights */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Business Intelligence Insights
          </h4>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Your rating of <strong>{data.rating}/5.0</strong> is {data.rating >= 4.5 ? 'exceptional and industry-leading' : data.rating >= 4.0 ? 'excellent and above average' : data.rating >= 3.5 ? 'good but has room for improvement' : 'below average and needs attention'}</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p><strong>{data.reviews}</strong> reviews indicate {data.reviews >= 200 ? 'exceptional' : data.reviews >= 100 ? 'strong' : data.reviews >= 50 ? 'moderate' : 'developing'} customer engagement and online presence</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>SEO headline optimized for local search visibility and customer attraction</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Competitive positioning: {data.rating >= 4.0 && data.reviews >= 100 ? 'Market leader' : data.rating >= 3.5 ? 'Strong competitor' : 'Growth opportunity'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
