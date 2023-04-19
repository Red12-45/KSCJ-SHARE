import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const SubmitScreen = ({ navigation }) => {
  const [secret, setSecret] = useState("");

  const handleSubmit = async () => {
    if (secret.length < 30) {
      Alert.alert("Error", "Please describe in at least 30 characters.");

      return;
    }

    try {
      // const response = await fetch("http://localhost:3000/api/messages", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ secret }),
      // });

      const response = await fetch(
        "https://kscj-backend.herokuapp.com/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ secret }),
        }
      );

      if (response.ok) {
        setSecret("");
        navigation.navigate("Home"); // Add this line to navigate back to HomeScreen
      } else {
        Alert.alert("Error", "There was an issue submitting your secret.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an issue submitting your secret.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Share Your Thoughts</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        onChangeText={setSecret}
        value={secret}
        placeholder="Share your thoughts anonymously!"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SubmitScreen;
