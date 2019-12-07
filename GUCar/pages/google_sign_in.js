import * as Google from 'expo-google-app-auth';
import Expo from 'expo';
import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	TextInput,
	TouchableHighlight,
	Alert,
	SafeAreaView,
	TouchableOpacity,
	Picker,
	Image
} from 'react-native';
import axios from 'axios';
import {
	ThemeProvider,
	Input,
	Text,
	Button,
	HeaderSideMenu,
	List,
	ListItem,
	Header,
	SideMenu
} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

var payload = {};
export default class GoogleSignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signedIn: false,
			name: '',
			email: '',
			guc_id: '',
			address: '',
			mobile_number: []
		};
	}
	updateAddress = address => {
		this.setState({ address: address });
	};

	logIn = async () => {
		const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			// Android remote notification permissions are granted during the app
			// install, so this will only ask on iOS
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
		// Stop here if the user did not grant permissios
		if (finalStatus !== 'granted') {
			return;
		}
		let pushToken = await Notifications.getExpoPushTokenAsync();
		console.log(pushToken);

		const iD = { guc_id: this.state.guc_id };
		const GU = Object.assign(payload, iD);
		const add = { address: this.state.address };
		const mob = { mobile_number: this.state.mobile_number };
		var lastResult = Object.assign(GU, add);
		var mergeObj = Object.assign(lastResult, mob);
		const pushT = { token: pushToken };
		var lastMerge = Object.assign(mergeObj, pushT);
		console.log('wwwwwwwwwwwwwwwwwwwwwwwwww');
		console.log(lastMerge);
		console.log('wwwwwwwwwwwwwwwwwwwwwwwwww');

		await axios
			.post(
				'http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/users/googleLogin',
				lastMerge,
				{
					method: 'POST',
					mode: 'cors'
				}
			)
			.then(res => {
				console.log(res.data.message);
				alert(res.data.message);
				console.log(res.data.token);
				console.log(res.data);
				SecureStore.setItemAsync('token', JSON.stringify(res.data.token));
				this.props.navigation.navigate('Profile');
			})
			.catch(err => {
				console.log(err);
				alert(err.response.data.message);
				console.log(err.response.data.message);
			});
	};
	signIn = async () => {
		try {
			const result = await Google.logInAsync({
				androidClientId: '300848819413-l3aljuambsp9hqni712fib44mtc4ojgu.apps.googleusercontent.com',
				scopes: ['profile', 'email']
			});

			if (result.type === 'success') {
				console.log(result);
				payload = {
					first_name: result.user.givenName,
					last_name: result.user.familyName,
					email: result.user.email
				};
				console.log(payload);

				this.setState({
					signedIn: true,
					name: result.user.name,
					email: result.user.email
				});
			} else {
				console.log('Cancelled');
			}
		} catch (e) {
			console.log('error', e);
		}
	};
	render() {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					marginTop: 100
				}}
			>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Image
						source={require('../assets/google.gif')}
						style={{
							width: 150,
							height: 120,
							alignSelf: 'center',
							marginBottom: 150
						}}
					/>
				</View>
				<Input
					containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
					onChangeText={guc_id => this.setState({ guc_id })}
					placeholder="GUC ID"
					leftIcon={{ type: 'font-awesome', name: 'id-badge', iconStyle: { marginRight: 13 } }}
				/>
				<Input
					containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
					onChangeText={mobile_number => this.setState({ mobile_number: [mobile_number] })}
					placeholder="Mobile Number"
					leftIcon={{ type: 'font-awesome', name: 'mobile', iconStyle: { marginRight: 13 } }}
				/>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Picker
						selectedValue={this.state.address}
						onValueChange={this.updateAddress}
						style={{ width: 250 }}
					>
						<Picker.Item label="Your address" value="Maadi" />
						<Picker.Item label="Maadi" value="Maadi" />
						<Picker.Item label="Heliopolis" value="Heliopolis" />
					</Picker>
				</View>
				<View>
					{this.state.signedIn ? (
						<LoggedInPage name={this.state.name} email={this.state.email} logIn={this.logIn} />
					) : (
						<LoginPage signIn={this.signIn} />
					)}
				</View>
			</SafeAreaView>
		);
	}
}

const LoginPage = props => {
	return (
		<View>
			<Button
				buttonStyle={{
					backgroundColor: 'white',
					width: 200,
					height: 50,
					alignSelf: 'center',
					justifyContent: 'center',
					marginBottom: 70
				}}
				type={'outline'}
				borderColor={'red'}
				title="Sign in with google"
				titleStyle={{ color: 'cornflowerblue' }}
				onPress={() => props.signIn()}
			/>
		</View>
	);
};
const LoggedInPage = props => {
	return (
		<View>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
				<Text h4 h4Style={{ color: 'darkred', fontSize: 10 }}>
					You don't have to fill these fields if you have already filled them before ;)
				</Text>
			</View>

			<View>
				<Button
					buttonStyle={{
						backgroundColor: 'white',
						width: 200,
						height: 50,
						alignSelf: 'center',
						justifyContent: 'center',
						marginBottom: 70
					}}
					type={'outline'}
					borderColor={'red'}
					title="Submit"
					titleStyle={{ color: 'cornflowerblue' }}
					onPress={() => props.logIn()}
				/>
			</View>
		</View>
	);
};
