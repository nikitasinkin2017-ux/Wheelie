import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Href, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ActivityLoader } from '@/components/animations/ActivityLoader';
import { Screen, ScreenHeader, wheelieColors } from '@/components/wheelie-ui';
import { activityOptions } from '@/data/wheelie-store';

export default function StartActivityScreen() {
  return (
    <Screen>
      <ScreenHeader eyebrow="Solo" title="Начать активность" />

      <View style={styles.activityGrid}>
        {activityOptions.map((activity) => (
          <Pressable key={activity.id} style={styles.activityCard}>
            <ActivityLoader type={activity.id} color={activity.color} size={58} />
            <View style={styles.activityCopy}>
              <Text style={styles.activityTitle}>{activity.label}</Text>
              <Text style={styles.activityText}>Запись активности будет доступна здесь.</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.secondaryButton} onPress={() => router.push('/route/build' as Href)}>
        <MaterialCommunityIcons name="routes" size={18} color={wheelieColors.text} />
        <Text style={styles.secondaryText}>Сначала построить маршрут</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  activityCard: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 18,
    borderWidth: 1,
    flexBasis: '48%',
    flexGrow: 1,
    gap: 13,
    minHeight: 154,
    padding: 16,
  },
  activityCopy: {
    gap: 5,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 22,
  },
  activityText: {
    color: wheelieColors.muted,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
  },
  activityTitle: {
    color: wheelieColors.text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: wheelieColors.surfaceAlt,
    borderColor: wheelieColors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    minHeight: 46,
    paddingHorizontal: 15,
  },
  secondaryText: {
    color: wheelieColors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});
