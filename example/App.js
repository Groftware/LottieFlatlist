import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView,
  Text
} from 'react-native';
import LottieFlatlist from '@groftware/lottie-flatlist'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    height: 100,
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    backgroundColor: 'white',
  },
  rowTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});

const fruits = [
  'Apple',
  'Orange',
  'Watermelon',
  'Avocado',
  'Blueberry',
  'Coconut',
  'Durian',
  'Mango',
];

const animationSource = require('./assets/bouncingfruits.json');

export default function App() {

  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  function renderItem({ item }) {
    return (
      <View key={item} style={styles.row}>
        <Text style={styles.rowTitle}>{item}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LottieFlatlist
        data={fruits}
        renderItem={renderItem}
        animationSource={animationSource}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}
