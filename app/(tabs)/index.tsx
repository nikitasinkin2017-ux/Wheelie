import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Href, router } from 'expo-router';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

import { ActivityLoader } from '@/components/animations/ActivityLoader';
import { AnimatedActivityCard } from '@/components/animations/AnimatedActivityCard';
import { AnimatedRouteLine } from '@/components/animations/AnimatedRouteLine';
import {
  IconButton,
  Screen,
  WorkoutCard,
  wheelieColors,
} from '@/components/wheelie-ui';
import { useWheelie } from '@/data/wheelie-store';

const soloActions = [
  {
    title: 'Построить маршрут',
    subtitle: 'Создай маршрут для бега, велосипеда или прогулки',
    icon: 'routes' as const,
    color: '#8fd7c7',
    href: '/route/build' as Href,
  },
  {
    title: 'Начать активность',
    subtitle: 'Запиши одиночный заезд, пробежку или прогулку',
    icon: 'play-circle-outline' as const,
    color: '#d8c58f',
    href: '/activity/start' as Href,
  },
  {
    title: 'Исследовать места',
    subtitle: 'Найди новые маршруты и outdoor-локации рядом',
    icon: 'compass-outline' as const,
    color: '#9eb7e8',
    href: '/places' as Href,
  },
];

const socialActions = [
  {
    title: 'Найти тренировку',
    subtitle: 'Присоединись к активности рядом',
    icon: 'calendar-search' as const,
    color: '#a8d9a4',
    href: '/trainings' as Href,
  },
  {
    title: 'Создать тренировку',
    subtitle: 'Собери людей на пробежку, заезд или прогулку',
    icon: 'plus-circle-outline' as const,
    color: '#e1b28f',
    href: '/training/create' as Href,
  },
  {
    title: 'Сообщества',
    subtitle: 'Клубы, группы и городские outdoor-активности',
    icon: 'account-group-outline' as const,
    color: '#b9aee8',
    href: '/community' as Href,
  },
];

export default function HomeScreen() {
  const { workouts, joinedWorkoutIds } = useWheelie();
  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';
  const upcomingWorkouts = workouts.slice(0, 2);
  const palette = {
    background: isLight ? '#f4f7f2' : wheelieColors.background,
    card: isLight ? '#ffffff' : wheelieColors.surface,
    elevated: isLight ? '#f8faf6' : '#111820',
    border: isLight ? '#dce4da' : '#27323d',
    text: isLight ? '#101513' : wheelieColors.text,
    muted: isLight ? '#657169' : wheelieColors.muted,
    dim: isLight ? '#7e887f' : wheelieColors.dim,
  };

  return (
    <Screen contentStyle={[styles.content, { backgroundColor: palette.background }]}>
      <View style={styles.topBar}>
        <View style={styles.brandBlock}>
          <View style={styles.logoRow}>
            <View style={[styles.logoMark, { backgroundColor: palette.text }]}>
              <MaterialCommunityIcons name="bike-fast" size={19} color={palette.background} />
            </View>
            <Text style={[styles.logoText, { color: palette.text }]}>Wheelie</Text>
          </View>
          <Text style={[styles.subtitle, { color: palette.muted }]}>Маршруты и тренировки рядом</Text>
        </View>
        <IconButton icon="bell-outline" onPress={() => router.push('/community' as Href)} color={palette.text} />
      </View>

      <View
        style={[
          styles.hero,
          {
            backgroundColor: palette.elevated,
            borderColor: palette.border,
            shadowColor: isLight ? '#8b9589' : '#000000',
          },
        ]}>
        <View style={[styles.heroGlow, { backgroundColor: isLight ? '#dfece1' : '#1d2d26' }]} />
        <View style={styles.heroCopy}>
          <Text style={[styles.heroKicker, { color: palette.dim }]}>Сегодня рядом</Text>
          <Text style={[styles.heroTitle, { color: palette.text }]}>
            {workouts.length} тренировок и маршруты для любого темпа
          </Text>
        </View>
        <View style={styles.routePreview}>
          <AnimatedRouteLine color="#8fd7c7" />
        </View>
      </View>

      <HomeSection title="Для себя" color={palette.text}>
        <View style={styles.actionGrid}>
          {soloActions.map((action, index) => (
            <View key={action.title} style={styles.actionCell}>
              <AnimatedActivityCard {...action} delay={index * 75} />
            </View>
          ))}
        </View>
      </HomeSection>

      <HomeSection title="С людьми" color={palette.text}>
        <View style={styles.actionGrid}>
          {socialActions.map((action, index) => (
            <View key={action.title} style={styles.actionCell}>
              <AnimatedActivityCard {...action} delay={260 + index * 75} />
            </View>
          ))}
        </View>
      </HomeSection>

      <View style={styles.inlinePanel}>
        <View
          style={[
            styles.loaderPanel,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
            },
          ]}>
          <ActivityLoader type="cycling" color="#8fd7c7" size={58} />
          <View style={styles.loaderCopy}>
            <Text style={[styles.loaderTitle, { color: palette.text }]}>Быстрый старт</Text>
            <Text style={[styles.loaderText, { color: palette.muted }]}>
              Лёгкие анимации готовы для загрузок активности, карты и маршрутов.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeading}>
        <Text style={[styles.sectionTitle, { color: palette.text }]}>Ближайшие тренировки</Text>
        <Text style={[styles.sectionLink, { color: '#8fd7c7' }]} onPress={() => router.push('/trainings' as Href)}>
          Все
        </Text>
      </View>
      <View style={styles.cardList}>
        {upcomingWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            joined={joinedWorkoutIds.includes(workout.id)}
            onPress={() => router.push(`/training/${workout.id}` as Href)}
          />
        ))}
      </View>
    </Screen>
  );
}

function HomeSection({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeading}>
        <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  actionCell: {
    flexBasis: '48%',
    flexGrow: 1,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  brandBlock: {
    flex: 1,
    gap: 7,
  },
  cardList: {
    gap: 12,
  },
  content: {
    minHeight: '100%',
  },
  hero: {
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
    minHeight: 132,
    overflow: 'hidden',
    padding: 18,
    shadowOffset: { height: 18, width: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 32,
  },
  heroCopy: {
    flex: 1,
    justifyContent: 'space-between',
    minWidth: 0,
  },
  heroGlow: {
    borderRadius: 999,
    height: 170,
    opacity: 0.72,
    position: 'absolute',
    right: -82,
    top: -66,
    width: 170,
  },
  heroKicker: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 28,
    maxWidth: 265,
  },
  inlinePanel: {
    marginBottom: 30,
  },
  loaderCopy: {
    flex: 1,
    gap: 4,
  },
  loaderPanel: {
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 15,
    padding: 16,
  },
  loaderText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19,
  },
  loaderTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  logoMark: {
    alignItems: 'center',
    borderRadius: 12,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  logoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  logoText: {
    fontSize: 31,
    fontWeight: '700',
    letterSpacing: 0,
  },
  routePreview: {
    alignSelf: 'center',
    minWidth: 126,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '600',
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
});
