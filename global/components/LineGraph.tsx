import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Color, Timeframe } from '../globalEnums';
import { createDummyHistoricalData } from '../globalUtils';

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
    return createDummyHistoricalData(10);
  }

  const {timeframe, data = dummyData()} = props;

  const getLabels = (): string[] => {
    switch(timeframe) {
      case Timeframe._1Y:
        return ["", "", "", "", "", "", "", "", "", "", "", ""];
      case Timeframe._6M:
        return ["", "", "", "", "", ""];
      case Timeframe._3M:
          return ["Oct", "Nov", "Dec"];
      case Timeframe._1M:
          return [""];
      case Timeframe._1W:
          return [""];
      default:
        return [];
    }
  }

  const getData = (): number[] => {
    const numData: number[] = [];
    data.forEach((val) => {
      val.numVal && numData.push(val.numVal)
    })
    switch(timeframe) {
      case Timeframe._1Y:
        return numData.slice(0, numData.length).reverse();
      case Timeframe._6M:
        return numData.slice(0, numData.length / 2).reverse();
      case Timeframe._3M:
        return numData.slice(0, numData.length / 4).reverse();
      case Timeframe._1M:
        return numData.slice(0, numData.length / 12).reverse();
      case Timeframe._1W:
        return numData.slice(0, numData.length / 56).reverse();
      default:
        return numData.slice(0, numData.length).reverse();
    }
  }

  return (
    <View style={styles.container}>
        <LineChart
            data={{
              labels: [],
              datasets: [
                {
                  data: getData()
                }
              ]
            }}
            width={Dimensions.get("window").width - 40} // from react-native
            height={200}
            yAxisLabel="$"
            yAxisSuffix=""
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
                    r: "0",
                    strokeWidth: "0",
                    stroke: Color.VARIANT_2
                },
                propsForLabels: {
                    fontFamily: 'monospace'
                },
                propsForBackgroundLines: {
                  strokeWidth: "0"
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
