import { Href, router } from 'expo-router';
import { ComponentProps, useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  ActivityButton,
  IconButton,
  Screen,
  ScreenHeader,
  wheelieColors,
} from '@/components/wheelie-ui';
import { useTrainings } from '@/hooks/useTrainings';
import { activityOptions, defaultActivityParams, difficulties } from '@/mock/trainings';
import {
  ActivityType,
  CyclingParams,
  Difficulty,
  FitnessParams,
  RunningParams,
  TrainingDraft,
  WalkingParams,
} from '@/types/training';

type FormErrors = Partial<Record<'title' | 'date' | 'time' | 'startPlace' | 'district' | 'distance', string>>;

export default function CreateTrainingScreen() {
  const { createTraining } = useTrainings();
  const [activityType, setActivityType] = useState<ActivityType>('cycling');
  const [difficulty, setDifficulty] = useState<Difficulty>('Средне');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [startPlace, setStartPlace] = useState('');
  const [district, setDistrict] = useState('');
  const [distance, setDistance] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('12');
  const [surface, setSurface] = useState('Асфальт');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const [averageSpeed, setAverageSpeed] = useState(defaultActivityParams.cycling.averageSpeed);
  const [elevationGain, setElevationGain] = useState(defaultActivityParams.cycling.elevationGain);
  const [bikeSurfaceType, setBikeSurfaceType] = useState<CyclingParams['surfaceType']>(defaultActivityParams.cycling.surfaceType);
  const [bikeFormat, setBikeFormat] = useState<CyclingParams['format']>(defaultActivityParams.cycling.format);
  const [averagePace, setAveragePace] = useState(defaultActivityParams.running.averagePace);
  const [runType, setRunType] = useState<RunningParams['runType']>(defaultActivityParams.running.runType);
  const [runSurfaceType, setRunSurfaceType] = useState<RunningParams['surfaceType']>(defaultActivityParams.running.surfaceType);
  const [goal, setGoal] = useState<RunningParams['goal']>(defaultActivityParams.running.goal);
  const [duration, setDuration] = useState(defaultActivityParams.walking.duration);
  const [walkPace, setWalkPace] = useState<WalkingParams['pace']>(defaultActivityParams.walking.pace);
  const [routeType, setRouteType] = useState<WalkingParams['routeType']>(defaultActivityParams.walking.routeType);
  const [fitnessFormat, setFitnessFormat] = useState<FitnessParams['format']>(defaultActivityParams.fitness.format);
  const [fitnessDuration, setFitnessDuration] = useState(defaultActivityParams.fitness.duration);
  const [intensity, setIntensity] = useState(defaultActivityParams.fitness.intensity);

  const activityParams = useMemo<TrainingDraft['activityParams']>(() => {
    if (activityType === 'cycling') {
      return {
        averageSpeed,
        elevationGain,
        surfaceType: bikeSurfaceType,
        format: bikeFormat,
      };
    }

    if (activityType === 'running') {
      return {
        averagePace,
        runType,
        surfaceType: runSurfaceType,
        goal,
      };
    }

    if (activityType === 'walking') {
      return {
        duration,
        pace: walkPace,
        routeType,
      };
    }

    return {
      format: fitnessFormat,
      duration: fitnessDuration,
      intensity,
    };
  }, [
    activityType,
    averagePace,
    averageSpeed,
    bikeFormat,
    bikeSurfaceType,
    duration,
    elevationGain,
    fitnessDuration,
    fitnessFormat,
    goal,
    intensity,
    routeType,
    runSurfaceType,
    runType,
    walkPace,
  ]);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!title.trim()) nextErrors.title = 'Введите название тренировки';
    if (!date.trim()) nextErrors.date = 'Укажите дату';
    if (!time.trim()) nextErrors.time = 'Укажите время';
    if (!startPlace.trim()) nextErrors.startPlace = 'Укажите место старта';
    if (!district.trim()) nextErrors.district = 'Укажите район';
    if (!distance.trim()) nextErrors.distance = 'Укажите дистанцию или длительность';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) {
      return;
    }

    const created = createTraining({
      title: title.trim(),
      description: description.trim() || 'Организатор скоро добавит детали тренировки.',
      activityType,
      date: date.trim(),
      time: time.trim(),
      startPlace: startPlace.trim(),
      district: district.trim(),
      distance: distance.trim(),
      difficulty,
      maxParticipants: Math.max(1, Number(maxParticipants) || 1),
      surface: surface.trim() || 'Не указано',
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      activityParams,
    });

    Alert.alert('Тренировка создана');
    router.replace(`/training/${created.id}` as Href);
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Новая встреча"
        title="Создать тренировку"
        action={<IconButton icon="close" onPress={() => router.back()} />}
      />

      <View style={styles.form}>
        <Field
          label="Название"
          value={title}
          onChangeText={setTitle}
          placeholder="Например, Лёгкий велокруг"
          error={errors.title}
        />
        <Field
          label="Описание"
          value={description}
          onChangeText={setDescription}
          placeholder="Темп, формат и что взять с собой"
          multiline
        />

        <Text style={styles.label}>Тип активности</Text>
        <View style={styles.activities}>
          {activityOptions.map((item) => (
            <ActivityButton
              key={item.id}
              label={item.label}
              icon={item.icon}
              color={item.color}
              active={activityType === item.id}
              onPress={() => setActivityType(item.id)}
            />
          ))}
        </View>

        <View style={styles.row}>
          <Field
            label="Дата"
            value={date}
            onChangeText={setDate}
            placeholder="Сегодня"
            compact
            error={errors.date}
          />
          <Field
            label="Время"
            value={time}
            onChangeText={setTime}
            placeholder="19:00"
            compact
            error={errors.time}
          />
        </View>

        <Field
          label="Место старта"
          value={startPlace}
          onChangeText={setStartPlace}
          placeholder="Парк, вход или адрес"
          error={errors.startPlace}
        />
        <Field
          label="Район"
          value={district}
          onChangeText={setDistrict}
          placeholder="Например, Хамовники"
          error={errors.district}
        />
        <Field
          label="Дистанция"
          value={distance}
          onChangeText={setDistance}
          placeholder="12 км или 45 мин"
          error={errors.distance}
        />

        <Text style={styles.label}>Сложность</Text>
        <SegmentRow items={difficulties} value={difficulty} onChange={setDifficulty} />

        <View style={styles.row}>
          <Field
            label="Максимум участников"
            value={maxParticipants}
            onChangeText={setMaxParticipants}
            placeholder="12"
            keyboardType="number-pad"
            compact
          />
          <Field
            label="Покрытие"
            value={surface}
            onChangeText={setSurface}
            placeholder="Асфальт"
            compact
          />
        </View>

        <ActivitySpecificFields
          activityType={activityType}
          values={{
            averageSpeed,
            elevationGain,
            bikeSurfaceType,
            bikeFormat,
            averagePace,
            runType,
            runSurfaceType,
            goal,
            duration,
            walkPace,
            routeType,
            fitnessFormat,
            fitnessDuration,
            intensity,
          }}
          setters={{
            setAverageSpeed,
            setElevationGain,
            setBikeSurfaceType: (value: string) => setBikeSurfaceType(value as typeof bikeSurfaceType),
            setBikeFormat: (value: string) => setBikeFormat(value as typeof bikeFormat),
            setAveragePace,
            setRunType: (value: string) => setRunType(value as typeof runType),
            setRunSurfaceType: (value: string) => setRunSurfaceType(value as typeof runSurfaceType),
            setGoal: (value: string) => setGoal(value as typeof goal),
            setDuration,
            setWalkPace: (value: string) => setWalkPace(value as typeof walkPace),
            setRouteType: (value: string) => setRouteType(value as typeof routeType),
            setFitnessFormat: (value: string) => setFitnessFormat(value as typeof fitnessFormat),
            setFitnessDuration,
            setIntensity,
          }}
        />

        <Field
          label="Теги"
          value={tags}
          onChangeText={setTags}
          placeholder="группа, парк, восстановление"
        />

        <Pressable style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>Создать тренировку</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function ActivitySpecificFields({
  activityType,
  values,
  setters,
}: {
  activityType: ActivityType;
  values: Record<string, string>;
  setters: Record<string, (value: string) => void>;
}) {
  if (activityType === 'cycling') {
    return (
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Параметры велосипеда</Text>
        <View style={styles.row}>
          <Field label="Средняя скорость" value={values.averageSpeed} onChangeText={setters.setAverageSpeed} compact />
          <Field label="Набор высоты" value={values.elevationGain} onChangeText={setters.setElevationGain} compact />
        </View>
        <Text style={styles.label}>Тип покрытия</Text>
        <SegmentRow items={['асфальт', 'грунт', 'смешанный']} value={values.bikeSurfaceType} onChange={setters.setBikeSurfaceType} />
        <Text style={styles.label}>Формат</Text>
        <SegmentRow items={['спокойный заезд', 'тренировка', 'длинный маршрут']} value={values.bikeFormat} onChange={setters.setBikeFormat} />
      </View>
    );
  }

  if (activityType === 'running') {
    return (
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Параметры бега</Text>
        <Field label="Средний темп" value={values.averagePace} onChangeText={setters.setAveragePace} />
        <Text style={styles.label}>Тип бега</Text>
        <SegmentRow items={['лёгкая', 'интервальная', 'длительная']} value={values.runType} onChange={setters.setRunType} />
        <Text style={styles.label}>Покрытие</Text>
        <SegmentRow items={['асфальт', 'парк', 'стадион', 'грунт']} value={values.runSurfaceType} onChange={setters.setRunSurfaceType} />
        <Text style={styles.label}>Цель</Text>
        <SegmentRow items={['восстановление', 'выносливость', 'скорость']} value={values.goal} onChange={setters.setGoal} />
      </View>
    );
  }

  if (activityType === 'walking') {
    return (
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Параметры прогулки</Text>
        <Field label="Длительность" value={values.duration} onChangeText={setters.setDuration} />
        <Text style={styles.label}>Темп</Text>
        <SegmentRow items={['спокойный', 'средний', 'быстрый']} value={values.walkPace} onChange={setters.setWalkPace} />
        <Text style={styles.label}>Тип маршрута</Text>
        <SegmentRow items={['парк', 'город', 'набережная']} value={values.routeType} onChange={setters.setRouteType} />
      </View>
    );
  }

  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>Параметры фитнеса</Text>
      <Text style={styles.label}>Формат</Text>
      <SegmentRow items={['круговая', 'силовая', 'кардио', 'растяжка']} value={values.fitnessFormat} onChange={setters.setFitnessFormat} />
      <View style={styles.row}>
        <Field label="Длительность" value={values.fitnessDuration} onChangeText={setters.setFitnessDuration} compact />
        <Field label="Интенсивность" value={values.intensity} onChangeText={setters.setIntensity} compact />
      </View>
    </View>
  );
}

function SegmentRow<T extends string>({
  items,
  value,
  onChange,
}: {
  items: readonly T[];
  value: string;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.segmentRow}>
      {items.map((item) => (
        <Pressable
          key={item}
          style={[styles.segment, value === item ? styles.segmentActive : null]}
          onPress={() => onChange(item)}>
          <Text style={[styles.segmentText, value === item ? styles.segmentTextActive : null]}>
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function Field({
  label,
  compact,
  error,
  ...inputProps
}: {
  label: string;
  compact?: boolean;
  error?: string;
} & ComponentProps<typeof TextInput>) {
  return (
    <View style={compact ? styles.compactField : styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        placeholderTextColor="#66717f"
        style={[
          styles.input,
          inputProps.multiline ? styles.textArea : null,
          error ? styles.inputError : null,
        ]}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
  field: {
    gap: 8,
  },
  compactField: {
    flex: 1,
    gap: 8,
    minWidth: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    color: wheelieColors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  input: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: wheelieColors.text,
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff8a8a',
    fontSize: 12,
    fontWeight: '800',
  },
  textArea: {
    minHeight: 104,
    textAlignVertical: 'top',
  },
  activities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  block: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  blockTitle: {
    color: wheelieColors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  segmentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  segment: {
    backgroundColor: wheelieColors.surfaceAlt,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  segmentActive: {
    backgroundColor: '#78ff8e1a',
    borderColor: wheelieColors.accent,
  },
  segmentText: {
    color: wheelieColors.muted,
    fontSize: 14,
    fontWeight: '800',
  },
  segmentTextActive: {
    color: wheelieColors.accent,
  },
  createButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 52,
  },
  createButtonText: {
    color: '#06110b',
    fontSize: 16,
    fontWeight: '900',
  },
});
