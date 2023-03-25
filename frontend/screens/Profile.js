import React, { useState, useEffect } from "react";
import apiInstance from "../utils/apiInstance";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export const Profile = () => {
  const initialState = {
    _id: null,
    name: null,
    email: null,
    mobile: null,
    role: null,
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(initialState);

  const handleUpdate = async () => {
    if (!user.name) alert("Please, enter a name");
    else if (!user.mobile) alert("Please, enter a mobile number");
    else {
      await apiInstance
        .put(`/api/user/${user._id}`, {
          name: user.name,
          mobile: user.mobile,
        })
        .then(async (res) => {
          if (res?.status === 200) {
            alert("Profile update success!");
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
    setUser(initialState);
    const init = async () => {
      await apiInstance
        .get("/api/user/me")
        .then(async (res) => {
          if (res?.status === 200 && res.data?.data) {
            setUser(res.data.data);
          } else setError("Oops... Something went wrong");
        })
        .catch(() => setError("Oops... Something went wrong"))
        .finally(() => setLoading(false));
    };
    init();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.body}
    >
      <ScrollView style={styles.container}>
        {loading ? (
          <View style={styles.centeredBox}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={styles.innerContainer}>
            {error ? (
              <Text>{error}</Text>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  keyboardType="default"
                  underlineColorAndroid="transparent"
                  value={user.name}
                  onChangeText={(name) => setUser({ ...user, name })}
                />
                <Text style={styles.disabledInput}>{user.email}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Mobile"
                  keyboardType="phone-pad"
                  underlineColorAndroid="transparent"
                  value={user.mobile}
                  onChangeText={(mobile) => setUser({ ...user, mobile })}
                />
                <Text style={styles.disabledInput}>
                  {user.role?.split("_").join(" ")}
                </Text>
                <TouchableHighlight
                  style={styles.button}
                  onPress={handleUpdate}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableHighlight>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  body: {
    height: "100%",
    display: "flex",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 30,
  },
  innerContainer: {
    display: "flex",
    height: "100%",
  },
  centeredBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  disabledInput: {
    borderColor: "rgba(0, 0, 0, 0.055)",
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
});
