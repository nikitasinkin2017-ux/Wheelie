import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Href, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen, ScreenHeader, SectionHeader, wheelieColors } from '@/components/wheelie-ui';
import { getActivityColor, getActivityLabel, useWheelie } from '@/data/wheelie-store';

export default function CommunityScreen() {
  const { clubs, joinedClubIds } = useWheelie();
  const activeToday = clubs.reduce((sum, club) => sum + Math.round(club.members / 8), 0);

  return (
    <Screen>
      <ScreenHeader eyebrow="Социальные тренировки" title="Сообщество" />

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <MaterialCommunityIcons name="account-group-outline" size={23} color={wheelieColors.accent} />
          <Text style={styles.summaryValue}>{activeToday}</Text>
          <Text style={styles.summaryLabel}>активны сегодня</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <MaterialCommunityIcons name="flag-checkered" size={23} color="#60d4ff" />
          <Text style={styles.summaryValue}>{clubs.length}</Text>
          <Text style={styles.summaryLabel}>клуба рядом</Text>
        </View>
      </View>

      <SectionHeader title="Клубы" />
      <View style={styles.clubList}>
        {clubs.map((club) => {
          const color = getActivityColor(club.activity);

          return (
            <Pressable
              key={club.id}
              style={styles.clubCard}
              onPress={() => router.push(`/community/${club.id}` as Href)}>
              <View style={[styles.clubIcon, { backgroundColor: `${color}1f`, borderColor: color }]}>
                <Text style={styles.clubInitial}>{club.name[0]}</Text>
              </View>
              <View style={styles.clubCopy}>
                <View style={styles.clubTitleRow}>
                  <Text style={styles.clubName}>{club.name}</Text>
                  {joinedClubIds.includes(club.id) ? (
                    <Text style={styles.joinedText}>Вы в клубе</Text>
                  ) : null}
                </View>
                <Text style={styles.clubTagline}>{club.tagline}</Text>
                <Text style={styles.clubMeta}>
                  {getActivityLabel(club.activity)} · {club.city} · {club.members} участников
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={wheelieColors.dim} />
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: {
    alignItems: 'stretch',
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 28,
    padding: 18,
  },
  summaryItem: {
    flex: 1,
    gap: 5,
  },
  summaryDivider: {
    backgroundColor: wheelieColors.border,
    marginHorizontal: 18,
    width: 1,
  },
  summaryValue: {
    color: wheelieColors.text,
    fontSize: 26,
    fontWeight: '900',
  },
  summaryLabel: {
    color: wheelieColors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  clubList: {
    gap: 12,
  },
  clubCard: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surface,
    borderColor: wheelieColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 96,
    padding: 14,
  },
  clubIcon: {
    alignItems: 'center',
    backgroundColor: wheelieColors.surfaceAlt,
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  clubInitial: {
    color: wheelieColors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  clubCopy: {
    flex: 1,
    gap: 4,
  },
  clubTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  clubName: {
    color: wheelieColors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  joinedText: {
    color: wheelieColors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  clubTagline: {
    color: '#c5ced9',
    fontSize: 13,
    fontWeight: '700',
  },
  clubMeta: {
    color: wheelieColors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
});
