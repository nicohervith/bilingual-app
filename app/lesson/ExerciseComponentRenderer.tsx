import SentenceBuilder from "@/components/content/SentenceBuilder";
import ConjugationExercise from "@/components/exercises/ConjugationExercise";
import DragDropExercise from "@/components/exercises/DragAndDropExercise";
import FillBlankExercise from "@/components/exercises/FillBlankExercise";
import ImageSelectionExercise from "@/components/exercises/ImageSelectionExercise";
import ListeningExercise from "@/components/exercises/ListeningExercise";
import MatchingExercise from "@/components/exercises/MatchingExercise";
import AudioMatchingGame from "@/components/games/AudioMatchingGame";
import AudioToImageMatching from "@/components/games/AudioToImageMatching";
import CalendarPlanner from "@/components/games/CalendarPlanner";
import CategorizationGame from "@/components/games/CategorizationGame";
import DialogueSimulation from "@/components/games/DialogueSimulation";
import MapInteractive from "@/components/games/MapInteractive";
import MemoryGame from "@/components/games/MemoryGame";
import NumbersGame from "@/components/games/NumbersGame";
import { PronunciationGame } from "@/components/games/PronunciationGame";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { Exercise } from "./exerciseConfig";
import { CommonExerciseProps } from "./types";

interface ExerciseComponentProps extends CommonExerciseProps {
  exercise: Exercise;
  index: number;
  lessonContent: any;
  exerciseData: Record<number, any>;
  onExerciseData: (index: number, data: any) => void;
}

export const ExerciseComponentRenderer: React.FC<ExerciseComponentProps> = ({
  exercise,
  index,
  lessonContent,
  exerciseData,
  onExerciseData,
  ...commonProps
}) => {
  console.log(`Renderizando ejercicio ${index}:`, {
    type: exercise.type,
    id: exercise.id,
  });

  const handleExerciseData = (data: any) => {
    onExerciseData(index, data);
  };

  try {
    switch (exercise.type) {
      case "audio_matching":
        if (!exercise.config) {
          return (
            <View style={{ padding: 16 }}>
              <Text>Configuración del ejercicio no válida</Text>
              <TouchableOpacity onPress={commonProps.onComplete}>
                <Text>Continuar</Text>
              </TouchableOpacity>
            </View>
          );
        }

        return exercise.config.mode === "audio_to_image" ? (
          <AudioToImageMatching {...commonProps} config={exercise.config} />
        ) : (
          <AudioMatchingGame
            {...commonProps}
            config={exercise.config}
            vocabulary={lessonContent.vocabulary}
          />
        );

      case "pronunciation":
        return <PronunciationGame {...commonProps} config={exercise.config} />;

      case "conjugation":
        return (
          <ConjugationExercise {...commonProps} config={exercise.config} />
        );

      case "sentence_formation":
        return (
          <SentenceBuilder
            {...commonProps}
            config={exercise.config}
            completedWords={exerciseData[index]?.selectedWords || []}
            onExerciseData={handleExerciseData}
          />
        );

      case "numbers_game":
        return (
          <NumbersGame
            {...commonProps}
            vocabulary={exercise.config.vocabulary}
            range={exercise.config.range}
            imageBaseUrl={exercise.config.imageBaseUrl}
          />
        );

      case "drag_drop":
        return (
          <DragDropExercise
            {...commonProps}
            dragItems={exercise.config.dragItems}
            dropZones={exercise.config.dropZones}
            instructions={exercise.config.instructions}
            question={exercise.config.question}
          />
        );

      case "memory_game":
        return (
          <MemoryGame
            {...commonProps}
            pairs={exercise.config.pairs}
            config={exercise.config}
          />
        );

      case "matching":
        return (
          <MatchingExercise
            {...commonProps}
            pairs={exercise.config.pairs}
            vocabulary={exercise.config.vocabulary}
            title={exercise.config.title}
          />
        );

      case "fill_in_blank":
        // Verificar que questions existe
        if (
          !exercise.config?.questions ||
          exercise.config.questions.length === 0
        ) {
          console.warn("fill_in_blank: No questions provided", exercise);
          return (
            <View style={{ padding: 16 }}>
              <Text>No hay preguntas disponibles para este ejercicio.</Text>
              <TouchableOpacity onPress={commonProps.onComplete}>
                <Text>Continuar</Text>
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <FillBlankExercise
            {...commonProps}
            questions={exercise.config.questions}
          />
        );

      case "image_selection":
        return (
          <ImageSelectionExercise {...commonProps} config={exercise.config} />
        );

      case "listening_transcription":
        return <ListeningExercise {...commonProps} config={exercise.config} />;

      case "vocabulary":
        return (
          <CategorizationGame
            {...commonProps}
            categories={exercise.config.categories}
            items={exercise.config.items}
            title={exercise.config.title}
          />
        );

      case "map_interactive":
        return <MapInteractive {...commonProps} config={exercise.config} />;

      case "calendar_planner":
        return <CalendarPlanner {...commonProps} config={exercise.config} />;

      case "dialogue_simulation":
        return <DialogueSimulation {...commonProps} config={exercise.config} />;

      default:
        console.warn(`Tipo de ejercicio no soportado: ${exercise.type}`);
        return (
          <View style={{ padding: 16 }}>
            <Text>Tipo de ejercicio no soportado: {exercise.type}</Text>
          </View>
        );
    }
  } catch (error) {
    console.error(`Error renderizando ejercicio ${index}:`, error);
    return (
      <View style={{ padding: 16 }}>
        <Text>Error cargando el ejercicio</Text>
        <TouchableOpacity onPress={commonProps.onComplete}>
          <Text>Continuar</Text>
        </TouchableOpacity>
      </View>
    );
  }
};
