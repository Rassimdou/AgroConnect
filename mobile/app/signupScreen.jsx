import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { transporterRegister } from './utils/api';
import { Colors, Shadows, Spacing, BorderRadius } from '../constants/theme';

const { width } = Dimensions.get('window');

const WILAYAS = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira',
  "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", "Sétif", "Saïda",
  "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla",
  "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
  "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane"
];

const SignupScreen = ({ onBackPress, onSuccess }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWilayaPicker, setShowWilayaPicker] = useState(false);

  const handleSignup = async () => {
    if (!fullname || !email || !password || !confirmPassword || !phoneNumber || !vehicleType || !vehiclePlate || !wilaya) {
      return Alert.alert('Error', 'Please fill in all fields');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }
    if (password.length < 6) {
      return Alert.alert('Error', 'Password must be at least 6 characters');
    }

    const payload = {
      fullname: fullname.trim(),
      email: email.trim(),
      password,
      phone_number: phoneNumber.trim(),
      vehicule_type: vehicleType.trim(),
      vehicule_plate: vehiclePlate.trim(),
      location: wilaya,
    };

    try {
      setLoading(true);
      const data = await transporterRegister(payload);
      setLoading(false);

      if (onSuccess) {
        onSuccess(data);
      } else {
        Alert.alert('Success', `Welcome ${data.transporter?.fullname || fullname}!`, [
          { text: 'OK', onPress: onBackPress },
        ]);
      }
    } catch (error) {
      setLoading(false);
      console.error('[signup] error', error);
      const msg = error?.error || error?.message || 'Registration failed';
      Alert.alert('Error', msg.toString());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join AgroConnect as a Transporter</Text>
              </View>
              <TouchableOpacity onPress={onBackPress} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} placeholder="John Doe" value={fullname} onChangeText={setFullname} autoCapitalize="words" />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput style={styles.input} placeholder="john@example.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput style={styles.input} placeholder="+213 5XX XXX XXX" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.flexHalf]}>
                  <Text style={styles.label}>Vehicle Type</Text>
                  <TextInput style={styles.input} placeholder="Truck / Van" value={vehicleType} onChangeText={setVehicleType} />
                </View>
                <View style={[styles.inputGroup, styles.flexHalf]}>
                  <Text style={styles.label}>Plate Number</Text>
                  <TextInput style={styles.input} placeholder="00000-000-00" value={vehiclePlate} onChangeText={setVehiclePlate} />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Location (Wilaya)</Text>
                <TouchableOpacity
                  style={styles.selectInput}
                  onPress={() => setShowWilayaPicker(true)}
                >
                  <Text style={wilaya ? styles.selectText : styles.selectPlaceholder}>
                    {wilaya || 'Select Wilaya...'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="Min 6 characters" secureTextEntry value={password} onChangeText={setPassword} />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput style={styles.input} placeholder="Re-type password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
              </View>

              <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signupButtonText}>Create Account</Text>}
              </TouchableOpacity>

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={onBackPress}>
                  <Text style={styles.link}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={showWilayaPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowWilayaPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Wilaya</Text>
              <TouchableOpacity onPress={() => setShowWilayaPicker(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={WILAYAS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.wilayaItem}
                  onPress={() => {
                    setWilaya(item);
                    setShowWilayaPicker(false);
                  }}
                >
                  <Text style={styles.wilayaText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.m },

  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: BorderRadius.xl,
    padding: Spacing.l,
    ...Shadows.large
  },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.l },
  title: { fontSize: 24, fontWeight: '800', color: Colors.light.text },
  subtitle: { fontSize: 14, color: Colors.light.textSecondary, marginTop: 4 },
  closeButton: { padding: 4 },
  closeText: { fontSize: 24, color: Colors.light.textSecondary },

  form: { gap: Spacing.m },
  inputGroup: { marginBottom: 4 },
  label: { fontSize: 14, fontWeight: '600', color: Colors.light.text, marginBottom: 6 },
  input: {
    height: 48,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: BorderRadius.m,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.background,
    fontSize: 16
  },

  selectInput: {
    height: 48,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: BorderRadius.m,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.background,
    justifyContent: 'center'
  },
  selectText: { fontSize: 16, color: Colors.light.text },
  selectPlaceholder: { fontSize: 16, color: Colors.light.textSecondary },

  row: { flexDirection: 'row', gap: Spacing.m },
  flexHalf: { flex: 1 },

  signupButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: BorderRadius.m,
    alignItems: 'center',
    marginTop: Spacing.s,
    ...Shadows.small
  },
  signupButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.m },
  footerText: { color: Colors.light.textSecondary },
  link: { color: Colors.light.primary, fontWeight: '700' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: BorderRadius.xl, borderTopRightRadius: BorderRadius.xl, maxHeight: '70%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.m, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  modalTitle: { fontSize: 18, fontWeight: '700', color: Colors.light.text },
  modalClose: { fontSize: 24, color: Colors.light.textSecondary },
  wilayaItem: { padding: Spacing.m, borderBottomWidth: 1, borderBottomColor: Colors.light.background },
  wilayaText: { fontSize: 16, color: Colors.light.text },
});

export default SignupScreen;