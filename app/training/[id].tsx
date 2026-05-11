import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  Detail,
  EmptyState,
  IconButton,
  Pill,
  Screen,
  ScreenHeader,
  wheelieColors,
} from '@/components/wheelie-ui';
import { getActivityColor, getActivityLabel, useWheelie } from '@/data/wheelie-store';

export default function TrainingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getWorkoutById, joinWorkout, joinedWorkoutIds, getClubById } = useWheelie();
  const workout = getWorkoutById(id);

  if (!workout) {
    return (
      <Screen>
        <ScreenHeader title="Тренировка" action={<IconButton icon="arrow-left" onPress={() => router.back()} />} />
        <EmptyState title="Тренировка не найдена" text="Вернитесь к списку и выберите другую карточку." />
      </Screen>
    );
  }

  const activityColor = getActivityColor(workout.activity);
  const joined = joinedWorkoutIds.includes(workout.id);
  const club = workout.clubId ? getClubById(workout.clubId) : undefined;

  return (
    <Screen>
      <ScreenHeader
        eyebrow={getActivityLabel(workout.activity)}
        title={workout.title}
        action={<IconButton icon="arrow-left" onPress={() => router.back()} />}
      />

      <View style={styles.hero}>
        <View style={[styles.activityBadge, { backgroundColor: `${activityColor}1f` }]}>
          <MaterialCommunityIcons
            name={workout.activity === 'cycling' ? 'bike' : 'map-marker-path'}
            size={30}
            color={activityColor}
          />
        </View>
        <Text style={styles.description}>{workout.description}</Text>
      </View>

      <View style={styles.metaGrid}>
        <InfoCard title="Когда" value={`${workout.date}, ${workout.time}`} />
        <InfoCard title="Дистанция" value={workout.distance} />
        <InfoCard title="Сложность" value={workout.difficulty} />
        <InfoCard title="Места" value={`${workout.participants}/${workout.maxParticipants}`} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Старт и маршрут</Text>
        <View style={styles.details}>
          <Detail icon="map-marker-outline" text={workout.place} />
          <Detail icon="routes" text={workout.route} />
        </View>
      </View>

      {club ? (
        <Pressable
          style={styles.clubPanel}
          onPress={() => router.push(`/community/${club.id}` as Href)}>
          <View>
            <Text style={styles.panelTitle}>Организатор</Text>
            <Text style={styles.clubName}>{club.name}</Text>
            <Text style={styles.clubText}>{club.tagline}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={wheelieColors.muted} />
        </Pressable>
      ) : null}

      <Pressable
        style={[styles.joinButton, joined ? styles.joinedButton : null]}
        onPress={() => joinWorkout(workout.id)}>
        <Text style={[styles.joinButtonText, joined ? styles.joinedButtonText : null]}>
          {joined ? 'Вы участвуете' : 'Присоединиться'}
        </Text>
      </Pressable>

      <View style={styles.statusRow}>
        <Pill color={activityColor}>{getActivityLabel(workout.activity)}</Pill>
        <Pill>{joined ? 'Место забронировано' : 'Можно присоединиться'}</Pill>
      </View>
    </Screen>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 16,
    marginBottom: 14,
    padding: 18,
  },
  activityBadge: {
    alignItems: 'center',
    borderRadius: 8,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },
  description: {
    color: '#c7d0db',
    fontSize: 16,
    lineHeight: 24,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
  },
  infoCard: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '47%',
    flexGrow: 1,
    minHeight: 84,
    padding: 14,
  },
  infoTitle: {
    color: wheelieColors.dim,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 7,
    textTransform: 'uppercase',
  },
  infoValue: {
    color: wheelieColors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  panel: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
  },
  panelTitle: {
    color: wheelieColors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  details: {
    gap: 10,
  },
  clubPanel: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    padding: 16,
  },
  clubName: {
    color: wheelieColors.text,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  clubText: {
    color: wheelieColors.muted,
    fontSize: 14,
    fontWeight: '600',
    maxWidth: 270,
  },
  joinButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 54,
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
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
});
