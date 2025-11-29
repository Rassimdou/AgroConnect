import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  SafeAreaView,
  TextInput,
  StatusBar,
  Linking,
  Platform,
} from "react-native";

import { authFetch } from "./utils/api";
import { registerForPushNotificationsAsync, scheduleNotification } from "./utils/NotificationService";
import { Colors, Shadows, Spacing, BorderRadius } from "../constants/theme";
import MyDeliveries from "./MyDeliveries";

// --- Components ---

const StatusChip = ({ label, color }) => (
  <View style={[styles.chip, { backgroundColor: color + '20', borderColor: color + '50' }]}>
    <Text style={[styles.chipText, { color: color }]}>{label}</Text>
  </View>
);

const OrderCard = ({ item, onClaim, claiming }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.headerTop}>
        <StatusChip label="Ready for Pickup" color={Colors.light.primary} />
        <Text style={styles.price}>{item.price ? `${item.price} DA` : "Fixed Rate"}</Text>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.timeline}>
          <View style={[styles.dot, { backgroundColor: Colors.light.primary }]} />
          <View style={styles.line} />
          <View style={[styles.dot, { backgroundColor: Colors.light.secondary }]} />
        </View>

        <View style={styles.routeTextContainer}>
          <View style={styles.routeItem}>
            <Text style={styles.routeLabel}>PICKUP</Text>
            <Text style={styles.locationText}>{item.pickup_location}</Text>
          </View>
          <View style={[styles.routeItem, { marginTop: 16 }]}>
            <Text style={styles.routeLabel}>DROPOFF</Text>
            <Text style={styles.locationText}>{item.dropoff_location}</Text>
          </View>
        </View>
      </View>
    </View>

    <View style={styles.divider} />

    {/* ✅ CARD BODY RE-INTRODUCED: Weight and Content details */}
    <View style={styles.cardBody}>
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Weight</Text>
          <Text style={styles.metaValue}>{item.weight ? `${item.weight} kg` : "—"}</Text>
        </View>

        {/* 🔥 FIX APPLIED HERE: Using flex: 1 to ensure Content container takes remaining space */}
        <View style={[styles.metaItem, { flex: 1 }]}>
          <Text style={styles.metaLabel}>Content</Text>
          <Text style={styles.metaValue} numberOfLines={1}>
            {item.description || "General Goods"}
          </Text>
        </View>
      </View>
    </View>

    {/* ✅ CARD FOOTER RE-ORGANIZED: For the three buttons */}
    <View style={styles.cardFooter}>
      <TouchableOpacity
        style={styles.detailBtn}
        onPress={() => Alert.alert("Description", item.description || "No specific instructions.")}
      >
        <Text style={styles.detailTxt}>Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.callBtn}
        onPress={() => {
          if (!item.producer_phone) {
            Alert.alert('No Phone', 'Producer phone number not available.');
            return;
          }
          Linking.openURL(`tel:${item.producer_phone}`);
        }}
      >
        <Text style={styles.callBtnText}>📞</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.claimBtn, claiming && styles.disabledBtn]}
        onPress={() => onClaim(item.id)}
        disabled={claiming}
      >
        {claiming ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.claimText}>Accept Order</Text>
        )}
      </TouchableOpacity>
    </View>
  </View>
);

const BottomNav = ({ activeTab, onTabChange }) => (
  <View style={styles.bottomNav}>
    <TouchableOpacity
      style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
      onPress={() => onTabChange('home')}
    >
      <Text style={[styles.navIcon, activeTab === 'home' && styles.navIconActive]}>⌕</Text>
      <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Find Loads</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.navItem, activeTab === 'deliveries' && styles.navItemActive]}
      onPress={() => onTabChange('deliveries')}
    >
      <Text style={[styles.navIcon, activeTab === 'deliveries' && styles.navIconActive]}>▣</Text>
      <Text style={[styles.navLabel, activeTab === 'deliveries' && styles.navLabelActive]}>My Deliveries</Text>
    </TouchableOpacity>
  </View>
);

const TransporterHome = ({ userData }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState(null);
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [knownOrderIds, setKnownOrderIds] = useState(new Set());
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchOrders = async () => {
    if (!refreshing) setLoading(true);
    try {
      const res = await authFetch("/api/orders/availables");
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Failed to parse error response' }));
        throw errorData;
      }
      const data = await res.json();

      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);

        const currentIds = new Set(data.orders.map(o => o.id));
        if (!isFirstLoad) {
          const newOrders = data.orders.filter(o => !knownOrderIds.has(o.id));
          if (newOrders.length > 0) {
            const userLocation = userData?.transporter?.location || userData?.location;
            if (userLocation) {
              const relevantOrders = newOrders.filter(o =>
                (o.pickup_location || "").toLowerCase().includes(userLocation.toLowerCase())
              );
              if (relevantOrders.length > 0) {
                const first = relevantOrders[0];
                const title = "New Order Available";
                const body = relevantOrders.length === 1
                  ? `New pickup in ${first.pickup_location}`
                  : `${relevantOrders.length} new orders available in your area`;
                scheduleNotification(title, body, { orderId: first.id });
              }
            }
          }
        }
        setKnownOrderIds(currentIds);
        if (isFirstLoad) setIsFirstLoad(false);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("fetch orders error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const claimOrder = async (orderId) => {
    setClaimingId(orderId);
    try {
      const res = await authFetch(`/api/orders/${orderId}/assign`, { method: "POST" });
      if (!res.ok) throw await res.json();
      const data = await res.json();
      Alert.alert("Success", "Order claimed successfully");
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      Alert.alert("Error", err?.error || "Could not claim order");
    } finally {
      setClaimingId(null);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
  };

  const filtered = orders.filter(o => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (o.pickup_location || "").toLowerCase().includes(q)
      || (o.dropoff_location || "").toLowerCase().includes(q);
  });

  const renderHome = () => (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.light.primaryDark} />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back</Text>
          <Text style={styles.subtitle}>Find your next load</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationIcon}>●</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            placeholder="Search by location..."
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholderTextColor={Colors.light.textSecondary}
          />
        </View>
      </View>

      {loading && !refreshing ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <OrderCard item={item} onClaim={claimOrder} claiming={claimingId === item.id} />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <Text style={styles.emptyIconText}>▣</Text>
              </View>
              <Text style={styles.emptyTxt}>No active orders found</Text>
              <TouchableOpacity onPress={fetchOrders} style={styles.retryBtn}>
                <Text style={styles.retryTxt}>Refresh</Text>
              </TouchableOpacity>
            </View>
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {activeTab === 'home' ? renderHome() : <MyDeliveries />}
      </View>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
};

// --- Stylesheet ---

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.l,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { color: "#fff", fontSize: 22, fontWeight: "700" },
  subtitle: { color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 4 },
  iconBtn: { backgroundColor: "rgba(255,255,255,0.2)", padding: 10, borderRadius: BorderRadius.full },
  notificationBadge: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  notificationIcon: { color: '#fff', fontSize: 18, fontWeight: '700' },

  searchContainer: { paddingHorizontal: Spacing.l, marginTop: -24, marginBottom: Spacing.m },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: BorderRadius.l,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.m,
    height: 50,
    ...Shadows.medium,
  },
  searchIcon: { marginRight: Spacing.s, fontSize: 20, color: Colors.light.textSecondary },
  searchInput: { flex: 1, fontSize: 16, color: Colors.light.text },

  listContent: { paddingHorizontal: Spacing.l, paddingBottom: 20 },

  card: {
    backgroundColor: "#fff",
    borderRadius: BorderRadius.l,
    padding: Spacing.m,
    marginBottom: Spacing.m,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Shadows.small,
  },
  cardHeader: { marginBottom: Spacing.m },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Spacing.m },
  price: { fontSize: 18, fontWeight: "700", color: Colors.light.primary },

  chip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.full, borderWidth: 1 },
  chipText: { fontSize: 12, fontWeight: "600" },

  routeContainer: { flexDirection: "row" },
  timeline: { alignItems: "center", marginRight: Spacing.m, marginTop: 4 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  line: { width: 2, flex: 1, backgroundColor: Colors.light.border, marginVertical: 4 },

  routeTextContainer: { flex: 1 },
  routeItem: {},
  routeLabel: { fontSize: 11, color: Colors.light.textSecondary, fontWeight: "700", letterSpacing: 0.5, marginBottom: 2 },
  locationText: { fontSize: 16, fontWeight: "600", color: Colors.light.text },

  divider: { height: 1, backgroundColor: Colors.light.border, marginVertical: Spacing.s },

  cardBody: { marginBottom: Spacing.m },
  metaRow: { flexDirection: "row", gap: Spacing.l },
  metaItem: {}, // The Content metaItem overrides this with { flex: 1 } for the fix
  metaLabel: { fontSize: 12, color: Colors.light.textSecondary, marginBottom: 2, fontWeight: '600' },
  metaValue: { fontSize: 14, fontWeight: "500", color: Colors.light.text },

  cardFooter: { flexDirection: "row", gap: Spacing.m }, // Holds the three buttons
  detailBtn: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingVertical: 12,
    borderRadius: BorderRadius.m,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border
  },
  detailTxt: { color: Colors.light.text, fontWeight: "600" },
  callBtn: {
    backgroundColor: Colors.light.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: BorderRadius.m,
    alignItems: "center",
    justifyContent: "center",
  },
  callBtnText: { color: "#fff", fontSize: 18 },
  claimBtn: {
    flex: 2,
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    borderRadius: BorderRadius.m,
    alignItems: "center",
    ...Shadows.small
  },
  disabledBtn: { backgroundColor: Colors.light.secondary },
  claimText: { color: "#fff", fontWeight: "700" },

  empty: { alignItems: "center", marginTop: 40 },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.m,
    borderWidth: 2,
    borderColor: Colors.light.border,
  },
  emptyIconText: { fontSize: 36, color: Colors.light.textSecondary },
  emptyTxt: { color: Colors.light.textSecondary, fontSize: 16, marginBottom: Spacing.m },
  retryBtn: { paddingVertical: 8, paddingHorizontal: 16 },
  retryTxt: { color: Colors.light.primary, fontWeight: "600" },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    height: Platform.OS === 'ios' ? 80 : 60,
    ...Shadows.medium,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemActive: {
    borderTopWidth: 2,
    borderTopColor: Colors.light.primary,
  },
  navIcon: { fontSize: 22, marginBottom: 4, color: Colors.light.textSecondary },
  navIconActive: { color: Colors.light.primary },
  navLabel: { fontSize: 10, color: Colors.light.textSecondary, fontWeight: '600' },
  navLabelActive: { color: Colors.light.primary },
});

export default TransporterHome;