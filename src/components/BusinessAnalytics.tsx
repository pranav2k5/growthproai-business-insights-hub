
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Target, Users2, Zap, Star, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { BusinessData } from '@/types/business';

interface BusinessAnalyticsProps {
  data: BusinessData;
}

const BusinessAnalytics = ({ data }: BusinessAnalyticsProps) => {
  const getPerformanceScore = () => {
    const ratingScore = (data.rating / 5) * 50;
    const reviewScore = Math.min((data.reviews / 200) * 50, 50);
    return Math.round(ratingScore + reviewScore);
  };

  const getCompetitivePosition = () => {
    if (data.rating >= 4.5 && data.reviews >= 150) return { level: 'Market Leader', color: 'bg-green-500', icon: Award };
    if (data.rating >= 4.0 && data.reviews >= 100) return { level: 'Strong Competitor', color: 'bg-blue-500', icon: Target };
    if (data.rating >= 3.5 && data.reviews >= 50) return { level: 'Growing Business', color: 'bg-yellow-500', icon: TrendingUp };
    return { level: 'Developing', color: 'bg-gray-500', icon: AlertCircle };
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (data.rating < 4.0) {
      recommendations.push({
        priority: 'High',
        action: 'Focus on improving customer satisfaction',
        impact: 'Rating improvement',
        color: 'border-red-200 bg-red-50'
      });
    }
    
    if (data.reviews < 100) {
      recommendations.push({
        priority: 'Medium',
        action: 'Encourage more customer reviews',
        impact: 'Increased credibility',
        color: 'border-yellow-200 bg-yellow-50'
      });
    }
    
    recommendations.push({
      priority: 'Low',
      action: 'Optimize SEO content regularly',
      impact: 'Better search visibility',
      color: 'border-blue-200 bg-blue-50'
    });
    
    return recommendations;
  };

  const performanceScore = getPerformanceScore();
  const competitivePosition = getCompetitivePosition();
  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Business Performance Analytics
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of your business metrics and market position
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Performance Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Overall Performance Score</span>
              <span className="text-2xl font-bold text-blue-600">{performanceScore}/100</span>
            </div>
            <Progress value={performanceScore} className="h-3" />
            <p className="text-sm text-gray-600">
              Based on rating quality and review volume compared to industry standards
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Rating Excellence</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">{((data.rating / 5) * 100).toFixed(0)}%</div>
              <p className="text-xs text-blue-700">Customer satisfaction level</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Users2 className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Review Volume</span>
              </div>
              <div className="text-2xl font-bold text-green-900">{data.reviews}</div>
              <p className="text-xs text-green-700">Total customer feedback</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <competitivePosition.icon className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-800">Market Position</span>
              </div>
              <Badge className={`${competitivePosition.color} text-white text-xs`}>
                {competitivePosition.level}
              </Badge>
              <p className="text-xs text-purple-700 mt-1">Competitive standing</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Zap className="w-6 h-6 text-yellow-600" />
            Growth Recommendations
          </CardTitle>
          <CardDescription>
            Actionable insights to improve your business performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${rec.color} transition-all duration-200 hover:shadow-md`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{rec.action}</h4>
                  <Badge variant="outline" className={`
                    ${rec.priority === 'High' ? 'border-red-300 text-red-700' : 
                      rec.priority === 'Medium' ? 'border-yellow-300 text-yellow-700' : 
                      'border-blue-300 text-blue-700'}
                  `}>
                    {rec.priority} Priority
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">Expected Impact: {rec.impact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessAnalytics;
