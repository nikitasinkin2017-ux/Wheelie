import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { ComponentProps } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { ActivityBadge } from '@/components/ActivityBadge';
import { ParticipantCard } from '@/components/ParticipantCard';
import {
  Detail,
  EmptyState,
  IconButton,
  Pill,
  Screen,
  ScreenHeader,
  wheelieColors,
} from '@/components/wheelie-ui';
import { useTrainings } from '@/hooks/useTrainings';
import {
  formatActivityParams,
  getActivityColor,
  getActivityLabel,
  getTrainingStatus,
} from '@/services/trainingService';

export default function TrainingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTrainingById, joinTraining, cancelTraining } = useTrainings();
  const training = getTrainingById(id);

  if (!training) {
    return (
      <Screen>
        <ScreenHeader
          title="Тренировка"
          action={<IconButton icon="arrow-left" onPress={() => router.back()} />}
        />
        <EmptyState title="Тренировка не найдена" text="Вернитесь к списку и выберите другую карточку." />
      </Screen>
    );
  }

  const activityColor = getActivityColor(training.activityType);
  const status = getTrainingStatus(training);
  const isFull = training.currentParticipants >= training.maxParticipants;
  const actionDisabled = !training.isJoined && isFull;

  const handleJoin = () => {
    if (training.isJoined) {
      cancelTraining(training.id);
      return;
    }

    if (isFull) {
      Alert.alert('Тренировка заполнена');
      return;
    }

    joinTraining(training.id);
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow={getActivityLabel(training.activityType)}
        title={training.title}
        action={<IconButton icon="arrow-left" onPress={() => router.back()} />}
      />

      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <ActivityBadge activityType={training.activityType} />
          <Pill color={training.isJoined ? wheelieColors.accent : activityColor}>{status}</Pill>
        </View>
        <Text style={styles.description}>{training.description}</Text>
        <View style={styles.tagRow}>
          {training.tags.map((tag) => (
            <Text key={tag} style={styles.tag}>
              #{tag}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.metaGrid}>
        <InfoCard title="Когда" value={`${training.date}, ${training.time}`} />
        <InfoCard title="Дистанция" value={training.distance} />
        <InfoCard title="Сложность" value={training.difficulty} />
        <InfoCard title="Участники" value={`${training.currentParticipants}/${training.maxParticipants}`} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Старт и маршрут</Text>
        <View style={styles.details}>
          <Detail icon="map-marker-outline" text={training.startPlace} />
          <Detail icon="map-outline" text={training.district} />
          <Detail icon="texture-box" text={training.surface} />
          <Detail icon="routes" text={training.route} />
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Параметры активности</Text>
        <View style={styles.paramGrid}>
          {formatActivityParams(training).map(([label, value]) => (
            <InfoCard key={label} title={label} value={String(value)} compact />
          ))}
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitleInline}>Участники</Text>
          <Pressable onPress={() => router.push(`/training/${training.id}/participants` as Href)}>
            <Text style={styles.linkText}>Все</Text>
          </Pressable>
        </View>
        <ParticipantCard participant={training.organizer} isOrganizer />
        {training.participants
          .filter((participant) => participant.id !== training.organizer.id)
          .slice(0, 3)
          .map((participant) => (
            <ParticipantCard key={participant.id} participant={participant} />
          ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          disabled={actionDisabled}
          style={[
            styles.primaryButton,
            training.isJoined ? styles.secondaryButton : null,
            actionDisabled ? styles.disabledButton : null,
          ]}
          onPress={handleJoin}>
          <Text
            style={[
              styles.primaryButtonText,
              training.isJoined ? styles.secondaryButtonText : null,
            ]}>
            {training.isJoined ? 'Отменить участие' : isFull ? 'Нет мест' : 'Присоединиться'}
          </Text>
        </Pressable>

        <View style={styles.actionRow}>
          <SmallAction
            icon="chat-outline"
            label="Открыть чат"
            onPress={() => Alert.alert('Чат тренировки появится после подключения backend')}
          />
          <SmallAction
            icon="map-search-outline"
            label="Показать на карте"
            onPress={() => router.push('/map' as Href)}
          />
          <SmallAction
            icon="account-group-outline"
            label="Участники"
            onPress={() => router.push(`/training/${training.id}/participants` as Href)}
          />
        </View>
      </View>
    </Screen>
  );
}

function InfoCard({ title, value, compact }: { title: string; value: string; compact?: boolean }) {
  return (
    <View style={[styles.infoCard, compact ? styles.infoCardCompact : null]}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function SmallAction({
  icon,
  label,
  onPress,
}: {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.smallAction} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={20} color={wheelieColors.text} />
      <Text style={styles.smallActionText}>{label}</Text>
    </Pressable>
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
  heroTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    color: '#c7d0db',
    fontSize: 16,
    lineHeight: 24,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    color: wheelieColors.muted,
    fontSize: 13,
    fontWeight: '800',
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
  infoCardCompact: {
    minHeight: 74,
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
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
  },
  panel: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    marginBottom: 14,
    padding: 16,
  },
  panelHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  panelTitle: {
    color: wheelieColors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  panelTitleInline: {
    color: wheelieColors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  linkText: {
    color: wheelieColors.accent,
    fontSize: 14,
    fontWeight: '900',
  },
  details: {
    gap: 10,
  },
  paramGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 54,
  },
  secondaryButton: {
    backgroundColor: wheelieColors.surfaceAlt,
    borderColor: wheelieColors.accent,
    borderWidth: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: '#06110b',
    fontSize: 17,
    fontWeight: '900',
  },
  secondaryButtonText: {
    color: wheelieColors.accent,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  smallAction: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surfaceAlt,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '31%',
    flexGrow: 1,
    gap: 7,
    justifyContent: 'center',
    minHeight: 74,
    padding: 10,
  },
  smallActionText: {
    color: wheelieColors.text,
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },
});
