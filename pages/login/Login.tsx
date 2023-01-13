import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Button, Image, Switch } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Color, FontSize, LoginInput, Token} from '../../global';
import { createUser, fetchUser, fetchUsers} from '../../serverGateway';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export interface ILoginProps {
  setUser: (username: string, password: string) => void,
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
        onPress={() => setUser(username, password)}
        color={Color.VARIANT_1}
      />
      <Button
        title="Forgot Password"
        color={Color.GRAY_2}
        onPress={() => setUser(username, password)}
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
              password: password,
              email: email,
              balance: 100,
              tokens: [new Token("Lebron James", 1, 10), 
                      new Token("Robert Lewandowski", 2, 18),
                      new Token("Kylian Mbappe", 3, 60)
                    ]
            })
            setUser(username, password)
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
