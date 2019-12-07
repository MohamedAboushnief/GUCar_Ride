import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider, Button } from 'react-native-elements';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default class TripsCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: '',
			request: 'Request',
			pick_up_location: 'zahraa El maadi'
		};
	}

	onClickListener2 = async () => {
		const token = JSON.parse(await SecureStore.getItemAsync('token'));

		axios.defaults.headers.common['Authorization'] = token;
		var apiBaseUrl1 = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/passenger_request/cancel_passenger_request`;
		var apiBaseUrl2 = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/requests/passenger_cancel_request`;

		axios({ method: 'delete', url: apiBaseUrl1 })
			.then((res) => {
				console.log(res.data.status);
				console.log(res.data.message);
				alert(res.data.message);
				this.setState({
					request: 'Request'
				});
			})
			.catch((err) => {
				console.log(err.response);
				alert(err.response.data.message);
				console.log(err.response.data.message);
			});

		axios({ method: 'delete', url: apiBaseUrl2 })
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

	onClickListener = async () => {
		const Driver = this.props.Driver_id;

		var apiBaseUrl1 = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/passenger_request/create_passenger_request/${Driver}`;
		var apiBaseUrl2 = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/requests/create/${Driver}`;
		var apiBaseUrl3 = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/passenger_request/view_passenger_request/${Driver}`;

		var payload = {
			pick_up_location: this.state.pick_up_location
		};

		const token = JSON.parse(await SecureStore.getItemAsync('token'));

		axios.defaults.headers.common['Authorization'] = token;
		axios({ method: 'post', url: apiBaseUrl1 })
			.then((res) => {
				console.log(res.data.status);
				console.log(res.data.message);
				alert(res.data.message);
				this.setState({
					status: res.data.newRequest.status,
					request: 'Requested'
				});
			})
			.catch((err) => {
				console.log(err.response);
				alert(err.response.data.message);
				console.log(err.response.data.message);
			});

		axios({ method: 'post', url: apiBaseUrl2, data: payload })
			.then((res) => {
				console.log(res.data.status);
				console.log(res.data.message);
			})
			.catch((err) => {
				console.log(err.response);
				alert(err.response.data.message);
				console.log(err.response.data.message);
			});

		axios({ method: 'get', url: apiBaseUrl3 })
			.then((res) => {
				console.log(res.data.request.status);
				console.log(res.data.message);

				this.setState({
					status: res.data.request.status
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
					<Button
						onPress={() => this.onClickListener()}
						buttonStyle={{
							backgroundColor: 'orange',
							width: 100,
							height: 40,
							marginTop: 20,
							marginLeft: 180
						}}
						title={this.state.request}
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
						title="Delete Request"
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
