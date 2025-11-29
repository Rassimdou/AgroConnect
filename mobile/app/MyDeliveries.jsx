import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Alert,
    TouchableOpacity,
    StatusBar,
    Platform,
    Linking,
} from "react-native";
import { authFetch } from "./utils/api";
import { Colors, Shadows, Spacing, BorderRadius } from "../constants/theme";

const StatusChip = ({ label, color }) => (
    <View style={[styles.chip, { backgroundColor: color + '20', borderColor: color + '50' }]}>
        <Text style={[styles.chipText, { color: color }]}>{label}</Text>
    </View>
);
const openMap = (pickup, dropoff) => {
    const query = dropoff || pickup;
    const url = Platform.select({
        ios: `maps:0,0?q=${query}`,
        android: `geo:0,0?q=${query}`,
    });
    Linking.openURL(url);
};

const DeliveryCard = ({ item }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View style={styles.headerTop}>
                <StatusChip
                    label={item.order_status === 'processing' ? 'In Transit' : item.order_status}
                    color={Colors.light.warning}
                />
                <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
            </View >

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
        </View >

        <View style={styles.divider} />

        <View style={styles.cardBody}>
            <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Weight</Text>
                    <Text style={styles.metaValue}>{item.weight ? `${item.weight} kg` : "—"}</Text>
                </View>
                <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Content</Text>
                    <Text style={styles.metaValue} numberOfLines={2} ellipsizeMode="tail">
                        {item.description || "General Goods"}
                    </Text>
                </View>
            </View>
        </View>

        <View style={styles.cardFooter}>
            <TouchableOpacity
                style={styles.mapBtn}
                onPress={() => openMap(item.pickup_location, item.dropoff_location)}
            >
                <Text style={styles.mapBtnText}>Open in Maps</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.callBtn}
                onPress={() => {
                    if (!item.user_phone) {
                        Alert.alert('No Phone', 'Buyer phone number not available.');
                        return;
                    }
                    Linking.openURL(`tel:${item.user_phone}`);
                }}
            >
                <Text style={styles.callBtnText}>📞</Text>
            </TouchableOpacity>
        </View>
    </View >
);

const MyDeliveries = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchMyOrders = async () => {
        if (!refreshing) setLoading(true);
        try {
            const res = await authFetch("/api/orders/my-deliveries");
            if (!res.ok) throw await res.json();
            const data = await res.json();

            if (data.success && Array.isArray(data.orders)) {
                setOrders(data.orders);
            } else {
                setOrders([]);
            }
        } catch (err) {
            console.error("fetch my orders error:", err);
            Alert.alert("Error", "Could not load your deliveries.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchMyOrders();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.light.primaryDark} />

            <View style={styles.header}>
                <Text style={styles.title}>My Deliveries</Text>
                <Text style={styles.subtitle}>Track your active jobs</Text>
            </View>

            {loading && !refreshing ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={Colors.light.primary} />
                </View>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(i) => String(i.id)}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => <DeliveryCard item={item} />}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <View style={styles.emptyIcon}>
                                <Text style={styles.emptyIconText}>▣</Text>
                            </View>
                            <Text style={styles.emptyTxt}>No deliveries yet</Text>
                            <TouchableOpacity onPress={fetchMyOrders} style={styles.retryBtn}>
                                <Text style={styles.retryTxt}>Refresh</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.background },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },

    header: {
        backgroundColor: Colors.light.primary,
        paddingHorizontal: Spacing.l,
        paddingTop: Platform.OS === 'android' ? 40 : 20,
        paddingBottom: Spacing.l,
        marginBottom: Spacing.m,
    },
    title: { color: "#fff", fontSize: 24, fontWeight: "700" },
    subtitle: { color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 4 },

    listContent: { paddingHorizontal: Spacing.l, paddingBottom: 100 },

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
    date: { fontSize: 12, color: Colors.light.textSecondary },

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

    cardBody: {},
    metaRow: { flexDirection: "row", gap: Spacing.l },
    metaItem: { flex: 1 },
    metaLabel: { fontSize: 12, color: Colors.light.textSecondary, marginBottom: 2, fontWeight: '600' },
    metaValue: { fontSize: 14, fontWeight: "500", color: Colors.light.text },

    cardFooter: { marginTop: Spacing.s, flexDirection: "row", gap: Spacing.s },
    mapBtn: {
        flex: 1,
        backgroundColor: Colors.light.background,
        paddingVertical: 12,
        borderRadius: BorderRadius.m,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.light.border
    },
    mapBtnText: { color: Colors.light.text, fontWeight: "600", textAlign: "center" },
    callBtn: {
        backgroundColor: Colors.light.secondary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: BorderRadius.m,
        alignItems: "center",
        justifyContent: "center",
    },
    callBtnText: { color: "#fff", fontSize: 18 },

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
    callBtn: {
        backgroundColor: Colors.light.secondary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: BorderRadius.m,
        alignItems: "center",
        justifyContent: "center",
    },
    callBtnText: { color: "#fff", fontSize: 18 },
    emptyTxt: { color: Colors.light.textSecondary, fontSize: 16, marginBottom: Spacing.m },
    retryBtn: { paddingVertical: 8, paddingHorizontal: 16 },
    retryTxt: { color: Colors.light.primary, fontWeight: "600" },
});

export default MyDeliveries;
