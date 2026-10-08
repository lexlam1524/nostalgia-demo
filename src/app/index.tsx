import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type UnlockOption = {
  label: string;
  durationMs: number;
};

type Memory = {
  id: string;
  text: string;
  createdAt: number;
  unlockAt: number;
};

const unlockOptions: UnlockOption[] = [
  { label: "1 minute", durationMs: 60 * 1000 },
  { label: "1 day", durationMs: 24 * 60 * 60 * 1000 },
  { label: "1 week", durationMs: 7 * 24 * 60 * 60 * 1000 },
];

export default function HomeScreen() {
  const [memoryText, setMemoryText] = useState("");
  const [selectedUnlockOption, setSelectedUnlockOption] = useState(unlockOptions[0]);
  const [sealedMemory, setSealedMemory] = useState<Memory | null>(null);

  function sealMemory() {
    const trimmedMemory = memoryText.trim();

    if (!trimmedMemory) {
      return;
    }

    const createdAt = Date.now();

    setSealedMemory({
      id: createdAt.toString(),
      text: trimmedMemory,
      createdAt,
      unlockAt: createdAt + selectedUnlockOption.durationMs,
    });
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

      <Text style={styles.label}>Unlock after</Text>

      <View style={styles.optionRow}>
        {unlockOptions.map((option) => {
          const isSelected = option.label === selectedUnlockOption.label;

          return (
            <Pressable
              key={option.label}
              style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
              onPress={() => setSelectedUnlockOption(option)}
            >
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Button title="Seal memory" onPress={sealMemory} />

      {sealedMemory && (
        <View style={styles.sealedBox}>
          <Text style={styles.label}>Sealed memory:</Text>
          <Text>{sealedMemory.text}</Text>
          <Text style={styles.unlockText}>
            Unlocks at {new Date(sealedMemory.unlockAt).toLocaleString()}
          </Text>
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
  optionRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#c9bfae",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fffaf3",
  },
  optionButtonSelected: {
    borderColor: "#6f4e37",
    backgroundColor: "#6f4e37",
  },
  optionText: {
    color: "#3f3428",
    fontWeight: "600",
  },
  optionTextSelected: {
    color: "#fffaf3",
  },
  sealedBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#efe3d0",
  },
  unlockText: {
    marginTop: 8,
    color: "#6f4e37",
    fontWeight: "600",
  },
});
