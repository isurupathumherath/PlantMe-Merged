import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';

const UpdateInquiryScreen = ({ route, navigation }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerEmailAddress, setCustomerEmailAddress] = useState('');
    const [customerMobileNumber, setCustomerMobileNumber] = useState('');
    const [type, setType] = useState('');
    const [customerMessage, setCustomerMessage] = useState('');

    const { id } = route.params;

    const validateName = (name) => {
        return /^[A-Za-z\s]+$/.test(name);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateMobileNumber = (mobileNumber) => {
        return /^[0-9]{10}$/.test(mobileNumber);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://plantme-backend.onrender.com/api/inquiry/${id}`);
            setCustomerName(response.data.data.customerName);
            setCustomerEmailAddress(response.data.data.customerEmailAddress);
            setCustomerMobileNumber(response.data.data.customerMobileNumber);
            setType(response.data.data.type);
            setCustomerMessage(response.data.data.customerMessage);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {

        if (!customerName || !validateName(customerName)) {
            alert('Please enter a valid name');
            return;
        }

        if (!customerEmailAddress || !validateEmail(customerEmailAddress)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!customerMobileNumber || !validateMobileNumber(customerMobileNumber)) {
            alert('Please enter a valid mobile number');
            return;
        }

        if (!type) {
            alert('Please select a type');
            return;
        }

        if (!customerMessage) {
            alert('Please enter a message');
            return;
        }

        try {
            await axios.put(`https://plantme-backend.onrender.com/api/inquiry/${id}`, {
                customerName,
                customerEmailAddress,
                customerMobileNumber,
                type,
                customerMessage,
            });
            Alert.alert('Inquiry updated successfully!');
            navigation.navigate('Show Inquiry', { id });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ImageBackground
        style={styles.backgroundImage}
        source={require('../../assets/bg-all.png')}
    >
        <View style={styles.container}>
            <Text style={styles.title}>Anything to Change?</Text>
            <TextInput
                placeholder="Customer Name"
                value={customerName}
                onChangeText={setCustomerName}
                style={styles.input}
                validate={(value) => validateName(value)}
                required
            />
            <TextInput
                placeholder="Email Address"
                value={customerEmailAddress}
                onChangeText={setCustomerEmailAddress}
                validate={(value) => validateEmail(value)}
                style={styles.input}
                required
            />
            <TextInput
                placeholder="Mobile Number"
                value={customerMobileNumber}
                onChangeText={setCustomerMobileNumber}
                validate={(value) => validateMobileNumber(value)}
                style={styles.input}
                required
            />
            <ModalDropdown
                options={['Product Inquiry', 'Service Inquiry', 'General Inquiry']}
                onSelect={(index, value) => setType(value)}
                style={styles.modelDropdown}
                textStyle={{ fontSize: 16 }}
                dropdownTextStyle={{ fontSize: 16 }}
                dropdownStyle={styles.dropdown}
                defaultValue={type}
                required
            />
            <TextInput
                placeholder="Message"
                value={customerMessage}
                onChangeText={setCustomerMessage}
                style={[styles.input, styles.messageInput]}
                multiline={true}
                numberOfLines={4}
                required
            />
            <Button title="Update" onPress={handleUpdate} style={styles.button} />
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
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray',
        marginBottom: 10,
        width: '100%',
    },
    modelDropdown: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray',
        marginBottom: 10,
        marginLeft: 0,
        width: '100%',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
    },
    dropdown: {
        width: '100%',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch', // or 'stretch'
    },
});

export default UpdateInquiryScreen;
