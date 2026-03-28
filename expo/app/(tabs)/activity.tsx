import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { TrendingUp, Award, Target } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { mockWeeklyActivity } from '@/mocks/fitnessData';

export default function ActivityScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Activity',
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          headerShadowVisible: false,
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Activity History</Text>
          <Text style={styles.subtitle}>Track your fitness journey</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
              <TrendingUp size={24} color={Colors.light.success} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Weekly Average</Text>
              <Text style={styles.statValue}>
                {Math.round(
                  mockWeeklyActivity.reduce((acc, day) => acc + day.steps, 0) /
                    mockWeeklyActivity.length
                ).toLocaleString()}{' '}
                steps
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          {mockWeeklyActivity.map((day, index) => (
            <TouchableOpacity key={index} style={styles.activityCard} activeOpacity={0.7}>
              <View style={styles.activityLeft}>
                <View
                  style={[
                    styles.activityDot,
                    {
                      backgroundColor: day.active
                        ? Colors.light.primary
                        : Colors.light.border,
                    },
                  ]}
                />
                <View>
                  <Text style={styles.activityDay}>{day.day}</Text>
                  <Text style={styles.activityDate}>
                    {new Date(
                      Date.now() - (6 - index) * 24 * 60 * 60 * 1000
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              </View>
              <View style={styles.activityRight}>
                <Text style={styles.activitySteps}>{day.steps.toLocaleString()}</Text>
                <Text style={styles.activityLabel}>steps</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.achievementsCard}>
          <View style={styles.achievementHeader}>
            <Award size={24} color={Colors.light.accent} />
            <Text style={styles.achievementTitle}>Recent Achievements</Text>
          </View>
          <View style={styles.achievementItem}>
            <View style={styles.achievementBadge}>
              <Target size={20} color={Colors.light.card} />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementName}>Goal Crusher</Text>
              <Text style={styles.achievementDesc}>Hit your step goal 5 days in a row</Text>
            </View>
          </View>
        </View>
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
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  statsCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.light.text,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.light.text,
  },
  activityCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activityDay: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.light.text,
  },
  activityDate: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activitySteps: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.light.text,
  },
  activityLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  achievementsCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.light.text,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  achievementBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.light.text,
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
});
