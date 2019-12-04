import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider, Button } from 'react-native-elements';

export default class TripsCard extends Component {
	render() {
		//console.log(this.props.Slot);
		return (
			<Card key={this.props.guc_id} containerStyle={styles.card}>
				<Text style={styles.notes}>{this.props.First_name}</Text>
				<Text style={styles.notes}>{this.props.Mobile}</Text>
				<Text style={styles.notes}>{this.props.Rating}</Text>
				<Text style={styles.notes}>{this.props.Slot}</Text>
				<Text style={styles.notes}>{this.props.Price}</Text>

				<View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
					{/* <Image
						style={{ width: 100, height: 100 }}
						source={{
							uri: 'https://openweathermap.org/img/w/' + this.props.detail.weather[0].icon + '.png'
						}}
					/> */}
					<Button
						buttonStyle={{
							backgroundColor: 'orange',
							width: 100,
							height: 40,
							marginTop: 20,
							marginLeft: 180
						}}
						title="Request"
						titleStyle={{ color: 'white' }}
					/>
				</View>
				<Divider style={{ backgroundColor: 'black', marginVertical: 20 }} />
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'black',
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
