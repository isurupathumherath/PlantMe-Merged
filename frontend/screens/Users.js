import React, { useState, useEffect } from "react";
import apiInstance from "../utils/apiInstance";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { IconButton, Icon, NativeBaseProvider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export const Users = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const handleDelete = async (id) => {
    await apiInstance
      .delete(`/api/user/${id}`)
      .then(async (res) => {
        if (res?.status === 200) {
          setUsers(users.filter((u) => u._id !== id));
          alert("Profile delete success!");
        } else {
          alert("Oops... Something went wrong!");
        }
      })
      .catch(() => {
        alert("Oops... Something went wrong!");
      });
  };

  useEffect(() => {
    const init = async () => {
      apiInstance
        .get("/api/user/me")
        .then(async (res) => {
          if (res?.status === 200 && res.data?.data) {
            setUser(res.data.data);
          } else setError("Oops... Something went wrong");
        })
        .catch(() => setError("Oops... Something went wrong"));
      await apiInstance
        .get("/api/user")
        .then(async (res) => {
          if (res?.status === 200 && res.data?.data) {
            setUsers(res.data.data);
          } else setError("Oops... Something went wrong");
        })
        .catch(() => setError("Oops... Something went wrong"))
        .finally(() => setLoading(false));
    };
    init();
  }, []);

  const Item = ({ item }) => {
    return (
      <View style={styles.row}>
        <View>
          <Text style={styles.h4}>{item.name}</Text>
          <Text style={[styles.h4, styles.lightGray]}>{item.email}</Text>
          <Text style={styles.lightGray}>{item.mobile}</Text>
          <Text style={styles.role}>{item.role?.split("_").join(" ")}</Text>
        </View>
        {user?._id !== item?._id && (
          <View>
            <IconButton
              onPress={() => handleDelete(item?._id)}
              icon={<Icon as={MaterialIcons} name="delete-outline" />}
              borderRadius="full"
              _icon={{
                color: "black",
                size: "sm",
              }}
              _pressed={{
                bg: "black:alpha.20",
              }}
              _ios={{
                _icon: {
                  size: "lg",
                },
              }}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.body}
    >
      <View style={styles.container}>
        {loading ? (
          <View style={styles.centeredBox}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={styles.innerContainer}>
            {error ? (
              <Text>{error}</Text>
            ) : (
              <NativeBaseProvider>
                <FlatList
                  data={users}
                  keyExtractor={(item) => item._id}
                  renderItem={Item}
                />
              </NativeBaseProvider>
            )}
          </View>
        )}
      </View>
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
    fontWeight: "500",
  },
  lightGray: {
    color: "rgba(0, 0, 0, 0.4)",
  },
  role: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.6)",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.055)",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginBottom: 10,
  },
});
