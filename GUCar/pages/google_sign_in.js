import * as Google from 'expo-google-app-auth';
import Expo from 'expo';
import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	TouchableHighlight,
	Alert,
	SafeAreaView,
	TouchableOpacity,
	Picker
} from 'react-native';
import axios from 'axios';
import { ThemeProvider, Input, HeaderSideMenu, List, ListItem, Header, SideMenu, Image } from 'react-native-elements';

var payload = {};
export default class GoogleSignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signedIn: false,
			name: '',
			email: '',
			guc_id: '',
			address: ''
		};
	}
	updateAddress = address => {
		this.setState({ address: address });
	};

	logIn = async () => {
		const iD = { guc_id: this.state.guc_id };
		const GU = Object.assign(payload, iD);
		const add = { address: this.state.address };
		var lastResult = Object.assign(GU, add);
		console.log('wwwwwwwwwwwwwwwwwwwwwwwwww');
		console.log(lastResult);
		console.log('wwwwwwwwwwwwwwwwwwwwwwwwww');

		await axios
			.post('http://192.168.1.5:5000/routes/users/googleLogin', lastResult, {
				method: 'POST',
				mode: 'cors'
			})
			.then(res => {
				console.log(res.data.message);
				alert(res.data.message);
				console.log(res.data.token);
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
					flex: 1
				}}
			>
				<Input
					containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
					onChangeText={guc_id => this.setState({ guc_id })}
					placeholder="GUC ID"
					leftIcon={{ type: 'font-awesome', name: 'id-badge', iconStyle: { marginRight: 13 } }}
				/>
				<Picker selectedValue={this.state.address} onValueChange={this.updateAddress}>
					<Picker.Item label="Your address" value="Maadi" />
					<Picker.Item label="Maadi" value="Maadi" />
					<Picker.Item label="Heliopolis" value="Heliopolis" />
				</Picker>
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
			<Text>SIGN IN WITH GOOGLE</Text>
			<Button title="Sign in with google" onPress={() => props.signIn()} />
		</View>
	);
};
const LoggedInPage = props => {
	return (
		<View>
			<Button
				style={{
					width: 100,
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					position: 'absolute',
					alignSelf: 'center',
					marginTop: 550
				}}
				title="Sign In"
				buttonStyle={{ backgroundColor: 'black' }}
				titleStyle={{ color: 'grey' }}
				onPress={() => props.logIn()}
			/>
		</View>
	);
};
