import LessonCard from "@/components/LessonCard";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function UnitScreen() {
  const { unit: unitId } = useLocalSearchParams();
  const [lessons, setLessons] = useState<any[]>([]);
  const [unitData, setUnitData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUnitData = async () => {
      try {
        // Obtener información de la unidad
        const unitDoc = await getDoc(doc(db, "units", unitId as string));
        setUnitData(unitDoc.data());
        
        // Obtener lecciones de la unidad
        const lessonPromises = unitDoc.data()?.lessons.map((lessonId: string) => 
          getDoc(doc(db, "lessons", lessonId))
        );
        
        const lessonSnapshots = await Promise.all(lessonPromises || []);
        setLessons(lessonSnapshots.map(snap => snap.data()));
      } catch (error) {
        console.error("Error loading unit data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUnitData();
  }, [unitId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        {unitData?.title}
      </Text>
      
      <Text style={{ marginBottom: 20, color: '#666' }}>
        {unitData?.description || 'Completa las lecciones para avanzar'}
      </Text>
      
      {lessons.map((lesson, index) => (
        <LessonCard 
          key={lesson.id}
          lesson={lesson}
          index={index}
          // completed={/* Aquí puedes pasar si la lección está completada */}
        />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {

  },
  title: {

  },
  unitDescription: {

  },
  moduleTitle: {

  },
  unitCard: {

  },
  unitTitle: {

  },
});