import { StyleSheet, View, Text, Image } from 'react-native';
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
}

export const NewsCard = (props: INewsCardProps) => {

  const {
    urlToImage, author, source, description, title
  } = props;


  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      {urlToImage && <Image 
          source={{uri:urlToImage}}
          style={styles.newsImage}
        ></Image>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.GRAY_3,
    alignItems: 'stretch',
    justifyContent: 'center',
    minHeight: 80,
    paddingLeft: 20,
    paddingRight: 20,
    // borderColor: Color.VARIANT_1,
    // borderWidth: 2,
    // borderStyle: 'solid',
    width: '90vw',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5
  },
  newsImage: {

  }
});
