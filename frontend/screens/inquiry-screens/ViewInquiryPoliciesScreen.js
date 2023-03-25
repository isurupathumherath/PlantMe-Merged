import React from 'react';
import { View, Text, Linking, StyleSheet, ImageBackground } from 'react-native';

const ViewInquiryPoliciesScreen = () => {
    return (
        <ImageBackground
        style={styles.backgroundImage}
        source={require('../../assets/bg-all.png')}
    >
        <View style={styles.container}>
            <Text style={styles.title}>Inquiry Policies</Text>
            <Text style={styles.paragraph}>
                In here we provide an overview of the inquiry policies of our organization.
            </Text>
            <Text style={styles.subTitle}>Privacy Policy</Text>
            <Text style={styles.paragraph}>
                We take privacy seriously and are committed to protecting the personal information of our customers.
            </Text>
            <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/isurupathumherath')}>
                Read our privacy policy
            </Text>
            <Text style={styles.subTitle}>Refund Policy</Text>
            <Text style={styles.paragraph}>
                We have a refund policy in place to ensure customer satisfaction.
            </Text>
            <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/isurupathumherath')}>
                Read our refund policy
            </Text>
            <Text style={styles.subTitle}>Terms of Service</Text>
            <Text style={styles.paragraph}>
                By using our services, you agree to our terms of service.
            </Text>
            <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/isurupathumherath')}>
                Read our terms of service
            </Text>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch', // or 'stretch'
    },
});

export default ViewInquiryPoliciesScreen;
