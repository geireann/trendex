import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Discover, IInvestmentsProps, Investments, Login, Profile } from './pages';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Color } from './global';
import { BlurView } from 'expo-blur';
import './config/firebase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export enum Page {
  LOGIN = 'Login',
  PROFILE = 'Profile',
  NOTIFICATIONS = 'Notifications',
  INVESTMENTS = 'Investments',
  DISCOVER = 'Discover',
}

const BottomTab = createBottomTabNavigator();
const UserStack = createNativeStackNavigator();

const TrendexTabs = (props: any) => {
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
        tabBarActiveTintColor: Color.VARIANT_1,
        tabBarInactiveTintColor: Color.TEXT_ON_DARK,
        tabBarStyle: { 
          position: 'absolute',
          border: 'none'
        },
        headerTitleStyle: styles.header,
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill} />
    ),
    headerTransparent: true,
        headerBackground: () => (
            <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill} />
          ),
      })}>
      <BottomTab.Screen name={Page.INVESTMENTS} component={Investments}/>
      <BottomTab.Screen name={Page.DISCOVER} component={Discover} />
      <BottomTab.Screen name={Page.PROFILE} component={Profile} />
    </BottomTab.Navigator>
    </View>
  );
}

export default function App() {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<string>('');
  const [tokens, setTokens] = useState(null);

  // Handle user state changes
  function onAuthStateChangedTrigger(user: any) {
    console.log("user: ", user);
    setUser(user);
    if (initializing) setInitializing(false);
  }
  const auth = getAuth();

  console.log(auth);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChangedTrigger);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const setUserProfile = (username: string, password: string) => {
    console.log(username, password);
    setUser(username + '-test');
  }

  if (!user) {
    return <Login setUser={setUserProfile}/>
  } 
  
  return (
    <NavigationContainer>
      <TrendexTabs user={user}/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.GRAY_1,
  },
  header: {
    color: Color.TEXT_ON_DARK
  }
});
