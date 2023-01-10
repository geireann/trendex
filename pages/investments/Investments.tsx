import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  LineChart
} from "react-native-chart-kit";
import { Color, FontSize } from '../../global';
import { AthleteTokenCard } from '../../global/components/AthleteTokenCard';
import { globalStyles } from '../../global/globalStyles';

export enum TimeFrame {
  _1Y = "1Y",
  _6M = "6M",
  _3M = "3M",
  _1M = "1M",
  _1W = "1W",
}

export const Investments = () => {

  const [timeframe, setTimeframe] = useState<TimeFrame>(TimeFrame._1Y)
  const [tokenTotal, setTokenTotal] = useState<number>(21.43);

  const getTimeFrame = (): string[] => {
    switch(timeframe) {
      case TimeFrame._1Y:
        return ["Jan", "", "Mar", "", "May", "", "Jul", "", "Sep", "", "Nov", ""];
      case TimeFrame._6M:
        return ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      case TimeFrame._3M:
          return ["Oct", "Nov", "Dec"];
      default:
        return [""]
    }
  }

  const getData = (): any => {
    let data = [
      Math.random() * 100,
      102.11,
      85.42,
      95.42,
      101.12,
      84.32,
      76.62,
      64.02,
      50.42,
      65.32,
      80.21,
      72.34,
    ];
    switch(timeframe) {
      case TimeFrame._1Y:
        return { data };
      case TimeFrame._6M:
        data = data.slice(-6);
        return { data };
      case TimeFrame._3M:
        data = data.slice(-3);
        return { data };
      default:
        return { data };
    }
  }

  const getWatchListTokens = ():JSX.Element[] => {
    return [
      <AthleteTokenCard />,
      <AthleteTokenCard />,
    ]
  }

  const getTokens = ():JSX.Element[] => {
    return [
      <AthleteTokenCard />,
      <AthleteTokenCard />,
      <AthleteTokenCard />,
    ]
  }

  const getTimelineRangeButtons = (): JSX.Element[] => {
    const buttons:JSX.Element[] = [];

    Object.values(TimeFrame).forEach((value, ind) => {
      console.log(value)
      buttons.push(
        <Pressable style={timeframe == value ? globalStyles.buttonActive : globalStyles.button} onPress={() => setTimeframe(value as TimeFrame)}>
          <Text style={timeframe == value ? globalStyles.buttonTextActive : globalStyles.buttonText} >{value}</Text>
        </Pressable>
      )
    })

    return buttons;
  }

  const getLineChart = ():JSX.Element => {
    return (
<LineChart
        data={{
          labels: getTimeFrame(),
          datasets: [ getData() ]
        }}
        width={Dimensions.get("window").width - 40} // from react-native
        height={200}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: Color.GRAY_2,
          backgroundGradientFrom: Color.GRAY_2,
          backgroundGradientTo: Color.GRAY_2,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, 0.7)`,
          labelColor: (opacity = 1) => Color.GRAY_4,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: Color.VARIANT_2
          },
          propsForLabels: {
            fontFamily: 'monospace'
          }
      }}
    bezier
    style={{
      marginVertical: 20,
      borderRadius: 0,
    }}
  />
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.total}>${tokenTotal}</Text>
      {getLineChart()}
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
