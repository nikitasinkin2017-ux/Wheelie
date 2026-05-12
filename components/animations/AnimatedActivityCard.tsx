import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Href, router } from 'expo-router';
import { ComponentProps, ReactNode, useEffect } from 'react';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
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

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type AnimatedActivityCardProps = {
  title: string;
  subtitle: string;
  icon: IconName;
  color: string;
  href?: Href;
  onPress?: () => void;
  delay?: number;
  accessory?: ReactNode;
};

export function AnimatedActivityCard({
  title,
  subtitle,
  icon,
  color,
  href,
  onPress,
  delay = 0,
  accessory,
}: AnimatedActivityCardProps) {
  const scheme = useColorScheme();
  const isLight = scheme === 'light';
  const entrance = useSharedValue(0);
  const pressed = useSharedValue(0);

  useEffect(() => {
    entrance.value = withDelay(
      delay,
      withTiming(1, { duration: 520, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, entrance]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: entrance.value,
    transform: [
      { translateY: interpolate(entrance.value, [0, 1], [18, 0]) },
      { scale: interpolate(pressed.value, [0, 1], [1, 0.985]) },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(pressed.value, [0, 1], [1, 0.94]) },
      { translateY: interpolate(pressed.value, [0, 1], [0, 1]) },
    ],
  }));

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (href) {
      router.push(href);
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      onPressIn={() => {
        pressed.value = withSpring(1, { damping: 18, stiffness: 260 });
      }}
      onPressOut={() => {
        pressed.value = withSpring(0, { damping: 16, stiffness: 220 });
      }}>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: isLight ? '#f8faf8' : wheelieColors.surface,
            borderColor: isLight ? '#dce3dc' : '#26313c',
            shadowColor: isLight ? '#64705f' : color,
          },
          cardStyle,
        ]}>
        <View style={[styles.glow, { backgroundColor: `${color}18` }]} />
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.iconWrap,
              {
                backgroundColor: `${color}${isLight ? '1d' : '18'}`,
                borderColor: `${color}38`,
              },
              iconStyle,
            ]}>
            <MaterialCommunityIcons name={icon} size={24} color={color} />
          </Animated.View>
          <View style={styles.copy}>
            <Text style={[styles.title, { color: isLight ? '#101513' : wheelieColors.text }]}>
              {title}
            </Text>
            <Text style={[styles.subtitle, { color: isLight ? '#5f6b64' : '#aeb8c3' }]}>
              {subtitle}
            </Text>
          </View>
          {accessory ?? (
            <View style={[styles.arrow, { borderColor: isLight ? '#dce3dc' : '#2a3540' }]}>
              <MaterialCommunityIcons
                name="arrow-right"
                size={17}
                color={isLight ? '#4e5a52' : '#c3ccd6'}
              />
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  arrow: {
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 126,
    overflow: 'hidden',
    shadowOffset: { height: 14, width: 0 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
  },
  content: {
    flex: 1,
    gap: 14,
    padding: 17,
  },
  copy: {
    flex: 1,
    gap: 7,
  },
  glow: {
    borderRadius: 999,
    height: 110,
    position: 'absolute',
    right: -36,
    top: -42,
    width: 110,
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 22,
  },
});
