import { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Color, FontSize, LineGraph, Timeframe, TokenType, IUser } from '../../global';
import { AthleteTokenCard } from '../../global/components/AthleteTokenCard';
import { globalStyles } from '../../global/globalStyles';
import { fetchUser, saveTokens } from '../../serverGateway'

export const Investments = ({setAthlete}: any) => {

  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe._1Y)
  const [tokenTotal, setTokenTotal] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [tokens, setTokens] = useState<TokenType[]>([]);

  // const renderToken = (tokenInfo: ListRenderItemInfo<Token> ) : any => {
  //   const token = tokenInfo.item;
  //   console.log("Called getTokens" + token.name);
  //   return (
  //     <View 
  //     key={token.name}
  //     style = {{
  //       flexDirection: "row",
  //       height: 100,
  //       padding: 20,
  //       width: 500,
  //       borderRadius : 10,
  //       borderColor: 'black',
  //       borderStyle: 'solid',
  //       borderWidth: 5
  //     }}
  //     >
  //       <Text style={{
  //         fontSize: 20,
  //         flex: .5,
  //         color: 'red'
  //         }}>{token.name}</Text>
  //       <Text style={{
  //         flex: .3
  //       }}>{"Quantity: " + token.quantity}</Text>
  //       <Text style={{
  //         flex: .2
  //       }}>{"Total value: " + token.price * token.quantity}</Text>
  //     </View>
  //     );
  // }

  useEffect(() => {
    const fetchTokens = async () => {
      let response = await fetchUser("viennatest")
      let user : IUser = response[0]
      let message : string = response[1]
      console.log("User fetched: " + user)
      if (message == "success") {
        console.log("user tokens" + user.tokens)
        setTokens(user.tokens)
        setTokenTotal(calcTotal(user.tokens))
        setBalance(user.balance)
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

  const updateTokensCount = async (name : string) => {
    const newTokens = [...tokens]
    let updatedToken = new TokenType("Default Value", 0, 0);
    for(let i = 0; i < newTokens.length; i++){
      if (tokens[i].name == name) {
        updatedToken = tokens[i]
        tokens[i].quantity += 1
        console.log("UPDATED")
      }
    }
    if (updatedToken.price < balance) {
      setTokens(newTokens)
      setTokenTotal(calcTotal(newTokens))
      const newBalance = balance - updatedToken.price
      setBalance(newBalance)
      await saveTokens("viennatest", newTokens, newBalance)
    }
  }

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
        <TouchableOpacity style={timeframe == value ? globalStyles.buttonActive : globalStyles.button} onPress={() => setTimeframe(value as Timeframe)}>
          <Text style={timeframe == value ? globalStyles.buttonTextActive : globalStyles.buttonText} >{value}</Text>
        </TouchableOpacity>
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
  }});
  