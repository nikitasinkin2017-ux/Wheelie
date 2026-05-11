import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: '#78ff8e',
        tabBarInactiveTintColor: '#687381',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '800',
        },
        tabBarStyle: {
          backgroundColor: '#0d1218',
          borderTopColor: '#202934',
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={25} name="home-variant-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trainings"
        options={{
          title: 'Тренировки',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={25} name="calendar-check-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Карта',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={25} name="map-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Сообщество',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={25} name="account-group-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={25} name="account-circle-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
