import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';

export const Profile = () => {
  const [balance, setBalance] = useState<number>(0);
  
  // useEffect(() => {
  //   // constFetchAvailableBalance = async () => {


  //   // }
  // })
  return (
    <View style={styles.container}>
      <Text>Profile!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2f2f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
