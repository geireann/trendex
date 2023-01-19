import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { IUser } from '../../global'
import { StyleSheet, Text, View, Image, Button, Switch } from 'react-native';
import { Card } from 'react-native-elements';
// import { GoblinImage } from '../../assets/MindGoblin.jpg'

export interface ProfileProps {
  user: IUser,
  setUser: any
}

export const Profile = (props: ProfileProps) => {
  
  return (
    <View style={styles.container}>
      <Text>Profile!</Text>
      <View style={styles.profileCard}>
        {/* Image source https://fantasy-bestiary.fandom.com/wiki/Goblin */}
        <Image source={require(
          "../../assets/MindGoblin.jpg"
        )} style={styles.profilePic}></Image>
        <View>
          <Text style={styles.profileUsername}>{props.user.username}</Text>
          <Text>{props.user.email}</Text>
          <Button title="Edit Profile"/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2f2f',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 2
  },
  profileDescription: {
    flex: 1
  },
  profileUsername: {
    fontSize: 20
  },
  profilePic: {
    height: 50,
    flex: 1
  }
});
