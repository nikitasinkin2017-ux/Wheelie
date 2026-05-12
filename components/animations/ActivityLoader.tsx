import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { wheelieColors } from '@/components/wheelie-ui';
import { ActivityType } from '@/types/training';

type LoaderType = ActivityType | 'map';

export function ActivityLoader({
  type = 'cycling',
  color = wheelieColors.accent,
  size = 64,
}: {
  type?: LoaderType;
  color?: string;
  size?: number;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: type === 'fitness' ? 1600 : 1800,
        easing: Easing.inOut(Easing.cubic),
      }),
      -1,
      false,
    );
  }, [progress, type]);

  if (type === 'running') {
    return <RunningLoader color={color} progress={progress} size={size} />;
  }

  if (type === 'walking') {
    return <WalkingLoader color={color} progress={progress} size={size} />;
  }

  if (type === 'fitness') {
    return <FitnessLoader color={color} progress={progress} size={size} />;
  }

  if (type === 'map') {
    return <MapLoader color={color} progress={progress} size={size} />;
  }

  return <CyclingLoader color={color} progress={progress} size={size} />;
}

function CyclingLoader({
  color,
  progress,
  size,
}: {
  color: string;
  progress: SharedValue<number>;
  size: number;
}) {
  const wheelStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 360}deg` }],
  }));

  return (
    <View style={[styles.loader, { height: size, width: size }]}>
      <MaterialCommunityIcons name="bike" size={Math.round(size * 0.52)} color={color} />
      <Animated.View
        style={[
          styles.wheel,
          {
            borderColor: `${color}66`,
            bottom: size * 0.13,
            height: size * 0.24,
            left: size * 0.16,
            width: size * 0.24,
          },
          wheelStyle,
        ]}>
        <View style={[styles.wheelSpoke, { backgroundColor: `${color}55` }]} />
      </Animated.View>
      <Animated.View
        style={[
          styles.wheel,
          {
            borderColor: `${color}66`,
            bottom: size * 0.13,
            height: size * 0.24,
            right: size * 0.15,
            width: size * 0.24,
          },
          wheelStyle,
        ]}>
        <View style={[styles.wheelSpoke, { backgroundColor: `${color}55` }]} />
      </Animated.View>
    </View>
  );
}

function RunningLoader({
  color,
  progress,
  size,
}: {
  color: string;
  progress: SharedValue<number>;
  size: number;
}) {
  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5, 1], [0.4, 1, 0.4]),
    transform: [{ translateX: interpolate(progress.value, [0, 1], [-size * 0.22, size * 0.22]) }],
  }));

  return (
    <View style={[styles.loader, { height: size, width: size }]}>
      <MaterialCommunityIcons name="run" size={Math.round(size * 0.44)} color={color} />
      <View style={[styles.track, { backgroundColor: `${color}22`, width: size * 0.7 }]}>
        <Animated.View style={[styles.trackDot, { backgroundColor: color }, indicatorStyle]} />
      </View>
    </View>
  );
}

function WalkingLoader({
  color,
  progress,
  size,
}: {
  color: string;
  progress: SharedValue<number>;
  size: number;
}) {
  const dotStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 0.55, 1], [-size * 0.22, size * 0.05, size * 0.24]) },
      { translateY: interpolate(progress.value, [0, 0.55, 1], [size * 0.08, -size * 0.1, size * 0.02]) },
    ],
  }));

  return (
    <View style={[styles.loader, { height: size, width: size }]}>
      <View style={[styles.routeDash, { backgroundColor: `${color}24`, width: size * 0.66 }]} />
      <View
        style={[
          styles.routeDash,
          styles.routeDashTilt,
          { backgroundColor: `${color}24`, width: size * 0.48 },
        ]}
      />
      <Animated.View style={[styles.routeDot, { backgroundColor: color }, dotStyle]} />
    </View>
  );
}

function FitnessLoader({
  color,
  progress,
  size,
}: {
  color: string;
  progress: SharedValue<number>;
  size: number;
}) {
  const ringStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5, 1], [0.3, 0.8, 0.3]),
    transform: [{ scale: interpolate(progress.value, [0, 0.5, 1], [0.84, 1.08, 0.84]) }],
  }));

  return (
    <View style={[styles.loader, { height: size, width: size }]}>
      <Animated.View
        style={[
          styles.pulseRing,
          {
            borderColor: `${color}55`,
            height: size * 0.72,
            width: size * 0.72,
          },
          ringStyle,
        ]}
      />
      <MaterialCommunityIcons name="arm-flex-outline" size={Math.round(size * 0.42)} color={color} />
    </View>
  );
}

function MapLoader({
  color,
  progress,
  size,
}: {
  color: string;
  progress: SharedValue<number>;
  size: number;
}) {
  const lineStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: interpolate(progress.value, [0, 1], [0.08, 1]) }],
  }));

  return (
    <View style={[styles.loader, { height: size, width: size }]}>
      <View style={[styles.mapLineBase, { backgroundColor: `${color}22`, width: size * 0.68 }]} />
      <Animated.View style={[styles.mapLine, { backgroundColor: color, width: size * 0.68 }, lineStyle]} />
      <View style={[styles.mapMarker, styles.mapMarkerStart, { backgroundColor: color }]} />
      <View style={[styles.mapMarker, styles.mapMarkerEnd, { borderColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapLine: {
    borderRadius: 999,
    height: 3,
    position: 'absolute',
  },
  mapLineBase: {
    borderRadius: 999,
    height: 3,
    position: 'absolute',
  },
  mapMarker: {
    borderRadius: 999,
    height: 9,
    position: 'absolute',
    width: 9,
  },
  mapMarkerEnd: {
    backgroundColor: wheelieColors.background,
    borderWidth: 2,
    right: '18%',
    top: '46%',
  },
  mapMarkerStart: {
    left: '17%',
    top: '46%',
  },
  pulseRing: {
    borderRadius: 999,
    borderWidth: 1,
    position: 'absolute',
  },
  routeDash: {
    borderRadius: 999,
    height: 3,
    position: 'absolute',
  },
  routeDashTilt: {
    transform: [{ rotate: '-18deg' }, { translateY: -8 }],
  },
  routeDot: {
    borderRadius: 999,
    height: 10,
    position: 'absolute',
    width: 10,
  },
  track: {
    borderRadius: 999,
    bottom: 10,
    height: 3,
    overflow: 'hidden',
    position: 'absolute',
  },
  trackDot: {
    borderRadius: 999,
    height: 3,
    width: 22,
  },
  wheel: {
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1.5,
    justifyContent: 'center',
    position: 'absolute',
  },
  wheelSpoke: {
    borderRadius: 999,
    height: 1.5,
    width: '72%',
  },
});
