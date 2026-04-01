import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { Session } from '@drum-scheduler/contracts';
import { getFormattedMinutes, getLastFinishedDateFormatted } from '../session-utils';
import { styles } from './session-card.style';

export function SessionCard({
  session,
  onOpen,
  onStart: _onStart,
  onMenu: _onMenu,
}: {
  session: Session;
  onOpen: () => void;
  onStart: () => void;
  onMenu: () => void;
}) {
  return (
    <Pressable onPress={onOpen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{session.name}</Text>

        <Text
          style={[
            styles.cardMeta,
            !session.lastFinishDate && styles.cardMetaLast,
          ]}
        >
          TotalDuration: {getFormattedMinutes(session.totalDuration ?? 0)}
        </Text>

        {session.lastFinishDate && (
          <Text style={[styles.cardMeta, styles.cardMetaLast]}>
            Last Finished at: {getLastFinishedDateFormatted(session.lastFinishDate)}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
