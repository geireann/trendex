import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { IUser, globalStyles, FontSize, Color } from '../../global'
import { StyleSheet, Text, View, Image, ScrollView, Button, Switch } from 'react-native';
import { Card } from 'react-native-elements';
// import { GoblinImage } from '../../assets/MindGoblin.jpg'

export interface ProfileProps {
  user: IUser,
  setUser: any
}

export const Profile = (props: ProfileProps) => {

  const signOut = () => {
    let defaultUser = {...props.user}
    defaultUser.username = ""
    defaultUser.balance = 0
    defaultUser.email = ""
    defaultUser.tokens = []
    defaultUser.watchlist = []
    defaultUser.password = ""
    props.setUser(defaultUser)
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileImageContainer}>
          <Image resizeMode='cover'
          source={{uri:"https://hoopshabit.com/wp-content/uploads/getty-images/2017/07/1448620152.jpeg"}}
          style={styles.profileImage}
          ></Image>
        <View style={styles.profileDescription}>
          <View>
            <Text style={styles.sectionHeader}>
              {props.user.username}
            </Text>
          </View>
          <View>
            <Text style={styles.email}>
              {"@" + props.user.email}
            </Text>
          </View>
        </View>
      </View>
        <View style={globalStyles.buttonV1}>
            <Text style={globalStyles.buttonTextV1}>
              {"Current Balance: " + props.user.balance}
            </Text>
        </View>
        <View style={globalStyles.buttonV1}>
            <Text style={globalStyles.buttonTextV1} onPress={() => signOut()}>
              Sign Out
            </Text>
        </View>
    </ScrollView>
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
  sectionHeader: {
      fontSize: 30,
      color: Color.TEXT_ON_DARK,
      fontWeight: "600",
      marginTop: 15,
      marginBottom: 10,
      alignSelf: 'flex-start',
      textAlign: 'center'
  },
  email: {
    fontSize: 20,
      color: Color.TEXT_ON_DARK,
      fontWeight: "600",
      marginTop: 15,
      marginBottom: 10,
      alignSelf: 'flex-start',
      textAlign: 'center'
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'row',
  },
  profileDescription: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 3
  },
  profileUsername: {
    fontSize: 20
  },
  profileBalance: {
    
  },
  signOut: {

  },
  profilePic: {
    height: 50,
    flex: 1
  },
  profileImageContainer: {
    display: 'flex',
    flexDirection: "row",
    width: '30vw',
    height: '30vw',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 20
  },
  profileImage: {
    width: '60%',
    height: '100%',
    borderRadius: 20
  },
  name:{
    fontSize: FontSize.HEADER * 2,
    alignSelf: 'flex-start',
    flex: 1,
    color: Color.TEXT_ON_DARK,
    fontWeight: '600'
  }
});
