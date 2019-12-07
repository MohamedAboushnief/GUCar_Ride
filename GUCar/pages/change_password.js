import React from 'react';
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	TextInput,
	ImageBackground,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import { Button, ThemeProvider, Input, Image, Header, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SecureStore from 'expo-secure-store';
import { createAppContainer, NavigationActions, StackActions, NavigationEvents } from 'react-navigation';

export default class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		state = {
			oldPassword: '',
			newPassword: '',
			confirmPassword: ''
		};
	}

	onClickListener = async () => {
		const token = JSON.parse(await SecureStore.getItemAsync('token'));

		axios.defaults.headers.common['Authorization'] = token;
		var apiBaseUrl = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/users/change_password`;

		var payload = {
			oldPassword: this.state.oldPassword,
			newPassword: this.state.newPassword,
			confirmPassword: this.state.confirmPassword
		};

		axios
			.put(apiBaseUrl, payload)
			.then(async (res) => {
				console.log(res.data.message);
				alert(res.data.message);
				console.log(res.data.token);
				this.props.navigation.push('Profile');
			})
			.catch((err) => {
				console.log(err);
				alert(err.response.data.message);
			});
	};

	render() {
		//

		return (
			<SafeAreaView
				style={{
					flex: 1
				}}
			>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Input
						containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
						onChangeText={(oldPassword) => this.setState({ oldPassword })}
						placeholder="Current Password"
						leftIcon={{ type: 'font-awesome', name: 'lock', iconStyle: { marginRight: 13 } }}
						secureTextEntry={true}
					/>
					<Input
						containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
						onChangeText={(newPassword) => this.setState({ newPassword })}
						placeholder="New Password"
						leftIcon={{ type: 'font-awesome', name: 'lock', iconStyle: { marginRight: 13 } }}
						secureTextEntry={true}
					/>
					<Input
						containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
						onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
						placeholder="Confirm Password"
						leftIcon={{ type: 'font-awesome', name: 'lock', iconStyle: { marginRight: 13 } }}
						secureTextEntry={true}
					/>

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
						title="Change Password"
						buttonStyle={{ backgroundColor: 'black' }}
						titleStyle={{ color: 'grey' }}
						onPress={() => this.onClickListener('Change Password')}
					/>
				</View>
			</SafeAreaView>
		);
	}
}
