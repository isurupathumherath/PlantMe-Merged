import React, { useState, useEffect } from 'react';
import { StyleSheet, View,Text, Alert, TouchableOpacity, ImageBackground , Modal ,TextInput} from 'react-native';
import { Input, Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const AddPlants = ({ navigation }) => {

    const [plantName, setplantName] = useState('');
    const [description, setdescription] = useState('');
    const [ category, setcategory] = useState('');
    const [ price, setprice] = useState('');
    const [imageUrl, setimageUrl] = useState('');

    const handleSubmit = async () => {
        console.log('submitted');
        try {
            await axios.post('https://plantme-backend.onrender.com/api/plant', {
                plantName,
                description,
                price,
                category,
                imageUrl,
            });
            fetchPlants();
            Alert.alert('Success', 'Plant has been submitted successfully');
            Clear();
            navigation.goBack();
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to submit inquiry. Please try again');
        }
    };

    
    const fetchPlants = async () => {
        // Fetch all inquiries from backend API
        fetch('https://plantme-backend.onrender.com/api/plant')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch(error => console.error(error));
    };

    const validateAndSubmit = () => {
            const choosenNumber = parseInt(price);
            if(plantName.trim() === '' || description.trim() === '' || category.trim() === '' || price.trim() === '' || imageUrl.trim() === '') {
                Alert.alert('Error', 'Please fill in all the fields!');
            }else if (isNaN(choosenNumber) || choosenNumber <= 0){
                Alert.alert('Error', 'Price Must be valied Number!');
            }else {
                handleSubmit();
            }
    };

    const Clear = () => {
        setplantName('');
        setdescription('');
        setcategory('');
        setprice('');
        setimageUrl('');
    };

  return (
   
    <ImageBackground
    style={styles.backgroundImage}
    source={require('../assets/tree.jpg')}
>
<View style={styles.container}>
<Text style={styles.title}></Text>
<TextInput
    placeholder="Plant Name"
    value={plantName}
    onChangeText={setplantName}
    style={styles.textInput}
/>

<TextInput
    placeholder="Plant Price"
    value={price}
    onChangeText={setprice}
    style={styles.textInput}
/>

<Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) =>
          setcategory(itemValue)
        }
        style={styles.textInput}
      >
        <Picker.Item label="Trees" value="c1" />
        <Picker.Item label="shrubs" value="c2" />
        <Picker.Item label="vines" value="c3" />
        <Picker.Item label="herbs" value="c4" />
        <Picker.Item label="vegetables" value="c5" />
        <Picker.Item label="culinary herbs" value="c6" />
        <Picker.Item label="medicinal plants" value="c7" />
        <Picker.Item label="ornamental plants" value="c8" />
        <Picker.Item label="tropical" value="c9" />
        <Picker.Item label="temperate" value="c10" />
      </Picker>


<TextInput
    placeholder="Image  Url"
    value={imageUrl}
    onChangeText={setimageUrl}
    style={styles.textInput}
/>
<TextInput
    placeholder="Description"
    value={description}
    onChangeText={setdescription}
    style={styles.textInput}
    multiline={true}
    numberOfLines={3}
/>
<View style={styles.button}>
<Button title="Submit" onPress={validateAndSubmit} style={styles.button} />
</View>



</View>
</ImageBackground>
   
  )
}

export default AddPlants;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
       
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 15,
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
        marginTop: 30,
        width: '50%',
        marginLeft: 20,
       
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
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        marginLeft: 20,
        padding: 10,
        width: '90%',
        marginTop: 25,
        borderRadius: 7,
        borderColor: 'white',
        backgroundColor: 'white',
        color: '#120438',
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: {width:0 , height: 2},
        overflow: "hidden",
        fontSize: 16,

    }

});
