import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider, Button } from 'react-native-elements';
import axios from 'axios';

export default class DriverRequestCard extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	onClickListener1 = async () => {
		const Passenger = this.props.Passenger;
		console.log(Passenger);
		var apiBaseUrl = `http://10.1.0.108:5000/routes/requests/accept_request/${Passenger}`;

		axios({ method: 'post', url: apiBaseUrl })
			.then((res) => {
				console.log(res.data.status);
				console.log(res.data.message);
				alert(res.data.message);
			})
			.catch((err) => {
				console.log(err.response);
				alert(err.response.data.message);
				console.log(err.response.data.message);
			});
	};

	onClickListener2 = async () => {
		const Passenger = this.props.Passenger;

		var apiBaseUrl = `http://10.1.0.108:5000/routes/requests/cancel_request/${Passenger}`;

		axios({ method: 'delete', url: apiBaseUrl })
			.then((res) => {
				console.log(res.data.status);
				console.log(res.data.message);
				alert(res.data.message);
			})
			.catch((err) => {
				console.log(err.response);
				alert(err.response.data.message);
				console.log(err.response.data.message);
			});
	};

	onClickListener3 = async () => {
		const Passenger = this.props.Passenger;

		var apiBaseUrl = `http://10.1.0.108:5000/routes/requests/arrived_to_pickUp/${Passenger}`;

		axios({ method: 'post', url: apiBaseUrl })
			.then((res) => {
				console.log(res.data.status);
				console.log(res.data.message);
				alert(res.data.message);
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
				<Text style={styles.notes}>{this.props.Last_name}</Text>
				<Text style={styles.notes}>{this.props.GUC_slot}</Text>
				<Text style={styles.notes}>{this.props.Pick_up_location}</Text>
				<View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
					<Button
						onPress={() => this.onClickListener1()}
						buttonStyle={{
							backgroundColor: 'orange',
							width: 100,
							height: 40,
							marginTop: 20,
							marginLeft: 180
						}}
						title="Accept"
						titleStyle={{ color: 'white' }}
					/>
					<Button
						onPress={() => this.onClickListener2()}
						buttonStyle={{
							backgroundColor: 'orange',
							width: 100,
							height: 40,
							marginTop: 20,
							marginLeft: 180
						}}
						title="Reject"
						titleStyle={{ color: 'white' }}
					/>
					<Button
						onPress={() => this.onClickListener3()}
						buttonStyle={{
							backgroundColor: 'orange',
							width: 100,
							height: 40,
							marginTop: 20,
							marginLeft: 180
						}}
						title="Arrived"
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
