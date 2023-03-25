import { View , Text, Pressable, Image,StyleSheet , Alert} from "react-native"
import DeleteIcon from "./DeleteIcon";
import UpdateIcon from "./UpdateIcon";
import { useState , useEffect} from 'react';
import UpdatePlants from "../screens/UpdatePlants";
import DeleteDialog from "./DeleteDialog";
import axios from 'axios';

const PlantItem = ({title,imageUrl,price,category,plantid,description, visibility, setvisibility,item,setcurrentPlant}) => {

    const [showAlert , setShowAlert] = useState(false);

    const handleAlert = () => {
            //setShowAlert(true);
            console.log("deleteButtonPressed!!!!");
           if(showAlert) {
            Alert.alert(
                'Delete Data',
                'Are you sure you want to delete the data?',
                [
                  {text: 'Cancel', onPress: handleCancel, style: 'cancel'},
                  {text: 'OK', onPress: deleteHandler},
                ],
                {   cancelable: false,
                    style: styles.alertStyle,
                   // titleStyle: styles.alertTitleStyle,
                   // messageStyle: styles.alertMessageStyle,
                   // buttonStyle: styles.alertButtonStyle,
                  //  buttonTextStyle: styles.alertButtonTextStyle,
                },
              )
           }
               
    }
    useEffect(() => {
        setShowAlert(true);
    },[handleAlert]);

    const handleCancel = () => {
        setShowAlert(false);
    }

    function deleteHandler(){
        axios.delete(`https://plantme-backend.onrender.com/api/plant/${plantid}`)
            .then(response => {
                    console.log('Plant deleted successfully');
                    fetchPlants();
                    setShowAlert(false);
            })
            .catch(error => {
                console.error(error);
                setShowAlert(false);
             });

            
            console.log("deleteButtonPressed");     
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

    function updateHandler(){
        setcurrentPlant(item);
        setvisibility(true);
        console.log("updateButtonPressed");
    };

    function updateHandlerSubmit(){
        console.log("updateButtonPressed-2");
    };

  return (
  <View style={styles.Plant} >
    <Pressable android_ripple={{color: '#ccc'}} style={({pressed}) => 
           pressed ? styles.buttonPressed : null}>
        <View>
        <View>
            <Image source={{uri: imageUrl}}  style={styles.image}/>
        <Text style={styles.title}>{title}</Text>
        </View>
        
    
        <View  style={styles.description}>
        <View style={styles.details}>
            <Text style={styles.detailsItem}>{description}</Text>
           
        </View>
            <View style={styles.details}>
            <Text style={styles.detailsItem}>Rs : {price}.00</Text>
            </View>
        </View>
        
        <View style={styles.iconStyle}>
                <DeleteIcon onPress={handleAlert} />
                <UpdateIcon onPress={updateHandler}/>
                
               
        </View>
        </View>
        </Pressable>
  </View>
  )
}

export default PlantItem;

const styles = StyleSheet.create({
    Plant: {
        margin: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.35,
        shadowRadius: 16,
        shadowOffset: {width:0 , height: 2},
},
innerContainer:{
        borderRadius: 8,
        overflow: "hidden",
},
image: {
    width: '100%',
    height: 200,
},
title: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize:18,
    margin: 18,
},
details:{
    flexDirection: 'row',
    textAlign: 'left',
    padding: 10,
},
detailsItem:{
        marginHorizontal: 12,
        fontSize: 12,

},
buttonPressed: {
    opacity: 0.5
},
iconStyle:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 4,
},

  alertStyle: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 20,
  },
  description: {
    flexDirection: 'column',
  }
  
});