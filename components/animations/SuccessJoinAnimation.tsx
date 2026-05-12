import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { wheelieColors } from '@/components/wheelie-ui';

export function SuccessJoinAnimation({
  active,
  color = wheelieColors.accent,
}: {
  active: boolean;
  color?: string;
}) {
  const progress = useSharedValue(active ? 1 : 0);
  const ring = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(active ? 1 : 0, { damping: 16, stiffness: 190 });
    ring.value = active
      ? withDelay(80, withTiming(1, { duration: 380 }))
      : withTiming(0, { duration: 160 });
  }, [active, progress, ring]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: active ? `${color}1f` : '#ffffff10',
    borderColor: active ? `${color}70` : '#ffffff20',
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.015]) }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.7, 1]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.82, 1]) }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    opacity: interpolate(ring.value, [0, 1], [0, 0.45]),
    transform: [{ scale: interpolate(ring.value, [0, 1], [0.8, 1.8]) }],
  }));

  return (
    <Animated.View style={[styles.badge, containerStyle]}>
      <View style={styles.iconBox}>
        <Animated.View style={[styles.ring, { borderColor: color }, ringStyle]} />
        <Animated.View style={iconStyle}>
          <MaterialCommunityIcons
            name={active ? 'check' : 'plus'}
            size={15}
            color={active ? color : wheelieColors.text}
          />
        </Animated.View>
      </View>
      <Text style={[styles.text, { color: active ? color : wheelieColors.text }]}>
        {active ? 'Вы участвуете' : 'Присоединиться'}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 7,
    minHeight: 34,
    paddingHorizontal: 11,
  },
  iconBox: {
    alignItems: 'center',
    height: 17,
    justifyContent: 'center',
    width: 17,
  },
  ring: {
    borderRadius: 999,
    borderWidth: 1,
    height: 17,
    position: 'absolute',
    width: 17,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
