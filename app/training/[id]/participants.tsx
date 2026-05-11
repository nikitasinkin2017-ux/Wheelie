import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ParticipantCard } from '@/components/ParticipantCard';
import { EmptyState, IconButton, Screen, ScreenHeader, wheelieColors } from '@/components/wheelie-ui';
import { useTrainings } from '@/hooks/useTrainings';

export default function TrainingParticipantsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTrainingById } = useTrainings();
  const training = getTrainingById(id);

  if (!training) {
    return (
      <Screen>
        <ScreenHeader
          title="Участники"
          action={<IconButton icon="arrow-left" onPress={() => router.back()} />}
        />
        <EmptyState title="Тренировка не найдена" text="Вернитесь назад и откройте участников заново." />
      </Screen>
    );
  }

  const participants = [
    training.organizer,
    ...training.participants.filter((participant) => participant.id !== training.organizer.id),
  ];

  return (
    <Screen>
      <ScreenHeader
        eyebrow={training.title}
        title="Участники"
        action={<IconButton icon="arrow-left" onPress={() => router.back()} />}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>
          {training.currentParticipants}/{training.maxParticipants} мест занято
        </Text>
        <Text style={styles.summaryText}>
          Организатор отмечен отдельно, остальные участники показаны в порядке записи.
        </Text>
      </View>

      <View style={styles.list}>
        {participants.map((participant) => (
          <ParticipantCard
            key={participant.id}
            participant={participant}
            isOrganizer={participant.id === training.organizer.id}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 7,
    marginBottom: 14,
    padding: 16,
  },
  summaryTitle: {
    color: wheelieColors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  summaryText: {
    color: wheelieColors.muted,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  list: {
    gap: 10,
  },
});
