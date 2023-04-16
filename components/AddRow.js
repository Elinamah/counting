import { useState } from "react";
import { View, TextInput, Alert } from "react-native";

import { CountButton } from "./CountButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ countables, addNewCountable }) => {
  // Define a state variable "name" to store the input value
  const [name, setName] = useState("");

  // Define a function "handleAddCountable" to handle the "Add" button press
  const handleAddCountable = () => {
    // Check if a countable with the same name already exists
    if (countables.find((countable) => countable.name === name)) {
      // Display an error message if a countable with the same name already exists
      Alert.alert("Error", "A bird of that name already exists");
      // Return without adding the countable
      return;
    }
    if (name === "") {
      // Display an error message if name value is empty
      Alert.alert("Error", "A bird name must be entered");
      // Return without adding the countable
      return;
    }
    // Call the "addNewCountable" function with the input value
    addNewCountable(name);
    // Reset the input value to an empty string
    setName("");
  };

  return (
    <View style={CommonStyles.row}>
      <TextInput
        placeholder="Enter a name"
        onChangeText={setName}
        value={name}
        style={CommonStyles.textItem}
      />
      <CountButton text="ADD" submit={handleAddCountable} />
    </View>
  );
};
