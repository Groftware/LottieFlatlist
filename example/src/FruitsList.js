import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import LottieFlatlist from '@groftware/lottie-flatlist';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#4587CC',
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
	'Pear',
	'Passion Fruit'
];

const animationSource = require('../assets/bouncingfruits.json');

export default function FruitsList() {
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
		<View style={[
			styles.container
		]}>
			<LottieFlatlist
				data={fruits}
				renderItem={renderItem}
				animationSource={animationSource}
				refreshing={refreshing}
				onRefresh={onRefresh}
				refreshHeight={140}
				animationSize={100}
			/>
		</View>
	);
}
