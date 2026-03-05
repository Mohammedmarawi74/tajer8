
export interface Point {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export type ThemeVariant = 
  | 'investor' 
  | 'chinese-red' 
  | 'innovation-cyan' 
  | 'analysis-fuchsia' 
  | 'active-orange' 
  | 'growth-lime' 
  | 'deep-purple' 
  | 'dark-mode'
  | 'custom';

export interface ThemeColors {
  primary: string;
  secondary: string;
  bg: string;
  text: string;
}

export interface Slide {
  id: string;
  headerTitle: string;
  mainTitle: string;
  points: Point[];
  bgImage: string;
  customCSS?: string;
  theme: ThemeVariant;
  colors: ThemeColors;
  layout: 'grid' | 'list';
  customLogoUrl?: string;
  selectedLogoIndex?: number;
}

export interface CarouselConfig {
  primaryColor: string;
  accentColor: string;
  logoUrl: string;
  ministryLogoUrl: string;
}
