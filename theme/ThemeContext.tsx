import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export type ThemeType = 'light' | 'dark' | 'amoled';

interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  secondaryText: string;
  border: string;
  accent: string;
  gradient: string[];
}

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  setTheme: (theme: ThemeType) => void;
}

const themes: Record<ThemeType, ThemeColors> = {
  light: {
    primary: '#8B5CF6',
    background: '#F9FAFB',
    card: '#FFFFFF',
    text: '#1F2937',
    secondaryText: '#6B7280',
    border: '#E5E7EB',
    accent: '#EC4899',
    gradient: ['#8B5CF6', '#EC4899']
  },
  dark: {
    primary: '#8B5CF6',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    secondaryText: '#9CA3AF',
    border: '#374151',
    accent: '#EC4899',
    gradient: ['#8B5CF6', '#EC4899']
  },
  amoled: {
    primary: '#8B5CF6',
    background: '#000000',
    card: '#0A0A0A',
    text: '#FFFFFF',
    secondaryText: '#9CA3AF',
    border: '#262626',
    accent: '#EC4899',
    gradient: ['#8B5CF6', '#EC4899']
  }
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: themes.light,
  setTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme as ThemeType);
      } else {
        setTheme(systemTheme === 'dark' ? 'dark' : 'light');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const handleSetTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, colors: themes[theme], setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 