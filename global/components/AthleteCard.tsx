import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Color, FontSize, Sport } from '../globalEnums';
import { Icon } from '@rneui/themed';
import { IAthlete } from '../globalTypes';
import { globalStyles } from '../globalStyles';

export interface IAthleteCardProps {
  athlete?: IAthlete,
  setAthlete: (athlete: IAthlete | undefined) => void,
  fullWidth?: boolean
}

export const AthleteCard = (props: IAthleteCardProps) => {

  const {
    athlete = {
      sport: Sport.BASKETBALL,
      tokenValue: 12.3,
      firstName: "Lebron",
      lastName: "James",
      profileImageUrl: "https://hoopshabit.com/wp-content/uploads/getty-images/2017/07/1448620152.jpeg"
    },
    setAthlete,
    fullWidth
  } = props;


  return (
    <TouchableOpacity style={fullWidth ? styles.containerFullWidth : styles.container} onPress={() => {
        console.log('pressed AthleteCard')
        setAthlete(athlete)
    }}>
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
      </View>
      {/* <Icon name={"notifications-outline"} type={"ionicon"} color={Color.TEXT_ON_DARK}/> */}
    </TouchableOpacity>
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
    borderColor: Color.VARIANT_2,
    borderWidth: 2,
    borderStyle: 'solid',
    width: '50%',
    overflow: 'hidden',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10
  },
  containerFullWidth: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.GRAY_2,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 80,
    borderColor: Color.VARIANT_2,
    borderWidth: 2,
    borderStyle: 'solid',
    width: '90vw',
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
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImage: {
    width: 100,
    height: 100
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
