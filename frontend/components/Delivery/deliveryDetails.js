import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import axios from "axios";

const API_ENDPOINT = "http://192.168.1.56:5000/api/delivery/";

const DeliveryDetails = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}${itemId}`)
      .then((response) => {
        setDelivery(response.data.data.delivery);
        console.log(response.data.data.delivery);
      })
      .catch((error) => console.log(error));
  }, [itemId]);

  const handleEdit = () => {
    navigation.navigate("EditDelivery", { delivery });
  };

  const handleDelete = () => {
    axios
      .delete(`${API_ENDPOINT}${itemId}`)
      .then((response) => {
        console.log(response.data);
        navigation.goBack();
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      {delivery ? (
        <View style={styles.deliveryContainer}>
          <Text style={styles.title}>{delivery.itemName}</Text>
          <Text style={styles.subtitle}>{delivery.status}</Text>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.info}>{delivery.quantity}</Text>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.info}>{delivery.Name}</Text>
          <Button title="Edit" onPress={handleEdit} />
          <Button title="Delete" onPress={handleDelete} />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  deliveryContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#0C571B",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
  },
  info: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
});

export default DeliveryDetails;
