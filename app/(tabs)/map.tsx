import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Href, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen, ScreenHeader, SectionHeader, wheelieColors } from '@/components/wheelie-ui';
import { getActivityColor, getActivityLabel, useWheelie } from '@/data/wheelie-store';

export default function RoutesMapScreen() {
  const { workouts } = useWheelie();

  return (
    <Screen>
      <ScreenHeader eyebrow="Маршруты" title="Карта" />

      <View style={styles.mapMock}>
        <View style={styles.gridLineHorizontal} />
        <View style={styles.gridLineVertical} />
        {workouts.slice(0, 4).map((workout, index) => (
          <Pressable
            key={workout.id}
            style={[
              styles.marker,
              {
                backgroundColor: getActivityColor(workout.activity),
                left: `${20 + index * 18}%`,
                top: `${22 + (index % 2) * 34}%`,
              },
            ]}
            onPress={() => router.push(`/training/${workout.id}` as Href)}>
            <MaterialCommunityIcons name="map-marker" size={22} color="#06110b" />
          </Pressable>
        ))}
        <Text style={styles.mapLabel}>Интерактивная mock-карта маршрутов</Text>
      </View>

      <SectionHeader title="Маршруты рядом" />
      <View style={styles.routeList}>
        {workouts.map((workout) => (
          <Pressable
            key={workout.id}
            style={styles.routeCard}
            onPress={() => router.push(`/training/${workout.id}` as Href)}>
            <View style={[styles.routeIcon, { backgroundColor: `${getActivityColor(workout.activity)}1f` }]}>
              <MaterialCommunityIcons name="routes" size={23} color={getActivityColor(workout.activity)} />
            </View>
            <View style={styles.routeCopy}>
              <Text style={styles.routeTitle}>{workout.route}</Text>
              <Text style={styles.routeMeta}>
                {getActivityLabel(workout.activity)} · {workout.distance} · {workout.place}
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={wheelieColors.dim} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mapMock: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    height: 280,
    marginBottom: 28,
    overflow: 'hidden',
  },
  gridLineHorizontal: {
    backgroundColor: '#1f2a35',
    height: 2,
    left: 0,
    position: 'absolute',
    right: 0,
    top: '48%',
  },
  gridLineVertical: {
    backgroundColor: '#1f2a35',
    bottom: 0,
    left: '52%',
    position: 'absolute',
    top: 0,
    width: 2,
  },
  marker: {
    alignItems: 'center',
    borderRadius: 8,
    height: 42,
    justifyContent: 'center',
    position: 'absolute',
    width: 42,
  },
  mapLabel: {
    bottom: 16,
    color: wheelieColors.muted,
    fontSize: 13,
    fontWeight: '800',
    left: 16,
    position: 'absolute',
  },
  routeList: {
    gap: 12,
  },
  routeCard: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 88,
    padding: 14,
  },
  routeIcon: {
    alignItems: 'center',
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  routeCopy: {
    flex: 1,
    gap: 4,
  },
  routeTitle: {
    color: wheelieColors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  routeMeta: {
    color: wheelieColors.muted,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
});
