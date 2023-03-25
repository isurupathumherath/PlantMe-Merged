import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, navigation, ImageBackground } from 'react-native';
import { useRoute, useNavigation,useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const ShowSingleInquiryScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [inquiry, setInquiry] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchInquiry();
            console.log('Screen is focused, refreshing data...');
        }
    }, [isFocused]);

    const fetchInquiry = async () => {
        try {
            const { id } = route.params;
            const response = await axios.get(
                `https://plantme-backend.onrender.com/api/inquiry/${id}`
            );
            setInquiry(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!inquiry) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const closeInquiry = async () => {
        // make API request to update the status of the inquiry
        try {
            const response = await axios.put(`https://plantme-backend.onrender.com/api/inquiry/${inquiry._id}`, {
                ...inquiry,
                status: false,
            });
            setInquiry(response.data);
            Alert.alert('Success', 'Inquiry has been Closed successfully');
            fetchInquiry();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteInquiry = async () => {
        // make API request to delete the inquiry
        try {
            // send delete request to the backend API to delete the inquiry
            await fetch(`https://plantme-backend.onrender.com/api/inquiry/${inquiry._id}`, {
                method: 'DELETE'
            });

            // redirect the user back to the show all inquiries screen after deleting the inquiry
            navigation.navigate('PlatMe Inquiries');
            Alert.alert('Error', 'Inquiry has been deleted successfully');
        } catch (error) {
            console.error('Error deleting inquiry:', error);
        }
    }

    const handleDeleteInquiry = () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this inquiry?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        deleteInquiry();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleCloseInquiry = () => {
        Alert.alert(
            'Confirm Closing',
            'Are you sure you want to close this inquiry?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Close',
                    style: 'destructive',
                    onPress: () => {
                        closeInquiry();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleUpdatePress = (id) => {
        // Navigate to ShowSingleInquiryScreen with the inquiry ID
        navigation.navigate('Update Inquiry', { id: id });
    };

    return (
        <ImageBackground
                style={styles.backgroundImage}
                source={require('../../assets/bg-single.jpg')}
            >
        <View style={styles.container}>
            <Text style={styles.title}>{inquiry.type}</Text>
            <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Customer Name</Text>
                    <Text>{inquiry.customerName}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Email Address</Text>
                    <Text>{inquiry.customerEmailAddress}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Mobile Number</Text>
                    <Text>{inquiry.customerMobileNumber}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Type</Text>
                    <Text>{inquiry.type}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Status</Text>
                    <Text>{inquiry.status ? 'Open' : 'Closed'}</Text>
                </View>
            </View>
            <View style={styles.messageContainer}>
                <Text style={styles.messageHeader}>Message:</Text>
                <Text style={styles.messageText}>{inquiry.customerMessage}</Text>
            </View>


            <View style={styles.horizontalLine} />
            <Button
                title="Update Inquiry"
                onPress={() => handleUpdatePress(inquiry._id)}
                buttonStyle={styles.closeButton}
            />
            <View style={styles.horizontalLine} />
            <View style={styles.buttonsContainer}>
                <Button
                    title="Close Inquiry"
                    onPress={handleCloseInquiry}
                    buttonStyle={styles.closeButton}
                />
                <View style={styles.horizontalLine} />
                <Button
                    title="Delete Inquiry"
                    onPress={handleDeleteInquiry}
                    buttonStyle={styles.deleteButton}
                />
            </View>
            <View style={styles.horizontalLine} />
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
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center",

    },
    tableContainer: {
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    tableHeader: {
        fontWeight: 'bold',
    },
    messageContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    messageHeader: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageText: {
        textAlign: 'justify',
    },
    horizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    closeButton: {
        backgroundColor: '#ffae42',
        borderRadius: 5,
        padding: 10,
        width: '45%',
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        borderRadius: 5,
        padding: 10,
        width: '45%',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch', // or 'stretch'
    },
});

export default ShowSingleInquiryScreen;
