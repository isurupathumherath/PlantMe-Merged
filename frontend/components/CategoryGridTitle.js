import { Pressable, View , Text ,StyleSheet, ImageBackground } from "react-native"
//require('../assets/plant2.jpg')

function CategoryGridTitle ({title,color,imageUrl,onPress}) {
  
  return (
    
    <View style={styles.gridItem }>
      
        <Pressable android_ripple={{color: '#ccc'}} style={({pressed}) => [
           styles.button,
           pressed ? styles.buttonPressed : null,
           ]}
           onPress={onPress}
           >
            <ImageBackground source={require('../assets/plant2.jpg')} style={styles.image}>
            <View style={[styles.innerContainer]}>
                <Text style={styles.title}>{title}</Text>
            </View>
            </ImageBackground>
        </Pressable>
     
    </View>
   
  )
}

export default CategoryGridTitle;

const styles = StyleSheet.create({
        gridItem: {
          flex: 1,
          margin:16,
          height: 150,
          borderRadius: 8,
          elevation: 4,
          shadowColor: "black",
          shadowOpacity: 0.25,
          backgroundColor: "white",
          shadowRadius: 8,
          shadowOffset: {width:0 , height: 2},
          overflow: "hidden",

        },
        image: {
          flex: 1,
          resizeMode: 'cover',
          opacity: 0.6,
        },
        button:{
          flex: 1,
        },
        buttonPressed: {
            opacity: 0.5
        },
        innerContainer: {
          flex: 1,
          padding: 16,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
        },
        title: {
          fontWeight: "bold",
          fontSize: 19,
          color: "white",
        }

});