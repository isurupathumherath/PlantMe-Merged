import { View , Text, Pressable, Image,StyleSheet , Alert} from "react-native"


const PlantItemCustomer = ({title,imageUrl,price,category,plantid,description, visibility, setvisibility,item,setcurrentPlant}) => {
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
            <Text style={styles.detailsItem}>Rs : {price}</Text>
            </View>
        </View>
        
       
        </View>
        </Pressable>
  </View>
  )
}

export default PlantItemCustomer;

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