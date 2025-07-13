import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const CategorizationGame = ({ categories, items, onComplete }: any) => {
  const [currentSelections, setCurrentSelections] = useState<{
    [key: string]: string;
  }>({});
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleCategorySelect = (itemImage: string, category: string) => {
    const newSelections = {
      ...currentSelections,
      [itemImage]: category,
    };

    setCurrentSelections(newSelections);

    if (Object.keys(newSelections).length === items.length) {
      setGameCompleted(true);
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clasifica los alimentos</Text>

      <View style={styles.itemsContainer}>
        {items.map((item: any, index: number) => (
          <View key={index} style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.categories}>
              {categories.map((cat: string, i: number) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.categoryButton,
                    currentSelections[item.image] === cat &&
                      styles.selectedCategory,
                  ]}
                  onPress={() => handleCategorySelect(item.image, cat)}
                >
                  <Text>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>

      {gameCompleted && (
        <Text style={styles.completedText}>¡Juego completado!</Text>
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
});

export default CategorizationGame;
