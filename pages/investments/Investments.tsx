import { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Color, FontSize, LineGraph, Timeframe, TokenType, IUser, IAthlete } from '../../global';
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
    const token = tokenInfo.item;
    console.log("Called getTokens" + token.name);
    const athlete = {
      id: token.id,
      name: token.name,
      sport: token.sport,
      profileImageUrl: token.profileUrl,
      tokenValue: token.price,
      quantity: token.quantity
    }
    return (
      <AthleteTokenCard setAthlete={props.setAthlete} numberTokens={token.quantity} athlete={athlete} />
      );
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


  // const getWatchListTokens = ():JSX.Element[] => {
  //   return [
  //     <AthleteTokenCard setAthlete={setAthlete}/>,
  //     <AthleteTokenCard setAthlete={setAthlete}/>,
  //   ]
  // }

  const getTokens = ():any => {
    return (
      <FlatList data = {props.currentUser.tokens} renderItem={renderToken} keyExtractor={item => item.id}/>
      );
  }

  const getTimelineRangeButtons = (): JSX.Element[] => {
    const buttons:JSX.Element[] = [];

    Object.values(Timeframe).forEach((value, ind) => {
      console.log(value)
      buttons.push(
        <TouchableOpacity style={timeframe == value ? globalStyles.buttonActive : globalStyles.button} onPress={() => setTimeframe(value as Timeframe)}>
          <Text style={timeframe == value ? globalStyles.buttonTextActive : globalStyles.buttonText} >{value}</Text>
        </TouchableOpacity>
      )
    })

    return buttons;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.total}>${calcTotal(props.currentUser.tokens)}</Text>
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
        {/* {getWatchListTokens()} */}
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
  }});
  