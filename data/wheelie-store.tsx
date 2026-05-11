import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import {
  activityOptions,
  createTrainingFromDraft,
  mockTrainings,
} from '@/mock/trainings';
import { currentUser } from '@/mock/users';
import {
  ActivityType,
  Difficulty,
  Participant,
  Training,
  TrainingDraft,
} from '@/types/training';

export type { ActivityType, Difficulty, Participant, Training };
export type Workout = Training;
export type NewWorkout = TrainingDraft;
export { activityOptions };

export type Club = {
  id: string;
  name: string;
  activity: ActivityType;
  city: string;
  members: number;
  tagline: string;
  description: string;
};

export type Profile = {
  name: string;
  city: string;
  level: string;
  favoriteActivity: ActivityType;
};

const initialClubs: Club[] = [
  {
    id: 'wheelie-cycling',
    name: 'Велоклуб Wheelie',
    activity: 'cycling',
    city: 'Москва',
    members: 248,
    tagline: 'Групповые заезды без гонки за эго',
    description:
      'Клуб для городских райдеров: тренировки по выходным, восстановительные заезды и маршруты с кофе-питстопами.',
  },
  {
    id: 'run-pulse',
    name: 'Беговой Пульс',
    activity: 'running',
    city: 'Москва',
    members: 186,
    tagline: 'Темп, техника и поддержка',
    description:
      'Беговое сообщество с тренировками на скорость, лёгкими кроссами и подготовкой к стартам.',
  },
  {
    id: 'urban-steps',
    name: 'Городские Шаги',
    activity: 'walking',
    city: 'Москва',
    members: 92,
    tagline: 'Прогулки как социальная тренировка',
    description:
      'Маршруты по городу для восстановления, общения и мягкой ежедневной активности.',
  },
  {
    id: 'pulse-fit',
    name: 'Пульс Фитнес',
    activity: 'fitness',
    city: 'Москва',
    members: 134,
    tagline: 'Сильное тело без суеты',
    description:
      'Функциональные тренировки, мобильность, кор и занятия для всех уровней подготовки.',
  },
];

const initialProfile: Profile = {
  name: 'Никита',
  city: 'Москва',
  level: 'Средний',
  favoriteActivity: 'cycling',
};

type WheelieContextValue = {
  trainings: Training[];
  workouts: Training[];
  clubs: Club[];
  profile: Profile;
  joinedWorkoutIds: string[];
  joinedClubIds: string[];
  getTrainingById: (id: string) => Training | undefined;
  getWorkoutById: (id: string) => Training | undefined;
  getClubById: (id: string) => Club | undefined;
  getWorkoutsByActivity: (activity?: ActivityType) => Training[];
  createWorkout: (workout: TrainingDraft) => Training;
  createTraining: (training: TrainingDraft) => Training;
  joinWorkout: (id: string) => void;
  cancelWorkout: (id: string) => void;
  joinClub: (id: string) => void;
  updateProfile: (profile: Profile) => void;
};

const WheelieContext = createContext<WheelieContextValue | null>(null);

function syncParticipation(training: Training, participants: Participant[], isJoined: boolean): Training {
  return {
    ...training,
    participants,
    currentParticipants: participants.length,
    participantCount: participants.length,
    isJoined,
  };
}

export function WheelieProvider({ children }: { children: ReactNode }) {
  const [trainings, setTrainings] = useState(mockTrainings);
  const [clubs, setClubs] = useState(initialClubs);
  const [profile, setProfile] = useState(initialProfile);
  const [joinedClubIds, setJoinedClubIds] = useState<string[]>([]);

  const joinedWorkoutIds = useMemo(
    () => trainings.filter((training) => training.isJoined).map((training) => training.id),
    [trainings],
  );

  const value = useMemo<WheelieContextValue>(
    () => ({
      trainings,
      workouts: trainings,
      clubs,
      profile,
      joinedWorkoutIds,
      joinedClubIds,
      getTrainingById: (id) => trainings.find((training) => training.id === id),
      getWorkoutById: (id) => trainings.find((training) => training.id === id),
      getClubById: (id) => clubs.find((club) => club.id === id),
      getWorkoutsByActivity: (activity) =>
        activity ? trainings.filter((training) => training.activityType === activity) : trainings,
      createWorkout: (workout) => {
        const created = createTrainingFromDraft(workout);

        setTrainings((current) => [created, ...current]);
        return created;
      },
      createTraining: (training) => {
        const created = createTrainingFromDraft(training);

        setTrainings((current) => [created, ...current]);
        return created;
      },
      joinWorkout: (id) => {
        setTrainings((current) =>
          current.map((training) => {
            if (
              training.id !== id ||
              training.isJoined ||
              training.currentParticipants >= training.maxParticipants
            ) {
              return training;
            }

            return syncParticipation(
              training,
              [...training.participants, currentUser],
              true,
            );
          }),
        );
      },
      cancelWorkout: (id) => {
        setTrainings((current) =>
          current.map((training) => {
            if (training.id !== id || !training.isJoined) {
              return training;
            }

            const participants = training.participants.filter(
              (participant) => participant.id !== currentUser.id,
            );

            return syncParticipation(training, participants, false);
          }),
        );
      },
      joinClub: (id) => {
        setJoinedClubIds((current) => (current.includes(id) ? current : [...current, id]));
        setClubs((current) =>
          current.map((club) => (club.id === id ? { ...club, members: club.members + 1 } : club)),
        );
      },
      updateProfile: setProfile,
    }),
    [clubs, joinedClubIds, joinedWorkoutIds, profile, trainings],
  );

  return <WheelieContext.Provider value={value}>{children}</WheelieContext.Provider>;
}

export function useWheelie() {
  const value = useContext(WheelieContext);

  if (!value) {
    throw new Error('useWheelie must be used inside WheelieProvider');
  }

  return value;
}

export { getActivityColor, getActivityIcon, getActivityLabel } from '@/services/trainingService';
