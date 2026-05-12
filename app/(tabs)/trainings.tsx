import { Href, router, useLocalSearchParams } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { EmptyState, Screen, ScreenHeader, wheelieColors } from '@/components/wheelie-ui';
import { TrainingCard } from '@/components/TrainingCard';
import { TrainingFilters } from '@/components/TrainingFilters';
import { useTrainings } from '@/hooks/useTrainings';
import { activityOptions } from '@/mock/trainings';
import { ActivityType, Difficulty, TrainingFilters as TrainingFiltersValue } from '@/types/training';

function normalizeActivity(value: unknown): ActivityType | undefined {
  return activityOptions.find((option) => option.id === value)?.id;
}

function normalizeText(value: unknown) {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export default function TrainingsScreen() {
  const params = useLocalSearchParams<{
    activity?: string;
    difficulty?: Difficulty;
    date?: string;
    query?: string;
  }>();
  const { filteredTrainings, filters, setFilters, availableDates } = useTrainings({
    activityType: normalizeActivity(params.activity),
    difficulty: params.difficulty,
    date: normalizeText(params.date),
    query: normalizeText(params.query),
  });

  useEffect(() => {
    setFilters({
      activityType: normalizeActivity(params.activity),
      difficulty: params.difficulty,
      date: normalizeText(params.date),
      query: normalizeText(params.query),
    });
  }, [params.activity, params.date, params.difficulty, params.query, setFilters]);

  const updateFilters = (nextFilters: TrainingFiltersValue) => {
    setFilters(nextFilters);
    router.setParams({
      activity: nextFilters.activityType,
      difficulty: nextFilters.difficulty,
      date: nextFilters.date,
      query: nextFilters.query,
    });
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Каталог"
        title="Тренировки"
        action={<CreateButton />}
      />

      <TrainingFilters
        filters={filters}
        dates={availableDates}
        onChange={updateFilters}
        onOpenAdvanced={() =>
          router.push({
            pathname: '/training/filters',
            params: {
              activity: filters.activityType,
              difficulty: filters.difficulty,
              date: filters.date,
              query: filters.query,
            },
          } as Href)
        }
      />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryTitle}>
          {filteredTrainings.length === 1
            ? 'Найдена 1 тренировка'
            : `Найдено тренировок: ${filteredTrainings.length}`}
        </Text>
        <Text style={styles.summaryText}>mock-данные готовы к backend</Text>
      </View>

      <View style={styles.list}>
        {filteredTrainings.length > 0 ? (
          filteredTrainings.map((training) => (
            <TrainingCard
              key={training.id}
              training={training}
              onPress={() => router.push(`/training/${training.id}` as Href)}
            />
          ))
        ) : (
          <EmptyState
            title="Тренировок пока нет"
            text="Попробуйте сбросить фильтры или создать новую тренировку для этого района."
          />
        )}
      </View>
    </Screen>
  );
}

function CreateButton() {
  return (
    <Pressable style={styles.createButton} onPress={() => router.push('/training/create' as Href)}>
      <MaterialCommunityIcons name="plus" size={18} color="#06110b" />
      <Text style={styles.createButtonText}>Создать</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  createButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.accent,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 5,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  createButtonText: {
    color: '#06110b',
    fontSize: 14,
    fontWeight: '900',
  },
  summaryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  summaryTitle: {
    color: wheelieColors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  summaryText: {
    color: wheelieColors.dim,
    fontSize: 12,
    fontWeight: '800',
  },
  list: {
    gap: 12,
  },
});
