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
import tripCard from './trip_card';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			trips: []
		};
	}

	componentDidMount() {
		// Get the user's location
		this.getTrips();
	}

	getTrips = async () => {
		const token = JSON.parse(await SecureStore.getItemAsync('token'));

		axios.defaults.headers.common['Authorization'] = token;

		axios
			.get(
				'http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/trips/view_available_drivers',
				{
					method: 'GET',
					mode: 'cors'
				}
			)
			.then((res) => {
				this.setState({
					trips: res.data.arrayOfTrips
				});
			})
			.catch((error) => {
				console.log(error.response);
				alert(error.response.data.error);
			});
	};

	render() {
		return (
			<FlatList
				data={this.state.trips.list}
				style={{ marginTop: 20 }}
				keyExtractor={(item) => item.dt_txt}
				renderItem={({ item }) => <tripCard detail={item} Slot={this.state.trips.trip.guc_slot} />}
			/>
		);
	}
}
