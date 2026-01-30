export interface ProductItem {
  id: string;
  title: string;
  category: string;
  description: string;
  author: string;
  url?: string;
  tags?: string[];
  date?: string;
  thumbnail?: string;
}

export type Category =
  | 'All'
  | 'SaaS'
  | 'Mobile Apps'
  | 'Marketplaces'
  | 'AI Products';
