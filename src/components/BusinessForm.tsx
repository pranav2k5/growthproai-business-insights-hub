
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin, Search, Sparkles, TrendingUp } from 'lucide-react';

interface BusinessFormProps {
  onSubmit: (name: string, location: string) => void;
  isLoading: boolean;
}

const BusinessForm = ({ onSubmit, isLoading }: BusinessFormProps) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && location.trim()) {
      onSubmit(name.trim(), location.trim());
    }
  };

  const quickFillExamples = [
    { name: 'The Coffee Corner', location: 'San Francisco' },
    { name: 'Bella Vista Restaurant', location: 'New York' },
    { name: 'Tech Solutions Inc', location: 'Austin' },
    { name: 'Green Garden Spa', location: 'Los Angeles' }
  ];

  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <CardHeader className="text-center relative z-10">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Building2 className="w-8 h-8 text-blue-600" />
              <Sparkles className="w-4 h-4 text-purple-500 absolute -top-1 -right-1" />
            </div>
            Business Intelligence Hub
          </div>
        </CardTitle>
        <CardDescription className="text-gray-600 text-lg">
          Get AI-powered insights and SEO analysis for your local business
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="business-name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-500" />
                Business Name
              </Label>
              <div className="relative">
                <Input
                  id="business-name"
                  type="text"
                  placeholder="e.g., The Coffee Corner"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 pl-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="location" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                Location
              </Label>
              <div className="relative">
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g., San Francisco"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 pl-4 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-600">Quick Fill Examples:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {quickFillExamples.map((example, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setName(example.name);
                    setLocation(example.location);
                  }}
                  className="text-xs h-8 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  {example.name}
                </Button>
              ))}
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={isLoading || !name.trim() || !location.trim()}
            className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <TrendingUp className="w-5 h-5" />
                Analyzing Business...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5" />
                Get AI-Powered Insights
                <Sparkles className="w-5 h-5" />
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessForm;
