import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Alert, ScrollView } from "react-native";
import { ListItem, Icon, Image, Button } from "react-native-elements";
import axios from "axios";
import EditDeliveryModal from "./editDeliveryModal";

const API_ENDPOINT = "http://192.168.1.56:5000/api/delivery/";

const DeliveryList = () => {
  const [data, setData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    axios
      .get(API_ENDPOINT)
      .then((response) => {
        setData(response.data.data.deliveries);
        console.log(response.data.data.deliveries);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEdit = (item) => {
    setEditItem(item);
    setEditModalVisible(true);
  };

  const handleSave = () => {
    axios
      .put(`${API_ENDPOINT}${editItem._id}`, editItem)
      .then((response) => {
        console.log(response.data);
        setData(
          data.map((delivery) =>
            delivery._id === editItem._id
              ? response.data.data.delivery
              : delivery
          )
        );
        setEditModalVisible(false);
      })
      .catch((error) => console.log(error));
  };
  const handleDelete = (item) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            axios
              .delete(`${API_ENDPOINT}${item._id}`)
              .then((response) => {
                console.log(response.data);
                setData(data.filter((delivery) => delivery._id !== item._id));
              })
              .catch((error) => console.log(error));
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <ListItem bottomDivider containerStyle={styles.listItemContainer}>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{item.itemName}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {item.status}
        </ListItem.Subtitle>
      </ListItem.Content>
      <View style={styles.buttonsContainer}>
        <Button
          icon={<Icon name="edit" color="#fff" />}
          buttonStyle={styles.editButton}
          onPress={() => handleEdit(item)}
        />
        <Button
          icon={<Icon name="delete" color="#fff" />}
          buttonStyle={styles.deleteButton}
          onPress={() => handleDelete(item)}
        />
      </View>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <Icon
        name="menu"
        type="entypo"
        color="#fff"
        size={30}
        containerStyle={styles.icon}
      />
      <Image
        style={styles.image}
        source={require("../../assets/plantBack.png")}
      />
      <ScrollView>
        <View style={styles.formContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0C571B",
    marginTop: 0,
  },
  formContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
  listContainer: {
    marginTop: 50,
    paddingBottom: 20,
  },
  listItemContainer: {
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  image: {
    flex: 2,
    marginTop: 10,
  },
  image: {
    height: 150,
    opacity: 2,
    padding: 5,
  },
  icon: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#63EA79",
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default DeliveryList;
