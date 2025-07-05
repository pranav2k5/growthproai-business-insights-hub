
-- Create a table to store business information
CREATE TABLE public.businesses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.0,
  reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to store SEO headlines for businesses
CREATE TABLE public.seo_headlines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  headline TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) - making tables publicly readable for this demo
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_headlines ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a demo app)
CREATE POLICY "Allow public read access to businesses" 
  ON public.businesses 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert access to businesses" 
  ON public.businesses 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update access to businesses" 
  ON public.businesses 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public read access to seo_headlines" 
  ON public.seo_headlines 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert access to seo_headlines" 
  ON public.seo_headlines 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update access to seo_headlines" 
  ON public.seo_headlines 
  FOR UPDATE 
  USING (true);

-- Insert some sample SEO headline templates
INSERT INTO public.seo_headlines (business_id, headline, is_active) VALUES
  (null, 'Why {business_name} is {location}''s Best Kept Secret in 2025', true),
  (null, '{business_name}: Transforming {location}''s Local Business Scene', true),
  (null, 'Discover Why {business_name} is {location}''s Top-Rated Choice', true),
  (null, '{business_name} Leads the Way in {location}''s Competitive Market', true),
  (null, 'How {business_name} Became {location}''s Most Trusted Business', true),
  (null, '{business_name}: Your Premium Destination in {location}', true),
  (null, 'The Story Behind {location}''s Fastest Growing Business: {business_name}', true),
  (null, '{business_name} Sets New Standards for Excellence in {location}', true);
