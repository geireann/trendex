import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Button, Image, Switch, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Color, FontSize, LoginInput, IUser, TokenType, Sport} from '../../global';
import { createUser, fetchUser, fetchUsers} from '../../serverGateway';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {crypto, key, iv} from '../../App'


// Crypto source https://www.tutorialspoint.com/encrypt-and-decrypt-data-in-nodejs
export interface EncryptedDict {
  iv: string;
  encryptedData: string;
}

//Encrypting text
function encrypt(text: string) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString(), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
function decrypt(text: EncryptedDict) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
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


  const toggleSwitch = () => {
    setSignup(!isSignup);
  }

  const staticImage = require("./trendex.png");

  const attemptLogIn = async (username: string, password: string) => {
    const encryptResult = encrypt(password);
    const result = await fetchUser(username, encryptResult.encryptedData);
    if (result[1] == "success") {
      setUser(result[0])
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

  return (
    <View style={styles.container}>
      <Image 
        source={staticImage}
        style={styles.image}
      ></Image>
      <Switch onValueChange={toggleSwitch} value={isSignup}></Switch>
      {isSignup ? <View style={styles.formContainer}>
      <LoginInput
        title={"Username"}
        onChangeText={setUsername}
        value={username}
      />
      <LoginInput
        title={"Password"}
        onChangeText={setPassword}
        value={password}
      />
      <Button
        title="Login"
        onPress={() => attemptLogIn(username, password)}
        color={Color.VARIANT_1}
      />
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
        />
        <LoginInput
          title={"Username"}
          onChangeText={setUsername}
          value={username}
        />
        <LoginInput
          title={"Password"}
          onChangeText={setPassword}
          value={password}
        />
        <LoginInput
          title={"Confirm Password"}
          onChangeText={setPassword}
          value={password}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            createUser({
              username: username.trim().toLowerCase(),
              password: encrypt(password).encryptedData,
              email: email,
              balance: 100,
              tokens: [new TokenType("4", "Lebron James", 1, 10, "https://hoopshabit.com/wp-content/uploads/getty-images/2017/07/1448620152.jpeg", Sport.BASKETBALL), 
                      new TokenType("5", "Robert Lewandowski", 2, 18, "https://pbs.twimg.com/profile_images/1560186554781519873/wq6vdCir_400x400.jpg", Sport.FOOTBALL),
                      new TokenType("6", "Kylian Mbappe", 3, 60, "https://media.cnn.com/api/v1/images/stellar/prod/221229101146-mbappe-goal-psg.jpg?c=original", Sport.FOOTBALL)
                    ],
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
          }}
          color={Color.VARIANT_1}
        />
      </View>
        }
      <StatusBar hidden = {false} backgroundColor = {Color.GRAY_1} translucent = {true}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.GRAY_2,
        alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
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
    resizeMode: "contain",
  }
});