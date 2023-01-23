import { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Color, FontSize, getCurrencyVal, LineGraph, Timeframe, TokenType, IUser, IAthlete, createDummyHistoricalData } from '../../global';
import { AthleteTokenCard } from '../../global/components/AthleteTokenCard';
import { globalStyles } from '../../global/globalStyles';
import { fetchUser, saveTokens } from '../../serverGateway'
import { ListRenderItemInfo, FlatList } from 'react-native';

export interface InvestmentsProps {
  setAthlete: (athlete: IAthlete | undefined) => void,
  currentUser: IUser,
  setUser: (user: IUser) => void

}
export const Investments = (props: InvestmentsProps) => {
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe._1Y)

  const renderToken = (tokenInfo: ListRenderItemInfo<TokenType> ) : any => {
    // debugger
    const token = tokenInfo.item;
    console.log("Called getTokens" + token.name);
    const athlete: IAthlete = {
      id: token.id,
      name: token.name,
      sport: token.sport,
      profileImageUrl: token.profileUrl,
      tokenValue: token.price,
      quantity: token.quantity,
      historicalTokenData: createDummyHistoricalData(token.price)
    }
    return (
      <AthleteTokenCard setAthlete={props.setAthlete} numberTokens={token.quantity} athlete={athlete} />
      )
  }

  const renderWatchlistToken = (tokenInfo: ListRenderItemInfo<TokenType> ) : any => {
    // debugger
    const token = tokenInfo.item;
    const athlete: IAthlete = {
      id: token.id,
      name: token.name,
      sport: token.sport,
      profileImageUrl: token.profileUrl,
      tokenValue: token.price,
      quantity: 0,
      historicalTokenData: createDummyHistoricalData(token.price)
    }
    return (
      <AthleteTokenCard setAthlete={props.setAthlete} numberTokens={0} athlete={athlete} />
      )
  }

  useEffect(() => {
    const fetchTokens = async () => {
      let response = await fetchUser(props.currentUser.username, props.currentUser.password)
      let user : IUser = response[0]
      let message : string = response[1]
      console.log("User fetched: " + user)
      if (message == "success") {
        console.log("user tokens" + user.tokens)
        let newUser = {...props.currentUser}
        newUser.tokens = user.tokens
        newUser.balance = user.balance
        newUser.watchlist = user.watchlist
        props.setUser(newUser)
      }
    }  
    fetchTokens();
  }, [])

  const calcTotal = (tokens : TokenType[]) : number => {
    let total = 0;
    for (let i = 0; i < tokens.length; i++) {
      total += tokens[i].quantity * tokens[i].price;
    }
    return total
  }


  const getWatchListTokens = ():any => {
    if (props.currentUser.watchlist && props.currentUser.watchlist.length === 0) {
      return (<TouchableOpacity style={globalStyles.buttonV1}>
        {/* <Text style={globalStyles.buttonTextV2}>Sell</Text> */}
        <Text style={globalStyles.buttonTextV1}>
          Discover More...
        </Text>
    </TouchableOpacity>)
    }
    return (
      <FlatList data = {props.currentUser.watchlist} renderItem={renderWatchlistToken} keyExtractor={item => item.id}/>
      );
  }

  const getTokens = ():any => {
    if (props.currentUser.tokens.length === 0) {
      return (<TouchableOpacity style={globalStyles.buttonV1}>
        {/* <Text style={globalStyles.buttonTextV2}>Sell</Text> */}
        <Text style={globalStyles.buttonTextV1}>
          Discover More...
        </Text>
    </TouchableOpacity>)
    }
    return (
      <FlatList data = {props.currentUser.tokens} renderItem={renderToken} keyExtractor={item => item.id}/>
      );
  }

  const getTimelineRangeButtons = (): JSX.Element[] => {
    const buttons:JSX.Element[] = [];

    Object.values(Timeframe).forEach((value, ind) => {
      buttons.push(
        <TouchableOpacity key={ind} style={timeframe == value ? globalStyles.buttonActive : globalStyles.button} onPress={() => setTimeframe(value as Timeframe)}>
          <Text style={timeframe == value ? globalStyles.buttonTextActive : globalStyles.buttonText} >{value}</Text>
        </TouchableOpacity>
      )
    })

    return buttons;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.totalTitle}>Total Invested</Text>
      <Text style={styles.total}>{getCurrencyVal(calcTotal(props.currentUser.tokens))}</Text>
      <LineGraph timeframe={timeframe} currentVal={calcTotal(props.currentUser.tokens)}/>
      <View style={globalStyles.dateBar}>
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
  totalTitle: {
    color: Color.TEXT_ON_DARK_VARIANT,
    textAlign: 'left',
    alignSelf: 'flex-end',
    fontSize: FontSize.BODY,
    fontWeight: "400",
  },
  total: {
    color: Color.VARIANT_2,
    textAlign: 'left',
    alignSelf: 'flex-end',
    fontSize: FontSize.LARGE,
    fontWeight: "600",
    fontFamily: 'monospace',
    marginBottom: 10
  },
  tokenContainer: {
    flexDirection: 'column',
    marginTop: 20
  },
  watchlistContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 30
  }});
  