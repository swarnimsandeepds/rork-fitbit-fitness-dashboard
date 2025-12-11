import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Activity, Heart, Flame, Moon, MapPin } from 'lucide-react-native';
import { Stack } from 'expo-router';
import CircularProgress from '@/components/CircularProgress';
import WeeklyChart from '@/components/WeeklyChart';
import Colors from '@/constants/colors';
import { mockDailyMetrics, mockWeeklyActivity } from '@/mocks/fitnessData';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [metrics] = useState(mockDailyMetrics);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);



  return (
    <>
      <Stack.Screen
        options={{
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.primary}
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <View style={styles.goalsCard}>
          <Text style={styles.sectionTitle}>Today&apos;s Goals</Text>
          <View style={styles.goalsGrid}>
            <CircularProgress
              value={metrics.steps}
              maxValue={metrics.stepsGoal}
              size={110}
              strokeWidth={10}
              color={Colors.light.primary}
              label="Steps"
              unit="steps"
            />
            <CircularProgress
              value={metrics.calories}
              maxValue={metrics.caloriesGoal}
              size={110}
              strokeWidth={10}
              color={Colors.light.secondary}
              label="Calories"
              unit="kcal"
            />
            <CircularProgress
              value={metrics.activeMinutes}
              maxValue={metrics.activeMinutesGoal}
              size={110}
              strokeWidth={10}
              color={Colors.light.accent}
              label="Active"
              unit="min"
            />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { flex: 1 }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
              <Heart size={20} color={Colors.light.error} fill={Colors.light.error} />
            </View>
            <Text style={styles.statValue}>{metrics.heartRate.resting}</Text>
            <Text style={styles.statLabel}>Resting HR</Text>
            <Text style={styles.statSubLabel}>bpm</Text>
          </View>

          <View style={[styles.statCard, { flex: 1 }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#DBEAFE' }]}>
              <MapPin size={20} color="#3B82F6" />
            </View>
            <Text style={styles.statValue}>{metrics.distance}</Text>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statSubLabel}>km</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { flex: 1 }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
              <Flame size={20} color={Colors.light.warning} />
            </View>
            <Text style={styles.statValue}>{metrics.heartRate.peak}</Text>
            <Text style={styles.statLabel}>Peak HR</Text>
            <Text style={styles.statSubLabel}>bpm</Text>
          </View>

          <View style={[styles.statCard, { flex: 1 }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#E0E7FF' }]}>
              <Moon size={20} color="#6366F1" />
            </View>
            <Text style={styles.statValue}>{metrics.sleep.hours.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Sleep</Text>
            <Text style={styles.statSubLabel}>hours</Text>
          </View>
        </View>

        <WeeklyChart data={mockWeeklyActivity} />

        <TouchableOpacity style={styles.syncButton} activeOpacity={0.7}>
          <Activity size={20} color={Colors.light.card} />
          <Text style={styles.syncButtonText}>Sync with Fitbit</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.light.text,
  },
  date: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  goalsCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.light.text,
    marginBottom: 24,
  },
  goalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.light.text,
    marginTop: 4,
  },
  statSubLabel: {
    fontSize: 11,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  syncButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 8,
  },
  syncButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.light.card,
  },
});
