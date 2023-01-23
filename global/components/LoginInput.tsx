import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Color, FontSize } from '../globalEnums';

export interface ILoginInput {
    title: string,
    value: string,
    onChangeText: any,
    secure: boolean
}

export const LoginInput = (props: ILoginInput) => {

  const { title, value, onChangeText, secure } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.section}>{title}</Text>
      <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secure}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
    maxHeight: 80,
    minHeight: 80,
    gap: 5
  },
  section: {
    display: 'flex',
    color: 'white',
    fontWeight: '300',
    fontSize: FontSize.SECTION,
},
  input: {
      backgroundColor: Color.GRAY_4,
      padding: 10,
      borderRadius: 100,
      width: '100%'
  },
});
