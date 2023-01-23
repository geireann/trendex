import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { IUser, globalStyles, FontSize, Color, getCurrencyVal, TokenType } from '../../global'
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

  const calcTotal = (tokens : TokenType[]) : number => {
    let total = 0;
    for (let i = 0; i < tokens.length; i++) {
      total += tokens[i].quantity * tokens[i].price;
    }
    return total
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <Image 
            resizeMode='cover'
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
              <Text style={styles.sectionSubHeader}>
                {"@" + props.user.email}
              </Text>
            </View>
            <Text style={styles.totalTitle}>Available Balance</Text>
            <Text style={styles.total2}>{getCurrencyVal(props.user.balance)}</Text>
            <Text style={styles.totalTitle}>Total Invested</Text>
            <Text style={styles.total}>{getCurrencyVal(calcTotal(props.user.tokens))}</Text>
          </View>
      </View>
        <View style={globalStyles.buttonV2}>
            <Text style={globalStyles.buttonTextV2} onPress={() => signOut()}>
              Sign Out
            </Text>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.GRAY_2,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50
  },
  totalTitle: {
    color: Color.TEXT_ON_DARK_VARIANT,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: FontSize.BODY,
    fontWeight: "400",
  },
  total: {
    color: Color.VARIANT_2,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: FontSize.LARGE,
    fontWeight: "600",
    fontFamily: 'monospace',
    marginBottom: 20
  },
  total2: {
    color: Color.VARIANT_3,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: FontSize.LARGE,
    fontWeight: "600",
    fontFamily: 'monospace',
    marginBottom: 20
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
  profileDescription: {
    padding: 10
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.GRAY_3,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    minHeight: 300,
    maxHeight: 300,
    width: '90vw',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
    overflow: 'hidden'
  },
  profileImage: {
    width: '40%',
    height: '100%',
  },
  sectionHeader: {
    fontSize: FontSize.LARGE,
    color: Color.TEXT_ON_DARK,
    fontWeight: "600",
    alignSelf: 'flex-start',
  },
  sectionSubHeader: {
    fontSize: FontSize.SECTION,
    color: Color.TEXT_ON_DARK_VARIANT,
    fontWeight: "300",
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
});
