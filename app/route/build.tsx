import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Href, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AnimatedRouteLine } from '@/components/animations/AnimatedRouteLine';
import { Screen, ScreenHeader, wheelieColors } from '@/components/wheelie-ui';

export default function RouteBuilderScreen() {
  return (
    <Screen>
      <ScreenHeader eyebrow="Solo" title="Построить маршрут" />

      <View style={styles.preview}>
        <View style={styles.mapGrid} />
        <AnimatedRouteLine color="#8fd7c7" delay={180} />
      </View>

      <View style={styles.copy}>
        <Text style={styles.title}>Маршрут под ваш темп</Text>
        <Text style={styles.text}>
          Здесь появится конструктор маршрутов для бега, велосипеда и прогулок. Пока можно открыть карту
          и посмотреть outdoor-точки рядом.
        </Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => router.push('/map' as Href)}>
        <Text style={styles.primaryText}>Открыть карту</Text>
        <MaterialCommunityIcons name="arrow-right" size={18} color="#07110c" />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: {
    marginBottom: 22,
  },
  mapGrid: {
    backgroundColor: '#ffffff0a',
    borderColor: '#ffffff10',
    borderRadius: 20,
    borderWidth: 1,
    bottom: 16,
    left: 16,
    position: 'absolute',
    right: 16,
    top: 16,
  },
  preview: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 22,
    borderWidth: 1,
    height: 220,
    justifyContent: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  primaryButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#8fd7c7',
    borderRadius: 14,
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 17,
  },
  primaryText: {
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
