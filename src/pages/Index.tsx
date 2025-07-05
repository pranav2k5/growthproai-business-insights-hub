
import React from 'react';
import BusinessDashboard from '@/components/BusinessDashboard';
import { Sparkles, TrendingUp, Building2 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-2 rounded-full border border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">AI-Powered Business Intelligence</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            Local Business
            <br />
            <span className="relative">
              Insights Hub
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur"></div>
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how your business appears online and get AI-powered SEO insights to grow your local presence. 
            Analyze ratings, reviews, and generate compelling headlines that drive customer engagement.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { icon: Building2, text: 'Business Analysis', color: 'blue' },
              { icon: TrendingUp, text: 'Performance Insights', color: 'green' },
              { icon: Sparkles, text: 'AI-Generated Content', color: 'purple' }
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className={`flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-${color}-200 shadow-sm`}>
                <Icon className={`w-4 h-4 text-${color}-600`} />
                <span className="text-sm font-medium text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <BusinessDashboard />
      </div>
      
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
