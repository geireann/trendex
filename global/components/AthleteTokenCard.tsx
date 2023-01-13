import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Color, FontSize, Sport } from '../globalEnums';
// import { Icon } from '@rneui/themed';
import { IAthlete } from '../globalTypes';
import { Token } from './Token';

export interface IAthleteTokenCardProps {
  athlete: IAthlete,
  numberTokens: number,
  setAthlete: (athlete: IAthlete | undefined) => void
}

export const AthleteTokenCard = (props: IAthleteTokenCardProps) => {

  const {
    athlete,
    numberTokens,
    setAthlete
  } = props;


  return (
    <TouchableOpacity style={styles.container} onPress={() => {
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
                <Text>{athlete.name} </Text>
            </Text>
            <Text style={styles.sport}>
                {athlete.sport}
            </Text>
        </View>
      </View>
      <View style={styles.tokenContainer}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', maxHeight: 50}}>
          <Text style={styles.userTokens}>
            {numberTokens}
          </Text>
          <Text style={{paddingHorizontal: 3, color: Color.TEXT_ON_DARK_VARIANT}}>
            x
          </Text>
          <Token value={athlete.tokenValue}/>
          <Text style={styles.totalAmount}>
            = ${athlete.tokenValue && (numberTokens * athlete.tokenValue).toFixed(2)}
          </Text>
        </View>
          {/* <Text style={styles.tokenLabel}>tokens</Text> */}
        
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
    justifyContent: 'space-evenly',
    minHeight: 80,
    maxHeight: 80,
    borderColor: Color.VARIANT_2,
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
    width: '25%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profileImage: {
    width: '100%',
    height: 100,
  },
  athleteBioContainer: {
    maxWidth: '30%',
    height: '100%',
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  tokenContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center'
  },
  userTokens: {
    fontSize: FontSize.LARGE,
    color: Color.VARIANT_2,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: FontSize.SECTION_SUBHEADER,
    color: Color.TEXT_ON_DARK_VARIANT
  },
  tokenLabel: {
    fontSize: FontSize.BODY,
    textTransform: 'uppercase'
  }
});
