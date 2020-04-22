# LottieFlatlist
![image](https://i.imgur.com/CZTyXRS.gif)

**Table of contents** 

* [Insallation](#installation)
* [Usage](#usage)
* [Contact](#contact)

A Flatlist component allows you to turn any lottie animation into a pull to refresh component.

## Installation
``` 
npm i @groftware/lottie-flatlist
```
or
``` 
yarn add @groftware/lottie-flatlist
```

## Usage
Usage is similar to a regular FlatList, but with additional props. `LottieFlatlist` accepts an `animationSource` prop, which is any JSON [Lottie animation](https://lottiefiles.com/).

### Basic usage
```
import LottieFlatlist from '@groftware/lottie-flatlist'

export default function MyApp() {
	const animationSource = require('./path/to/animation.json');
	const data = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
	];

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
    <View>
      <LottieFlatlist
        data={data}
        renderItem={renderItem}
        animationSource={animationSource}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    <View>
  );
}

```

### Advanced usage
```
<LottieFlatlist
	data={fruits}
	renderItem={renderItem}
	animationSource={animationSource}
	refreshing={refreshing}
	onRefresh={onRefresh}

	// Optional props
	animationSize={30}
	refreshHeight={100}
/>
```

<table>
	<tr>
		<th>Property</th>
		<th>Type</th>
		<th>Description</th>
		<th>Required</th>
	</tr>
	<tr>
		<td>data</td>
		<td>array</td>
		<td>Same as FlatList data</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>renderItem</td>
		<td>function</td>
		<td>Same as FlatList renderItem</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>animationSource</td>
		<td>object</td>
		<td>Animation asset lottie json</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>refreshing</td>
		<td>boolean</td>
		<td>Whether is refreshing or not. Similar to React Native's RefreshControl component</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>onRefresh</td>
		<td>function</td>
		<td>Called when refresh is triggered. Similar to React Native's RefreshControl component</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>animationSize</td>
		<td>number</td>
		<td>Size of the lottie animation. This sets the width and height of the animation. Default value is 100.</td>
		<td>No</td>
	</tr>
	<tr>
		<td>refreshHeight</td>
		<td>number</td>
		<td>Height that triggers the refreshing. Default value is 100.</td>
		<td>No</td>
	</tr>
</table>

### Any bugs or feature request, feel free to submit a pull request on Github.

## Contact
- [groftware.tech](https://groftware.tech)
- [hello@groftware.tech](mailto:hello@groftware.tech)


