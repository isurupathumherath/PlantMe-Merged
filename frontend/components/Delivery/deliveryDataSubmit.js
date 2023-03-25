import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import { Button, Icon, Header } from "react-native-elements";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const DeliveryForm = () => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const datePickerRef = useRef(null);

  const validateName = () => {
    if (!deliveryAddress) {
      Alert.alert("Error", "DeliveryAddress is required.");
    }
  };

  const validateMobileNo = () => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNo)) {
      Alert.alert("Error", "Mobile no should be a 10-digit number.");
    }
  };

  // handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.56:5000/api/delivery/",
        {
          itemName: itemName,
          quantity: quantity,
          Name: name,
          deliveryAddress: deliveryAddress,
          requiredDate: requiredDate,
          mobileNo: mobileNo,
        }
      );
      console.log(response.data);
      // clear form fields
      setItemName("");
      setQuantity("");
      setName("");
      setDeliveryAddress("");
      setRequiredDate("");
      setMobileNo("");
      Alert.alert("Success", "Delivery request submit successfully!", [
        { text: "OK", onPress: () => console.log("OK pressed") },
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDateChange = (date) => {
    setRequiredDate(date);
    setShowDatePicker(false);
  };
  const openDatePicker = () => {
    datePickerRef.current.open();
  };

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
          <TextInput
            style={styles.input}
            placeholder="Item name"
            value={itemName}
            onChangeText={setItemName}
            maxLength={50}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Delivery address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            multiline
            onBlur={validateName}
          />

          <TextInput
            style={styles.input}
            placeholder="Mobile no"
            value={mobileNo}
            onChangeText={setMobileNo}
            onBlur={validateMobileNo} // validate the mobile no field on blur
            keyboardType="phone-pad"
          />
          <Button
            title="Submit"
            buttonStyle={styles.button}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C571B",
  },

  formContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
  image: {
    flex: 2,
    marginTop: 10,
  },

  input: {
    marginTop: 50,
    marginBottom: 5,
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    color: "black",
    fontSize: 16,
    borderColor: "#27ae60",
    borderBottomColor: "#27ae60",
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  button: {
    marginTop: 50,
    backgroundColor: "#27ae60",
    marginVertical: 10,
    borderRadius: 10,
    padding: 12,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  dateContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 150,
    opacity: 2,
    padding: 5,
  },
  icon: {
    position: "absolute", // Position the icon
    top: 40, // Add some top spacing
    right: 20, // Add some right spacing
    zIndex: 1,
  },
});

export default DeliveryForm;
