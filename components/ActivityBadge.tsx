import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import { wheelieColors } from '@/components/wheelie-ui';
import {
  getActivityColor,
  getActivityIcon,
  getActivityLabel,
} from '@/services/trainingService';
import { ActivityType } from '@/types/training';

export function ActivityBadge({ activityType }: { activityType: ActivityType }) {
  const color = getActivityColor(activityType);

  return (
    <View style={[styles.badge, { backgroundColor: `${color}1f`, borderColor: `${color}55` }]}>
      <MaterialCommunityIcons name={getActivityIcon(activityType)} size={16} color={color} />
      <Text style={[styles.text, { color }]}>{getActivityLabel(activityType)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  text: {
    color: wheelieColors.text,
    fontSize: 12,
    fontWeight: '900',
  },
});
