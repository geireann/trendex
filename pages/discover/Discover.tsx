import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Switch, ScrollView, Pressable, FlatList } from 'react-native';
import { athletes } from '../../data';
import { dummyArticles } from '../../data/dummyNewsArticles';
import { Color, IAthlete, NewsCategory, NewsCountry, SearchInput, Sport } from '../../global';
import { AthleteCard } from '../../global/components/AthleteCard';
import { NewsCard } from '../../global/components/NewsCard';
import { globalStyles } from '../../global/globalStyles';
import { getNews } from '../../global/globalUtils';

export const Discover = () => {

  const [searchValue, setSearchValue] = useState<string>('');
  const [categoryFilter, setCategoryFitler] = useState<Sport>();
  const [newsCategory, setNewsCategory] = useState<NewsCategory>(NewsCategory.SPORT);
  const [newsCountry, setNewsCountry] = useState<NewsCountry>();
  const [articles, setArticles] = useState<any[]>([]);
  const [articlesLoaded, setArticlesLoaded] = useState<boolean>(false);

  const getCategoryFilters = (): JSX.Element[] => {
    const filters:JSX.Element[] = [];

    Object.values(Sport).forEach((value, ind) => {
      filters.push(<Pressable style={categoryFilter === value ? globalStyles.buttonActive : globalStyles.button} onPress={() => setCategoryFitler(value as Sport)}>
        <Text style={categoryFilter === value ? globalStyles.buttonTextActive : globalStyles.buttonText}>{value}</Text>
      </Pressable>)
    })

    return filters;
  }

  const getNewsCountryFilters = ():JSX.Element[] => {
    const filters:JSX.Element[] = [];

    Object.values(NewsCountry).forEach((value, ind) => {
      filters.push(<Pressable style={newsCountry === value ? globalStyles.buttonActive : globalStyles.button} onPress={() => setNewsCountry(value as NewsCountry)}>
        <Text style={newsCountry === value ? globalStyles.buttonTextActive : globalStyles.buttonText}>{value}</Text>
      </Pressable>)
    })

    return filters;
  }

  const getSearchResults = (): JSX.Element[] => {
    const results: JSX.Element[] = [];
    return results;
  }

  const renderItem = ({item}:any) => (
    <AthleteCard athlete={item} />
  );

  const getLatestNews = (): JSX.Element[] => {
    const latestNewsItems: JSX.Element[] = [];
    
    articles.forEach((article, index) => {
      latestNewsItems.push(
        <NewsCard {...article}/>
      )
    })

    return latestNewsItems;
  }

  useEffect(() => {
    // getNews(false, undefined, NewsCategory.SPORT, NewsCountry.UnitedStates)
    //   .then((res: any) => {
    //     console.log(res.articles)
    //     setArticles(res.articles)
    //     setArticlesLoaded(true)
    //   })
    //   .catch((e) => {
    //     console.log(e.message)
    //   })
    
    setArticles(dummyArticles)
    setArticlesLoaded(true)
  },[])
  
  return (
    <ScrollView style={styles.container}>
      <SearchInput value={searchValue} setValue={setSearchValue}/>
      <Text style={globalStyles.sectionSubHeader}>
        Sport
      </Text>
      <ScrollView horizontal={true} style={globalStyles.horizontalScroll}>
        {getCategoryFilters()}
      </ScrollView>
      {searchValue.length > 2 && 
        <View>
          <Text style={globalStyles.sectionHeader}>
            Search Results
          </Text>
          {getSearchResults()}
        </View>
      }
      <Text style={globalStyles.sectionHeader}>
        Trending Athletes
      </Text>
      <FlatList
        data={athletes}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id}
        style={{
          width: '100vw',
          left: -20
        }}
      />
      <Text style={globalStyles.sectionHeader}>
        Latest News
      </Text>
      <Text style={globalStyles.sectionSubHeader}>
        Country
      </Text>
      <ScrollView horizontal={true} style={globalStyles.horizontalScroll}>
        {getNewsCountryFilters()}
      </ScrollView>
      {articlesLoaded ? getLatestNews() : <Text>Articles not loaded</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.GRAY_2,
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 'fit-content'
  },
  trendingContainer: {
    flexDirection: 'column',
  }
});
