import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Color, FontSize, Sport } from '../globalEnums';
import { Icon } from '@rneui/themed';
import { IAthlete } from '../globalTypes';

export interface IAthleteTokenCardProps {
  athlete?: IAthlete,
  userTokens?: number,

}

export const AthleteTokenCard = (props: IAthleteTokenCardProps) => {

  const {
    athlete = {
      sport: Sport.BASKETBALL,
      tokenValue: 12.3,
      firstName: "Lebron",
      lastName: "James",
      profileImageUrl: "https://hoopshabit.com/wp-content/uploads/getty-images/2017/07/1448620152.jpeg"
    },
    userTokens = 3
  } = props;


  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image 
          source={{uri:athlete.profileImageUrl}}
          style={styles.profileImage}
        ></Image>
      </View>
      <View style={styles.athleteBioContainer}>
        <View>
            <Text style={styles.name}>
                <Text>{athlete.firstName} </Text>
                <Text>{athlete.lastName}</Text>
            </Text>
            <Text style={styles.sport}>
                {athlete.sport}
            </Text>
        </View>
        <Text style={styles.token}>
            ${athlete.tokenValue}
        </Text>
      </View>
      {/* <Icon name={"notifications-outline"} type={"ionicon"} color={Color.TEXT_ON_DARK}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.GRAY_2,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 80,
    maxHeight: 80,
    borderColor: Color.VARIANT_1,
    borderWidth: 2,
    borderStyle: 'solid',
    width: 'calc(100%)',
    overflow: 'hidden',
    borderRadius: 10,
    marginVertical: 10
  },
  name: {
    color: Color.TEXT_ON_DARK,
    fontWeight: "600",
    fontSize: FontSize.BODY_LARGE
  },
  sport: {
    color: Color.TEXT_ON_DARK_VARIANT,
    fontWeight: "300",
    fontSize: FontSize.BODY
  },
  profileImageContainer: {
    overflow: 'hidden',
    width: '40%'
  },
  profileImage: {
    width: '100%',
    height: 100,
  },
  athleteBioContainer: {
    maxWidth: '58%',
    height: '100%',
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  token: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: Color.VARIANT_2,
    width: 'fit-content',
    color: Color.TEXT_ON_DARK,
    fontWeight: "600"
  }
});
