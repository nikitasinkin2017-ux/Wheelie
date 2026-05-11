import { Href, router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  EmptyState,
  IconButton,
  Screen,
  ScreenHeader,
  WorkoutCard,
  wheelieColors,
} from '@/components/wheelie-ui';
import { getActivityColor, getActivityLabel, useWheelie } from '@/data/wheelie-store';

export default function CommunityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getClubById, workouts, joinClub, joinedClubIds, joinedWorkoutIds } = useWheelie();
  const club = getClubById(id);

  if (!club) {
    return (
      <Screen>
        <ScreenHeader title="Клуб" action={<IconButton icon="arrow-left" onPress={() => router.back()} />} />
        <EmptyState title="Клуб не найден" text="Вернитесь в сообщество и выберите другую карточку." />
      </Screen>
    );
  }

  const color = getActivityColor(club.activity);
  const clubWorkouts = workouts.filter((workout) => workout.clubId === club.id);
  const joined = joinedClubIds.includes(club.id);

  return (
    <Screen>
      <ScreenHeader
        eyebrow={getActivityLabel(club.activity)}
        title={club.name}
        action={<IconButton icon="arrow-left" onPress={() => router.back()} />}
      />

      <View style={styles.hero}>
        <View style={[styles.avatar, { borderColor: color, backgroundColor: `${color}1f` }]}>
          <Text style={styles.avatarText}>{club.name[0]}</Text>
        </View>
        <Text style={styles.tagline}>{club.tagline}</Text>
        <Text style={styles.description}>{club.description}</Text>
        <View style={styles.stats}>
          <Stat label="Город" value={club.city} />
          <Stat label="Участники" value={String(club.members)} />
          <Stat label="Активность" value={getActivityLabel(club.activity)} />
        </View>
      </View>

      <Pressable
        style={[styles.joinButton, joined ? styles.joinedButton : null]}
        onPress={() => joinClub(club.id)}>
        <Text style={[styles.joinButtonText, joined ? styles.joinedButtonText : null]}>
          {joined ? 'Вы в клубе' : 'Вступить в клуб'}
        </Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Тренировки клуба</Text>
      <View style={styles.workoutList}>
        {clubWorkouts.map((workout) => (
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 14,
    marginBottom: 14,
    padding: 18,
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    height: 58,
    justifyContent: 'center',
    width: 58,
  },
  avatarText: {
    color: wheelieColors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  tagline: {
    color: wheelieColors.text,
    fontSize: 21,
    fontWeight: '900',
  },
  description: {
    color: '#c6ced8',
    fontSize: 15,
    lineHeight: 23,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  stat: {
    backgroundColor: wheelieColors.surfaceAlt,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexGrow: 1,
    padding: 12,
  },
  statValue: {
    color: wheelieColors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 3,
  },
  statLabel: {
    color: wheelieColors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  joinButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 54,
    marginBottom: 24,
  },
  joinedButton: {
    backgroundColor: wheelieColors.surfaceAlt,
    borderColor: wheelieColors.accent,
    borderWidth: 1,
  },
  joinButtonText: {
    color: '#06110b',
    fontSize: 17,
    fontWeight: '900',
  },
  joinedButtonText: {
    color: wheelieColors.accent,
  },
  sectionTitle: {
    color: wheelieColors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 14,
  },
  workoutList: {
    gap: 12,
  },
});
