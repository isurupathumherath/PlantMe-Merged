import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  ImageBackground,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const ShowAllInquiriesScreen = () => {
  const navigation = useNavigation();
  const [inquiries, setInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchInquiries();
      console.log("Screen is focused, refreshing data...");
    }
  }, [isFocused]);

  const fetchInquiries = async () => {
    // Fetch all inquiries from backend API
    fetch("https://plantme-backend.onrender.com/api/inquiry/")
      .then((response) => response.json())
      .then((data) => setInquiries(data.data))
      .catch((error) => console.error(error));
  };

  // function to handle refresh button press
  const handleRefresh = () => {
    fetchInquiries();
  };

  const handleInquiryPress = (id) => {
    // Navigate to ShowSingleInquiryScreen with the inquiry ID
    navigation.navigate("Show Inquiry", { id: id });
  };

  const createInquiryPress = () => {
    // Navigate to AddInquiryScreen
    navigation.navigate("Create Inquiry");
  };

  const renderInquiryItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleInquiryPress(item._id)}
        style={styles.item}
      >
        <Text style={styles.itemTitle}>{item.type}</Text>
        <View style={styles.containerView}>
          <View style={styles.left}>
            <Text>{item.status ? "Open" : "Closed"}</Text>
          </View>
          <View style={styles.right}>
            <Text>{item.customerName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleFilter = (status) => {
    setStatusFilter(status);
  };

  const filteredInquiries = statusFilter
    ? inquiries.filter((inquiry) => inquiry.status === statusFilter)
    : inquiries;

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../../assets/bg-all.jpg")}
    >
      <View style={styles.container}>
        <Text style={styles.title}>All Inquiries</Text>
        <TouchableOpacity style={styles.button} onPress={handleRefresh}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "rgba(255, 255, 255, 1)", borderRadius: 8 }}
          >
            <Button
              title="All"
              onPress={() => handleFilter(null)}
            />
            <Button title="Closed" onPress={() => handleFilter(false)} />
            <Button title="Open" onPress={() => handleFilter(true)} />
          </View>
          <Text style={styles.buttonText}>Refrsh</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <Button title="Create Inquiry" onPress={createInquiryPress} />
        <View style={styles.horizontalLine} />
        {inquiries.length > 0 ? (
          <FlatList
            data={filteredInquiries}
            renderItem={renderInquiryItem}
            keyExtractor={(item) => item._id}
            style={styles.list}
          />
        ) : (
          <Text>No inquiries found.</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    flexGrow: 0,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "gray",
    marginBottom: 10,
  },
  itemTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  containerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flex: 1,
    marginRight: 10,
  },
  right: {
    flex: 1,
    marginLeft: "10%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "stretch", // or 'stretch'
  },
});

export default ShowAllInquiriesScreen;
