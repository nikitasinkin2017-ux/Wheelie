import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type ActivityType = 'cycling' | 'running' | 'walking' | 'fitness';

export type Difficulty = 'Легко' | 'Средне' | 'Сложно' | 'Для всех';

export type Workout = {
  id: string;
  title: string;
  activity: ActivityType;
  date: string;
  time: string;
  place: string;
  distance: string;
  difficulty: Difficulty;
  description: string;
  maxParticipants: number;
  participants: number;
  route: string;
  clubId?: string;
};

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

export type NewWorkout = Omit<Workout, 'id' | 'participants' | 'route'>;

export const activityOptions: {
  id: ActivityType;
  label: string;
  icon: string;
  color: string;
}[] = [
  { id: 'cycling', label: 'Велосипед', icon: 'bike', color: '#8cff6b' },
  { id: 'running', label: 'Бег', icon: 'run-fast', color: '#60d4ff' },
  { id: 'walking', label: 'Прогулка', icon: 'walk', color: '#ffd166' },
  { id: 'fitness', label: 'Фитнес', icon: 'dumbbell', color: '#ff7ab6' },
];

const initialWorkouts: Workout[] = [
  {
    id: 'sunrise-ride',
    title: 'Утренняя велотренировка',
    activity: 'cycling',
    date: 'Сегодня',
    time: '07:30',
    place: 'Парк Горького, главный вход',
    distance: '32 км',
    difficulty: 'Средне',
    description:
      'Спокойный круг по набережной с двумя ускорениями. Подойдет тем, кто уверенно держит темп в группе.',
    maxParticipants: 18,
    participants: 12,
    route: 'Набережная - Воробьевы горы - Лужники',
    clubId: 'wheelie-cycling',
  },
  {
    id: 'tempo-run',
    title: 'Темповый бег у воды',
    activity: 'running',
    date: 'Завтра',
    time: '18:00',
    place: 'Нескучный сад',
    distance: '8 км',
    difficulty: 'Сложно',
    description: 'Разминка, темповый блок 5 км и заминка. Бежим компактной группой.',
    maxParticipants: 12,
    participants: 8,
    route: 'Нескучный сад - Крымский мост - обратно',
    clubId: 'run-pulse',
  },
  {
    id: 'city-walk',
    title: 'Вечерняя прогулка',
    activity: 'walking',
    date: 'Пятница',
    time: '20:00',
    place: 'Чистые пруды',
    distance: '6 км',
    difficulty: 'Легко',
    description: 'Неформальная прогулка по центру для восстановления после рабочей недели.',
    maxParticipants: 20,
    participants: 14,
    route: 'Чистые пруды - Покровка - Китай-город',
    clubId: 'urban-steps',
  },
  {
    id: 'core-mobility',
    title: 'Кор и мобильность',
    activity: 'fitness',
    date: 'Суббота',
    time: '11:00',
    place: 'Студия Пульс',
    distance: '45 мин',
    difficulty: 'Для всех',
    description: 'Функциональная тренировка без тяжелого инвентаря: корпус, баланс и растяжка.',
    maxParticipants: 16,
    participants: 10,
    route: 'Зал 2, зона функционального тренинга',
    clubId: 'pulse-fit',
  },
];

const initialClubs: Club[] = [
  {
    id: 'wheelie-cycling',
    name: 'Велоклуб Wheelie',
    activity: 'cycling',
    city: 'Москва',
    members: 248,
    tagline: 'Групповые заезды без гонки за эго',
    description:
      'Клуб для городских райдеров: тренировки по выходным, спокойные восстановительные заезды и маршруты с кофе-питстопами.',
  },
  {
    id: 'run-pulse',
    name: 'Беговой Пульс',
    activity: 'running',
    city: 'Москва',
    members: 186,
    tagline: 'Темп, техника и поддержка',
    description:
      'Беговое сообщество с тренировками на скорость, легкими кроссами и подготовкой к стартам.',
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
  workouts: Workout[];
  clubs: Club[];
  profile: Profile;
  joinedWorkoutIds: string[];
  joinedClubIds: string[];
  getWorkoutById: (id: string) => Workout | undefined;
  getClubById: (id: string) => Club | undefined;
  getWorkoutsByActivity: (activity?: ActivityType) => Workout[];
  createWorkout: (workout: NewWorkout) => Workout;
  joinWorkout: (id: string) => void;
  joinClub: (id: string) => void;
  updateProfile: (profile: Profile) => void;
};

const WheelieContext = createContext<WheelieContextValue | null>(null);

export function WheelieProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [clubs, setClubs] = useState(initialClubs);
  const [profile, setProfile] = useState(initialProfile);
  const [joinedWorkoutIds, setJoinedWorkoutIds] = useState<string[]>([]);
  const [joinedClubIds, setJoinedClubIds] = useState<string[]>([]);

  const value = useMemo<WheelieContextValue>(
    () => ({
      workouts,
      clubs,
      profile,
      joinedWorkoutIds,
      joinedClubIds,
      getWorkoutById: (id) => workouts.find((workout) => workout.id === id),
      getClubById: (id) => clubs.find((club) => club.id === id),
      getWorkoutsByActivity: (activity) =>
        activity ? workouts.filter((workout) => workout.activity === activity) : workouts,
      createWorkout: (workout) => {
        const created: Workout = {
          ...workout,
          id: `training-${Date.now()}`,
          participants: 1,
          route: workout.place,
        };

        setWorkouts((current) => [created, ...current]);
        setJoinedWorkoutIds((current) => [created.id, ...current]);
        return created;
      },
      joinWorkout: (id) => {
        setJoinedWorkoutIds((current) => (current.includes(id) ? current : [...current, id]));
        setWorkouts((current) =>
          current.map((workout) =>
            workout.id === id && workout.participants < workout.maxParticipants
              ? { ...workout, participants: workout.participants + 1 }
              : workout,
          ),
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
    [clubs, joinedClubIds, joinedWorkoutIds, profile, workouts],
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

export function getActivityLabel(activity: ActivityType) {
  return activityOptions.find((option) => option.id === activity)?.label ?? 'Тренировка';
}

export function getActivityColor(activity: ActivityType) {
  return activityOptions.find((option) => option.id === activity)?.color ?? '#78ff8e';
}
