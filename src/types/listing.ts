export interface ListingImage {
  id: string;
  url: string;
  alt: string;
}

export interface Listing {
  id: string;
  slug: string;
  address: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  rent: number;
  rentFormatted: string;
  beds: number;
  baths: number;
  sqft: number;
  neighborhood?: string;
  availableDate: string;
  availableDateFormatted: string;
  description: string;
  images: ListingImage[];
  amenities: string[];
  petPolicy: string;
  applicationFee: number | null;
  securityDeposit: number | null;
  utilitiesNote: string | null;
  applyUrl: string;
  lat: number | null;
  lng: number | null;
  syncedAt: string;
}
