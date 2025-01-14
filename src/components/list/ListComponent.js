import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';

export default function ListComponent({ title, itens }) {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text>{itens} itens</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 5,
      borderRadius: 10,
      backgroundColor: '#fff',
    },
    title: {
      color: '#20232a',
      textAlign: 'start',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });