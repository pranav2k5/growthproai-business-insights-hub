
export interface BusinessData {
  id?: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  headline: string;
  created_at?: string;
  updated_at?: string;
}

export interface SEOHeadline {
  id: string;
  business_id: string | null;
  headline: string;
  is_active: boolean;
  created_at: string;
}
