import { StyleSheet } from 'react-native';
import { Color, FontSize } from './globalEnums';

export const globalStyles = StyleSheet.create({
    sectionHeader: {
      fontSize: FontSize.SECTION,
      color: Color.TEXT_ON_DARK,
      fontWeight: "600",
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'flex-start',
    },
    sectionSubHeader: {
      fontSize: FontSize.SECTION_SUBHEADER,
      color: Color.TEXT_ON_DARK_VARIANT,
      fontWeight: "300",
      marginTop: 5,
      marginBottom: 10,
      alignSelf: 'flex-start',
    },
    buttonTextActive: {
        color: Color.VARIANT_2,
        fontSize: FontSize.BODY_LARGE,
        padding: 0,
        margin: 0
      },
      buttonText: {
        fontSize: FontSize.BODY_LARGE,
        color: Color.TEXT_ON_DARK,
        padding: 0,
        margin: 0
      },
      buttonTextV1: {
        fontSize: FontSize.HEADER,
        color: Color.VARIANT_3,
        padding: 0,
        margin: 0
      },
      buttonTextV2: {
        fontSize: FontSize.HEADER,
        padding: 0,
        margin: 0,
        color: Color.VARIANT_2
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 15,
        borderRadius: 10,
        border: `solid 1px ${Color.TEXT_ON_DARK}`,
        height: 'fit-content',
        marginRight: 10
      },
      buttonActive: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 15,
        borderRadius: 10,
        border: `solid 1px ${Color.VARIANT_2}`,
        backgroundColor: '#ff66690f',
        height: 'fit-content',
        marginRight: 10
      },
      buttonV1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginRight: 5,
        border: `solid 1px ${Color.VARIANT_3}`,
        backgroundColor: '#cceec60f',
        height: 'fit-content',
      },
      buttonV2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 15,
        borderRadius: 10,
        border: `solid 1px ${Color.VARIANT_2}`,
        backgroundColor: '#ff66690f',
        height: 'fit-content',
      },
      horizontalScroll: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 'fit-content',
        marginBottom: 10,
        paddingBottom: 5
      }
  });