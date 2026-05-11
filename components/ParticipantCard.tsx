import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import { wheelieColors } from '@/components/wheelie-ui';
import {
  getActivityColor,
  getActivityIcon,
  getActivityLabel,
} from '@/services/trainingService';
import { Participant } from '@/types/training';

export function ParticipantCard({
  participant,
  isOrganizer,
}: {
  participant: Participant;
  isOrganizer?: boolean;
}) {
  const color = getActivityColor(participant.favoriteActivity);

  return (
    <View style={styles.card}>
      <View style={[styles.avatar, { backgroundColor: participant.avatarColor }]}>
        <Text style={styles.avatarText}>{participant.name.slice(0, 1)}</Text>
      </View>
      <View style={styles.copy}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{participant.name}</Text>
          <Text style={[styles.role, isOrganizer ? styles.organizerRole : null]}>
            {isOrganizer ? 'организатор' : 'участник'}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.level}>{participant.level}</Text>
          <View style={styles.activity}>
            <MaterialCommunityIcons
              name={getActivityIcon(participant.favoriteActivity)}
              size={15}
              color={color}
            />
            <Text style={[styles.activityText, { color }]}>
              {getActivityLabel(participant.favoriteActivity)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 78,
    padding: 13,
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  avatarText: {
    color: '#06110b',
    fontSize: 20,
    fontWeight: '900',
  },
  copy: {
    flex: 1,
    gap: 7,
  },
  nameRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  name: {
    color: wheelieColors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '900',
  },
  role: {
    color: wheelieColors.muted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  organizerRole: {
    color: wheelieColors.accent,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  level: {
    color: wheelieColors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  activity: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  activityText: {
    fontSize: 13,
    fontWeight: '900',
  },
});
