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
  },
  section: {
    display: 'flex',
    color: 'white',
    fontWeight: '300',
    fontSize: FontSize.SECTION,
    marginBottom: 3,
},
  input: {
      backgroundColor: Color.GRAY_4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 100,
      marginBottom: 20,
      width: '100%'
  },
});
