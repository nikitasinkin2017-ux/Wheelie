import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ComponentProps, ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Workout,
  getActivityColor,
  getActivityLabel,
} from '@/data/wheelie-store';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export const wheelieColors = {
  background: '#070a0f',
  surface: '#10151c',
  surfaceAlt: '#151c25',
  border: '#25303b',
  borderSoft: '#202934',
  text: '#f5f7fb',
  muted: '#9aa5b1',
  dim: '#687381',
  accent: '#78ff8e',
};

export function Screen({
  children,
  contentStyle,
}: {
  children: ReactNode;
  contentStyle?: ViewStyle;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 104 },
          contentStyle,
        ]}>
        {children}
      </ScrollView>
    </View>
  );
}

export function ScreenHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {action}
    </View>
  );
}

export function SectionHeader({
  title,
  actionLabel,
  onActionPress,
}: {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onActionPress} hitSlop={8}>
          <Text style={styles.sectionAction}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function IconButton({
  icon,
  onPress,
  color = wheelieColors.text,
}: {
  icon: IconName;
  onPress: () => void;
  color?: string;
}) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={22} color={color} />
    </Pressable>
  );
}

export function Pill({
  children,
  color = wheelieColors.text,
  style,
}: {
  children: ReactNode;
  color?: string;
  style?: TextStyle;
}) {
  return (
    <View style={styles.pill}>
      <Text style={[styles.pillText, { color }, style]}>{children}</Text>
    </View>
  );
}

export function ActivityButton({
  label,
  icon,
  color,
  active,
  onPress,
}: {
  label: string;
  icon: IconName | string;
  color: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[
        styles.activityButton,
        active ? { borderColor: color, backgroundColor: `${color}16` } : null,
      ]}
      onPress={onPress}>
      <View style={[styles.activityIcon, { backgroundColor: `${color}1f` }]}>
        <MaterialCommunityIcons name={icon as IconName} size={25} color={color} />
      </View>
      <Text style={styles.activityLabel}>{label}</Text>
    </Pressable>
  );
}

export function WorkoutCard({
  workout,
  joined,
  onPress,
}: {
  workout: Workout;
  joined?: boolean;
  onPress: () => void;
}) {
  const color = getActivityColor(workout.activity);

  return (
    <Pressable style={styles.workoutCard} onPress={onPress}>
      <View style={[styles.cardAccent, { backgroundColor: color }]} />
      <View style={styles.workoutCardMain}>
        <View style={styles.cardTitleRow}>
          <View style={styles.cardTitleBlock}>
            <Text style={styles.cardType}>{getActivityLabel(workout.activity)}</Text>
            <Text style={styles.cardTitle}>{workout.title}</Text>
          </View>
          <Pill color={joined ? wheelieColors.accent : wheelieColors.text}>
            {joined ? 'Вы участвуете' : workout.difficulty}
          </Pill>
        </View>

        <View style={styles.details}>
          <Detail icon="map-marker-outline" text={workout.place} />
          <Detail icon="calendar-clock" text={`${workout.date}, ${workout.time}`} />
          <Detail
            icon="account-group-outline"
            text={`${workout.participants}/${workout.maxParticipants} участников`}
          />
        </View>
      </View>
    </Pressable>
  );
}

export function Detail({ icon, text }: { icon: IconName; text: string }) {
  return (
    <View style={styles.detail}>
      <MaterialCommunityIcons name={icon} size={17} color={wheelieColors.dim} />
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: wheelieColors.background,
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  headerText: {
    flex: 1,
  },
  eyebrow: {
    color: wheelieColors.accent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  title: {
    color: wheelieColors.text,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surfaceAlt,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: wheelieColors.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
  },
  sectionAction: {
    color: wheelieColors.accent,
    fontSize: 14,
    fontWeight: '800',
  },
  pill: {
    backgroundColor: '#19202a',
    borderColor: '#2a3442',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  activityButton: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '47%',
    flexGrow: 1,
    gap: 14,
    minHeight: 118,
    padding: 16,
  },
  activityIcon: {
    alignItems: 'center',
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  activityLabel: {
    color: wheelieColors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  workoutCard: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 156,
    overflow: 'hidden',
  },
  cardAccent: {
    width: 5,
  },
  workoutCardMain: {
    flex: 1,
    padding: 16,
  },
  cardTitleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardTitleBlock: {
    flex: 1,
  },
  cardType: {
    color: wheelieColors.dim,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: wheelieColors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  details: {
    gap: 9,
  },
  detail: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  detailText: {
    color: '#a8b1bd',
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  empty: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  emptyTitle: {
    color: wheelieColors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
  },
  emptyText: {
    color: wheelieColors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
});
