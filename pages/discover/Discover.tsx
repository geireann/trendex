import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Switch, ScrollView, Pressable, FlatList } from 'react-native';
import { athletes } from '../../data';
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
      console.log(article)
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
    
    setArticles([{"source":{"id":null,"name":"ESPN"},"author":"Ryan McGee","title":"CFP National Championship - Georgia dynasty is just beginning - ESPN","description":"Two titles in two years -- including Monday's blowout of TCU in the College Football Playoff National Championship game -- and a bundle of returning talent has Georgia set up for years to come.","url":"https://www.espn.com/college-football/story/_/id/35416164/cfp-national-championship-georgia-dynasty-just-beginning","urlToImage":"https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F0110%2Fr1115758_1296x729_16%2D9.jpg","publishedAt":"2023-01-10T06:49:21Z","content":"INGLEWOOD, Calif. -- For so long, Georgia was the flagship program of the really good but not quite great. It produced a few decades of pretty nice seasons ending in pretty nice bowl games played by … [+8374 chars]"},{"source":{"id":null,"name":"CBS Sports"},"author":"","title":"AP Top 25 poll: Georgia finishes No. 1, Washington enters top 10 of final college football rankings - CBS Sports","description":"Georgia locked up its second straight national title with a resounding win over TCU","url":"https://www.cbssports.com/college-football/news/ap-top-25-poll-georgia-finishes-no-1-washington-enters-top-10-of-final-college-football-rankings/","urlToImage":"https://sportshub.cbsistatic.com/i/r/2023/01/10/d9b1b2e6-f093-4dd5-8e41-94ae95fedf37/thumbnail/1200x675/930e7de458142f552d53c3d06d803944/georgia-football.jpg","publishedAt":"2023-01-10T05:49:00Z","content":"Georgia finished off a perfect season with a resounding 65-7 win over TCU in the 2023 College Football Playoff National Championship on Monday night to finish No. 1 in the final AP Top 25. The poll m… [+1581 chars]"},{"source":{"id":null,"name":"YouTube"},"author":null,"title":"MAGIC at KINGS | FULL GAME HIGHLIGHTS | January 9, 2023 - NBA","description":"Never miss a moment with the latest news, trending stories and highlights to bring you closer to your favorite players and teams.Download now: https://app.li...","url":"https://www.youtube.com/watch?v=fnRa216_3ow","urlToImage":"https://i.ytimg.com/vi/fnRa216_3ow/maxresdefault.jpg","publishedAt":"2023-01-10T05:26:07Z","content":null},{"source":{"id":null,"name":"CBS Sports"},"author":"","title":"Has Kirby Smart passed Nick Saban as college football's greatest coach? SEC chiefs battle for sport's top spot - CBS Sports","description":"Smart led Georgia to its second consecutive national title on Monday with a 65-7 trouncing of TCU","url":"https://www.cbssports.com/college-football/news/has-kirby-smart-passed-nick-saban-as-college-footballs-greatest-coach-sec-chiefs-battle-for-sports-top-spot/","urlToImage":"https://sportshub.cbsistatic.com/i/r/2023/01/10/1b73a84a-625e-41a3-a11f-1c932c551735/thumbnail/1200x675/ad14ada1b02740c90f1a44a6c7a2bab9/smart-saban.jpg","publishedAt":"2023-01-10T04:39:00Z","content":"Georgia coach Kirby Smart led Georgia to a 65-7 win over TCU on Monday night, and in the process, he became the first head coach to win back-to-back national titles since Nick Saban led Alabama to co… [+2582 chars]"},{"source":{"id":null,"name":"Yahoo Entertainment"},"author":"Charles Robinson","title":"Aaron Rodgers’ future with the Green Bay Packers comes down to answering 3 questions - Yahoo Sports","description":"Maybe the team wants Rodgers back and he declines. Maybe Rodgers wants a return and the Packers are ready to move on. Maybe they both want another run in...","url":"https://sports.yahoo.com/aaron-rodgers-future-with-the-green-bay-packers-comes-down-to-answering-3-questions-043857530.html","urlToImage":"https://s.yimg.com/ny/api/res/1.2/pgKChKQIdWCqR9Tqse.Sjw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-01/ecfb14e0-9098-11ed-b7b3-9487b1396040","publishedAt":"2023-01-10T04:38:00Z","content":"When it was over Sunday night and the cameras turned to Aaron Rodgers walking off Lambeau Field in defeat against Detroit, it was difficult to keep from reading into his body language and where his e… [+8689 chars]"},{"source":{"id":null,"name":"YouTube"},"author":null,"title":"Stetson Bennett lost for words after emotional BACK-TO-BACK Championship | ESPN College Football - ESPN","description":"An emotional Georgia QB Stetson Bennett speaks to Holly Rowe about winning his second national championship back-to-back and receiving a curtain call in his ...","url":"https://www.youtube.com/watch?v=Xj8mmX32bs0","urlToImage":"https://i.ytimg.com/vi/Xj8mmX32bs0/maxresdefault.jpg","publishedAt":"2023-01-10T04:15:42Z","content":null},{"source":{"id":null,"name":"The Athletic"},"author":"Ken Rosenthal, Dan Hayes","title":"Carlos Correa, Twins accelerate talks as deal with Mets remains in limbo - The Athletic","description":"The possibility of a stunning reunion between Carlos Correa and the Twins is increasing, team sources said Monday night.","url":"https://theathletic.com/4074925/2023/01/09/twins-carlos-correa-contract-talks/","urlToImage":"https://cdn.theathletic.com/app/uploads/2023/01/09215005/GettyImages-1417476872-1024x683.jpg","publishedAt":"2023-01-10T04:11:34Z","content":"The possibility of a stunning reunion between Carlos Correa and the Twins is increasing, team sources said Monday night.\r\nWith the status of the mega-deal he agreed to with the New York Mets last mon… [+4275 chars]"},{"source":{"id":null,"name":"Prideofdetroit.com"},"author":"Jeremy Reisman","title":"3 teams request to interview Lions OC Ben Johnson for head coach - Pride Of Detroit","description":"Johnson has already been linked to three of the five NFL head coaching vacancies.","url":"https://www.prideofdetroit.com/2023/1/9/23547726/3-nfl-teams-request-interview-lions-oc-ben-johnson-head-coaching-jobs","urlToImage":"https://cdn.vox-cdn.com/thumbor/UdIraJF-Xe0bbOe0ItUDY-m7ses=/0x0:2400x1257/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23607363/usa_today_18417951.jpg","publishedAt":"2023-01-10T03:57:42Z","content":"You can add the Carolina Panthers to the teams that are interested in Detroit Lions offensive coordinator Ben Johnson. As first reported by Justin Rogers of the Detroit News, the Panthers have reques… [+1624 chars]"},{"source":{"id":null,"name":"Rivals.com"},"author":null,"title":"Billy Kemp: Nebraska football picks up second WR transfer this offseason - Rivals.com - Nebraska","description":"Nebraska lands the commitment of transfer receiver Billy Kemp IV, a veteran pass catcher from Virginia.","url":"https://nebraska.rivals.com/news/wr-transfer-billy-kemp-iv-commits-to-nebraska","urlToImage":"https://images.rivals.com/image/upload/f_auto,q_auto,t_headline_primary/k8rswvzbbyhvtn4qq6wg","publishedAt":"2023-01-10T03:40:18Z","content":"Nebraska football loses three of its top four pass catchers from the 2022 season in the school record-breaking Trey Palmer along with tight end Travis Vokolek and receiver Oliver Martin. The Huskers … [+2670 chars]"},{"source":{"id":null,"name":"NBCSports.com"},"author":"Charean Williams","title":"Dennis Allen comfortable with decision to play Andy Dalton over Jameis Winston - NBC Sports","description":"Saints quarterback Jameis Winston started the first three games before a back injury. He never saw the field again. Even when the Saints were mired in a 2-6 stretch after Winston’s injury, they never turned back to Winston after he was healthy enough to retur…","url":"https://profootballtalk.nbcsports.com/2023/01/09/dennis-allen-comfortable-with-decision-to-play-andy-dalton-over-jameis-winston/","urlToImage":"https://profootballtalk.nbcsports.com/wp-content/uploads/sites/25/2023/01/GettyImages-1445020122-e1673320738198.jpg","publishedAt":"2023-01-10T03:25:00Z","content":"Saints quarterback Jameis Winston started the first three games before a back injury. He never saw the field again. \r\nEven when the Saints were mired in a 2-6 stretch after Winstons injury, they neve… [+1162 chars]"},{"source":{"id":null,"name":"MMA Fighting"},"author":"MMA Fighting Newswire","title":"Kelvin Gastelum posts gnarly injury video after UFC Vegas 67 withdrawal: ‘Sewing my teeth back on’ - MMA Fighting","description":"Kelvin Gastelum had a good reason for pulling out of UFC Vegas 67.","url":"https://www.mmafighting.com/2023/1/9/23547684/kelvin-gastelum-posts-gnarly-injury-video-after-ufc-vegas-67-withdrawal-sewing-my-teeth-back-on","urlToImage":"https://cdn.vox-cdn.com/thumbor/NZAcsff-IKRS677gFFUzHbj6AIg=/0x0:7312x3828/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24348578/1335526706.jpg","publishedAt":"2023-01-10T03:00:00Z","content":"Kelvin Gastelum had a good reason for pulling out of UFC Vegas 67.\r\nGastelum was forced to withdraw from the UFCs first main event of 2023 on Monday after a mouth injury left him unable to compete ag… [+1692 chars]"},{"source":{"id":null,"name":"MLB Trade Rumors"},"author":"Anthony Franco","title":"Blue Jays To Sign Brandon Belt - MLB Trade Rumors","description":"After 12 seasons with the Giants, Brandon Belt is headed to Toronto. He's in agreement with the Blue Jays on a &hellip;","url":"https://www.mlbtraderumors.com/2023/01/blue-jays-to-sign-brandon-belt.html","urlToImage":"https://cdn.mlbtraderumors.com/files/2023/01/USATSI_18880662-1024x683.jpg","publishedAt":"2023-01-10T02:59:16Z","content":"After 12 seasons with the Giants, Brandon Belt is headed to Toronto. He’s in agreement with the Blue Jays on a one-year, $9.3MM contract for the 2023 season. The Excel Sports Management client has re… [+6435 chars]"},{"source":{"id":null,"name":"NBCSports.com"},"author":"Mike Florio","title":"In NFL vs. ESPN over whether Bills-Bengals would resume, an ESPN reporter breaks the tie - NBC Sports","description":"Well, this is awkward.A week after ESPN tiptoed around the prospect of openly disputing the league’s line-in-the-sand position that no consideration was ever given to resuming the Week 17 game between the Bills and Bengals, ESPN.com has dropped a bombshell th…","url":"https://profootballtalk.nbcsports.com/2023/01/09/in-nfl-vs-espn-over-whether-bills-bengals-would-resume-an-espn-reporter-breaks-the-tie/","urlToImage":"https://profootballtalk.nbcsports.com/wp-content/uploads/sites/25/2023/01/GettyImages-1245852254-e1673319459864.jpg","publishedAt":"2023-01-10T02:59:00Z","content":"Well, this is awkward.\r\nA week after ESPN tiptoed around the prospect of openly disputing the leagues line-in-the-sand position that no consideration was ever given to resuming the Week 17 game betwe… [+2787 chars]"},{"source":{"id":null,"name":"YouTube"},"author":null,"title":"NHL Highlights | Flyers vs. Sabres - January 9, 2023 - SPORTSNET","description":null,"url":"https://www.youtube.com/supported_browsers?next_url=https:%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DvEXztZX4eJ4","urlToImage":null,"publishedAt":"2023-01-10T02:46:50Z","content":"Your browser isnt supported anymore. Update it to get the best YouTube experience and our latest features. Learn more\r\nRemind me later"},{"source":{"id":null,"name":"Prideofdetroit.com"},"author":"Kellie Rowe","title":"Lions News: Lions-Packers most watched Sunday Night Football finale in 6 years - Pride Of Detroit","description":"Moving the Lions to primetime turned out to be the right move.","url":"https://www.prideofdetroit.com/2023/1/9/23547646/notes-lions-packers-most-watched-sunday-night-football-finale-6-years","urlToImage":"https://cdn.vox-cdn.com/thumbor/VmtbhiMDKzO1eAuIrAWwk0XOD70=/0x465:6484x3860/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24348545/1453660735.jpg","publishedAt":"2023-01-10T02:16:07Z","content":"© 2023 Vox Media, LLC. All Rights Reserved\r\n* 21+ (19+ CA-ONT) (18+ NH/WY). AZ, CO, CT, IL, IN, IA, KS, LA, (select parishes), MD, MI, NH, NJ, NY, OH, OR, PA, TN, VA, WV, WY, CA-ONT only.Eligibility … [+128 chars]"},{"source":{"id":"fox-news","name":"Fox News"},"author":"Ryan Gaydos","title":"Steelers' Alex Highsmith apologizes for CPR sack celebration, says it wasn't intentional - Fox News","description":"Pittsburgh Steelers linebacker Alex Highsmith apologized for the CPR sack celebration at the end of the win over the Cleveland Browns on Sunday.","url":"https://www.foxnews.com/sports/steelers-alex-highsmith-apologizes-cpr-sack-celebration-says-wasnt-intentional","urlToImage":"https://static.foxnews.com/foxnews.com/content/uploads/2023/01/Alex-Highsmith2.jpg","publishedAt":"2023-01-10T01:43:00Z","content":"Pittsburgh Steelers linebacker Alex Highsmith apologized for the CPR sack celebration that he was a part of toward the end of the teams win over the Cleveland Browns on Sunday.\r\nSteelers defensive en… [+2469 chars]"},{"source":{"id":null,"name":"NBCSports.com"},"author":"Mike Florio","title":"Sean McVay won’t put a timeline on his decision - NBC Sports","description":"The more that Rams coach Sean McVay talks about his future, the less it seems as if he’ll be coaching the Rams.His comments from after Sunday’s season-ending loss to the Seahawks were a far cry from “of course I’m coming back.” Meeting with reporters on Monda…","url":"https://profootballtalk.nbcsports.com/2023/01/09/sean-mcvay-wont-put-a-timeline-on-his-decision/","urlToImage":"https://profootballtalk.nbcsports.com/wp-content/uploads/sites/25/2023/01/GettyImages-1455106802-e1673314590173.jpg","publishedAt":"2023-01-10T01:41:00Z","content":"The more that Rams coach Sean McVay talks about his future, the less it seems as if hell be coaching the Rams.\r\nHis comments from after Sundays season-ending loss to the Seahawks were a far cry from … [+5405 chars]"},{"source":{"id":"the-washington-post","name":"The Washington Post"},"author":"Nicki Jhabvala, Sam Fortier","title":"Commanders players clean out lockers and await an offseason of uncertainty - The Washington Post","description":"For some players, locker-room clean-out day may have been their last with the Commanders.","url":"https://www.washingtonpost.com/sports/2023/01/09/commanders-offseason-ownership-questions/","urlToImage":"https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/N5EXHGJ5ASJBMHHYN5O56GNVEQ.jpg&w=1440","publishedAt":"2023-01-10T01:08:00Z","content":"Comment on this story\r\nTaylor Heinicke carefully packed a box of nearly a dozen Washington ball caps and folded signed jerseys from teammates. A framed photo of him embracing defensive tackle Jonatha… [+6844 chars]"},{"source":{"id":"google-news","name":"Google News"},"author":null,"title":"Calipari-Texas rumors take another turn. ‘I could very well see him ending up at Texas.’ - Lexington Herald Leader","description":null,"url":"https://news.google.com/__i/rss/rd/articles/CBMiX2h0dHBzOi8vd3d3LmtlbnR1Y2t5LmNvbS9zcG9ydHMvY29sbGVnZS9rZW50dWNreS1zcG9ydHMvdWstYmFza2V0YmFsbC1tZW4vYXJ0aWNsZTI3MDk2MjM1Mi5odG1s0gFfaHR0cHM6Ly9hbXAua2VudHVja3kuY29tL3Nwb3J0cy9jb2xsZWdlL2tlbnR1Y2t5LXNwb3J0cy91ay1iYXNrZXRiYWxsLW1lbi9hcnRpY2xlMjcwOTYyMzUyLmh0bWw?oc=5","urlToImage":null,"publishedAt":"2023-01-10T00:51:47Z","content":null},{"source":{"id":null,"name":"247Sports"},"author":"Daniel Gallen","title":"Penn State officially adds two specialists through NCAA Transfer Portal - 247Sports","description":"Penn State coach James Franklin has placed a significant emphasis on the Nittany Lions special teams units during his nine-year tenure, and it’s shown with the","url":"https://247sports.com/college/penn-state/Article/Penn-State-NCAA-Transfer-Portal-Riley-Thompson-Alex-Felkins-202537592/","urlToImage":"https://s3media.247sports.com/Uploads/Assets/275/478/11478275.jpg?fit=bounds&crop=1200:630,offset-y0.50&width=1200&height=630","publishedAt":"2023-01-10T00:43:05Z","content":"Penn State coach James Franklin has placed a significant emphasis on the Nittany Lions special teams units during his nine-year tenure, and it’s shown with the program’s work in the NCAA Transfer Por… [+3537 chars]"}])
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
