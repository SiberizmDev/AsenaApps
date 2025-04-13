import * as Application from 'expo-application';

export interface AppInfo {
  name: string;
  description: string;
  icon: string;
  rating: number;
  repoUrl: string;
  longDescription: string;
  version: string;
  screenshots: string[];
  developer: string;
  backgroundColor: string;
  packageName: string;
  downloadUrl?: string;
  updateNotes?: string[];
}

export class AsediaService {
  private static BASE_URL = 'https://raw.githubusercontent.com/SiberizmDev';
  private static PACKAGE_NAMES = {
    'Asedia': 'com.asena.space',
    'Asedia Pro': 'com.asena.pro',
    'Asedia Lite': 'com.asena.lite',
    'Asedia Dev Tools': 'com.asena.devtools'
  };

  static async checkAppInstallation(packageName: string): Promise<{ isInstalled: boolean; version?: string }> {
    try {
      const currentPackage = await Application.applicationId;
      console.log('Current Package:', currentPackage); // Debug için

      // Expo Go'da test ediliyorsa
      if (currentPackage === 'host.exp.exponent') {
        // Geliştirme modunda olduğumuz için Asedia'yı kurulu varsayalım
        if (packageName === this.PACKAGE_NAMES['Asedia']) {
          return {
            isInstalled: true,
            version: '1.6.3' // Geliştirme sürümü
          };
        }
        return { isInstalled: false };
      }

      // Gerçek uygulamada çalışıyorsa
      const isInstalled = currentPackage === packageName;
      console.log('Is Installed:', isInstalled); // Debug için
      console.log('Package Name:', packageName); // Debug için

      let version: string | undefined = undefined;
      
      if (isInstalled) {
        const nativeVersion = await Application.nativeApplicationVersion;
        version = nativeVersion || undefined;
      }
      
      return { isInstalled, version };
    } catch (error) {
      console.error('Error checking app installation:', error);
      return { isInstalled: false };
    }
  }

  static compareVersions(installedVersion: string, latestVersion: string): boolean {
    console.log('Version Compare:', { installedVersion, latestVersion }); // Debug için
    
    // Özel sürüm adlandırmalarını temizle (örn: "1.6.3 (A.S.K. Special)" -> "1.6.3")
    const cleanInstalled = installedVersion.split(' ')[0];
    const cleanLatest = latestVersion.split(' ')[0];
    
    const installed = cleanInstalled.split('.').map(Number);
    const latest = cleanLatest.split('.').map(Number);
    
    console.log('Cleaned Versions:', { installed, latest }); // Debug için
    
    for (let i = 0; i < Math.max(installed.length, latest.length); i++) {
      const a = installed[i] || 0;
      const b = latest[i] || 0;
      if (a < b) return true; // Güncelleme mevcut
      if (a > b) return false;
    }
    return false; // Aynı sürüm
  }

  static async getAppInfo(appName: string): Promise<AppInfo> {
    try {
      const appJsonResponse = await fetch(`${this.BASE_URL}/${appName}/main/app.json`);
      const updateJsonResponse = await fetch(`${this.BASE_URL}/${appName}/main/update.json`);
      
      if (!appJsonResponse.ok || !updateJsonResponse.ok) {
        throw new Error(`Failed to fetch data for ${appName}`);
      }

      const appData = await appJsonResponse.json();
      const updateData = await updateJsonResponse.json();

      // Varsayılan değerler atayalım
      const defaultDescription = 'Yeni uygulama';
      const defaultUpdateNotes = ['Yeni sürüm yayınlandı!'];
      const defaultVersion = '1.0.0';

      return {
        name: appData.expo?.name || appName,
        description: updateData?.versionName || defaultDescription,
        icon: `${this.BASE_URL}/${appName}/main/assets/icon.png`,
        rating: 5,
        repoUrl: `https://github.com/SiberizmDev/${appName}`,
        longDescription: updateData?.updateNotes?.join('\n') || defaultUpdateNotes.join('\n'),
        version: updateData?.version || defaultVersion,
        screenshots: [
          `${this.BASE_URL}/${appName}/main/assets/images/screenshot1.png`,
          `${this.BASE_URL}/${appName}/main/assets/images/screenshot2.png`,
          `${this.BASE_URL}/${appName}/main/assets/images/screenshot3.png`
        ],
        developer: 'SiberizmDev',
        backgroundColor: appData.expo?.splash?.backgroundColor || '#101013',
        packageName: updateData?.packageName || `com.asena.${appName.toLowerCase()}`,
        downloadUrl: updateData?.downloadUrl,
        updateNotes: updateData?.updateNotes || defaultUpdateNotes
      };
    } catch (error) {
      console.error(`Error fetching app info for ${appName}:`, error);
      // Hata durumunda varsayılan bir AppInfo objesi döndürelim
      return {
        name: appName,
        description: 'Uygulama bilgileri yüklenirken bir hata oluştu',
        icon: `${this.BASE_URL}/${appName}/main/assets/icon.png`,
        rating: 5,
        repoUrl: `https://github.com/SiberizmDev/${appName}`,
        longDescription: 'Uygulama bilgileri geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
        version: '1.0.0',
        screenshots: [],
        developer: 'SiberizmDev',
        backgroundColor: '#101013',
        packageName: `com.asena.${appName.toLowerCase()}`,
        updateNotes: ['Uygulama bilgileri yüklenirken bir hata oluştu']
      };
    }
  }

  static async getAllApps(): Promise<AppInfo[]> {
    try {
      const asediaInfo = await this.getAppInfo('Asedia');
      const asediaAppsInfo = await this.getAppInfo('AsenaApps');

      return [
        asediaAppsInfo,
        asediaInfo,
        {
          name: 'Asedia Pro',
          description: 'Premium Sürüm',
          icon: `${this.BASE_URL}/Asedia/main/assets/images/pro-icon.png`,
          rating: 5,
          repoUrl: 'https://github.com/SiberizmDev/AsediaPro',
          longDescription: 'Asedia\'nın premium sürümü. Daha fazla özellik ve daha fazla kontrol.',
          version: '1.0.0',
          screenshots: [
            `${this.BASE_URL}/Asedia/main/assets/images/pro-screenshot1.png`,
            `${this.BASE_URL}/Asedia/main/assets/images/pro-screenshot2.png`
          ],
          developer: 'SiberizmDev',
          backgroundColor: '#101013',
          packageName: 'com.asena.pro'
        },
        {
          name: 'Asedia Lite',
          description: 'Hafif Sürüm',
          icon: `${this.BASE_URL}/Asedia/main/assets/images/lite-icon.png`,
          rating: 4.5,
          repoUrl: 'https://github.com/SiberizmDev/AsediaLite',
          longDescription: 'Asedia\'nın hafif sürümü. Daha az kaynak kullanımı.',
          version: '1.0.0',
          screenshots: [
            `${this.BASE_URL}/Asedia/main/assets/images/lite-screenshot1.png`,
            `${this.BASE_URL}/Asedia/main/assets/images/lite-screenshot2.png`
          ],
          developer: 'SiberizmDev',
          backgroundColor: '#101013',
          packageName: 'com.asena.lite'
        }
      ];
    } catch (error) {
      console.error('Error fetching all apps:', error);
      throw error;
    }
  }
} 