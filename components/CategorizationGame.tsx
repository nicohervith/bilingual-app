import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

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
}

const CategorizationGame = ({
  categories = [],
  items = [],
  title,
  onComplete,
}: CategorizationGameProps) => {
  // 1. VALIDACIÓN DE ROBUSTEZ (La fuente de tu error actual)
  if (!Array.isArray(categories) || categories.length === 0) {
    // Este mensaje solo se muestra si el array categories es [] o no es un array.
    return (
      <Text style={styles.errorContainer}>
        Error: Configuración de categorías faltante o vacía.
      </Text>
    );
  }
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <Text style={styles.errorContainer}>
        Error: Configuración de ítems faltante o vacía.
      </Text>
    );
  }

  const [currentSelections, setCurrentSelections] = useState<{
    [itemId: string]: string;
  }>({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const totalItems = items.length;

  const handleCategorySelect = (itemId: string, categoryId: string) => {
    if (gameCompleted) return;

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
      {/* Título Dinámico */}
      <Text style={styles.title}>{title || "Clasifica los Elementos"}</Text>

      <View style={styles.itemsContainer}>
        {items.map((item: Item, index: number) => {
          const isSelected = !!currentSelections[item.id];
          const selectedCategoryId = currentSelections[item.id];

          const ItemContent = () => {
            if (item.image) {
              return (
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              );
            }
            // Usa text si no hay imagen
            return (
              <Text style={styles.itemTextFallback}>
                {item.text || `Ítem ${index + 1}`}
              </Text>
            );
          };

          return (
            <View
              key={item.id}
              style={[styles.item, isSelected && styles.itemSelected]}
            >
              <ItemContent />

              <View style={styles.categories}>
                {categories.map((cat: Category) => {
                  const isCategorySelected = selectedCategoryId === cat.id;

                  return (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryButton,
                        // Acceso seguro a las propiedades del objeto 'cat'
                        isCategorySelected && {
                          backgroundColor: cat.color || "#3498db",
                        },
                      ]}
                      onPress={() => handleCategorySelect(item.id, cat.id)}
                      disabled={gameCompleted}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          isCategorySelected && styles.categoryTextSelected,
                        ]}
                      >
                        {cat.name} {/* <--- Accede a cat.name */}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>

      {gameCompleted && (
        <Text style={styles.completedText}>¡Clasificación completada!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  itemsContainer: {
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    resizeMode: "contain",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  categoryButton: {
    padding: 8,
    margin: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  selectedCategory: {
    backgroundColor: "#a5d6a7",
  },
  completedText: {
    marginTop: 10,
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
  },
  categoryText: {},
  categoryTextSelected: {},
  itemSelected: {},
  itemTextFallback: {},
  errorContainer:{},
});

export default CategorizationGame;
