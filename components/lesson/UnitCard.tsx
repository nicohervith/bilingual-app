import { Unit } from "@/types/types";
import { StyleSheet, Text, View } from "react-native";
import { CheckmarkIcon, LockIcon } from "../ui/SvgIcons";

export default function UnitCard({ unit }: { unit: Unit }) {
  return (
    <View
      style={[
        styles.container,
        unit.completed && styles.completed,
        unit.locked && styles.locked,
      ]}
    >
      <Text>{unit.title}</Text>
      <Text>{unit.rewardXP} XP</Text>
      {unit.locked && <LockIcon />}
      {unit.completed && <CheckmarkIcon />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  completed: {},
  locked: {},
});
