import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Switch, ScrollView, TouchableOpacity, FlatList, ListRenderItemInfo } from 'react-native';
import { athletes } from '../../data';
import { dummyArticles } from '../../data/dummyNewsArticles';
import { Color, IAthlete, NewsCategory, NewsCountry, SearchInput, Sport, AthleteType, FontSize } from '../../global';
import { AthleteCard } from '../../global/components/AthleteCard';
import { NewsCard } from '../../global/components/NewsCard';
import { globalStyles } from '../../global/globalStyles';
import { getFlagEmoji, getNews } from '../../global/globalUtils';

export const Discover = ({setAthlete}: {
  setAthlete: (athlete: IAthlete | undefined) => void
}) => {

  const [searchValue, setSearchValue] = useState<string>('');
  const [categoryFilter, setCategoryFitler] = useState<Sport>(Sport.ALL);
  const [newsCategory, setNewsCategory] = useState<NewsCategory>(NewsCategory.SPORT);
  const [newsCountry, setNewsCountry] = useState<NewsCountry>(NewsCountry.All);
  const [articles, setArticles] = useState<any[]>([]);
  const [articlesLoaded, setArticlesLoaded] = useState<boolean>(false);

  const getCategoryFilters = (): JSX.Element[] => {
    const filters:JSX.Element[] = [];

    Object.values(Sport).forEach((value, ind) => {
      filters.push(<TouchableOpacity style={categoryFilter === value ? globalStyles.buttonActive : globalStyles.button} onPress={() => setCategoryFitler(value as Sport)}>
        <Text style={categoryFilter === value ? globalStyles.buttonTextActive : globalStyles.buttonText}>{value}</Text>
      </TouchableOpacity>)
    })

    return filters;
  }

  const getNewsCountryFilters = ():JSX.Element[] => {
    const filters:JSX.Element[] = [];

    Object.values(NewsCountry).forEach((value, ind) => {
      filters.push(<TouchableOpacity style={newsCountry === value ? globalStyles.buttonActive : globalStyles.button} onPress={() => setNewsCountry(value as NewsCountry)}>
        <Text style={newsCountry === value ? globalStyles.buttonTextActive : globalStyles.buttonText}>{getFlagEmoji(value)}</Text>
      </TouchableOpacity>)
    })

    return filters;
  }

  const getSearchResults = (): JSX.Element => {

    
let searchResults: AthleteType[] = athletes;
      searchResults = searchResults.filter((res) => {
        return res.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1; 
    })

    if (searchResults.length === 0) {
      return <Text style={globalStyles.message}>
        No results match your search query.
      </Text>
    }

    return <FlatList
        data={searchResults}
        renderItem={(item) => renderItem(item, true)}
        numColumns={1}
        keyExtractor={item => item.id + 'search'}
        style={{
          width: '100vw',
        }}
      />
  }

  const renderItem = (item: ListRenderItemInfo<AthleteType>, fullWidth?: boolean) => (
    <AthleteCard athlete={item.item} setAthlete={setAthlete} fullWidth={fullWidth}/>
  );

  const renderNewsItem = (item:any, fullWidth: boolean) => {
    console.log(item)
    return <NewsCard {...item}/>
  };

  const getLatestNews = (): JSX.Element => {
    const latestNewsItems: JSX.Element[] = [];
    
    articles.forEach((article, index) => {
      // console.log(article)
      latestNewsItems.push(
        <NewsCard {...article}/>
      )
    })

    return (
      <FlatList
        data={articles}
        renderItem={({item}) => renderNewsItem(item, true)}
        numColumns={1}
        keyExtractor={item => item.url + 'news'}
        style={{
          width: '100vw',
        }}
      />
    )

    // return latestNewsItems;
  }

  useEffect(() => {
    let countryFilter: NewsCountry | undefined = newsCountry;
    if (newsCountry === NewsCountry.All) countryFilter = undefined
    getNews(false, undefined, NewsCategory.SPORT, countryFilter)
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
  },[newsCountry])

  const getTrendingAthletes = () => {
    let trendingAthletes: AthleteType[] = athletes;
    if (categoryFilter !== Sport.ALL) {
      trendingAthletes = trendingAthletes.filter((val: AthleteType) => {
        return (val.sport === categoryFilter);
      })
    }
    return (
      <FlatList
        data={trendingAthletes}
        renderItem={(item) => renderItem(item, false)}
        numColumns={2}
        keyExtractor={item => item.id + 'trending'}
        style={{
          width: '100vw',
          paddingLeft: 20,
          paddingRight: 10,
          left: '-20px'
        }}
      />
    )
  }
  
  return (
    <ScrollView style={styles.container}>
      <SearchInput value={searchValue} setValue={setSearchValue}/>
      <Text style={globalStyles.sectionSubHeader}>
        Sport
      </Text>
      <ScrollView horizontal={true} style={globalStyles.horizontalScroll}>
        {getCategoryFilters()}
      </ScrollView>
      {searchValue.length > 0 && 
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
      {getTrendingAthletes()}
      <Text style={globalStyles.sectionHeader}>
        Latest News
      </Text>
      <Text style={globalStyles.sectionSubHeader}>
        Country
      </Text>
      <ScrollView horizontal={true} style={globalStyles.horizontalScroll}>
        {getNewsCountryFilters()}
      </ScrollView>
      {articlesLoaded ? getLatestNews() : <Text style={globalStyles.message}>Articles loading</Text>}
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
