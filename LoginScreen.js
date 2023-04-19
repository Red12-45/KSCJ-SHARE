import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Input, Button } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef();

  const handleLogin = () => {
    if (email === "admin" && password === "admin") {
      navigation.navigate("Admin");
    } else {
      Alert.alert(
        "Invalid Credentials",
        "Please enter a valid username and password.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animatable.View
        animation="fadeInDown"
        duration={1500}
        style={styles.header}
      >
        <Text style={styles.text_header}>Only For Admin</Text>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={1500}
        style={styles.footer}
      >
        <Input
          ref={inputRef}
          label="Email"
          labelStyle={styles.label}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
          leftIcon={{ type: "material", name: "email", color: "#05375a" }}
        />
        <Input
          label="Password"
          labelStyle={styles.label}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
          leftIcon={{ type: "material", name: "lock", color: "#05375a" }}
        />
        <Button
          title="Login"
          onPress={handleLogin}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05375a",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  label: {
    color: "#05375a",
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#05375a",
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default LoginScreen;
