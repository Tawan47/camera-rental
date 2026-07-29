export type Product = {
  id: string;
  name: string;
  brand: string;
  brandId: string;
  category: string;
  pricePerDay: number;
  deposit: number;
  image: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  published: boolean;
  description: string;
  specs: { label: string; value: string }[];
  includes: string[];
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  productCount: number;
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
  productCount: number;
};

export type BundleItem = {
  productId: string;
  productName: string;
  quantity: number;
  note: string | null;
};

export type Bundle = {
  id: string;
  name: string;
  brand: string | null;
  brandId: string | null;
  category: string | null;
  categoryId: string | null;
  pricePerDay: number;
  deposit: number;
  image: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  published: boolean;
  description: string;
  items: BundleItem[];
};

export type SiteSettings = {
  shopName: string;
  logoImage: string;
  instagramHandle: string;
  contactPhone: string;
  contactPerson: string;
  footerTagline: string;
  businessHoursLine1: string;
  businessHoursLine2: string;
  metaTitle: string;
  metaDescription: string;

  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubheading: string;
  heroSearchPlaceholder: string;
  popularSearchLabel: string;
  popularSearchTags: string[];

  categoriesHeading: string;
  categoriesSubheading: string;
  brandsHeading: string;
  brandsSubheading: string;
  featuredHeading: string;
  featuredSubheading: string;
};
