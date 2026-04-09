import React from 'react';
import { View } from 'react-native';
import { Card, Divider, Icon, Text } from 'react-native-paper';
import { styles } from './exercise-overwiew.style';

export function ExerciseOverwiew({
  description,
  durationMinutes,
  bpm,
}: {
  description: string | null;
  durationMinutes: number | null;
  bpm: number | null;
}) {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Text variant="bodyMedium">{description}</Text>
        <Divider style={styles.cardDivider} />
        <View style={styles.row}>
          <View style={styles.kv}>
            <View style={styles.metricRow}>
              <Icon
                source="timer-outline"
                size={25}
                color={styles.cardMetaIcon.color}
              />
              <Text style={styles.metricValue} variant="bodyLarge">
                {durationMinutes} <Text>{'min'} </Text>
              </Text>
            </View>
          </View>
          <View style={styles.kv}>
            <View style={styles.metricRow}>
              <Icon
                source="metronome"
                size={25}
                color={styles.cardMetaIcon.color}
              />
              <Text style={styles.metricValue} variant="bodyLarge">
                {bpm}
                {bpm ? <Text>{' BPM'} </Text> : ''}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
