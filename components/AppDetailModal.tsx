import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

interface AppDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  app: {
    name: string;
    description: string;
    icon: { uri: string };
    rating: number;
    version?: string;
    longDescription?: string;
    screenshots?: string[];
    developer?: string;
    repoUrl?: string;
    isInstalled?: boolean;
    hasUpdate?: boolean;
    installedVersion?: string;
  };
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({ isVisible, onClose, app }) => {
  const { colors, theme } = useTheme();

  const handleInstall = () => {
    if (app.repoUrl) {
      Linking.openURL(app.repoUrl);
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <Ionicons
        key={index}
        name={index < (app.rating || 0) ? 'star' : 'star-outline'}
        size={16}
        color={index < (app.rating || 0) ? '#FCD34D' : colors.secondaryText}
        style={{ marginRight: 4 }}
      />
    ));
  };

  const renderStatus = () => {
    if (app.hasUpdate) {
      return (
        <TouchableOpacity
          style={[styles.installButton, { backgroundColor: '#10B981' }]}
          onPress={handleInstall}
        >
          <Ionicons name="arrow-up-circle" size={20} color="white" />
          <Text style={styles.installButtonText}>Update</Text>
        </TouchableOpacity>
      );
    }
    if (app.isInstalled) {
      return (
        <View style={[styles.installedButton, { backgroundColor: colors.border }]}>
          <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
          <Text style={[styles.installedButtonText, { color: colors.primary }]}>
            {app.installedVersion}
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={[styles.installButton, { backgroundColor: colors.primary }]}
        onPress={handleInstall}
      >
        <Ionicons name="download" size={20} color="white" />
        <Text style={styles.installButtonText}>GET</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={[styles.modalContainer, { backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : colors.background }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <Image source={app.icon} style={styles.icon} />
              <View style={styles.headerInfo}>
                <Text style={[styles.title, { color: colors.text }]}>{app.name}</Text>
                <Text style={[styles.developer, { color: colors.secondaryText }]}>
                  {app.developer || 'Unknown Developer'}
                </Text>
                <View style={styles.ratingContainer}>{renderStars()}</View>
              </View>
              {renderStatus()}
            </View>

            <View style={[styles.section, { borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Hakkında</Text>
              <Text style={[styles.description, { color: colors.secondaryText }]}>
                {app.longDescription || app.description}
              </Text>
            </View>

            {app.screenshots && app.screenshots.length > 0 && (
              <View style={[styles.section, { borderColor: colors.border }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Ekran Görüntüleri</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {app.screenshots.map((screenshot, index) => (
                    <Image
                      key={index}
                      source={{ uri: screenshot }}
                      style={styles.screenshot}
                      resizeMode="cover"
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: colors.card }]}
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '90%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  developer: {
    fontSize: 16,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  screenshot: {
    width: 280,
    height: 500,
    borderRadius: 12,
    marginRight: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  installButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  installButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  installedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  installedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 