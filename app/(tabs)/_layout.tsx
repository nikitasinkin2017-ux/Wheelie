import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React, { ComponentProps, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

function AnimatedTabIcon({
  name,
  color,
  focused,
}: {
  name: IconName;
  color: string;
  focused: boolean;
}) {
  const active = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    active.value = withSpring(focused ? 1 : 0, { damping: 15, stiffness: 210 });
  }, [active, focused]);

  const wrapStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(active.value, [0, 1], [1, 1.08]) }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(active.value, [0, 1], [0, 0.42]),
    transform: [{ scale: interpolate(active.value, [0, 1], [0.65, 1]) }],
  }));

  return (
    <Animated.View style={[styles.iconWrap, wrapStyle]}>
      <Animated.View style={[styles.iconGlow, { backgroundColor: color }, glowStyle]} />
      <MaterialCommunityIcons size={24} name={name} color={color} />
    </Animated.View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';

  return (
    <Tabs
      screenOptions={{
        animation: 'fade',
        headerShown: false,
        tabBarActiveTintColor: isLight ? '#285f4f' : '#8fd7c7',
        tabBarButton: HapticTab,
        tabBarInactiveTintColor: isLight ? '#7a837b' : '#687381',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: isLight ? '#f7faf5' : '#0d1218',
          borderTopColor: isLight ? '#dce4da' : '#202934',
          borderTopWidth: 1,
          height: 76,
          paddingBottom: 14,
          paddingTop: 9,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon name="home-variant-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="trainings"
        options={{
          title: 'Тренировки',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon name="calendar-check-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Карта',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon name="map-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Сообщество',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon name="account-group-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon name="account-circle-outline" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconGlow: {
    borderRadius: 999,
    height: 28,
    position: 'absolute',
    width: 28,
  },
  iconWrap: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 36,
  },
});
