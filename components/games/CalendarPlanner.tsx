// components/Games/CalendarPlanner.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
    days.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
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
        currentActivities.length < config.constraints.maxActivitiesPerDay
    );
  };

  const getActivityUsageCount = (activity: string) => {
    return Object.values(schedule)
      .flat()
      .filter((a) => a === activity).length;
  };

  return (
    <View style={styles.container}>
      {/* Header con instrucciones */}
      <View style={styles.header}>
        <Text style={styles.title}>📅 Planifica Tu Semana</Text>
        <Text style={styles.instructions}>
          Asigna actividades a cada día. Máximo{" "}
          {config.constraints.maxActivitiesPerDay} por día.
        </Text>
      </View>

      {/* Selector de días */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysSelector}
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => setSelectedDay(day)}
            style={[styles.dayTab, selectedDay === day && styles.dayTabActive]}
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

      {/* Calendario principal */}
      <View style={styles.calendar}>
        {/* Día seleccionado */}
        <View style={styles.selectedDay}>
          <Text style={styles.selectedDayTitle}>{selectedDay}</Text>

          {/* Actividades asignadas */}
          <View style={styles.assignedActivities}>
            {schedule[selectedDay].length === 0 ? (
              <Text style={styles.emptyState}>
                No hay actividades programadas
              </Text>
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

          {/* Contador */}
          <Text style={styles.counter}>
            {schedule[selectedDay].length}/
            {config.constraints.maxActivitiesPerDay} actividades
          </Text>
        </View>

        {/* Actividades disponibles */}
        <View style={styles.availableActivities}>
          <Text style={styles.sectionTitle}>Actividades Disponibles:</Text>
          <View style={styles.activitiesGrid}>
            {getAvailableActivities(selectedDay).map((activity) => (
              <TouchableOpacity
                key={activity}
                onPress={() => handleAddActivity(selectedDay, activity)}
                style={styles.activityButton}
              >
                <Text style={styles.activityButtonText}>{activity}</Text>
                <Text style={styles.usageCount}>
                  Usada {getActivityUsageCount(activity)} veces
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Resumen de la semana */}
      <View style={styles.weekSummary}>
        <Text style={styles.summaryTitle}>Resumen de la Semana</Text>
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

      {/* Feedback de completado */}
      {showCompletion && (
        <View style={styles.completionOverlay}>
          <Text style={styles.completionText}>🎉 ¡Semana planificada!</Text>
          <Text style={styles.completionSubtext}>Excelente organización</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  instructions: {
    fontSize: 16,
    color: "#6c757d",
  },
  daysSelector: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  dayTab: {
    padding: 15,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  dayTabActive: {
    borderBottomColor: "#007AFF",
  },
  dayTabText: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "500",
  },
  dayTabTextActive: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  calendar: {
    flex: 1,
    padding: 20,
  },
  selectedDay: {
    marginBottom: 30,
  },
  selectedDayTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  assignedActivities: {
    minHeight: 100,
    marginBottom: 10,
  },
  emptyState: {
    color: "#6c757d",
    fontStyle: "italic",
    textAlign: "center",
    padding: 20,
  },
  activityChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5e8",
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  activityChipText: {
    flex: 1,
    color: "#2e7d32",
    fontWeight: "500",
  },
  removeButton: {
    padding: 4,
    marginLeft: 8,
  },
  removeText: {
    color: "#dc3545",
    fontWeight: "bold",
  },
  counter: {
    textAlign: "center",
    color: "#6c757d",
    fontSize: 14,
  },
  availableActivities: {
    marginTop: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 15,
  },
  activitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  activityButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 12,
    minWidth: 150,
    alignItems: "center",
  },
  activityButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  usageCount: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
  weekSummary: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 15,
    textAlign: "center",
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryDay: {
    alignItems: "center",
  },
  summaryDayName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6c757d",
    marginBottom: 5,
  },
  summaryDots: {
    flexDirection: "column",
    gap: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#28a745",
  },
  completionOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  completionText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  completionSubtext: {
    fontSize: 18,
    color: "#ccc",
    marginTop: 10,
  },
});

export default CalendarPlanner;
