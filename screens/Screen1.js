import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const users = [
  { email: "abc", password: "123" },
  { email: "user2@example.com", password: "password2" },
  { email: "user3@example.com", password: "password3" },
  { email: "user4@example.com", password: "password4" },
  { email: "user5@example.com", password: "password5" },
];
const LoginScreen = () => {
  const [email, setEmail] = React.useState("abc");
  const [password, setPassword] = React.useState("123");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.headerText} variant="headlineLarge">
        Hello Again!
      </Text>
      <Text style={styles.subText}>Log into your account</Text>

      <TextInput
        mode="outlined"
        placeholder="Enter your email address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        left={<TextInput.Icon icon="email-outline" />}
        // left={<Image source={require("../assets/Data/Vector.png")} />} // Text input không hiệu nghiệm vs image
        style={styles.input}
        textColor="#000"
      />

      <TextInput
        mode="outlined"
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!passwordVisible}
        left={<TextInput.Icon icon="lock-outline" />}
        right={
          <TextInput.Icon
            icon={passwordVisible ? "eye-off" : "eye"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
        textColor="#000"
        style={styles.input}
      />

      <Text style={styles.forgotPasswordText}>Forgot password?</Text>

      <Button
        mode="contained"
        onPress={() => {
          if (
            users.find(
              (user) => user.email === email && user.password === password
            )
          ) {
            console.log("Login successful");
            navigation.navigate("Screen2");
          } else {
            console.log("Login failed");
          }
        }}
        style={styles.continueButton}
      >
        Continue
      </Button>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
        <FontAwesome.Button
          name="google"
          backgroundColor="red"
          onPress={() => console.log("Google pressed")}
        />
        <FontAwesome.Button
          name="facebook"
          backgroundColor="blue"
          onPress={() => console.log("Facebook pressed")}
        />
        <FontAwesome.Button
          name="apple"
          backgroundColor="black"
          onPress={() => console.log("Apple pressed")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
    color: "#000",
  },
  subText: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "#00bcd4",
    marginBottom: 24,
  },
  continueButton: {
    marginBottom: 24,
    backgroundColor: "#00bcd4",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 8,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
});

export default LoginScreen;
