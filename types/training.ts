import { ComponentProps } from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type ActivityType = 'cycling' | 'running' | 'walking' | 'fitness';

export type Difficulty = 'Легко' | 'Средне' | 'Сложно' | 'Для всех';

export type TrainingStatus = 'Открыта' | 'Почти заполнена' | 'Вы участвуете' | 'Заполнена';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Participant = {
  id: string;
  name: string;
  avatarColor: string;
  level: string;
  favoriteActivity: ActivityType;
};

export type ActivityOption = {
  id: ActivityType;
  label: string;
  pluralLabel: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
};

export type CyclingParams = {
  averageSpeed: string;
  elevationGain: string;
  surfaceType: 'асфальт' | 'грунт' | 'смешанный';
  format: 'спокойный заезд' | 'тренировка' | 'длинный маршрут';
};

export type RunningParams = {
  averagePace: string;
  runType: 'лёгкая' | 'интервальная' | 'длительная';
  surfaceType: 'асфальт' | 'парк' | 'стадион' | 'грунт';
  goal: 'восстановление' | 'выносливость' | 'скорость';
};

export type WalkingParams = {
  duration: string;
  pace: 'спокойный' | 'средний' | 'быстрый';
  routeType: 'парк' | 'город' | 'набережная';
};

export type FitnessParams = {
  format: 'круговая' | 'силовая' | 'кардио' | 'растяжка';
  duration: string;
  intensity: string;
};

export type ActivityParams =
  | { activityType: 'cycling'; params: CyclingParams }
  | { activityType: 'running'; params: RunningParams }
  | { activityType: 'walking'; params: WalkingParams }
  | { activityType: 'fitness'; params: FitnessParams };

export type Training = {
  id: string;
  title: string;
  description: string;
  activityType: ActivityType;
  date: string;
  time: string;
  startPlace: string;
  district: string;
  distance: string;
  difficulty: Difficulty;
  maxParticipants: number;
  currentParticipants: number;
  organizer: Participant;
  participants: Participant[];
  isJoined: boolean;
  surface: string;
  tags: string[];
  startCoordinates: Coordinates;
  finishCoordinates: Coordinates;
  activityParams: ActivityParams['params'];
  clubId?: string;
  route: string;
  activity: ActivityType;
  place: string;
  participantCount: number;
};

export type TrainingDraft = {
  title: string;
  description: string;
  activityType: ActivityType;
  date: string;
  time: string;
  startPlace: string;
  district: string;
  distance: string;
  difficulty: Difficulty;
  maxParticipants: number;
  surface: string;
  tags: string[];
  startCoordinates?: Coordinates;
  finishCoordinates?: Coordinates;
  activityParams: ActivityParams['params'];
};

export type TrainingFilters = {
  activityType?: ActivityType;
  difficulty?: Difficulty;
  date?: string;
  query?: string;
};
