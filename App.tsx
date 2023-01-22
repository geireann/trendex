import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Discover, Investments, Login, Profile } from './pages';
import { Button, Modal, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Color, IAthlete, IUser, Sport, TokenType} from './global';
import { BlurView } from 'expo-blur';
import './config/firebase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { Header } from './global/components/Header';
import { Athlete } from './pages/athlete';

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

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return <Header title={title}/>;
        },
        tabBarActiveTintColor: Color.VARIANT_2,
        tabBarInactiveTintColor: Color.TEXT_ON_DARK,
        tabBarStyle: { 
          position: 'absolute',
          border: 'none'
        },
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill} />
        )
      })}>
        <BottomTab.Screen name={Page.INVESTMENTS}>
          {(_) => <Investments setAthlete={props.setAthlete} currentUser={props.currentUser} setUser={props.setUser}/>}
        </BottomTab.Screen>
        <BottomTab.Screen name={Page.DISCOVER}>
          {(_) => <Discover setAthlete={props.setAthlete}/>}
        </BottomTab.Screen>
        <BottomTab.Screen name={Page.PROFILE}>
          {(_) => <Profile user={props.currentUser} setUser={props.setUser}/>}
        </BottomTab.Screen>
    </BottomTab.Navigator>
    </View>
  );
}

export default function App() {

  // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
    email: "",
    balance: 100,
    tokens: [],
    watchlist: []
  });

  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [athlete, setAthlete] = useState<IAthlete | undefined>();
  const [balance, setBalance] = useState<number>(0);

  // const setUserProfile = (user: IUser) => { 
  //   setUser(user)
  //   console.log(user.username)
  // }

  if (user.username == "") {
    return <Login setUser={setUser}/>
  } 
  
  
  return (
    <NavigationContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={athlete !== undefined}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setAthlete(undefined);
        }}
      >
        {athlete && <Athlete user={user} setUser={setUser} setAthlete={setAthlete} 
        athlete={athlete} />}
      </Modal>
      <TrendexTabs setAthlete={setAthlete} currentUser={user} setUser={setUser}/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.GRAY_1,
    overflow: 'hidden'
  },
});