// Orden en que se muestran las unidades de cada nivel.
const UNIT_ORDER: Record<string, Record<string, number>> = {
  A1: {
    unitA1_first_steps: 1,
    unitA1_meeting_people: 2,
    unitA1_numbers_colors: 3,
    unitA1_my_environment: 4,
    unitA1_daily_lifestyle: 5,
    unitA1_food_drinks: 6,
    unitA1_at_the_restaurant: 7,
    unitA1_skills_work: 8,
    unitA1_body_health: 9,
    unitA1_travel_city: 10,
    unitA1_sports_leisure: 11,
    unitA1_future_goals: 12,
    unitA1_final_mastery: 13,
    unitA1_final_test: 13,
  },
  A2: {
    unitA2_lifestyle: 1,
    unitA2_environment: 2,
    unitA2_grammar_past: 3,
    unitA2_travel_culture: 4,
    unitA2_wellbeing: 5,
    unitA2_tech_society: 6,
    unitA2_work_career: 7,
    unitA2_final_test: 8,
  },
  B1: {
    unitB1_debates_opinions: 1,
  },
};

export const getUnitOrder = (unitId: string, level: string): number =>
  UNIT_ORDER[level]?.[unitId] || 999;
