import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COMPANY = {
  name: "IronClad Movers",
  tagline: "Serving Seattle Since 2024",
  phone: "+1 206-608-4987",
  phoneHref: "tel:12066084987",
  email: "ironcladmov@gmail.com",
  address: "4317 8th Avenue NE, Seattle, WA 98105",
  addressShort: "Seattle, WA",
  hours: "Mon–Sun: 8:00 AM – 9:00 PM",
  license: "WA DOT #1234567",
  serviceRadius: "150 miles",
  since: "2024",
};

export const STATS = [
  { value: 500, suffix: "+", label: "Happy Customers", animated: true },
  { value: 1, suffix: "+", label: "Years in Business", animated: false },
  { value: 4.9, suffix: "★", label: "Google Rating", animated: false },
  { value: 100, suffix: "%", label: "Satisfaction Rate", animated: true },
];

export const SERVICE_CITIES = [
  { name: "Seattle", slug: "seattle", state: "WA", lat: 47.6062, lng: -122.3321 },
  { name: "Bellevue", slug: "bellevue", state: "WA", lat: 47.6101, lng: -122.2015 },
  { name: "Tacoma", slug: "tacoma", state: "WA", lat: 47.2529, lng: -122.4443 },
  { name: "Redmond", slug: "redmond", state: "WA", lat: 47.6740, lng: -122.1215 },
  { name: "Everett", slug: "everett", state: "WA", lat: 47.9790, lng: -122.2021 },
  { name: "Kirkland", slug: "kirkland", state: "WA", lat: 47.6815, lng: -122.2087 },
  { name: "Kent", slug: "kent", state: "WA", lat: 47.3809, lng: -122.2348 },
  { name: "Renton", slug: "renton", state: "WA", lat: 47.4829, lng: -122.2171 },
  { name: "Auburn", slug: "auburn", state: "WA", lat: 47.3073, lng: -122.2284 },
  { name: "Lynnwood", slug: "lynnwood", state: "WA", lat: 47.8209, lng: -122.3151 },
  { name: "Federal Way", slug: "federal-way", state: "WA", lat: 47.3223, lng: -122.3126 },
  { name: "Olympia", slug: "olympia", state: "WA", lat: 47.0379, lng: -122.9007 },
  { name: "Bremerton", slug: "bremerton", state: "WA", lat: 47.5673, lng: -122.6329 },
  { name: "Spokane", slug: "spokane", state: "WA", lat: 47.6587, lng: -117.4260 },
  { name: "Yakima", slug: "yakima", state: "WA", lat: 46.6021, lng: -120.5059 },
  { name: "Bellingham", slug: "bellingham", state: "WA", lat: 48.7519, lng: -122.4787 },
  { name: "Marysville", slug: "marysville", state: "WA", lat: 48.0512, lng: -122.1771 },
  { name: "Shoreline", slug: "shoreline", state: "WA", lat: 47.7554, lng: -122.3418 },
];

export const SERVICES = [
  { id: "local-moving", title: "Local Moving", description: "Professional local moves within Seattle and nearby cities. Fast, careful, and affordable.", icon: "MapPin", details: "We handle all local moves within a 50-mile radius." },
  { id: "long-distance", title: "Long Distance Moving", description: "Reliable long-distance moves across Washington State and beyond.", icon: "Truck", details: "Moves throughout Washington State, up to 150 miles from Seattle." },
  { id: "apartment-moving", title: "Apartment Moving", description: "Expert apartment movers who navigate tight hallways, stairs, and elevators.", icon: "Building2", details: "Specialists in high-rise and multi-floor apartment moves." },
  { id: "office-relocation", title: "Office Relocation", description: "Minimize downtime with our professional office relocation services.", icon: "Briefcase", details: "Weekend and after-hours availability to keep your business running." },
  { id: "packing-services", title: "Packing Services", description: "Full packing and unpacking services with premium materials.", icon: "Package", details: "We bring all packing supplies and handle everything." },
  { id: "furniture-assembly", title: "Furniture Assembly", description: "Professional assembly and disassembly of all furniture types.", icon: "Wrench", details: "IKEA, custom pieces, and complex furniture." },
  { id: "storage-solutions", title: "Storage Solutions", description: "Secure short and long-term storage options in Seattle.", icon: "Archive", details: "Climate-controlled storage units available for flexible terms." },
];
