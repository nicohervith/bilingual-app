import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MatchingExercise({
  pairs,
  onComplete,
}: {
  pairs: any[];
  onComplete: () => void;
}) {
  const [matchedPairs, setMatchedPairs] = useState<number>(0);

  const handleMatch = () => {
    const newCount = matchedPairs + 1;
    setMatchedPairs(newCount);

    if (newCount === pairs.length) {
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empareja las palabras</Text>
      {pairs.map((pair, index) => (
        <TouchableOpacity key={index} onPress={handleMatch} style={styles.pair}>
          <Text>{pair.from}</Text>
          <Text>→</Text>
          <Text>{pair.to}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  pair:{
    
  }
});
