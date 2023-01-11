import { Icon } from '@rneui/base/dist/Icon';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Color, FontSize } from '../globalEnums';
import { globalStyles } from '../globalStyles';

export interface IToken {
    value?: number
}

export const Token = (props: IToken) => {

    const {value} = props;

  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
            {value && <Text style={styles.tokenValue}>
                ${value}
          </Text>}
        </View>
    </View>
  );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.VARIANT_2,
        minWidth: 50,
        minHeight: 50,
        borderRadius: 50,
        margin: 3
    },
    innerContainer: {
        backgroundColor: Color.VARIANT_1,
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: "inset black 0px 0px 10px 0.2px"
    },
    tokenValue: {
        color: Color.TEXT_ON_DARK,
        textAlign: 'center',
        fontWeight: "600",
      },
});
