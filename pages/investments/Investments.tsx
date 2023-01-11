import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Color, FontSize, LineGraph, Timeframe } from '../../global';
import { AthleteTokenCard } from '../../global/components/AthleteTokenCard';
import { globalStyles } from '../../global/globalStyles';

export const Investments = ({setAthlete}: any) => {

  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe._1Y)
  const [tokenTotal, setTokenTotal] = useState<number>(21.43);

  const getWatchListTokens = ():JSX.Element[] => {
    return [
      <AthleteTokenCard setAthlete={setAthlete}/>,
      <AthleteTokenCard setAthlete={setAthlete}/>,
    ]
  }

  const getTokens = ():JSX.Element[] => {
    return [
      <AthleteTokenCard setAthlete={setAthlete}/>,
      <AthleteTokenCard setAthlete={setAthlete}/>,
      <AthleteTokenCard setAthlete={setAthlete}/>,
    ]
  }

  const getTimelineRangeButtons = (): JSX.Element[] => {
    const buttons:JSX.Element[] = [];

    Object.values(Timeframe).forEach((value, ind) => {
      console.log(value)
      buttons.push(
        <Pressable style={timeframe == value ? globalStyles.buttonActive : globalStyles.button} onPress={() => setTimeframe(value as Timeframe)}>
          <Text style={timeframe == value ? globalStyles.buttonTextActive : globalStyles.buttonText} >{value}</Text>
        </Pressable>
      )
    })

    return buttons;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.total}>${tokenTotal}</Text>
      <LineGraph timeframe={timeframe}/>
      <View style={styles.dateBar}>
        {getTimelineRangeButtons()}
      </View>
      <View style={styles.tokenContainer}>
        <Text style={globalStyles.sectionHeader}>My Tokens</Text>
        {getTokens()}
      </View>
      <View style={styles.watchlistContainer}>
        <Text style={globalStyles.sectionHeader}>My Watch List</Text>
        {getWatchListTokens()}
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
  total: {
    color: Color.VARIANT_2,
    textAlign: 'left',
    alignSelf: 'flex-end',
    fontSize: FontSize.LARGE,
    fontWeight: "600",
    fontFamily: 'monospace'
  },
  dateBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10
  },
  tokenContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  watchlistContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 50

  }
});
