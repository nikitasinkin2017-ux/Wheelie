import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { activityOptions, difficulties } from '@/mock/trainings';
import { getActivityColor, getActivityPluralLabel } from '@/services/trainingService';
import { ActivityType, Difficulty, TrainingFilters as TrainingFiltersValue } from '@/types/training';
import { wheelieColors } from '@/components/wheelie-ui';

export function TrainingFilters({
  filters,
  dates,
  onChange,
  onOpenAdvanced,
}: {
  filters: TrainingFiltersValue;
  dates: string[];
  onChange: (filters: TrainingFiltersValue) => void;
  onOpenAdvanced?: () => void;
}) {
  const setActivity = (activityType?: ActivityType) => onChange({ ...filters, activityType });
  const setDifficulty = (difficulty?: Difficulty) => onChange({ ...filters, difficulty });
  const setDate = (date?: string) => onChange({ ...filters, date });

  return (
    <View style={styles.wrap}>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={20} color={wheelieColors.dim} />
          <TextInput
            value={filters.query ?? ''}
            onChangeText={(query) => onChange({ ...filters, query })}
            placeholder="Поиск по названию, месту или тегу"
            placeholderTextColor="#66717f"
            style={styles.searchInput}
          />
        </View>
        {onOpenAdvanced ? (
          <Pressable style={styles.filterButton} onPress={onOpenAdvanced}>
            <MaterialCommunityIcons name="tune-variant" size={20} color={wheelieColors.text} />
          </Pressable>
        ) : null}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <Chip label="Все" active={!filters.activityType} onPress={() => setActivity(undefined)} />
        {activityOptions.map((activity) => (
          <Chip
            key={activity.id}
            label={getActivityPluralLabel(activity.id)}
            color={getActivityColor(activity.id)}
            active={filters.activityType === activity.id}
            onPress={() => setActivity(filters.activityType === activity.id ? undefined : activity.id)}
          />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <Chip label="Любая сложность" active={!filters.difficulty} onPress={() => setDifficulty(undefined)} />
        {difficulties.map((difficulty) => (
          <Chip
            key={difficulty}
            label={difficulty}
            active={filters.difficulty === difficulty}
            onPress={() => setDifficulty(filters.difficulty === difficulty ? undefined : difficulty)}
          />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <Chip label="Любая дата" active={!filters.date} onPress={() => setDate(undefined)} />
        {dates.map((date) => (
          <Chip
            key={date}
            label={date}
            active={filters.date === date}
            onPress={() => setDate(filters.date === date ? undefined : date)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function Chip({
  label,
  active,
  color = wheelieColors.accent,
  onPress,
}: {
  label: string;
  active?: boolean;
  color?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[
        styles.chip,
        active ? { borderColor: color, backgroundColor: `${color}1a` } : null,
      ]}
      onPress={onPress}>
      <Text style={[styles.chipText, active ? { color } : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
    marginBottom: 22,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 9,
    minHeight: 50,
    paddingHorizontal: 13,
  },
  searchInput: {
    color: wheelieColors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    minWidth: 0,
  },
  filterButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surfaceAlt,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  chips: {
    gap: 8,
    paddingRight: 20,
  },
  chip: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  chipText: {
    color: wheelieColors.muted,
    fontSize: 13,
    fontWeight: '900',
  },
});
