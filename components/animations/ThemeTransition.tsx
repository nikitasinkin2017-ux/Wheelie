import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export function ThemeTransition() {
  const colorScheme = useColorScheme();
  const previousScheme = useRef(colorScheme);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (previousScheme.current === colorScheme) {
      return;
    }

    previousScheme.current = colorScheme;
    opacity.value = withSequence(
      withTiming(0.22, { duration: 120 }),
      withTiming(0, { duration: 320 }),
    );
  }, [colorScheme, opacity]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        styles.overlay,
        { backgroundColor: colorScheme === 'dark' ? '#05080c' : '#f7faf5' },
        overlayStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    zIndex: 999,
  },
});
