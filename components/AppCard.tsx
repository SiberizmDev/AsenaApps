import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

interface AppCardProps {
  name: string;
  description: string;
  icon: { uri: string };
  rating: number;
  version?: string;
  variant?: 'vertical' | 'horizontal';
  onPress?: () => void;
  isInstalled?: boolean;
  hasUpdate?: boolean;
  installedVersion?: string;
}

export const AppCard: React.FC<AppCardProps> = ({
  name,
  description,
  icon,
  rating,
  version,
  variant = 'horizontal',
  onPress,
  isInstalled,
  hasUpdate,
  installedVersion
}) => {
  const { colors } = useTheme();

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={12}
        color={index < rating ? '#FCD34D' : colors.secondaryText}
        style={{ marginRight: 2 }}
      />
    ));
  };

  const renderStatus = () => {
    if (hasUpdate) {
      return (
        <View style={[styles.statusContainer, { backgroundColor: colors.card }]}>
          <Ionicons name="arrow-up-circle" size={16} color="#10B981" />
          <Text style={[styles.statusText, { color: '#10B981' }]}>Update</Text>
        </View>
      );
    }
    if (isInstalled) {
      return (
        <View style={[styles.statusContainer, { backgroundColor: colors.card }]}>
          <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
          <Text style={[styles.statusText, { color: colors.primary }]}>{installedVersion}</Text>
        </View>
      );
    }
    return (
      <View style={[styles.statusContainer, { backgroundColor: colors.card }]}>
        <Ionicons name="download" size={16} color={colors.primary} />
        <Text style={[styles.statusText, { color: colors.primary }]}>GET</Text>
      </View>
    );
  };

  if (variant === 'vertical') {
    return (
      <TouchableOpacity 
        style={[styles.verticalContainer, { backgroundColor: colors.card }]} 
        onPress={onPress}
      >
        <Image source={icon} style={styles.verticalIcon} />
        <View style={styles.verticalContent}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{name}</Text>
          <Text style={[styles.description, { color: colors.secondaryText }]} numberOfLines={2}>
            {description}
          </Text>
          <View style={styles.ratingContainer}>{renderStars()}</View>
          {renderStatus()}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card }]} 
      onPress={onPress}
    >
      <Image source={icon} style={styles.icon} />
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{name}</Text>
        <Text style={[styles.description, { color: colors.secondaryText }]} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.ratingContainer}>{renderStars()}</View>
      </View>
      {renderStatus()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verticalContainer: {
    width: 200,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  verticalIcon: {
    width: 176,
    height: 176,
    borderRadius: 8,
    marginBottom: 12,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  verticalContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
}); 