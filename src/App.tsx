import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🚀</Text>
          </View>
          <Text style={styles.appName}>CI/CD Demo</Text>
          <Text style={styles.tagline}>Seamless Deployment Experience</Text>
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome!</Text>
          <Text style={styles.welcomeSubtitle}>
            Experience the power of automated deployments with OTA updates
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✨ OTA Updates Enabled</Text>
          </View>
        </View>

        {/* Features Section */}
        <Text style={styles.sectionTitle}>Features</Text>

        <View style={styles.featuresGrid}>
          <View style={[styles.featureCard, styles.featureCard1]}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureTitle}>Fast Builds</Text>
            <Text style={styles.featureDesc}>Automated CI pipeline</Text>
          </View>

          <View style={[styles.featureCard, styles.featureCard2]}>
            <Text style={styles.featureIcon}>🔄</Text>
            <Text style={styles.featureTitle}>Auto Deploy</Text>
            <Text style={styles.featureDesc}>Continuous delivery</Text>
          </View>

          <View style={[styles.featureCard, styles.featureCard3]}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureTitle}>OTA Updates</Text>
            <Text style={styles.featureDesc}>Instant app updates</Text>
          </View>

          <View style={[styles.featureCard, styles.featureCard4]}>
            <Text style={styles.featureIcon}>🛡️</Text>
            <Text style={styles.featureTitle}>Secure</Text>
            <Text style={styles.featureDesc}>Code signing built-in</Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoText}>
            This app demonstrates CI/CD pipelines with GitHub Actions, Fastlane,
            and Expo EAS for seamless mobile deployments.
          </Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
          <Text style={styles.ctaButtonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Built with ❤️ by Xcorebit</Text>
          <Text style={styles.versionText}>Version 2.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#6366F1',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#059669',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginHorizontal: 24,
    marginTop: 32,
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  featureCard1: {
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
  },
  featureCard2: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  featureCard3: {
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  featureCard4: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: '#64748B',
  },
  infoCard: {
    backgroundColor: '#EEF2FF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#4338CA',
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: '#6366F1',
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});

export default App;
