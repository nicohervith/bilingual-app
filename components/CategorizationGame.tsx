import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Category {
  id: string;

  name: string;

  color?: string;
}

interface Item {
  id: string;

  text?: string;

  image?: string;

  category: string;
}
interface CategorizationGameProps {
  categories: Category[];
  items: Item[];
  title?: string;
  onComplete: () => void;
  isCompleted: boolean; // <-- Nueva Prop
}

const CategorizationGame = ({
  categories = [],
  items = [],
  title,
  onComplete,
  isCompleted, // <-- Desestructuración
}: CategorizationGameProps) => {
  // Sincronizamos el estado local con la prop inicial
  const [currentSelections, setCurrentSelections] = useState<{
    [itemId: string]: string;
  }>({});

  // Usamos la prop isCompleted para inicializar o bloquear
  const [gameCompleted, setGameCompleted] = useState(isCompleted);

  // Si la prop cambia externamente (ej: reseteo de lección), actualizamos el estado
  useEffect(() => {
    setGameCompleted(isCompleted);
  }, [isCompleted]);

  const totalItems = items.length;

  const handleCategorySelect = (itemId: string, categoryId: string) => {
    // Si ya está completado o la prop isCompleted es true, ignoramos clics
    if (gameCompleted || isCompleted) return;

    const newSelections = {
      ...currentSelections,
      [itemId]: categoryId,
    };

    setCurrentSelections(newSelections);

    if (Object.keys(newSelections).length === totalItems) {
      setGameCompleted(true);
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || "Clasifica los Elementos"}</Text>

      <View style={styles.itemsContainer}>
        {items.map((item: Item, index: number) => {
          const selectedCategoryId = currentSelections[item.id];
          const isSelected = !!selectedCategoryId;

          return (
            <View
              key={item.id}
              style={[
                styles.item,
                (isSelected || isCompleted) && styles.itemSelected,
              ]}
            >
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              ) : (
                <Text style={styles.itemTextFallback}>
                  {item.text || `Ítem ${index + 1}`}
                </Text>
              )}

              <View style={styles.categories}>
                {categories.map((cat: Category) => {
                  const isCategorySelected = selectedCategoryId === cat.id;

                  return (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryButton,
                        isCategorySelected && {
                          backgroundColor: cat.color || "#3498db",
                        },
                        // Estilo visual si ya está completado (opcional)
                        isCompleted &&
                          isCategorySelected &&
                          styles.completedButton,
                      ]}
                      onPress={() => handleCategorySelect(item.id, cat.id)}
                      // Deshabilitar botón si ya se completó
                      disabled={gameCompleted || isCompleted}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          isCategorySelected && styles.categoryTextSelected,
                        ]}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>

      {(gameCompleted || isCompleted) && (
        <View style={styles.successBadge}>
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          <Text style={styles.completedText}>¡Clasificación completada!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#2D3436",
  },
  itemsContainer: {
    width: "100%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 12,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  itemSelected: {
    borderColor: "#E1E8ED",
    backgroundColor: "#F1F3F5",
  },
  itemImage: {
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
  },
  itemTextFallback: {
    width: 70,
    marginRight: 15,
    fontSize: 14,
    fontWeight: "600",
    color: "#636E72",
    textAlign: "center",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "flex-start",
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    backgroundColor: "#EDF2F7",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CBD5E0",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4A5568",
  },
  categoryTextSelected: {
    color: "white",
  },
  completedButton: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  successBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 12,
    backgroundColor: "#EBFBEE",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D3F9D8",
  },
  completedText: {
    marginLeft: 8,
    color: "#2B8A3E",
    fontSize: 16,
    fontWeight: "700",
  },
  errorContainer: {
    padding: 20,
    color: "#E03131",
    textAlign: "center",
    backgroundColor: "#FFF5F5",
    borderRadius: 10,
    fontWeight: "bold",
  },
});

export default CategorizationGame;
