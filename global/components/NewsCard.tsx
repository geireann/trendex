import { StyleSheet, View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { Color } from '../globalEnums';

export interface INewsCardProps {
    urlToImage?: string;
    author?: string;
    source?: {
        id: string | null;
        name: string;
    }
    description?: string;
    title?: string
    url?: string
}

export const NewsCard = (props: INewsCardProps) => {

  const {
    urlToImage, author, source, description, title, url
  } = props;


  return (
    <TouchableOpacity style={styles.container} onPress={() => {
        url && Linking.openURL(url)
    }}>
    {urlToImage && <View style={styles.newsImageContainer}>
    {urlToImage && <Image 
        source={{uri:urlToImage}}
        style={styles.newsImage}
        ></Image>}
      </View>}
      <Text numberOfLines={3} style={styles.newsTitle}>{title}</Text>
      <Text style={styles.source}>{source?.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.GRAY_3,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    minHeight: 80,
    maxHeight: 80,
    width: '90vw',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
    overflow: 'hidden'
  },
  newsTitle: {
    color: Color.TEXT_ON_DARK,
    height: '100%',
    padding: 5
  },
  newsImageContainer: {
    overflow: 'hidden',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  newsImage: {
    width: '100%',
    height: '100%',
  },
  source: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: Color.VARIANT_2,
    color: Color.TEXT_ON_DARK,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10
  }
});
