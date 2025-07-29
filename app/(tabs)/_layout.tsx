import { SessionChecker } from "@/components/SessionChecker";
import { Slot } from "expo-router";
import React from "react";
import "react-native-reanimated";

export default function TabLayout() {
  return (
    <>
      <Slot />
      <SessionChecker />
    </>
  );
}
