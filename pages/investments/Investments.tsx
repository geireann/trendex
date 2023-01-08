import { Dimensions, StyleSheet, Text, View, ScrollView, FlatList, Button, Pressable, ListRenderItemInfo} from 'react-native';
import { GraphPoint, LineGraph } from 'react-native-graph';
import { Color, FontSize } from '../../global';
import {Token, IUser} from '../../global';
import {fetchUser, saveTokens} from '../../serverGateway';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { useEffect, useState } from 'react';

export enum TimeFrame {
  _1Y = "1Y",
  _6M = "6M",
  _3M = "3M",
  _1M = "1M"
}

export interface IInvestmentsProps {
  username: string,
}

export const Investments = () => {
  
  const [timeframe, setTimeframe] = useState<TimeFrame>(TimeFrame._1Y)
  const [tokens, setTokens] = useState<Token[]>([]);
  const [total, setTotal] = useState<number>(0);
  // Temp username, until I can figure out how to pass props into the component thing in BottomTab.Screen in App.tsx
  const tempUsername = "vienna";
  
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

  const calcTotal = (tokens : Token[]) : number => {
    let total = 0;
    for (let i = 0; i < tokens.length; i++) {
      total += tokens[i].quantity * tokens[i].price;
    }
    return total
  }

  const updateTokensCount = async (name : string) => {
    const newTokens = [...tokens]
    for(let i = 0; i < newTokens.length; i++){
      if (tokens[i].name == name) {
        tokens[i].quantity += 1;
      }
    }
    setTokens(newTokens);
    setTotal(calcTotal(newTokens))
    await saveTokens(tempUsername, newTokens)

  }

  const renderToken = (tokenInfo: ListRenderItemInfo<Token> ) : any => {
      const token = tokenInfo.item;
      console.log("Called getTokens" + token.name);
      return (
        <View 
        key={token.name}
        style = {{
          flexDirection: "row",
          height: 100,
          padding: 20,
          width: 500,
          borderRadius : 10,
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 5
        }}
        >
          <Text style={{
            fontSize: 20,
            flex: .5,
            color: 'red'
            }}>{token.name}</Text>
          <Text style={{
            flex: .3
          }}>{"Quantity: " + token.quantity}</Text>
          <Text style={{
            flex: .2
          }}>{"Total value: " + token.price * token.quantity}</Text>
          <Button
            title="Buy One"
            onPress={() => updateTokensCount(token.name)}
          />
        </View>
        );
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

    // fetch current user's tokens, update total
    useEffect(() => {
      const fetchTokens = async () => {
        let response = await fetchUser(tempUsername)
        let user : IUser = response[0]
        let message : string = response[1]
        console.log("User fetched: " + user)
        if (message == "success") {
          console.log("user tokens" + user.tokens);
          setTokens(user.tokens)
          setTotal(calcTotal(user.tokens));
        }
      }  
      fetchTokens();
    }, [])
    
    return (
      <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.header}>Investments</Text> */}
      <Text style={styles.total}>{"$" + total}</Text>
      {/* <LineGraph
      points={graphPoints}
      animated={true}
      color={Color.VARIANT_1}
      // enablePanGesture={true}
      // onGestureStart={() => hapticFeedback('impactLight')}
      // onPointSelected={(p) => updatePriceTitle(p)}
      // onGestureEnd={() => resetPriceTitle()}
    /> */}
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
    <FlatList
        data={tokens}
        renderItem={renderToken}
        keyExtractor={(item) => item.name}>
    </FlatList>
    </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.GRAY_2,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'space-around'
    },
    total: {
      color: Color.VARIANT_2,
      fontSize: FontSize.LARGE,
      paddingTop: 40,
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
  