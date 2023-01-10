import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color, FontSize } from '../globalEnums';
import { Icon } from '@rneui/themed';
import { BlurView } from 'expo-blur';



export const Header = (props: {title: string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{props.title}</Text>
      {/* <BlurView intensity={50} style={StyleSheet.absoluteFill} /> */}
      {/* <Icon name={"notifications-outline"} type={"ionicon"} color={Color.TEXT_ON_DARK}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.GRAY_2,
    alignItems: 'stretch',
    justifyContent: 'center',
    minHeight: 80,
    paddingLeft: 20,
    paddingRight: 20
  },
  headerText: {
    color: Color.TEXT_ON_DARK,
    fontWeight: "600",
    fontSize: FontSize.HEADER,
    zIndex: 1
  }
});
