export const LEVELS_CONFIG = {
  A1: { xpRequired: 0, unlocks: ["A1"] },
  A2: { xpRequired: 500, unlocks: ["A1", "A2"] },
  B1: { xpRequired: 1000, unlocks: ["A1", "A2", "B1"] },
  B2: { xpRequired: 2000, unlocks: ["A1", "A2", "B1", "B2"] },
};

export const calculateLevel = (xp: number) => {
  if (xp >= 2000) return "B2";
  if (xp >= 1000) return "B1";
  if (xp >= 500) return "A2";
  return "A1";
};
