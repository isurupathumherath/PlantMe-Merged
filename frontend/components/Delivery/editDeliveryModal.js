import React, { useState } from "react";
import { Modal, View, TextInput, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";

const editDeliveryModal = ({ visible, delivery, onSave, onCancel }) => {
  const [name, setName] = useState(delivery.itemName);
  const [deliveryAddress, setDeliveryAddress] = useState(
    delivery.deliveryAddress
  );
  const [mobileNo, setMobileNo] = useState(delivery.mobileNo);

  const handleSave = () => {
    onSave({
      ...delivery,
      itemName: name,
      deliveryAddress: deliveryAddress,
      mobileNo: mobileNo,
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text h4>Edit Delivery</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Delivery Address"
          value={deliveryAddress}
          onChangeText={setDeliveryAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={mobileNo}
          onChangeText={setMobileNo}
        />
        <View style={styles.buttonsContainer}>
          <Button title="Cancel" onPress={onCancel} />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginVertical: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
  },
});

export default editDeliveryModal;
