import React from 'react';
import { View, StyleSheet } from 'react-native';
import FruitsList from './src/FruitsList';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default function App() {
  return (
    <View style={styles.container}>
      <FruitsList />
    </View>
  );
}
