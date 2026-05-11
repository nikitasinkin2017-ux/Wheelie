import { Href, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import {
  ActivityButton,
  EmptyState,
  IconButton,
  Screen,
  ScreenHeader,
  SectionHeader,
  WorkoutCard,
} from '@/components/wheelie-ui';
import { ActivityType, activityOptions, useWheelie } from '@/data/wheelie-store';

function normalizeActivity(value: unknown): ActivityType | undefined {
  return activityOptions.find((option) => option.id === value)?.id;
}

export default function TrainingsScreen() {
  const params = useLocalSearchParams<{ activity?: string }>();
  const activeActivity = normalizeActivity(params.activity);
  const { getWorkoutsByActivity, joinedWorkoutIds } = useWheelie();
  const workouts = getWorkoutsByActivity(activeActivity);

  const setFilter = (activity?: ActivityType) => {
    router.setParams(activity ? { activity } : { activity: undefined });
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Каталог"
        title="Тренировки"
        action={
          <IconButton icon="plus" onPress={() => router.push('/training/create' as Href)} />
        }
      />

      <View style={styles.filters}>
        {activityOptions.map((item) => (
          <ActivityButton
            key={item.id}
            label={item.label}
            icon={item.icon}
            color={item.color}
            active={activeActivity === item.id}
            onPress={() => setFilter(activeActivity === item.id ? undefined : item.id)}
          />
        ))}
      </View>

      <SectionHeader
        title={activeActivity ? 'Подборка по активности' : 'Все ближайшие'}
        actionLabel={activeActivity ? 'Сбросить' : 'Создать'}
        onActionPress={() =>
          activeActivity ? setFilter(undefined) : router.push('/training/create' as Href)
        }
      />

      <View style={styles.list}>
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              joined={joinedWorkoutIds.includes(workout.id)}
              onPress={() => router.push(`/training/${workout.id}` as Href)}
            />
          ))
        ) : (
          <EmptyState
            title="Тренировок пока нет"
            text="Создайте первую тренировку для этой активности, и она сразу появится в списке."
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  list: {
    gap: 12,
  },
});
