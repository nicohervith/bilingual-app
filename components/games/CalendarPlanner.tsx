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
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [schedule, setSchedule] = useState<Record<string, string[]>>(
    days.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );

  const handleAddActivity = (day: string, activity: string) => {
    if (schedule[day].length < config.constraints.maxActivitiesPerDay) {
      const newSchedule = {
        ...schedule,
        [day]: [...schedule[day], activity],
      };
      setSchedule(newSchedule);
      onComplete(newSchedule);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {days.map((day) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day}</Text>

          <View style={styles.activitiesContainer}>
            {schedule[day].map((activity, index) => (
              <Text key={index} style={styles.activityText}>
                {`I'm going to ${activity}`}
              </Text>
            ))}
          </View>

          <View style={styles.buttonsContainer}>
            {config.activities.map((activity) => (
              <TouchableOpacity
                key={activity}
                style={styles.activityButton}
                onPress={() => handleAddActivity(day, activity)}
                disabled={schedule[day].includes(activity)}
              >
                <Text>{activity}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  dayContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  activitiesContainer: {
    minHeight: 50,
    marginBottom: 10,
  },
  activityText: {
    fontStyle: "italic",
    marginVertical: 3,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  activityButton: {
    padding: 8,
    margin: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});

export default CalendarPlanner;
