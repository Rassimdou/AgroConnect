/**
 * Modern AgroConnect Theme
 * Primary: Emerald Green (Trust, Nature)
 * Secondary: Slate (Stability)
 */

import { Platform } from 'react-native';

const tintColorLight = '#10B981'; // Emerald 500
const tintColorDark = '#34D399';  // Emerald 400

export const Colors = {
  light: {
    text: '#1F2937',        // Gray 800
    textSecondary: '#6B7280', // Gray 500
    background: '#F9FAFB',  // Gray 50
    card: '#FFFFFF',
    tint: tintColorLight,
    primary: '#10B981',     // Emerald 500
    primaryDark: '#059669', // Emerald 600
    secondary: '#64748B',   // Slate 500
    border: '#E5E7EB',      // Gray 200
    error: '#EF4444',       // Red 500
    success: '#10B981',     // Emerald 500
    warning: '#F59E0B',     // Amber 500
    icon: '#6B7280',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    background: '#111827',  // Gray 900
    card: '#1F2937',        // Gray 800
    tint: tintColorDark,
    primary: '#34D399',
    primaryDark: '#10B981',
    secondary: '#94A3B8',
    border: '#374151',
    error: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',
    icon: '#9CA3AF',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorDark,
  },
};

export const Shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
};

export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  full: 9999,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
