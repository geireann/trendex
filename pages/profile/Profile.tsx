import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { IUser } from '../../global'
import { StyleSheet, Text, View, Image, Button, Switch } from 'react-native';
import { Card } from 'react-native-elements';

export interface ProfileProps {
  user: IUser
}

export const Profile = (props: ProfileProps) => {
  
  return (
    <View style={styles.container}>
      <Text>Profile!</Text>
      <View style={styles.profileCard}>
        {/* Image source https://fantasy-bestiary.fandom.com/wiki/Goblin */}
        <Image source={{
          uri: "https://static.wikia.nocookie.net/mythological-supernatural-and-fantasy-creatures/images/5/5c/Ds_monsters_goblin_by_willowwisp.jpg/revision/latest?cb=20170411195537"
        }} style={styles.profilePic}></Image>
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
  },
  profileDescription: {
    flex: 1
  },
  profileUsername: {
    fontSize: 4
  },
  profilePic: {
    height: 50,
    flex: 1
  }
});
