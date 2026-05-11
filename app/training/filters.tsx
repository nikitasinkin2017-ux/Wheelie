import { Href, router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TrainingFilters } from '@/components/TrainingFilters';
import { IconButton, Screen, ScreenHeader, wheelieColors } from '@/components/wheelie-ui';
import { useTrainings } from '@/hooks/useTrainings';
import { activityOptions } from '@/mock/trainings';
import { ActivityType, Difficulty } from '@/types/training';

function normalizeActivity(value: unknown): ActivityType | undefined {
  return activityOptions.find((option) => option.id === value)?.id;
}

function normalizeText(value: unknown) {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export default function TrainingFiltersScreen() {
  const params = useLocalSearchParams<{
    activity?: string;
    difficulty?: Difficulty;
    date?: string;
    query?: string;
  }>();
  const { filters, setFilters, availableDates, filteredTrainings } = useTrainings({
    activityType: normalizeActivity(params.activity),
    difficulty: params.difficulty,
    date: normalizeText(params.date),
    query: normalizeText(params.query),
  });

  const applyFilters = () => {
    router.replace({
      pathname: '/trainings',
      params: {
        activity: filters.activityType,
        difficulty: filters.difficulty,
        date: filters.date,
        query: filters.query,
      },
    } as Href);
  };

  const resetFilters = () => {
    setFilters({});
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Поиск"
        title="Фильтры"
        action={<IconButton icon="close" onPress={() => router.back()} />}
      />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Подберите тренировку</Text>
        <Text style={styles.panelText}>
          Фильтры работают локально и сохраняются в параметрах навигации.
        </Text>
      </View>

      <TrainingFilters filters={filters} dates={availableDates} onChange={setFilters} />

      <View style={styles.actionRow}>
        <Pressable style={styles.secondaryButton} onPress={resetFilters}>
          <Text style={styles.secondaryButtonText}>Сбросить</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={applyFilters}>
          <Text style={styles.primaryButtonText}>Показать {filteredTrainings.length}</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    marginBottom: 16,
    padding: 16,
  },
  panelTitle: {
    color: wheelieColors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  panelText: {
    color: wheelieColors.muted,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.accent,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryButtonText: {
    color: '#06110b',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surfaceAlt,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 52,
  },
  secondaryButtonText: {
    color: wheelieColors.text,
    fontSize: 16,
    fontWeight: '900',
  },
});
