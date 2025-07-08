
import React from "react";
import { View, Text, StyleSheet } from "react-native";

/* export levelCard = ({ level, progress }) => {
  const currentXp = progress?.xp || 0;
  const levelConfig = LEVELS_CONFIG[level.id];
  const progressToNextLevel =
    (currentXp - levelConfig.xpRequired) /
    (LEVELS_CONFIG[getNextLevel(level.id)].xpRequired - levelConfig.xpRequired);

  return (
    <View style={styles.levelCard}>
      <Text>
        {level.name} - {currentXp}/{levelConfig.xpRequired} XP
      </Text>
      <Progress.Bar progress={progressToNextLevel} width={200} />
    </View>
  );
};
 */