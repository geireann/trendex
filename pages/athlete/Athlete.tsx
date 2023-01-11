import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { dummyArticles } from '../../data/dummyNewsArticles';
import { Color, FontSize, getNews, globalStyles, IAthlete } from '../../global';
import { NewsCard } from '../../global/components/NewsCard';

export interface IAthleteProps {
    athlete: IAthlete,
    setAthlete: (athlete: IAthlete | undefined) => void
}

export const Athlete = ({setAthlete, athlete}: IAthleteProps) => {
    const { tokenValue = 0 } = athlete;
    const [tokens, setTokens] = useState<number>(0);
    const [articles, setArticles] = useState<any[]>([]);
    const [articlesLoaded, setArticlesLoaded] = useState<boolean>(false);

    const getCloseButton = () => {
        return (
            <Pressable style={styles.closeButton}
        onPress={() => {
            setAthlete(undefined)
        }}
        >
            <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
        )
    }

    const getUserTokenInfo = () => {
        return (
            <View>
                <Text>
                    You have <Text>{tokens}</Text> tokens which is equivalent to <Text>${tokens * tokenValue}</Text>
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Pressable style={globalStyles.buttonV1}>
                       <Text style={globalStyles.buttonTextV1}>Buy</Text>
                    </Pressable>
                    <Pressable style={globalStyles.buttonV2}>
                        <Text style={globalStyles.buttonTextV2}>Sell</Text>
                    </Pressable>
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
        getNews(true, athlete.lastName, undefined, undefined)
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
            <Text style={styles.token}>
                ${athlete.tokenValue}
            </Text>
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
    backgroundColor: '#ff66690f',
    zIndex: 1
  },
  closeButtonText: {
    color: Color.VARIANT_2,
  }
});
