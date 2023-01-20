import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Color, Timeframe } from '../globalEnums';

export interface IDataPoint {
  numVal?: number,
  date?: Date
}

export interface ILineGraph {
  timeframe?: Timeframe,
  data?: IDataPoint[]
}

export const LineGraph = (props: ILineGraph) => {

  const dummyData = (): IDataPoint[] => {
    switch(timeframe) {
      case Timeframe._1Y:
      case Timeframe._6M:
      case Timeframe._3M:
      default:
        return [];
    }
  }

  const {timeframe, data = dummyData()} = props;

  const getData = (): string[] => {
    
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
                  labels: [],
                  datasets: []
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
