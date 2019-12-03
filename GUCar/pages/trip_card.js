import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

export default class TripsCard extends Component {
	render() {
		return (
			<Card containerStyle={styles.card}>
				<Text style={styles.notes}>{this.props.Slot}</Text>

				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Image
						style={{ width: 100, height: 100 }}
						source={{
							uri: 'https://openweathermap.org/img/w/' + this.props.detail.weather[0].icon + '.png'
						}}
					/>
				</View>
				<Divider style={{ backgroundColor: '#dfe6e9', marginVertical: 20 }} />
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'rgba(56, 172, 236, 1)',
		borderWidth: 0,
		borderRadius: 20
	},
	time: {
		fontSize: 38,
		color: '#fff'
	},
	notes: {
		fontSize: 18,
		color: '#fff',
		textTransform: 'capitalize'
	}
});
