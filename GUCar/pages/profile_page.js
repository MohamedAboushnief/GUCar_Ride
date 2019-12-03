import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			guc_id: '',
			date_of_birth: '',
			gender: '',
			address: '',
			mobile_number: ''
		};
	}

	componentDidMount = async () => {
		const token = JSON.parse(await SecureStore.getItemAsync('token'));

		axios.defaults.headers.common['Authorization'] = token;

		axios
			.get('http://192.168.43.245:5000/routes/users/userInfo', {
				method: 'GET',
				mode: 'cors'
			})
			.then((res) => {
				this.setState({
					first_name: res.data.user.first_name,
					last_name: res.data.user.last_name,
					email: res.data.user.email,
					guc_id: res.data.user.guc_id,
					date_of_birth: res.data.user.date_of_birth,
					gender: res.data.user.gender,
					address: res.data.user.address,
					mobile_number: res.data.mobile.mobile_number
				});
			})
			.catch((error) => {
				console.log(error.response);
				alert(error.response.data.error);
			});
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header} />
				<Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
				<View style={styles.body}>
					<View style={styles.bodyContent}>
						<Text style={styles.name}>
							{this.state.first_name} {this.state.last_name}
						</Text>
						<Text style={styles.name}>{this.state.guc_id}</Text>
						<Text style={styles.name}>{this.state.mobile_number}</Text>

						<TouchableOpacity style={styles.buttonContainer}>
							<Text style={{ color: 'white', fontSize: 22 }}>Request a ride</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonContainer}>
							<Text style={{ color: 'white', fontSize: 22 }}>Create a trip</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#FF9800',
		height: 200
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: 'white',
		marginBottom: 10,
		alignSelf: 'center',
		position: 'absolute',
		marginTop: 130
	},
	name: {
		fontSize: 22,
		color: '#FFFFFF',
		fontWeight: '600'
	},
	body: {
		marginTop: 40
	},
	bodyContent: {
		flex: 1,
		alignItems: 'center',
		padding: 30
	},
	name: {
		fontSize: 28,
		color: '#696969',
		fontWeight: '600'
	},
	info: {
		fontSize: 16,
		color: '#00BFFF',
		marginTop: 10
	},
	description: {
		fontSize: 16,
		color: '#696969',
		marginTop: 10,
		textAlign: 'center'
	},
	buttonContainer: {
		marginTop: 10,
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		width: 250,
		borderRadius: 30,
		backgroundColor: 'black'
	}
});
