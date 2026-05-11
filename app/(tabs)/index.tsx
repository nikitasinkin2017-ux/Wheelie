import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Href, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  ActivityButton,
  IconButton,
  Screen,
  ScreenHeader,
  SectionHeader,
  WorkoutCard,
  wheelieColors,
} from '@/components/wheelie-ui';
import { ActivityType, activityOptions, useWheelie } from '@/data/wheelie-store';

export default function HomeScreen() {
  const { workouts, joinedWorkoutIds } = useWheelie();
  const upcomingWorkouts = workouts.slice(0, 3);

  const openTrainings = (activity?: ActivityType) => {
    router.push(
      activity
        ? ({ pathname: '/trainings', params: { activity } } as Href)
        : ('/trainings' as Href),
    );
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Тренируйтесь вместе"
        title="Wheelie"
        action={<IconButton icon="bell-outline" onPress={() => router.push('/community' as Href)} />}
      />

      <View style={styles.hero}>
        <View style={styles.heroTopline}>
          <View style={styles.liveDot} />
          <Text style={styles.heroMeta}>{workouts.length} тренировок рядом</Text>
        </View>
        <Text style={styles.heroTitle}>Найдите следующую тренировку</Text>
        <Text style={styles.heroText}>
          Велозаезды, бег, прогулки и фитнес-сессии с людьми рядом с вами.
        </Text>
        <View style={styles.heroActions}>
          <Pressable style={styles.primaryButton} onPress={() => openTrainings()}>
            <Text style={styles.primaryButtonText}>Найти тренировку</Text>
            <MaterialCommunityIcons name="arrow-right" size={19} color="#06110b" />
          </Pressable>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push('/training/create' as Href)}>
            <Text style={styles.secondaryButtonText}>Создать тренировку</Text>
          </Pressable>
        </View>
      </View>

      <SectionHeader title="Активности" actionLabel="Все" onActionPress={() => openTrainings()} />
      <View style={styles.activityGrid}>
        {activityOptions.map((item) => (
          <ActivityButton
            key={item.id}
            label={item.label}
            icon={item.icon}
            color={item.color}
            onPress={() => openTrainings(item.id)}
          />
        ))}
      </View>

      <SectionHeader
        title="Ближайшие тренировки"
        actionLabel="Смотреть все"
        onActionPress={() => openTrainings()}
      />
      <View style={styles.cardList}>
        {upcomingWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            joined={joinedWorkoutIds.includes(workout.id)}
            onPress={() => router.push(`/training/${workout.id}` as Href)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 28,
    padding: 22,
  },
  heroTopline: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  liveDot: {
    backgroundColor: wheelieColors.accent,
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  heroMeta: {
    color: wheelieColors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  heroTitle: {
    color: wheelieColors.text,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 35,
    marginBottom: 10,
    maxWidth: 310,
  },
  heroText: {
    color: '#a8b1bd',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
    maxWidth: 340,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.accent,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    minHeight: 46,
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: '#06110b',
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surfaceAlt,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 46,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: wheelieColors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  cardList: {
    gap: 12,
  },
});
