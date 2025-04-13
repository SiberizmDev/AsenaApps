import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AppCard } from '../components/AppCard';
import { AppDetailModal } from '../components/AppDetailModal';
import { LinearGradient } from 'expo-linear-gradient';
import { AsediaService } from '../services/AsediaService';
import { useTheme } from '../theme/ThemeContext';

export const AppsScreen = () => {
  const { colors } = useTheme();
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    try {
      setLoading(true);
      const appData = await AsediaService.getAllApps();
      setApps(appData);
      setError(null);
    } catch (err) {
      setError('Failed to load apps. Please check your internet connection.');
      console.error('Error loading apps:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.accent }]}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.gradient[0], colors.gradient[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>All Apps</Text>
        <Text style={styles.headerSubtitle}>Browse all available applications</Text>
      </LinearGradient>

      <View style={styles.content}>
        {apps.map((app, index) => (
          <AppCard
            key={index}
            {...app}
            onPress={() => setSelectedApp(app)}
          />
        ))}
      </View>

      <AppDetailModal
        isVisible={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        app={selectedApp || apps[0]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    paddingTop: 16,
  },
}); 