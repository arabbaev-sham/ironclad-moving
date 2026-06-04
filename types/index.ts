export interface Booking {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  move_type: string;
  move_date: string;
  pickup_address: string;
  pickup_floor: string;
  destination_address: string;
  destination_floor: string;
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  photo_urls?: string[];
}

export interface Review {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  rating: number;
  text: string;
  move_type?: string;
  image_urls?: string[];
  approved: boolean;
  featured?: boolean;
}

export interface ContactMessage {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
}

export interface GalleryItem {
  id?: string;
  created_at?: string;
  title: string;
  description?: string;
  url: string;
  type: "photo" | "video";
  category: "move" | "truck" | "team" | "before-after";
  featured?: boolean;
}

export interface BlogPost {
  id?: string;
  created_at?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  published: boolean;
  seo_title?: string;
  seo_description?: string;
}
