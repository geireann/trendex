import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';

export interface ISearchInput {
    title: string,
    value: string,
    onChange: string,
}

export const SearchInput = (props: ISearchInput) => {

  return (
    <View style={styles.container}>
      <Text>Investments!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2f2f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
