import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider, Button } from 'react-native-elements';
import axios from 'axios';

export default class TripsCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: ''
		};
	}

	onClickListener = async () => {
		const Driver = this.props.Driver_id;
		console.log('aaaaaaaaaaaaaa');

		console.log(Driver);
		console.log('aaaaaaaaaaaaaa');
		var apiBaseUrl = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/passenger_request/create_passenger_request/${Driver}`;

		axios({ method: 'post', url: apiBaseUrl })
			.then((res) => {
				console.log(res.data.status);
				console.log(res.data.message);
				alert(res.data.message);
				this.setState({
					status: res.data.status
				});
			})
			.catch((err) => {
				console.log(err.response);
				alert(err.response.data.message);
				console.log(err.response.data.message);
			});
	};

	render() {
		return (
			<Card key={this.props.guc_id} containerStyle={styles.card}>
				<Text style={styles.notes}>{this.props.First_name}</Text>
				<Text style={styles.notes}>{this.props.Mobile}</Text>
				<Text style={styles.notes}>{this.props.Rating}</Text>
				<Text style={styles.notes}>{this.props.Slot}</Text>
				<Text style={styles.notes}>{this.props.Price}</Text>
				<Text style={styles.notes}>{this.state.status}</Text>

				<View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
					{/* <Image
						style={{ width: 100, height: 100 }}
						source={{
							uri: 'https://openweathermap.org/img/w/' + this.props.detail.weather[0].icon + '.png'
						}}
					/> */}
					<Button
						onPress={() => this.onClickListener()}
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
