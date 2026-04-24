// components/Games/CalendarPlanner.tsx
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CalendarPlannerProps {
  config: {
    activities: string[];
    constraints: {
      maxActivitiesPerDay: number;
    };
  };
  onComplete: (schedule: Record<string, string[]>) => void;
}

const CalendarPlanner: React.FC<CalendarPlannerProps> = ({
  config,
  onComplete,
}) => {
  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const [schedule, setSchedule] = useState<Record<string, string[]>>(
    days.reduce((acc, day) => ({ ...acc, [day]: [] }), {}),
  );
  const [selectedDay, setSelectedDay] = useState<string>(days[0]);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleAddActivity = (day: string, activity: string) => {
    if (schedule[day].length < config.constraints.maxActivitiesPerDay) {
      const newSchedule = {
        ...schedule,
        [day]: [...schedule[day], activity],
      };
      setSchedule(newSchedule);

      // Verificar si todas las actividades están asignadas
      checkCompletion(newSchedule);
    }
  };

  const handleRemoveActivity = (day: string, activityIndex: number) => {
    const newSchedule = {
      ...schedule,
      [day]: schedule[day].filter((_, index) => index !== activityIndex),
    };
    setSchedule(newSchedule);
    checkCompletion(newSchedule);
  };

  const checkCompletion = (currentSchedule: Record<string, string[]>) => {
    const totalActivities = Object.values(currentSchedule).flat().length;
    const targetActivities = config.activities.length * 2; // Ejemplo: usar cada actividad 2 veces

    if (totalActivities >= targetActivities) {
      setShowCompletion(true);
      setTimeout(() => onComplete(currentSchedule), 1500);
    }
  };

  const getAvailableActivities = (day: string) => {
    const currentActivities = schedule[day];
    return config.activities.filter(
      (activity) =>
        !currentActivities.includes(activity) &&
        currentActivities.length < config.constraints.maxActivitiesPerDay,
    );
  };

  const getActivityUsageCount = (activity: string) => {
    return Object.values(schedule)
      .flat()
      .filter((a) => a === activity).length;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📅 Planifica Tu Semana</Text>
        <Text style={styles.instructions}>
          Máximo {config.constraints.maxActivitiesPerDay} por día.
        </Text>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.daysSelector}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDay(day)}
              style={[
                styles.dayTab,
                selectedDay === day && styles.dayTabActive,
              ]}
            >
              <Text
                style={[
                  styles.dayTabText,
                  selectedDay === day && styles.dayTabTextActive,
                ]}
              >
                {day.substring(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* USAMOS SCROLLVIEW AQUÍ PARA QUE NADA SE PISE */}
      <ScrollView style={styles.calendar} showsVerticalScrollIndicator={false}>
        <View style={styles.selectedDayCard}>
          <Text style={styles.selectedDayTitle}>{selectedDay}</Text>

          <View style={styles.assignedActivities}>
            {schedule[selectedDay].length === 0 ? (
              <Text style={styles.emptyState}>No hay actividades</Text>
            ) : (
              schedule[selectedDay].map((activity, index) => (
                <View key={index} style={styles.activityChip}>
                  <Text style={styles.activityChipText}>✅ {activity}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveActivity(selectedDay, index)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>

          <Text style={styles.counter}>
            {schedule[selectedDay].length}/
            {config.constraints.maxActivitiesPerDay} completado
          </Text>
        </View>

        <View style={styles.availableSection}>
          <Text style={styles.sectionTitle}>Toca para añadir:</Text>
          <View style={styles.activitiesGrid}>
            {getAvailableActivities(selectedDay).map((activity) => (
              <TouchableOpacity
                key={activity}
                onPress={() => handleAddActivity(selectedDay, activity)}
                style={styles.activityButton}
              >
                <Text style={styles.activityButtonText}>{activity}</Text>
                <Text style={styles.usageCount}>
                  {getActivityUsageCount(activity)} usos
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Espacio extra al final para que el resumen no tape nada */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* El resumen se queda fijo abajo */}
      <View style={styles.weekSummary}>
        <View style={styles.summaryGrid}>
          {days.map((day) => (
            <View key={day} style={styles.summaryDay}>
              <Text style={styles.summaryDayName}>{day.substring(0, 1)}</Text>
              <View style={styles.summaryDots}>
                {schedule[day].map((_, index) => (
                  <View key={index} style={styles.dot} />
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {showCompletion && (
        <View style={styles.completionOverlay}>
          <Text style={styles.completionText}>🎉 ¡Semana planificada!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7f6",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  instructions: {
    fontSize: 14,
    color: "#666",
  },
  daysSelector: {
    backgroundColor: "#fff",
    maxHeight: 60,
  },
  dayTab: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  dayTabActive: {
    borderBottomColor: "#007AFF",
  },
  dayTabText: {
    fontSize: 14,
    color: "#999",
  },
  dayTabTextActive: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  calendar: {
    flex: 1,
    padding: 15,
  },
  selectedDayCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    // Sombra para iOS/Android
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedDayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  activityChip: {
    flexDirection: "row",
    backgroundColor: "#f0f9ff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bae1ff",
  },
  activityChipText: {
    flex: 1,
    color: "#0056b3",
  },
  availableSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#444",
  },
  activitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  activityButton: {
    backgroundColor: "#fff",
    width: "48%", // Dos columnas
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },
  activityButtonText: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  usageCount: {
    fontSize: 10,
    color: "#aaa",
    marginTop: 4,
  },
  weekSummary: {
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryDay: {
    alignItems: "center",
    width: 30,
  },
  summaryDayName: {
    fontSize: 10,
    color: "#999",
    marginBottom: 4,
  },
  summaryDots: {
    height: 30,
    justifyContent: "flex-start",
    gap: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4cd964",
  },
  completionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,122,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  completionText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  assignedActivities: {
    minHeight: 100,
    marginBottom: 10,
  },
  emptyState: {},
  removeButton: {},
  removeText: {},
  counter: {},
});

export default CalendarPlanner;
