import React, { useState, useEffect } from "react";
import apiInstance from "../utils/apiInstance";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { IconButton, Icon, NativeBaseProvider } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Dashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
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

  const Tile = ({ icon, path, title }) => {
    return (
      <View style={styles.tile}>
        <IconButton
          onPress={async () => {
            if (path === "Login") {
              await AsyncStorage.removeItem("token");
            }
            navigation.navigate(path);
          }}
          icon={<Icon as={MaterialCommunityIcons} name={icon} />}
          borderRadius="full"
          _icon={{
            color: "black",
            size: "lg",
          }}
          _pressed={{
            bg: "black:alpha.20",
          }}
          _ios={{
            _icon: {
              size: "2xl",
            },
          }}
        />
        <Text>{title}</Text>
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
                <View style={styles.wrapper}>
                  <Tile
                    icon="shield-account-outline"
                    path="Profile"
                    title={user?.name}
                  />
                  <View style={styles.row}>
                    {user?.role === "ADMIN" && (
                      <Tile icon="shopping-outline" path="Home" title="Plants" />
                    )}
                    {user?.role === "CONSUMER" && (
                      <Tile icon="truck-delivery" path="DeliveryList" title="Delivery" />
                    )}
                    {user?.role === "ADMIN" && (
                      <Tile icon="disqus" path="PlantMe Inquiries" title="Inquiries" />
                    )}
                    {user?.role === "CONSUMER" && (
                      <Tile icon="disqus" path="Create Inquiry" title="Inquiries" />
                    )}
                     {user?.role === "CONSUMER" && (
                      <Tile icon="shopping-outline" path="CustomerPlant" title="Plants" />
                    )}
                    {user?.role === "SUPER_ADMIN" && (
                      <Tile icon="account-group" path="Users" title="Users" />
                    )}
                    <Tile icon="power" path="Login" title="Logout" />
                  </View>
                </View>
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
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },
  tile: {
    display: "flex",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.055)",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginBottom: 10,
  },
  h4: {
    fontSize: 20,
    fontWeight: "500",
  },
  lightGray: {
    color: "rgba(0, 0, 0, 0.4)",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
});
