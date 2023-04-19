import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import moment from "moment";

const HomeScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchMessages();
    }, [])
  );

  const fetchMessages = async () => {
    try {
      // const response = await fetch("http://192.168.150.138:3000/api/messages");
      const response = await fetch(
        "https://kscj-backend.herokuapp.com/api/messages"
      );

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.header}>KSCJ SHARE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Submit")}
      >
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{item.secrets}</Text>
            <Text style={styles.postDate}>
              <Text>{"\n"}</Text>
              Posted {moment(item.createdAt).fromNow()}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
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
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 7,
    color: "#333",
    textShadowColor: "#8d9da1",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  button: {
    backgroundColor: "#fff",

    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 50,
    marginBottom: 20,
    borderColor: "#333",
    borderWidth: 2,
  },
  buttonText: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
  },
  messageContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 10,
    marginTop: 20,
    margin: 20,
    marginBottom: 8,
    width: "90%",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 10,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignSelf: "center",
  },
  message: {
    fontSize: 15,
  },
  postDate: {
    color: "rgb(47, 149, 130)",
    fontWeight: "500",
    fontSize: 12,
    alignSelf: "flex-end",
  },
});

export default HomeScreen;
