import {useLayoutEffect , useState, useEffect} from 'react';
import { View , FlatList, Text, StyleSheet,ActivityIndicator,ImageBackground} from "react-native";
import { CATEGORIES} from "../data/dummy-data";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import EmptyScreenView from '../components/EmptyScreenView';
import PlantItemCustomer from '../components/PlantItemCustomer';

const PlantOverviewCustomer = ({route , navigation}) => {
    const navigation2 = useNavigation();
    const isFocused = useIsFocused();
    const [plants, setplants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [plantId , setPlantId] = useState('');
    const [currentPlant, setcurrentPlant] = useState({});
    const [visibility, setvisibility] = useState(false);
    const id = route.params.categoryId;
    const displayplants2 = plants.filter((plant) => {
        return plant.category === id;
    });
    


    useEffect(() => {
        if (isFocused) {
            fetchPlants();
            console.log('Screen is focused, refreshing data...');
        }
        
        console.log(plants);
    }, [isFocused]);
    

  

    const fetchPlants = async () => {
        setIsLoading(true);
        fetch('https://plantme-backend.onrender.com/api/plant')
            .then(response => response.json())
            .then((data) => {
                setplants(data.data);
            })
            .catch(error => console.error(error))
            .finally(() => {
                setIsLoading(false);
              });
    };

    useLayoutEffect(() => {
        const catTitle = CATEGORIES.find((category)=> category.id === id).title;
    
        navigation.setOptions({
            title: catTitle,
        });   
        
    },[id,navigation]);



   

    function renderPlantItem (itemData){
        const item = itemData.item;
       //setPlantId(item._id);
       // setcurrentPlant(item);
        const plantItemprops = {
            title: item.plantName,
            imageUrl: item.imageUrl,
            price: item.price,
            category: item.category,
            plantid: item._id,
            description: item.description
        }
            return <PlantItemCustomer {...plantItemprops} visibility={visibility}  setvisibility={setvisibility} item={item} setcurrentPlant={setcurrentPlant}/>
    }

  return (
    <ImageBackground
    style={styles.backgroundImage}
    source={require('../assets/tree.jpg')}
>
   <View style={styles.container}>
           {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
 
           {!isLoading && <FlatList data={plants.filter((plant) => {
        return plant.category === id;
    })} keyExtractor={(item) => item._id} renderItem={renderPlantItem}/>}
    {(plants.filter((plant) => {
        return plant.category === id;
    }).length === 0 && !isLoading) &&
               <EmptyScreenView />
    }
        
        
    

   </View>
   </ImageBackground>
  )
}

export default PlantOverviewCustomer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', 
    },

});