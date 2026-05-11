import { useMemo, useState } from 'react';

import { useWheelie } from '@/data/wheelie-store';
import { filterTrainings, getAvailableDates, getDifficulties } from '@/services/trainingService';
import { TrainingFilters } from '@/types/training';

export function useTrainings(initialFilters: TrainingFilters = {}) {
  const {
    trainings,
    createTraining,
    joinWorkout,
    cancelWorkout,
    getTrainingById,
  } = useWheelie();
  const [filters, setFilters] = useState<TrainingFilters>(initialFilters);

  const filteredTrainings = useMemo(
    () => filterTrainings(trainings, filters),
    [filters, trainings],
  );

  return {
    trainings,
    filteredTrainings,
    filters,
    setFilters,
    availableDates: getAvailableDates(trainings),
    availableDifficulties: getDifficulties(trainings),
    createTraining,
    joinTraining: joinWorkout,
    cancelTraining: cancelWorkout,
    getTrainingById,
  };
}
