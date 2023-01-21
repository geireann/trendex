import { useEffect, useState } from 'react';
import { Button, TouchableOpacity, StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import { dummyArticles } from '../../data/dummyNewsArticles';
import { Color, FontSize, getCurrencyVal, getNews, globalStyles, IAthlete, IUser, TokenType, Sport} from '../../global';
import { NewsCard } from '../../global/components/NewsCard';
import { Token } from '../../global/components/Token';
import { fetchUser, saveTokens, saveWatchlist } from '../../serverGateway';

export interface IAthleteProps {
    athlete: IAthlete,
    setAthlete: (athlete: IAthlete | undefined) => void,
    user: IUser,
    setUser: (user: IUser) => void
}

export const Athlete = (props: IAthleteProps) => {
    const { athlete, setAthlete, user, setUser } = props;
    const [tokensAmount, setTokensAmount] = useState<number>(props.athlete.quantity);
    const [articles, setArticles] = useState<any[]>([]);

    const [articlesLoaded, setArticlesLoaded] = useState<boolean>(false);

    useEffect(() => {
      for (let i = 0; i < props.user.tokens.length; i++) {
        if (props.user.tokens[i].name == athlete.name) {
          setTokensAmount(props.user.tokens[i].quantity)
        }
      }
    }, [])

    const getCloseButton = () => {
        return (
            <TouchableOpacity style={styles.closeButton}
        onPress={() => {
            props.setAthlete(undefined)
        }}
        >
            <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        )
    }

    const renderItem = ({item}: any) => (
        <TouchableOpacity onPress={() => console.log('hi')}>
          <Token/>
        </TouchableOpacity>
      );
    
    const buyToken = async (name : string) => {
      debugger
        const newTokens = [...props.user.tokens]
        let updatedToken = new TokenType("", "", 0, 0, "", Sport.BASKETBALL)
        let tokenFound = false;
        for(let i = 0; i < newTokens.length; i++){
          if (newTokens[i].name == name) {
            updatedToken = newTokens[i]
            tokenFound = true;
            newTokens[i].quantity += 1
            console.log("BOUGHT TOKEN")
          }
        }
        if (updatedToken.price < props.user.balance) {
          let newUser = {...props.user}
          // Buy first instance of this token
          if (!tokenFound) {
            updatedToken = new TokenType(props.athlete.id,
              props.athlete.name, 1, props.athlete.tokenValue,
              props.athlete.profileImageUrl, props.athlete.sport)
              newTokens.push(updatedToken)
          }
          newUser.tokens = newTokens
          const newBalance = props.user.balance - updatedToken.price
          newUser.balance = newBalance
          props.setUser(newUser)
          setTokensAmount(tokensAmount + 1)
          await saveTokens(props.user.username, newTokens, newBalance)
        }
    }

    const sellToken = async (name : string) => {
      const newTokens = [...props.user.tokens]
      let updatedToken = new TokenType("", "", 0, 0, "", Sport.BASKETBALL)
      for(let i = 0; i < newTokens.length; i++){
        if (newTokens[i].name == name) {
          updatedToken = newTokens[i]
          newTokens[i].quantity -= 1
          console.log("SOLD TOKEN")
        }
      }
      if (tokensAmount > 0) {
        let newUser = {...props.user}
        newUser.tokens = newTokens
        if (tokensAmount - 1 == 0) {
          newTokens.splice(newTokens.indexOf(updatedToken), 1)
        }
        const newBalance = props.user.balance + updatedToken.price
        newUser.balance = newBalance
        props.setUser(newUser)
        setTokensAmount(tokensAmount - 1)
        await saveTokens(props.user.username, newTokens, newBalance)
      }
    }

    const addToWatchlist = async(tokenName : string) => {
      debugger
      const newWatchList = [...props.user.watchlist]
      let tokenFound = false
      //make sure token doesn't already exist in watchlist
      for (let i = 0; i < newWatchList.length; i++) {
        if (newWatchList[i].name == tokenName) {
          tokenFound = true;
        }
      }
      if (!tokenFound) {
        let newUser = {...props.user}
        let newToken = new TokenType(props.athlete.id,
          props.athlete.name, 1, props.athlete.tokenValue,
          props.athlete.profileImageUrl, props.athlete.sport)
        newWatchList.push(newToken)
        newUser.watchlist = newWatchList
        props.setUser(newUser)
        await saveWatchlist(props.user.username, newWatchList)
      }

    }

    const getTokenVisualization = () => {
        const tokenData: any[] = [];

        for(let i = 0; i < tokensAmount; i++) {
            tokenData.push({
                id: i,
            })
        }

        return (<FlatList numColumns={5} data={tokenData} renderItem={renderItem}></FlatList>)
    }

    const getUserTokenInfo = () => {
        return (
            <View>
                <Text style={globalStyles.sectionHeader}>
                    Your {athlete.name} Tokens
                </Text>
                {getTokenVisualization()}
                <Text style={styles.tokenInfo}>
                    You have <Text>{tokensAmount}</Text> tokens which is equivalent to <Text>{getCurrencyVal(tokensAmount * athlete.tokenValue)}</Text>
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <TouchableOpacity style={globalStyles.buttonV1}>
                       {/* <Text style={globalStyles.buttonTextV1}>Buy</Text> */}
                      <Text style={globalStyles.buttonTextV1} onPress={() => buyToken(athlete.name)}>
                        Buy
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.buttonV2}>
                        {/* <Text style={globalStyles.buttonTextV2}>Sell</Text> */}
                        <Text style={globalStyles.buttonTextV2} onPress={() => sellToken(athlete.name)}>
                        Sell
                      </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const getRelatedNews = (): JSX.Element[] => {
        const latestNewsItems: JSX.Element[] = [];
        
        articles.forEach((article, index) => {
          latestNewsItems.push(
            <NewsCard {...article}/>
          )
        })
    
        return latestNewsItems;
      }

      useEffect(() => {
        getNews(true, athlete.name, undefined, undefined)
          .then((res: any) => {
            console.log(res.articles)
            setArticles(res.articles)
            setArticlesLoaded(true)
          })
          .catch((e) => {
            console.log(e.message)
          })
        
        // setArticles(dummyArticles)
        // setArticlesLoaded(true)
      },[])

  return (
    <ScrollView style={styles.container}>
      {getCloseButton()}
        <View style={styles.profileImageContainer}>
        <Image 
          source={{uri:athlete.profileImageUrl}}
          style={styles.profileImage}
        ></Image>
        <Text style={styles.token}>
            1TOK = {athlete.tokenValue && getCurrencyVal(athlete.tokenValue)}
        </Text>
      </View>
        <View style={{width: '100vw', paddingHorizontal: 20}}>
            <Text style={styles.name}>
                <Text>{athlete.name} </Text>
            </Text>
            <Text style={styles.sport}>
                {athlete.sport}
            </Text>
            {getUserTokenInfo()}
            <Text style={globalStyles.sectionHeader}>
              Watchlist
            </Text>
            <TouchableOpacity style={globalStyles.buttonV1}>
              <Text style={globalStyles.buttonTextV1} onPress={() => addToWatchlist(athlete.name)}>
                Add to Watchlist
              </Text>
            </TouchableOpacity>
            <Text style={globalStyles.sectionHeader}>
                Related News
            </Text>
            {articlesLoaded ? getRelatedNews() : <Text>Articles not loaded</Text>}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2f2f',
    flexDirection: 'column',
  },
  profileImageContainer: {
    width: '100vw',
    height: 300
  },
  profileImage: {
    width: '100%',
    height: '100%'
  },
  name:{
    fontSize: FontSize.HEADER * 2,
    alignSelf: 'flex-start',
    flex: 1,
    color: Color.TEXT_ON_DARK,
    fontWeight: '600'
  },
  buy: {
    backgroundColor: Color.VARIANT_2,
    color: Color.TEXT_ON_DARK,
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  sell: {
    backgroundColor: Color.VARIANT_1,
    color: Color.TEXT_ON_DARK,
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  sport: {
    color: Color.TEXT_ON_DARK_VARIANT,
    fontSize: FontSize.HEADER
  },
  token: {
    backgroundColor: Color.VARIANT_2,
    width: 'fit-content',
    color: Color.TEXT_ON_DARK,
    fontWeight: "600",
    left: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 20,
    fontSize: FontSize.LARGE
},
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    border: `solid 1px ${Color.VARIANT_2}`,
    backgroundColor: '#ffffff99',
    zIndex: 1
  },
  closeButtonText: {
    color: Color.VARIANT_2,
  },
  tokenInfo: {
    fontSize: FontSize.BODY_LARGE,
    paddingTop: 5,
    paddingBottom: 10,
    color: Color.TEXT_ON_DARK
  }
});