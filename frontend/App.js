import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "./screens/CategoriesScreen";
import PlantsOverviewScreen from "./screens/PlantsOverviewScreen";
import ShowAllInquiriesScreen from "./screens/inquiry-screens/ShowAllInquiriesScreen";
import ShowSingleInquiryScreen from "./screens/inquiry-screens/ShowSingleInquiryScreen";
import AddInquiryScreen from "./screens/inquiry-screens/AddInquiryScreen";
import UpdateInquiryScreen from "./screens/inquiry-screens/UpdateInquiryScreen";
import ViewInquiryPoliciesScreen from "./screens/inquiry-screens/ViewInquiryPoliciesScreen";
import CategoriesScreenCustomer from "./screens/CategoriesScreenCustomer";
import PlantOverviewCustomer from "./screens/PlantOverviewCustomer";
import DeliveryForm from "./components/Delivery/deliveryDataSubmit";
import DeliveryList from "./components/Delivery/deliveryList";
import AddIcon from "./components/AddIcon";
import AddPlants from "./screens/AddPlants";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
import { Profile } from "./screens/Profile";
import { Users } from "./screens/Users";
import { Dashboard } from "./screens/Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={CategoriesScreen}
            options={({ navigation }) => ({
              title: "Plant Categories",
              headerRight: () => (
                <AddIcon
                  onPress={() => {
                    navigation.navigate("AddPlant");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen name="Plant" component={PlantsOverviewScreen} />
          <Stack.Screen
            name="AddPlant"
            component={AddPlants}
            options={{
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="PlantMe Inquiries"
            component={ShowAllInquiriesScreen}
          />
          <Stack.Screen
            name="Show Inquiry"
            component={ShowSingleInquiryScreen}
          />
          <Stack.Screen name="Create Inquiry" component={AddInquiryScreen} />
          <Stack.Screen name="Update Inquiry" component={UpdateInquiryScreen} />
          <Stack.Screen
            name="Inquiry Policies"
            component={ViewInquiryPoliciesScreen}
          />
          <Stack.Screen
            name="CustomerPlant"
            component={CategoriesScreenCustomer}
            options={{
              title: "Plant Categories",
            }}
          />
          <Stack.Screen name="Plants" component={PlantOverviewCustomer} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerBackVisible: false }}
          />
          <Stack.Screen
            name="DeliveryForm"
            component={DeliveryForm}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DeliveryList"
            component={DeliveryList}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
