import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Discover, Investments, Login, Profile } from './pages';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Color, IUser } from './global';
import { BlurView } from 'expo-blur';
import './config/firebase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { Header } from './global/components/Header';


export enum Page {
  LOGIN = 'Login',
  PROFILE = 'Profile',
  NOTIFICATIONS = 'Notifications',
  INVESTMENTS = 'Investments',
  DISCOVER = 'Discover',
}

const BottomTab = createBottomTabNavigator();
const UserStack = createNativeStackNavigator();

const TrendexTabs = () => {
  return (
    <View style={styles.container}>
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case Page.LOGIN:
              iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
              break;
            case Page.INVESTMENTS:
              iconName = focused ? 'ios-logo-usd' : 'ios-logo-usd';
              break;
            case Page.DISCOVER:
                iconName = focused ? 'ios-search' : 'ios-search-outline';
                break;
            case Page.PROFILE:
                iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
                break;
            default:
              iconName = focused ? 'ios-man' : 'ios-man-outline';
              break;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return <Header title={title}/>;
        },
        tabBarActiveTintColor: Color.VARIANT_1,
        tabBarInactiveTintColor: Color.TEXT_ON_DARK,
        tabBarStyle: { 
          position: 'absolute',
          border: 'none'
        },
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill} />
        )
      })}>
      <BottomTab.Screen name={Page.INVESTMENTS} component={Investments} />
      <BottomTab.Screen name={Page.DISCOVER} component={Discover} />
      <BottomTab.Screen name={Page.PROFILE} component={Profile} />
    </BottomTab.Navigator>
    </View>
  );
}

export default function App() {

  // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<IUser>({
    username: "username",
    password: "password",
    email: "test@trendex.com"
  });

  // Handle user state changes
  // function onAuthStateChangedTrigger(user: any) {
  //   console.log("user: ", user);
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }
  // const auth = getAuth();

  // console.log(auth);

  // useEffect(() => {
  //   const subscriber = onAuthStateChanged(auth, onAuthStateChangedTrigger);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return null;

  const setUserProfile = (username: string, password: string) => { 
    setUser({
      username: username,
      password: password,
      email: username
    })
    console.log(username, password);
  }

  if (!user) {
    return <Login setUser={setUserProfile}/>
  } 
  
  return (
    <NavigationContainer>
      <TrendexTabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.GRAY_1,
  },
});
