import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Color, Timeframe } from '../globalEnums';

export interface ILineGraph {
  timeframe: Timeframe,
  data?: number[]
}

export const LineGraph = (props: ILineGraph) => {

  const getData = (): number[] => {
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
      case Timeframe._1Y:
        return data;
      case Timeframe._6M:
        data = data.slice(-6);
        return data;
      case Timeframe._3M:
        data = data.slice(-3);
        return data;
      default:
        return data;
    }
  }

  const {timeframe, data = getData()} = props;

  const getTimeFrame = (): string[] => {
    switch(timeframe) {
      case Timeframe._1Y:
        return ["Jan", "", "Mar", "", "May", "", "Jul", "", "Sep", "", "Nov", ""];
      case Timeframe._6M:
        return ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      case Timeframe._3M:
          return ["Oct", "Nov", "Dec"];
      default:
        return []
    }
  }

  return (
    <View style={styles.container}>
        <LineChart
                data={{
                labels: getTimeFrame(),
                datasets: [ { data } ]
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
