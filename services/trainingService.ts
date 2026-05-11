import { activityOptions } from '@/mock/trainings';
import {
  ActivityType,
  CyclingParams,
  Difficulty,
  FitnessParams,
  RunningParams,
  Training,
  TrainingFilters,
  TrainingStatus,
  WalkingParams,
} from '@/types/training';

export function getActivityLabel(activityType: ActivityType) {
  return activityOptions.find((option) => option.id === activityType)?.label ?? 'Тренировка';
}

export function getActivityPluralLabel(activityType: ActivityType) {
  return activityOptions.find((option) => option.id === activityType)?.pluralLabel ?? 'Тренировки';
}

export function getActivityColor(activityType: ActivityType) {
  return activityOptions.find((option) => option.id === activityType)?.color ?? '#78ff8e';
}

export function getActivityIcon(activityType: ActivityType) {
  return activityOptions.find((option) => option.id === activityType)?.icon ?? 'calendar-check-outline';
}

export function getTrainingStatus(training: Training): TrainingStatus {
  if (training.isJoined) {
    return 'Вы участвуете';
  }

  if (training.currentParticipants >= training.maxParticipants) {
    return 'Заполнена';
  }

  if (training.currentParticipants / training.maxParticipants >= 0.8) {
    return 'Почти заполнена';
  }

  return 'Открыта';
}

export function filterTrainings(trainings: Training[], filters: TrainingFilters) {
  const query = filters.query?.trim().toLowerCase();

  return trainings.filter((training) => {
    const matchesActivity = filters.activityType
      ? training.activityType === filters.activityType
      : true;
    const matchesDifficulty = filters.difficulty ? training.difficulty === filters.difficulty : true;
    const matchesDate = filters.date ? training.date === filters.date : true;
    const matchesQuery = query
      ? [
          training.title,
          training.description,
          training.startPlace,
          training.district,
          training.organizer.name,
          ...training.tags,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)
      : true;

    return matchesActivity && matchesDifficulty && matchesDate && matchesQuery;
  });
}

export function getAvailableDates(trainings: Training[]) {
  return Array.from(new Set(trainings.map((training) => training.date)));
}

export function formatActivityParams(training: Training) {
  switch (training.activityType) {
    case 'cycling':
      const cyclingParams = training.activityParams as CyclingParams;
      return [
        ['Средняя скорость', cyclingParams.averageSpeed],
        ['Набор высоты', cyclingParams.elevationGain],
        ['Покрытие маршрута', cyclingParams.surfaceType],
        ['Формат', cyclingParams.format],
      ];
    case 'running':
      const runningParams = training.activityParams as RunningParams;
      return [
        ['Средний темп', runningParams.averagePace],
        ['Тип бега', runningParams.runType],
        ['Покрытие маршрута', runningParams.surfaceType],
        ['Цель', runningParams.goal],
      ];
    case 'walking':
      const walkingParams = training.activityParams as WalkingParams;
      return [
        ['Длительность', walkingParams.duration],
        ['Темп', walkingParams.pace],
        ['Тип маршрута', walkingParams.routeType],
      ];
    case 'fitness':
      const fitnessParams = training.activityParams as FitnessParams;
      return [
        ['Формат', fitnessParams.format],
        ['Длительность', fitnessParams.duration],
        ['Интенсивность', fitnessParams.intensity],
      ];
  }
}

export function getDifficulties(trainings: Training[]): Difficulty[] {
  return Array.from(new Set(trainings.map((training) => training.difficulty)));
}
