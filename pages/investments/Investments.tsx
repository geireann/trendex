import { Dimensions, StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { GraphPoint, LineGraph } from 'react-native-graph';
import { Color, FontSize } from '../../global';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { useState } from 'react';

export enum TimeFrame {
  _1Y = "1Y",
  _6M = "6M",
  _3M = "3M",
  _1M = "1M"
}

export const Investments = () => {

  const [timeframe, setTimeframe] = useState<TimeFrame>(TimeFrame._1Y)

  const graphPoints:GraphPoint[] = [
    {
      value: 1000,
      date: new Date('2022-11-01T03:24:00')
    },
    {
      value: 1200,
      date: new Date('2022-11-04T03:24:00')
    },
    {
      value: 1512,
      date: new Date('2022-11-10T03:24:00')
    },
    {
      value: 2012,
      date: new Date('2022-11-12T03:24:00')
    },
    {
      value: 2521,
      date: new Date('2022-11-15T00:24:00')
    },
  ];

  const getTimeFrame = (): string[] => {
    switch(timeframe) {
      case TimeFrame._1Y:
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
      72.34
    ];
    switch(timeframe) {
      case TimeFrame._1Y:
        return {data};
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



  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Investments</Text> */}
      <Text style={styles.total}>$72.34k</Text>
      <LineGraph
          points={graphPoints}
          animated={true}
          color={Color.VARIANT_1}
          // enablePanGesture={true}
          // onGestureStart={() => hapticFeedback('impactLight')}
          // onPointSelected={(p) => updatePriceTitle(p)}
          // onGestureEnd={() => resetPriceTitle()}
      />
      <LineChart
    data={{
      labels: getTimeFrame(),
      datasets: [ getData() ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={250}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: Color.GRAY_2,
      backgroundGradientFrom: Color.GRAY_2,
      backgroundGradientTo: Color.GRAY_2,
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, 0)`,
      labelColor: (opacity = 1) => Color.VARIANT_2,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: Color.VARIANT_1
      }
    }}
    bezier
    style={{
      marginVertical: 20,
      borderRadius: 0
    }}
  />
  <View style={styles.dateBar}>
    <Pressable style={styles.button} onPress={() => setTimeframe(TimeFrame._1M)}>
      <Text style={timeframe == TimeFrame._1M ? styles.textActive : styles.textInactive} >{TimeFrame._1M}</Text>
    </Pressable>
    <Pressable style={styles.button} onPress={() => setTimeframe(TimeFrame._3M)}>
      <Text style={timeframe == TimeFrame._3M ? styles.textActive : styles.textInactive} >{TimeFrame._3M}</Text>
    </Pressable>
    <Pressable style={styles.button} onPress={() => setTimeframe(TimeFrame._6M)}>
      <Text style={timeframe == TimeFrame._6M ? styles.textActive : styles.textInactive} >{TimeFrame._6M}</Text>
    </Pressable>
    <Pressable style={styles.button} onPress={() => setTimeframe(TimeFrame._1Y)}>
      <Text style={timeframe == TimeFrame._1Y ? styles.textActive : styles.textInactive} >{TimeFrame._1Y}</Text>
    </Pressable>
  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.GRAY_2,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  total: {
    color: Color.VARIANT_2,
    fontSize: FontSize.LARGE,
    fontWeight: "600"
  },
  dateBar: {
    flexDirection: 'row',
    gap: 5,
  },
  textActive: {
    color: Color.VARIANT_1,
    fontSize: FontSize.BODY_LARGE,
  },
  textInactive: {
    fontSize: FontSize.BODY_LARGE,
    color: Color.TEXT_ON_DARK,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  }
});
