import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveCountables = async (countables) => {
  // A function to save countables to async storage
  const jsonCountables = JSON.stringify(countables); // Convert countables to a JSON string
  await AsyncStorage.setItem("countables", jsonCountables); // Save the JSON string to async storage
};

// This function loads countables from the async storage
export async function loadCountables() {
  try {
    // AsyncStorage.clear();
    // Get the countables from the async storage
    const value = await AsyncStorage.getItem("countables");
    // Check if there are countables to retrieve
    if (value !== null) {
      // If countables exist, parse the JSON string to an object
      const countables = JSON.parse(value);
      // Return an object containing the countables data
      return { data: countables };
    } else {
      // If no countables are found, return a message and an empty array
      const message = "No items in list yet";
      return { data: [], message };
    }
  } catch (error) {
    // If an error occurs, log the error and return an object with a message
    console.error(error);
    return { message: "Failed to load countables" };
  }
}
