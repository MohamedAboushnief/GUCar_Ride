import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, Picker } from 'react-native';
import {
	Button,
	ThemeProvider,
	Input,
	HeaderSideMenu,
	List,
	ListItem,
	Header,
	SideMenu,
	Image,
	Card
} from 'react-native-elements';
import { FlatList } from 'react-native';

import axios from 'axios';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import * as SecureStore from 'expo-secure-store';
import Profile from './profile_page';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Driver_Request_Card from './driver_request_card';
import { Footer, FooterTab } from 'native-base';

export default class ViewDriverRequests extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			requests: []
		};
	}

	handleDelete = (itemId) => {
		const newRequests = this.state.requests.filter((item) => item.passenger_id !== itemId);
		this.setState({ requests: newRequests });
	};

	handleDeleteAll = async () => {
		this.setState({ requests: [] });

		const token = JSON.parse(await SecureStore.getItemAsync('token'));

		axios.defaults.headers.common['Authorization'] = token;

		var apiBaseUrl1 = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/requests/arrived_to_guc`;

		axios({ method: 'delete', url: apiBaseUrl1 })
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

		var apiBaseUrl2 = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/trips/delete_trip`;

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

		var apiBaseUrl3 = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/passenger_request/cancel_all_passenger_request`;
		axios({ method: 'delete', url: apiBaseUrl3 })
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

	componentDidMount() {
		// Get the user's location
		this.getRequests();
	}

	getRequests = async () => {
		const token = JSON.parse(await SecureStore.getItemAsync('token'));

		axios.defaults.headers.common['Authorization'] = token;

		axios
			.get('http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/requests/requests', {
				method: 'GET',
				mode: 'cors'
			})
			.then((res) => {
				this.setState({
					requests: res.data.available_passengers
				});
				console.log(res.data.available_passengers);
			})
			.catch((error) => {
				console.log(error.response);
				alert(error.response.data.error);
			});
	};

	render() {
		console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
		console.log(this.state.requests);
		console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
		return (
			<View>
				<ScrollView showsVerticalScrollIndicator={false}>
					<FlatList
						data={this.state.requests}
						style={{ marginTop: 20 }}
						keyExtractor={(item, index) => item.key}
						renderItem={({ item, index }) => (
							<Driver_Request_Card
								detail={item}
								First_name={this.state.requests[index].first_name}
								Last_name={this.state.requests[index].last_name}
								GUC_slot={this.state.requests[index].guc_id}
								Pick_up_location={this.state.requests[index].pick_up_location}
								Passenger={this.state.requests[index].passenger_id}
								onDelete={this.handleDelete}
							/>
						)}
					/>
				</ScrollView>
				<Footer>
					<FooterTab style={{ backgroundColor: 'black' }}>
						<Button
							title="Arrived To GUC"
							onPress={() => this.handleDeleteAll('delete')}
							buttonStyle={{
								backgroundColor: 'darkred',
								marginTop: 5,
								marginLeft: 130,
								alignSelf: 'center',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						/>
					</FooterTab>
				</Footer>
			</View>
		);
	}
}
