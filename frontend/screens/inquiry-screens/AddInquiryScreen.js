import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';

export default function AddInquiryScreen({ navigation }) {
    const [customerName, setCustomerName] = useState('');
    const [customerEmailAddress, setCustomerEmailAddress] = useState('');
    const [customerMobileNumber, setCustomerMobileNumber] = useState('');
    const [type, setType] = useState('');
    const [customerMessage, setCustomerMessage] = useState('');

    const validateName = (name) => {
        return /^[A-Za-z\s]+$/.test(name);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateMobileNumber = (mobileNumber) => {
        return /^[0-9]{10}$/.test(mobileNumber);
    };

    const handleSubmit = async () => {

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
            await axios.post('https://plantme-backend.onrender.com/api/inquiry/', {
                customerName,
                customerEmailAddress,
                customerMobileNumber,
                type,
                customerMessage,
                status: "true",
            });
            Alert.alert('Success', 'Inquiry has been submitted successfully');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to submit inquiry. Please try again');
        }
    };

    const goToPolicyScreen = () => {
        navigation.navigate('Inquiry Policies');
    };

    return (
        <ImageBackground
            style={styles.backgroundImage}
            source={require('../../assets/bg-add.jpg')}
        >
            <View style={styles.container}>
                <Text style={styles.title}>We'll contact you!</Text>
                <Input
                    placeholder="Customer Name"
                    value={customerName}
                    onChangeText={setCustomerName}
                    style={styles.input}
                    validate={(value) => validateName(value)}
                    required
                />
                <Input
                    placeholder="Email Address"
                    value={customerEmailAddress}
                    onChangeText={setCustomerEmailAddress}
                    style={styles.input}
                    validate={(value) => validateEmail(value)}
                    required
                />
                <Input
                    placeholder="Mobile Number"
                    value={customerMobileNumber}
                    onChangeText={setCustomerMobileNumber}
                    style={styles.input}
                    validate={(value) => validateMobileNumber(value)}
                    required
                />
                <ModalDropdown
                    options={['Product Inquiry', 'Service Inquiry', 'General Inquiry']}
                    onSelect={(index, value) => setType(value)}
                    style={styles.modelDropdown}
                    textStyle={{ fontSize: 16 }}
                    dropdownTextStyle={{ fontSize: 16 }}
                    dropdownStyle={styles.dropdown}
                    defaultValue={'Select Type'}
                    required
                />
                <Input
                    placeholder="Message"
                    value={customerMessage}
                    onChangeText={setCustomerMessage}
                    style={styles.input}
                    multiline={true}
                    numberOfLines={3}
                    required
                />
                <Text style={{ fontSize: 18 }}>
                    By submitting a inquiry, you agree to our{' '}
                    <TouchableOpacity onPress={goToPolicyScreen}>
                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                            Terms and Conditions - Inquiry Policies
                        </Text>
                    </TouchableOpacity>
                    .
                </Text>
                <View style={styles.horizontalLine} />
                <Button title="Submit your Inquiry" onPress={handleSubmit} style={styles.button} />

            </View>
        </ImageBackground>
    );
}

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
        marginLeft: 10,
        width: '95%',
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
    horizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },

});
