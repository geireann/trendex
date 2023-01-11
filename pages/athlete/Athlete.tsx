import { useEffect, useState } from 'react';
import { Button, TouchableOpacity, StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import { dummyArticles } from '../../data/dummyNewsArticles';
import { Color, FontSize, getNews, globalStyles, IAthlete } from '../../global';
import { NewsCard } from '../../global/components/NewsCard';
import { Token } from '../../global/components/Token';

export interface IAthleteProps {
    athlete: IAthlete,
    setAthlete: (athlete: IAthlete | undefined) => void
}

export const Athlete = ({setAthlete, athlete}: IAthleteProps) => {
    const { tokenValue = 3 } = athlete;
    const [tokens, setTokens] = useState<number>(5);
    const [articles, setArticles] = useState<any[]>([]);
    const [articlesLoaded, setArticlesLoaded] = useState<boolean>(false);

    const getCloseButton = () => {
        return (
            <TouchableOpacity style={styles.closeButton}
        onPress={() => {
            setAthlete(undefined)
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

    const getTokenVisualization = () => {
        const tokenData: any[] = [];

        for(let i = 0; i < tokens; i++) {
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
                    Your {athlete.firstName} {athlete.lastName} Tokens
                </Text>
                {getTokenVisualization()}
                <Text style={styles.tokenInfo}>
                    You have <Text>{tokens}</Text> tokens which is equivalent to <Text>${tokens * tokenValue}</Text>
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <TouchableOpacity style={globalStyles.buttonV1}>
                       <Text style={globalStyles.buttonTextV1}>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.buttonV2}>
                        <Text style={globalStyles.buttonTextV2}>Sell</Text>
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
        getNews(true, athlete.firstName+"%20AND%20"+athlete.lastName, undefined, undefined)
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
            1TOK = ${athlete.tokenValue}
        </Text>
      </View>
        <View style={{width: '100vw', paddingHorizontal: 20}}>
            <Text style={styles.name}>
                <Text>{athlete.firstName} </Text>
                <Text>{athlete.lastName}</Text>
            </Text>
            <Text style={styles.sport}>
                {athlete.sport}
            </Text>
            {getUserTokenInfo()}
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
  firstName: {

  },
  lastName: {

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
