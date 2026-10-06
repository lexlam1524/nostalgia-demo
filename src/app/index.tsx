import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [memoryText, setMemoryText] = useState("");
  const [sealedMemory, setSealedMemory] = useState<string | null>(null);

  function sealMemory() {
    setSealedMemory(memoryText);
    setMemoryText("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nostalgia Demo</Text>

      <Text style={styles.label}>Write a memory</Text>

      <TextInput
        style={styles.input}
        value={memoryText}
        onChangeText={setMemoryText}
        placeholder="Something you want to meet again later..."
        multiline
      />

      <Button title="Seal memory" onPress={sealMemory} />

      {sealedMemory && (
        <View style={styles.sealedBox}>
          <Text style={styles.label}>Sealed memory:</Text>
          <Text>{sealedMemory}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f7f2ea",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#c9bfae",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fffaf3",
    marginBottom: 16,
    textAlignVertical: "top",
  },
  sealedBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#efe3d0",
  },
});