export type LeadStatus = "novo" | "contatado" | "convertido" | "descartado";
export type PostStatus = "draft" | "published";

export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  cost_price: number;
  suggested_price: number;
  category_id: string | null;
  stock: number;
  active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category | null;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  city: string | null;
  state: string | null;
  source: string | null;
  status: LeadStatus;
  notes: string | null;
  lgpd_consent: boolean;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  reseller_name: string;
  city: string | null;
  photo_url: string | null;
  result_text: string;
  rating: number;
  approved: boolean;
  display_order: number;
  created_at: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: unknown;
  excerpt: string | null;
  cover_image: string | null;
  author: string;
  category: string | null;
  status: PostStatus;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
};

export type SiteSettings = {
  id: number;
  whatsapp_number: string;
  instagram_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  logo_url: string | null;
  contact_email: string | null;
  hero_headline: string;
  hero_subheadline: string;
  updated_at: string;
};

// Placeholder — real types are the named exports above (Lead, Product, etc.)
// Use those directly instead of the Database generic with createClient.
export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
