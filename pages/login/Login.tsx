import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Button, Image, Switch, Alert, TouchableOpacity, Text, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Color, FontSize, LoginInput, IUser, TokenType, Sport, globalStyles} from '../../global';
import { createUser, fetchUser, fetchUsers} from '../../serverGateway';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Turbulence } from '@shopify/react-native-skia';


const CryptoJS = require('crypto-js');

//Crypto Source: https://stackoverflow.com/questions/48524452/base64-encoder-via-crypto-js

//Encrypting text
export function encrypt(text: string) {
  const encodedWord = CryptoJS.enc.Utf8.parse(text); // encodedWord Array object
  const encoded = CryptoJS.enc.Base64.stringify(encodedWord)
  return encoded
}

// Decrypting text
export function decrypt(text: string) {
  const encodedWord = CryptoJS.enc.Base64.parse(text) // encodedWord via Base64.parse()
  const decoded = CryptoJS.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
  return decoded;
}


export interface ILoginProps {
  setUser: (user: IUser) => void,
    navigation?: NavigationProp<any,any>
}

export const Login = (props: ILoginProps) => {

  const {navigation, setUser} = props;

  const [isSignup, setSignup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const staticImage = require("./trendex.png");

  const attemptLogIn = async (username: string, password: string) => {
    const encryptResult = encrypt(password);
    const result = await fetchUser(username, encryptResult);
    if (result[1] == "success") {
      console.log("successful login")
      props.setUser(result[0])
    } else {
      Alert.alert('Alert Title', 'Username or Password Incorrect - Please Try Again', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ])
    }
  }

  const getMessage = () => {
    if (!isSignup) {
      return <Text style={styles.buttonSwitchText}>Already have an account? <Pressable onPress={() => {setSignup(true)}}><Text style={styles.button}>Sign In</Text></Pressable></Text>
    } else {
      return <Text style={styles.buttonSwitchText}>Don't have an account? <Pressable onPress={() => {setSignup(false)}}><Text style={styles.button}>Create Account</Text></Pressable></Text>
    }
  }

  return (
    <View style={styles.container}>
      <Image 
        source={staticImage}
        style={styles.image}
      ></Image>
      {isSignup ? <View style={styles.formContainer}>
      <LoginInput
        title={"Username"}
        onChangeText={setUsername}
        value={username}
        secure={false}
      />
      <LoginInput
        title={"Password"}
        onChangeText={setPassword}
        value={password}
        secure={true}
      />
      {/* <Button
        title="Login"
        onPress={() => attemptLogIn(username, password)}
        color={Color.VARIANT_1}
      /> */}
      <TouchableOpacity style={globalStyles.buttonV2}
onPress={() => {attemptLogIn(username, password)}}
        >
            <Text style={globalStyles.buttonTextV2}>
              Log In
            </Text>
        </TouchableOpacity>
      <Button
        title="Forgot Password"
        color={Color.GRAY_2}
        onPress={() => console.log("Forgot password")}
      />
      </View> : 
      <View style={styles.formContainer}>
        <LoginInput
          title={"Email"}
          onChangeText={setEmail}
          value={email}
          secure={false}
        />
        <LoginInput
          title={"Username"}
          onChangeText={setUsername}
          value={username}
          secure={false}
        />
        <LoginInput
          title={"Password"}
          onChangeText={setPassword}
          secure={true}
          value={password}
        />
        <LoginInput
          title={"Confirm Password"}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secure={true}
        />
        <TouchableOpacity style={globalStyles.buttonV2}

onPress={() => {
  if (password == confirmPassword) {
    createUser({
      username: username.trim().toLowerCase(),
      password: encrypt(password),
      email: email,
      balance: 300,
      tokens: [],
      watchlist: []
    })
    Alert.alert('Alert Title', 'Profile Successfully Created - Please Log In To Begin Trading', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ])
    attemptLogIn(username.trim().toLowerCase(), password);
  } else {
    Alert.alert("Password do not match", "Passwords do not match")
  }
}}
        >
            <Text style={globalStyles.buttonTextV2}>
              Sign Up
            </Text>
        </TouchableOpacity>
      </View>
      }
      <StatusBar hidden = {false} backgroundColor = {Color.GRAY_1} translucent = {true}/>
      <View style={styles.switchText}>
        {getMessage()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.GRAY_2,
        alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      // marginTop: 30
    },
    formContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    header: {
      color: 'red',
      fontWeight: 'bold',
      fontSize: FontSize.LARGE
  },
  image: {
    width: '65%',
    height: 100,
    minHeight: 100,
    maxHeight: 100,
    resizeMode: "contain",
  },
  button: {
    color: Color.VARIANT_2
  },
  buttonSwitchText: {
    color: Color.TEXT_ON_DARK_VARIANT
  },
  switchText: {
    position: 'absolute',
    justifySelf: 'flex-end',
    alignSelf: 'center',
    bottom: 20,
    color: Color.TEXT_ON_DARK_VARIANT
  }
});