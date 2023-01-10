import { Icon } from '@rneui/base/dist/Icon';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Color, FontSize } from '../globalEnums';
import { globalStyles } from '../globalStyles';

export interface ISearchInput {
    value?: string,
    setValue?: (input: string) => void,
}

export const SearchInput = (props: ISearchInput) => {

  const {value, setValue} = props;


  const onChangeSearch = (value: any) => {
    console.log(value)
    setValue && setValue(value)
    // onChange(value)
  }

  return (
    <View style={styles.container}>
      {/* <Icon name="ios-search"/> */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeSearch}
        value={value}
        placeholder={"Find your next success story..."}
      ></TextInput>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: Color.GRAY_4,
    padding: 10,
    borderRadius: 10,
    width: '100%'
},
});
