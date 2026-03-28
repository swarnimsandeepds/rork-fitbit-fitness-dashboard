import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeeklyActivity } from '@/types/fitness';
import Colors from '@/constants/colors';

interface WeeklyChartProps {
  data: WeeklyActivity[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const maxSteps = Math.max(...data.map((d) => d.steps));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Activity</Text>
      <View style={styles.chart}>
        {data.map((item, index) => {
          const heightPercent = (item.steps / maxSteps) * 100;
          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${heightPercent}%`,
                      backgroundColor: item.active
                        ? Colors.light.primary
                        : Colors.light.border,
                    },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{item.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.light.text,
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barWrapper: {
    flex: 1,
    width: '70%',
    justifyContent: 'flex-end',
  },
  bar: {
    borderRadius: 6,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: Colors.light.textSecondary,
  },
});
