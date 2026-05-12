import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { wheelieColors } from '@/components/wheelie-ui';

export function AnimatedRouteLine({
  color = wheelieColors.accent,
  delay = 120,
}: {
  color?: string;
  delay?: number;
}) {
  const draw = useSharedValue(0);
  const markers = useSharedValue(0);

  useEffect(() => {
    draw.value = withDelay(
      delay,
      withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) }),
    );
    markers.value = withDelay(
      delay + 560,
      withSpring(1, { damping: 13, stiffness: 150, mass: 0.7 }),
    );
  }, [delay, draw, markers]);

  const firstSegment = useAnimatedStyle(() => ({
    transform: [{ scaleX: interpolate(draw.value, [0, 0.58], [0.001, 1], 'clamp') }],
  }));

  const secondSegment = useAnimatedStyle(() => ({
    opacity: interpolate(draw.value, [0.45, 1], [0, 1], 'clamp'),
    transform: [{ scaleX: interpolate(draw.value, [0.45, 1], [0.001, 1], 'clamp') }],
  }));

  const markerStyle = useAnimatedStyle(() => ({
    opacity: markers.value,
    transform: [{ scale: interpolate(markers.value, [0, 1], [0.65, 1]) }],
  }));

  return (
    <View style={styles.wrap} pointerEvents="none">
      <View style={[styles.pathBase, styles.pathBaseOne]} />
      <View style={[styles.pathBase, styles.pathBaseTwo]} />
      <Animated.View
        style={[styles.path, styles.pathOne, { backgroundColor: color }, firstSegment]}
      />
      <Animated.View
        style={[styles.path, styles.pathTwo, { backgroundColor: color }, secondSegment]}
      />
      <Animated.View style={[styles.marker, styles.markerStart, { backgroundColor: color }, markerStyle]} />
      <Animated.View
        style={[
          styles.marker,
          styles.markerEnd,
          { borderColor: color, backgroundColor: wheelieColors.surface },
          markerStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  marker: {
    borderRadius: 999,
    height: 12,
    position: 'absolute',
    width: 12,
  },
  markerEnd: {
    borderWidth: 2,
    right: 8,
    top: 17,
  },
  markerStart: {
    left: 6,
    top: 37,
  },
  path: {
    borderRadius: 999,
    height: 3,
    position: 'absolute',
    transformOrigin: 'left center',
  },
  pathBase: {
    backgroundColor: '#ffffff18',
    borderRadius: 999,
    height: 3,
    position: 'absolute',
  },
  pathBaseOne: {
    left: 12,
    top: 42,
    transform: [{ rotate: '-13deg' }],
    width: '54%',
  },
  pathBaseTwo: {
    right: 11,
    top: 25,
    transform: [{ rotate: '14deg' }],
    width: '44%',
  },
  pathOne: {
    left: 12,
    top: 42,
    transform: [{ rotate: '-13deg' }],
    width: '54%',
  },
  pathTwo: {
    right: 11,
    top: 25,
    transform: [{ rotate: '14deg' }],
    width: '44%',
  },
  wrap: {
    height: 64,
    minWidth: 120,
    overflow: 'hidden',
  },
});
