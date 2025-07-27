import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import MovieDetails from '../screens/details';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="home"
        component={HomeScreen}
      />
      <Stack.Screen name="details" component={MovieDetails} />
    </Stack.Navigator>
  );
};
