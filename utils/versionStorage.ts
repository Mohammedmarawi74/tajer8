import { Slide } from '../types';

export interface SlideVersion {
  id: string;
  timestamp: number;
  headerTitle: string;
  mainTitle: string;
  points: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  note?: string;
}

const VERSIONS_PREFIX = 'slide_versions_';
const MAX_VERSIONS_PER_SLIDE = 50;
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

// Get storage key for a slide
const getStorageKey = (slideId: string): string => {
  return `${VERSIONS_PREFIX}${slideId}`;
};

// Save version to localStorage
export const saveVersion = (slide: Slide, note?: string): void => {
  try {
    const key = getStorageKey(slide.id);
    const existingVersions = getVersions(slide.id);
    
    const newVersion: SlideVersion = {
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      headerTitle: slide.headerTitle,
      mainTitle: slide.mainTitle,
      points: slide.points.map(p => ({
        icon: p.icon,
        title: p.title,
        description: p.description
      })),
      note
    };
    
    // Add new version at the beginning
    const updatedVersions = [newVersion, ...existingVersions].slice(0, MAX_VERSIONS_PER_SLIDE);
    
    localStorage.setItem(key, JSON.stringify(updatedVersions));
  } catch (err) {
    console.error('Failed to save version:', err);
  }
};

// Get all versions for a slide
export const getVersions = (slideId: string): SlideVersion[] => {
  try {
    const key = getStorageKey(slideId);
    const stored = localStorage.getItem(key);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (err) {
    console.error('Failed to get versions:', err);
    return [];
  }
};

// Restore a specific version
export const restoreVersion = (slideId: string, version: SlideVersion): Partial<Slide> => {
  return {
    headerTitle: version.headerTitle,
    mainTitle: version.mainTitle,
    points: version.points.map((p, idx) => ({
      id: Math.random().toString(),
      icon: p.icon,
      title: p.title,
      description: p.description
    }))
  };
};

// Delete a specific version
export const deleteVersion = (slideId: string, versionId: string): void => {
  try {
    const key = getStorageKey(slideId);
    const versions = getVersions(slideId);
    const updatedVersions = versions.filter(v => v.id !== versionId);
    localStorage.setItem(key, JSON.stringify(updatedVersions));
  } catch (err) {
    console.error('Failed to delete version:', err);
  }
};

// Clear all versions for a slide
export const clearVersions = (slideId: string): void => {
  try {
    const key = getStorageKey(slideId);
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Failed to clear versions:', err);
  }
};

// Format timestamp for display
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'الآن';
  if (minutes < 60) return `منذ ${minutes} دقيقة`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  if (days < 7) return `منذ ${days} أيام`;
  
  return date.toLocaleDateString('ar-SA', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Auto-save manager
class AutoSaveManager {
  private intervals: Map<string, number> = new Map();
  
  start(slideId: string, saveCallback: () => void): void {
    this.stop(slideId);
    const intervalId = window.setInterval(() => {
      saveCallback();
    }, AUTO_SAVE_INTERVAL);
    this.intervals.set(slideId, intervalId);
  }
  
  stop(slideId: string): void {
    const intervalId = this.intervals.get(slideId);
    if (intervalId) {
      clearInterval(intervalId);
      this.intervals.delete(slideId);
    }
  }
  
  stopAll(): void {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals.clear();
  }
}

export const autoSaveManager = new AutoSaveManager();
