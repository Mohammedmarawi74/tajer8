
import React from 'react';
import {
  UserCheck,
  Briefcase,
  Calendar,
  DollarSign,
  ClipboardList,
  UploadCloud,
  UserMinus,
  TrendingUp,
  MapPin,
  Leaf,
  Droplets,
  Sprout,
  Info,
  CheckCircle2,
  ShieldCheck,
  Target,
  Waves,
  Beef,
  Flame
} from 'lucide-react';
import { Slide, ThemeColors, ThemeVariant } from './types';

export const DEFAULT_POINTS = [
  { id: '1', icon: 'UserCheck', title: 'أن يكون المستفيد سعودي الجنسية', description: 'أو من حاملي بطاقة التنقل' },
  { id: '2', icon: 'DollarSign', title: 'ألا يتجاوز إجمالي الدعم', description: 'عن (54,000) ريالاً سنوياً لكافة البرامج' },
  { id: '3', icon: 'Briefcase', title: 'أن يكون المستفيد من متهني', description: 'أحد المهن الزراعية التي حددها البرنامج' },
  { id: '4', icon: 'ClipboardList', title: 'تقديم ما يثبت الأهلية', description: 'لمزاولة المهنة في المزرعة (وثائق معتبرة)' },
  { id: '5', icon: 'UserMinus', title: 'ألا يشغل المستفيد أي وظيفة', description: 'في القطاع العام أو الخاص' },
  { id: '6', icon: 'UploadCloud', title: 'رفع طلب الدعم', description: 'على المنصة الإلكترونية بعد استيفاء الشروط' }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  UserCheck: <UserCheck className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  DollarSign: <DollarSign className="w-5 h-5" />,
  ClipboardList: <ClipboardList className="w-5 h-5" />,
  UploadCloud: <UploadCloud className="w-5 h-5" />,
  UserMinus: <UserMinus className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />,
  Sprout: <Sprout className="w-5 h-5" />,
  Info: <Info className="w-5 h-5" />,
  CheckCircle: <CheckCircle2 className="w-5 h-5" />,
  Shield: <ShieldCheck className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Waves: <Waves className="w-5 h-5" />,
  Beef: <Beef className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
};

export const THEME_CONFIGS: Record<Exclude<ThemeVariant, 'custom'>, { name: string; colors: ThemeColors }> = {
  'al-tajer': {
    name: 'التاجر الرقمي',
    colors: { primary: '#2563EB', secondary: '#10B981', bg: '#FFFFFF', text: '#0F172A' }
  },
  'investor': {
    name: 'كحلي المستثمر',
    colors: { primary: '#0f172a', secondary: '#0ea5e9', bg: '#ffffff', text: '#1e293b' }
  },
  'chinese-red': {
    name: 'الأحمر الصيني',
    colors: { primary: '#dc2626', secondary: '#facc15', bg: '#ffffff', text: '#1e293b' }
  },
  'innovation-cyan': {
    name: 'سيان الابتكار',
    colors: { primary: '#0891b2', secondary: '#0f172a', bg: '#ffffff', text: '#1e293b' }
  },
  'analysis-fuchsia': {
    name: 'فوشيا التحليل',
    colors: { primary: '#c026d3', secondary: '#3b82f6', bg: '#ffffff', text: '#1e293b' }
  },
  'active-orange': {
    name: 'برتقالي الحركة',
    colors: { primary: '#f97316', secondary: '#ea580c', bg: '#ffffff', text: '#1e293b' }
  },
  'growth-lime': {
    name: 'لايم النمو',
    colors: { primary: '#65a30d', secondary: '#2563eb', bg: '#ffffff', text: '#1e293b' }
  },
  'deep-purple': {
    name: 'بنفسجي العمق',
    colors: { primary: '#7c3aed', secondary: '#3b82f6', bg: '#ffffff', text: '#1e293b' }
  },
  'dark-mode': {
    name: 'الوضع الداكن',
    colors: { primary: '#0f172a', secondary: '#2dd4bf', bg: '#020617', text: '#f8fafc' }
  }
};

export const DEFAULT_SLIDE: Slide = {
  id: 'slide-1',
  headerTitle: 'قواعد الدعم العامة',
  mainTitle: 'لقطاع المحاصيل البعلية',
  bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop',
  points: DEFAULT_POINTS,
  theme: 'al-tajer',
  colors: THEME_CONFIGS['al-tajer'].colors,
  layout: 'grid',
  customCSS: '',
  customLogoUrl: undefined,
  selectedLogoIndex: 0
};

export const LOGO_OPTIONS = [
  {
    id: 'logo-1',
    name: 'الشعار 1',
    url: '/logooo/logo-1.png',
    preview: '/logooo/logo-1.png'
  },
  {
    id: 'logo-2',
    name: 'الشعار 2',
    url: '/logooo/logo-2.png',
    preview: '/logooo/logo-2.png'
  },
  {
    id: 'logo-3',
    name: 'الشعار 3',
    url: '/logooo/logo-3.png',
    preview: '/logooo/logo-3.png'
  },
  {
    id: 'logo-4',
    name: 'الشعار 4',
    url: '/logooo/logo-4.png',
    preview: '/logooo/logo-4.png'
  },
  {
    id: 'custom-upload',
    name: 'شعار مخصص',
    url: '',
    preview: '',
    isCustom: true
  }
];
