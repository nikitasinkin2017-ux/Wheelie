import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Href, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AnimatedActivityCard } from '@/components/animations/AnimatedActivityCard';
import { Screen, ScreenHeader, wheelieColors } from '@/components/wheelie-ui';

const places = [
  {
    title: 'Парковые круги',
    subtitle: 'Тихие маршруты для прогулок и лёгкого бега',
    icon: 'pine-tree' as const,
    color: '#a8d9a4',
  },
  {
    title: 'Городские набережные',
    subtitle: 'Ровный темп, красивые виды и длинные отрезки',
    icon: 'waves' as const,
    color: '#8fd7c7',
  },
  {
    title: 'Велополосы рядом',
    subtitle: 'Подборки для спокойного городского заезда',
    icon: 'bike' as const,
    color: '#d8c58f',
  },
];

export default function PlacesScreen() {
  return (
    <Screen>
      <ScreenHeader eyebrow="Исследование" title="Места" />

      <View style={styles.intro}>
        <Text style={styles.title}>Outdoor-локации рядом</Text>
        <Text style={styles.text}>
          Подборки маршрутов, парков и городских зон появятся здесь. Сейчас можно перейти на карту и
          открыть тренировки поблизости.
        </Text>
      </View>

      <View style={styles.list}>
        {places.map((place, index) => (
          <AnimatedActivityCard
            key={place.title}
            title={place.title}
            subtitle={place.subtitle}
            icon={place.icon}
            color={place.color}
            href="/map"
            delay={index * 80}
          />
        ))}
      </View>

      <Pressable style={styles.mapButton} onPress={() => router.push('/map' as Href)}>
        <MaterialCommunityIcons name="map-outline" size={18} color="#07110c" />
        <Text style={styles.mapText}>Открыть карту</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: {
    marginBottom: 22,
  },
  list: {
    gap: 12,
    marginBottom: 22,
  },
  mapButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#8fd7c7',
    borderRadius: 14,
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 17,
  },
  mapText: {
    color: '#07110c',
    fontSize: 15,
    fontWeight: '600',
  },
  text: {
    color: wheelieColors.muted,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  title: {
    color: wheelieColors.text,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    marginBottom: 10,
  },
});
