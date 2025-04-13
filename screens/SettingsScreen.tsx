import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme, ThemeType } from '../theme/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export const SettingsScreen = () => {
  const { theme, colors, setTheme } = useTheme();

  const themes: { key: ThemeType; name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'light', name: 'Aydınlık', icon: 'sunny' },
    { key: 'dark', name: 'Karanlık', icon: 'moon' },
    { key: 'amoled', name: 'AMOLED', icon: 'contrast' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Ayarlar</Text>
        <Text style={styles.headerSubtitle}>Uygulamayı kişiselleştirin</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tema</Text>
        <View style={styles.themeContainer}>
          {themes.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.themeButton,
                { backgroundColor: colors.card },
                theme === item.key && styles.selectedTheme,
                theme === item.key && { borderColor: colors.primary }
              ]}
              onPress={() => setTheme(item.key)}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={theme === item.key ? colors.primary : colors.secondaryText}
              />
              <Text
                style={[
                  styles.themeName,
                  { color: theme === item.key ? colors.primary : colors.text }
                ]}
              >
                {item.name}
              </Text>
              {theme === item.key && (
                <View style={styles.checkmarkContainer}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Hakkında</Text>
        <View style={styles.aboutContainer}>
          <View style={styles.aboutItem}>
            <Text style={[styles.aboutLabel, { color: colors.secondaryText }]}>Versiyon</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>1.6.3</Text>
          </View>
          <View style={styles.aboutItem}>
            <Text style={[styles.aboutLabel, { color: colors.secondaryText }]}>Geliştirici</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>SiberizmDev</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  section: {
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  themeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  themeButton: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  selectedTheme: {
    borderWidth: 2,
  },
  themeName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  aboutContainer: {
    padding: 16,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  aboutLabel: {
    fontSize: 16,
  },
  aboutValue: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 