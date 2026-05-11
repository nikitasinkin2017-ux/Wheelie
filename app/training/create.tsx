import { Href, router } from 'expo-router';
import { ComponentProps, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  ActivityButton,
  IconButton,
  Screen,
  ScreenHeader,
  wheelieColors,
} from '@/components/wheelie-ui';
import {
  ActivityType,
  Difficulty,
  activityOptions,
  useWheelie,
} from '@/data/wheelie-store';

const difficulties: Difficulty[] = ['Легко', 'Средне', 'Сложно', 'Для всех'];

export default function CreateTrainingScreen() {
  const { createWorkout } = useWheelie();
  const [activity, setActivity] = useState<ActivityType>('cycling');
  const [difficulty, setDifficulty] = useState<Difficulty>('Средне');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [distance, setDistance] = useState('');
  const [description, setDescription] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('12');

  const canCreate = title.trim() && date.trim() && time.trim() && place.trim();

  const handleCreate = () => {
    if (!canCreate) {
      return;
    }

    const created = createWorkout({
      title: title.trim(),
      activity,
      date: date.trim(),
      time: time.trim(),
      place: place.trim(),
      distance: distance.trim() || 'Без дистанции',
      difficulty,
      description: description.trim() || 'Описание появится позже.',
      maxParticipants: Number(maxParticipants) || 1,
    });

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
        <Field label="Название" value={title} onChangeText={setTitle} placeholder="Например, Лёгкий велокруг" />

        <Text style={styles.label}>Тип активности</Text>
        <View style={styles.activities}>
          {activityOptions.map((item) => (
            <ActivityButton
              key={item.id}
              label={item.label}
              icon={item.icon}
              color={item.color}
              active={activity === item.id}
              onPress={() => setActivity(item.id)}
            />
          ))}
        </View>

        <View style={styles.row}>
          <Field label="Дата" value={date} onChangeText={setDate} placeholder="Сегодня" compact />
          <Field label="Время" value={time} onChangeText={setTime} placeholder="19:00" compact />
        </View>

        <Field label="Место старта" value={place} onChangeText={setPlace} placeholder="Парк, вход или адрес" />
        <Field label="Дистанция" value={distance} onChangeText={setDistance} placeholder="12 км или 45 мин" />

        <Text style={styles.label}>Сложность</Text>
        <View style={styles.segmentRow}>
          {difficulties.map((item) => (
            <Pressable
              key={item}
              style={[styles.segment, difficulty === item ? styles.segmentActive : null]}
              onPress={() => setDifficulty(item)}>
              <Text style={[styles.segmentText, difficulty === item ? styles.segmentTextActive : null]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Field
          label="Описание"
          value={description}
          onChangeText={setDescription}
          placeholder="Темп, формат и что взять с собой"
          multiline
        />
        <Field
          label="Максимум участников"
          value={maxParticipants}
          onChangeText={setMaxParticipants}
          placeholder="12"
          keyboardType="number-pad"
        />

        <Pressable
          style={[styles.createButton, !canCreate ? styles.createButtonDisabled : null]}
          onPress={handleCreate}>
          <Text style={styles.createButtonText}>Создать тренировку</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function Field({
  label,
  compact,
  ...inputProps
}: {
  label: string;
  compact?: boolean;
} & ComponentProps<typeof TextInput>) {
  return (
    <View style={compact ? styles.compactField : styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        placeholderTextColor="#66717f"
        style={[styles.input, inputProps.multiline ? styles.textArea : null]}
      />
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
  textArea: {
    minHeight: 104,
    textAlignVertical: 'top',
  },
  activities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  segmentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  segment: {
    backgroundColor: wheelieColors.surface,
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
    minHeight: 52,
    justifyContent: 'center',
    marginTop: 8,
  },
  createButtonDisabled: {
    opacity: 0.45,
  },
  createButtonText: {
    color: '#06110b',
    fontSize: 16,
    fontWeight: '900',
  },
});
