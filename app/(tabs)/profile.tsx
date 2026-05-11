import { ComponentProps, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ActivityButton, Screen, ScreenHeader, wheelieColors } from '@/components/wheelie-ui';
import { ActivityType, activityOptions, useWheelie } from '@/data/wheelie-store';

const levels = ['Новичок', 'Средний', 'Продвинутый'];

export default function ProfileScreen() {
  const { profile, updateProfile, joinedWorkoutIds, joinedClubIds } = useWheelie();
  const [name, setName] = useState(profile.name);
  const [city, setCity] = useState(profile.city);
  const [level, setLevel] = useState(profile.level);
  const [favoriteActivity, setFavoriteActivity] = useState<ActivityType>(profile.favoriteActivity);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({
      name: name.trim() || 'Спортсмен',
      city: city.trim() || 'Город не указан',
      level,
      favoriteActivity,
    });
    setSaved(true);
  };

  return (
    <Screen>
      <ScreenHeader eyebrow="Личный кабинет" title="Профиль" />

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(name || profile.name)[0]}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileMeta}>
            {profile.city} · {profile.level}
          </Text>
        </View>
      </View>

      <View style={styles.stats}>
        <Stat label="Тренировки" value={String(joinedWorkoutIds.length)} />
        <Stat label="Клубы" value={String(joinedClubIds.length)} />
      </View>

      <View style={styles.form}>
        <Field
          label="Имя"
          value={name}
          onChangeText={(value) => {
            setName(value);
            setSaved(false);
          }}
        />
        <Field
          label="Город"
          value={city}
          onChangeText={(value) => {
            setCity(value);
            setSaved(false);
          }}
        />

        <Text style={styles.label}>Уровень</Text>
        <View style={styles.segmentRow}>
          {levels.map((item) => (
            <Pressable
              key={item}
              style={[styles.segment, level === item ? styles.segmentActive : null]}
              onPress={() => {
                setLevel(item);
                setSaved(false);
              }}>
              <Text style={[styles.segmentText, level === item ? styles.segmentTextActive : null]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Любимая активность</Text>
        <View style={styles.activities}>
          {activityOptions.map((item) => (
            <ActivityButton
              key={item.id}
              label={item.label}
              icon={item.icon}
              color={item.color}
              active={favoriteActivity === item.id}
              onPress={() => {
                setFavoriteActivity(item.id);
                setSaved(false);
              }}
            />
          ))}
        </View>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{saved ? 'Сохранено' : 'Сохранить профиль'}</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function Field(props: { label: string } & ComponentProps<typeof TextInput>) {
  const { label, ...inputProps } = props;

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...inputProps} placeholderTextColor="#66717f" style={styles.input} />
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 12,
    padding: 16,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#78ff8e1f',
    borderColor: wheelieColors.accent,
    borderRadius: 8,
    borderWidth: 1,
    height: 58,
    justifyContent: 'center',
    width: 58,
  },
  avatarText: {
    color: wheelieColors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: wheelieColors.text,
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 4,
  },
  profileMeta: {
    color: wheelieColors.muted,
    fontSize: 14,
    fontWeight: '700',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  stat: {
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 14,
  },
  statValue: {
    color: wheelieColors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: wheelieColors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  form: {
    gap: 14,
  },
  field: {
    gap: 8,
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
  activities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: wheelieColors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 52,
    marginTop: 8,
  },
  saveButtonText: {
    color: '#06110b',
    fontSize: 16,
    fontWeight: '900',
  },
});
