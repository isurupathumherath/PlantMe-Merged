import React, { useState, useEffect } from "react";
import apiInstance from "../utils/apiInstance";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export const Signup = ({ navigation }) => {
  const data = [
    { label: "Super Admin", value: "SUPER_ADMIN" },
    { label: "Admin", value: "ADMIN" },
    { label: "Consumer", value: "CONSUMER" },
  ];

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [role, setRole] = useState(null);
  const [code, setCode] = useState(null);
  const [password, setPassword] = useState(null);

  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const reset = () => {
    setName(null);
    setEmail(null);
    setMobile(null);
    setRole(null);
    setCode(null);
    setPassword(null);
  };

  const handleRegister = async () => {
    if (!name) alert("Please, enter a name");
    else if (!String(email).match(emailRegEx)) {
      alert("Please, enter a valid email");
    } else if (!mobile) alert("Please, enter a mobile number");
    else if (!role) alert("Please, select a role");
    else if (
      !((role === "SUPER_ADMIN" || role === "ADMIN") && code?.length === 4)
    )
      alert("Please, enter the code");
    else if (!password && password.length() > 6)
      alert("Please, enter a valid password");
    else {
      await apiInstance
        .post("/api/user/", {
          name,
          email,
          mobile,
          role,
          password,
        })
        .then(async (res) => {
          if (res?.status === 200) {
            reset();
            alert("Registration success!");
          } else {
            alert("Oops... Something went wrong!");
          }
        })
        .catch(() => {
          alert("Oops... Something went wrong!");
        });
    }
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.body}
    >
      <Image source={require("../assets/bg-all.jpg")} style={styles.cover} />
      <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.coverTextContainer}>
            <Text style={styles.h4}>Welcome to</Text>
            <Text style={styles.h3}>the plantme</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            keyboardType="default"
            underlineColorAndroid="transparent"
            value={name}
            onChangeText={(name) => setName(name)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            keyboardType="phone-pad"
            underlineColorAndroid="transparent"
            value={mobile}
            onChangeText={(mobile) => setMobile(mobile)}
          />
          <Dropdown
            style={styles.dropdown}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Role"
            value={role}
            onChange={(item) => {
              setRole(item.value);
            }}
          />
          {(role === "SUPER_ADMIN" || role === "ADMIN") && (
            <TextInput
              style={styles.input}
              placeholder="Code"
              keyboardType="number-pad"
              underlineColorAndroid="transparent"
              value={code}
              onChangeText={(code) => setCode(code)}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Password"
            keyboardType="visible-password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableHighlight style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableHighlight>
          <View style={styles.row}>
            <Text>Already have an account?</Text>
            <TouchableHighlight
              style={styles.transparentButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.signupText}>Login</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  body: {
    height: "100%",
    display: "flex",
  },
  cover: {
    display: "flex",
    height: "100%",
    maxHeight: "26%",
    resizeMode: "cover",
    width: "100%",
  },
  container: {
    display: "flex",
    height: "74%",
    flexDirection: "column",
    padding: 30,
  },
  innerContainer: {
    display: "flex",
    height: "100%",
  },
  coverTextContainer: {
    marginBottom: 20,
  },
  h4: {
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center",
  },
  h3: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -2,
  },
  input: {
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 14,
    fontSize: 16,
    borderRadius: 8,
    marginVertical: 6,
  },
  button: {
    backgroundColor: "#000000",
    paddingHorizontal: 10,
    paddingVertical: 14,
    fontSize: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  transparentButton: {
    backgroundColor: "transparent",
  },
  signupText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 3,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
  },
  dropdown: {
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
});
