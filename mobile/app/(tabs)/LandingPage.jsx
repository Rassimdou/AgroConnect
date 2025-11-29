import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
  Easing,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from 'expo-router';
import { transporterLogin } from '../utils/api';
import SignupScreen from '../signupScreen';
import TransporterHome from '../TransporterHome';
import { Colors, Shadows, Spacing, BorderRadius } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const LandingPage = () => {
  const videoRef = useRef(null);
  const overlayY = useRef(new Animated.Value(0)).current;
  const videoScale = useRef(new Animated.Value(1)).current;
  const authOpacity = useRef(new Animated.Value(0)).current;
  const authTranslateY = useRef(new Animated.Value(40)).current;
  const [authVisible, setAuthVisible] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [showTransporterHome, setShowTransporterHome] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: 'none' } });
  }, [navigation]);

  const handleCloseSignup = () => {
    setShowSignup(false);
    setEmail('');
    setPassword('');
  };

  const startIntro = () => {
    Animated.parallel([
      Animated.timing(videoScale, {
        toValue: 1.12,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayY, {
        toValue: -height * 0.52,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAuthVisible(true);
      Animated.parallel([
        Animated.timing(authOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(authTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please enter email and password');
    try {
      setLoadingAuth(true);
      const data = await transporterLogin(email.trim(), password);
      setLoadingAuth(false);

      setAuthVisible(false);
      setEmail('');
      setPassword('');
      setUserData(data);
      setShowTransporterHome(true);

      const name = data?.transporter?.fullname || data?.fullname || email.trim() || 'transporter';
      Alert.alert('Welcome Back! 🌱', `Good to see you, ${name}`);
    } catch (error) {
      setLoadingAuth(false);
      console.error('login error', error);
      const msg = error?.error || error?.message || 'Login failed';
      Alert.alert('Login failed', msg.toString());
    }
  };

  if (showTransporterHome) {
    return <TransporterHome userData={userData} />;
  }

  if (showSignup) {
    return <SignupScreen onBackPress={handleCloseSignup} onSuccess={(data) => {
      setUserData(data);
      setShowSignup(false);
      setShowTransporterHome(true);
    }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.background}>
        <Animated.View style={[styles.videoWrapper, { transform: [{ scale: videoScale }] }]}>
          <Video
            ref={videoRef}
            source={require('../../assets/agri.mp4')}
            style={styles.video}
            resizeMode="cover"
            isLooping
            isMuted
            shouldPlay
            progressUpdateIntervalMillis={500}
          />
          <View style={styles.videoOverlay} />
        </Animated.View>

        <Animated.View style={[styles.overlay, { transform: [{ translateY: overlayY }] }]}>
          <View style={styles.header}>
            <Text style={styles.logo}>🌱 AgroConnect DZ</Text>
          </View>

          <View style={styles.contentWrapper}>
            <View style={styles.content}>
              <Text style={styles.title}>Future of Logistics</Text>
              <Text style={styles.subtitle}>
                Connect directly with producers and streamline your transport business across Algeria.
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={startIntro} style={styles.buttonPrimary}>
                  <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>


              </View>
            </View>
          </View>

          <View style={styles.spacer} />
        </Animated.View>

        {authVisible && !showSignup && (
          <Animated.View
            pointerEvents="box-none"
            style={[
              styles.authContainer,
              {
                opacity: authOpacity,
                transform: [{ translateY: authTranslateY }],
              },
            ]}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ width: '100%', alignItems: 'center' }}
            >
              <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.authCard}>
                  <View style={styles.authHeader}>
                    <Text style={styles.authTitle}>Welcome Back</Text>
                    <Text style={styles.authSubtitle}>Sign in to access your dashboard</Text>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.fieldLabel}>Email Address</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                      placeholder="name@example.com"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.fieldLabel}>Password</Text>
                    <TextInput
                      style={styles.input}
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                      placeholder="••••••••"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loadingAuth}>
                    {loadingAuth ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Sign In</Text>}
                  </TouchableOpacity>

                  <View style={styles.footer}>
                    <TouchableOpacity>
                      <Text style={styles.link}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <View style={styles.signupRow}>
                      <Text style={styles.footerText}>New here? </Text>
                      <TouchableOpacity onPress={() => setShowSignup(true)}>
                        <Text style={[styles.link, { fontWeight: '700' }]}>Create Account</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { flex: 1, width: '100%', height: '100%', position: 'relative' },
  videoWrapper: { ...StyleSheet.absoluteFillObject },
  video: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  videoOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' }, // Darker overlay for better text contrast

  overlay: {
    flex: 1,
    paddingHorizontal: Spacing.l,
    paddingVertical: Spacing.xl,
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  header: { alignItems: 'center', marginTop: Platform.OS === 'ios' ? 0 : 20 },
  logo: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', letterSpacing: 1 },

  contentWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { width: '100%', alignItems: 'center', justifyContent: 'center' },
  title: {
    fontSize: width < 380 ? 36 : 48,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.m,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.l,
    lineHeight: 24,
  },

  buttonContainer: { width: '100%', gap: Spacing.m, paddingHorizontal: Spacing.m },
  buttonPrimary: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: BorderRadius.full,
    width: '100%',
    alignItems: 'center',
    ...Shadows.medium,
  },
  buttonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: BorderRadius.full,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  buttonTextSecondary: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },

  spacer: { height: 0 },

  authContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    paddingHorizontal: Spacing.m,
  },
  authCard: {
    width: Math.min(width - 32, 400),
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'stretch',
    ...Shadows.large,
  },
  authHeader: { marginBottom: Spacing.l, alignItems: 'center' },
  authTitle: { fontSize: 24, fontWeight: '800', color: Colors.light.text, marginBottom: 4 },
  authSubtitle: { fontSize: 14, color: Colors.light.textSecondary },

  inputGroup: { marginBottom: Spacing.m },
  fieldLabel: { color: Colors.light.text, fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: {
    height: 50,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: BorderRadius.m,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    color: Colors.light.text,
  },

  loginButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: BorderRadius.m,
    marginTop: Spacing.s,
    alignItems: 'center',
    ...Shadows.small,
  },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  footer: { marginTop: Spacing.l, alignItems: 'center' },
  link: { color: Colors.light.primary, fontSize: 14 },
  divider: { height: 1, width: '100%', backgroundColor: Colors.light.border, marginVertical: Spacing.m },
  signupRow: { flexDirection: 'row', alignItems: 'center' },
  footerText: { color: Colors.light.textSecondary, fontSize: 14 },
});

export default LandingPage;
