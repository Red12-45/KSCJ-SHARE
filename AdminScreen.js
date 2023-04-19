import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

const AdminScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchMessages();
    }, [])
  );

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://kscj-backend.herokuapp.com/api/messages"
      );

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(
        `https://kscj-backend.herokuapp.com/api/messages/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setMessages(messages.filter((message) => message._id !== id));
        Alert.alert(" ", "Post Deleted");
      } else {
        Alert.alert("Error", "Failed to delete the message.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete the message.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.header}>Admin Panel</Text>
      </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{item.secrets}</Text>
            <View style={styles.postInfo}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteMessage(item._id)}
              >
                <AntDesign name="delete" size={16} color="red" />
              </TouchableOpacity>
              <Text style={styles.postDate}>
                Posted {moment(item.createdAt).fromNow()}
              </Text>
            </View>
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
    margin: 20,
    marginBottom: 10,
    width: "90%",
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
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});

export default AdminScreen;
