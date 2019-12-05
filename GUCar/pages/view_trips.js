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
import TripsCard from './trip_card';

export default class ViewTrips extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			trips: []
		};
	}

	componentDidMount() {
		console.log('hhhhhhhhhhhhhhhhhhhhhhhhhh');
		// Get the user's location
		this.getTrips();
	}

	getTrips = async () => {
		const token = JSON.parse(await SecureStore.getItemAsync('token'));

		axios.defaults.headers.common['Authorization'] = token;

		axios
			.get('http://10.1.0.108:5000/routes/trips/view_available_drivers', {
				method: 'GET',
				mode: 'cors'
			})
			.then((res) => {
				this.setState({
					trips: res.data.arrayOfTrips
				});
				console.log(this.state.trips);
			})
			.catch((error) => {
				console.log(error.response);
				alert(error.response.data.error);
			});
	};

	render() {
		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<FlatList
					data={this.state.trips}
					style={{ marginTop: 20 }}
					keyExtractor={(item, index) => item.key}
					// keyExtractor={(item) => item.dt_txt}
					renderItem={({ item, index }) => (
						<TripsCard
							detail={item}
							First_name={this.state.trips[index].first_name}
							Last_name={this.state.trips[index].last_name}
							Mobile={this.state.trips[index].mobile_numbers[0].mobile_number}
							Rating={this.state.trips[index].Rating}
							Slot={this.state.trips[index].trip.guc_slot}
							Price={this.state.trips[index].trip.pricing}
							Driver_id={this.state.trips[index].trip.user_id}
						/>
					)}
				/>
			</ScrollView>
		);
	}
}
