import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ActivityBadge } from '@/components/ActivityBadge';
import { wheelieColors } from '@/components/wheelie-ui';
import { getActivityColor, getTrainingStatus } from '@/services/trainingService';
import { Training } from '@/types/training';

export function TrainingCard({
  training,
  onPress,
}: {
  training: Training;
  onPress: () => void;
}) {
  const color = getActivityColor(training.activityType);
  const status = getTrainingStatus(training);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.accent, { backgroundColor: color }]} />
      <View style={styles.body}>
        <View style={styles.topRow}>
          <ActivityBadge activityType={training.activityType} />
          <View
            style={[
              styles.status,
              status === 'Вы участвуете' ? { borderColor: wheelieColors.accent } : null,
            ]}>
            <Text
              style={[
                styles.statusText,
                status === 'Вы участвуете' ? { color: wheelieColors.accent } : null,
              ]}>
              {status}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{training.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {training.description}
        </Text>

        <View style={styles.metaGrid}>
          <Meta icon="calendar-clock" text={`${training.date}, ${training.time}`} />
          <Meta icon="map-marker-outline" text={training.startPlace} />
          <Meta icon="map-marker-distance" text={training.distance} />
          <Meta icon="signal-cellular-2" text={training.difficulty} />
          <Meta
            icon="account-group-outline"
            text={`${training.currentParticipants}/${training.maxParticipants}`}
          />
          <Meta icon="account-outline" text={training.organizer.name} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.district}>{training.district}</Text>
          <View style={styles.moreButton}>
            <Text style={styles.moreText}>Подробнее</Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color="#06110b" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function Meta({
  icon,
  text,
}: {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  text: string;
}) {
  return (
    <View style={styles.meta}>
      <MaterialCommunityIcons name={icon} size={16} color={wheelieColors.dim} />
      <Text style={styles.metaText} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  accent: {
    width: 5,
  },
  body: {
    flex: 1,
    gap: 12,
    padding: 16,
  },
  topRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  status: {
    backgroundColor: '#19202a',
    borderColor: '#2a3442',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  statusText: {
    color: wheelieColors.text,
    fontSize: 11,
    fontWeight: '900',
  },
  title: {
    color: wheelieColors.text,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 25,
  },
  description: {
    color: '#aeb8c4',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  meta: {
    alignItems: 'center',
    backgroundColor: '#151c25',
    borderRadius: 8,
    flexBasis: '47%',
    flexDirection: 'row',
    flexGrow: 1,
    gap: 7,
    minHeight: 34,
    paddingHorizontal: 9,
  },
  metaText: {
    color: '#a8b1bd',
    flex: 1,
    fontSize: 12,
    fontWeight: '800',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  district: {
    color: wheelieColors.dim,
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
  },
  moreButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.accent,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 2,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  moreText: {
    color: '#06110b',
    fontSize: 12,
    fontWeight: '900',
  },
});
