import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Platform,
  Alert,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/Storage";

const intialCountables = [
  { name: "Crow", count: 0 },
  { name: "Woodpecker", count: 3 },
];

export default function App() {
  const [countables, setCountables] = useState(intialCountables);

  useEffect(() => {
    loadCountables().then((result) => {
      const { data: countables, message } = result;
      setCountables(countables);
      if (message) {
        Alert.alert("Info", message)
      }
    })
  }, []);

  const changeCounts = (amount, index) => {
    const newState = [...countables];
    //Check to not allow negative values
    if (newState[index].count === 0 && amount === -1) {
      Alert.alert("Error", "Views can't be of negative value");
      // Return without adding the amount
      return;
    }
    newState[index].count += amount;
    setCountables(newState);
    saveCountables(newState);
  };

  const addNewCountable = (name) => {
    const newState = [...countables, { name, count: 0 }];
    setCountables(newState);
    saveCountables(newState);
    Keyboard.dismiss();
  };

  // // Sort the countables array by name
  // const sortedCountables = [...countables].sort((a,b) =>
  //   a.name.localeCompare(b.name)
  // );

  // https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {countables.map((countable, index) => (
            <CountableRow
              countable={countable}
              key={countable.name}
              changeCounts={changeCounts}
              index={index}
            />
          ))}
          <View style={{ flex: 1 }} />
        </ScrollView>
        <AddRow countables={countables} addNewCountable={addNewCountable} />
        <StatusBar style="auto" />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
});
