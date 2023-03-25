import {CATEGORIES} from '../data/dummy-data';
import { FlatList , ImageBackground, StyleSheet} from 'react-native';
import CategoryGridTitle from '../components/CategoryGridTitle';



function CategoriesScreen ({navigation}) {
  function renderData(itemData){
    function pressHandler(){
      console.log(itemData.item.imageUrl);
          navigation.navigate('Plant',{
            categoryId:itemData.item.id,
          });
    }
      return <CategoryGridTitle title={itemData.item.title} color={itemData.item.color} imageUrl={itemData.item.imageUrl}   onPress={pressHandler}/>;
  }
  return (
    <ImageBackground
    style={styles.backgroundImage}
    source={require('../assets/tree.jpg')}
>
    <FlatList 
        data={CATEGORIES} 
        keyExtractor={(item) => item.id}
        renderItem={renderData}
        numColumns={2}
    />
    </ImageBackground>
  )
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
},
});