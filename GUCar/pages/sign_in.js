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

export default class SignIn extends React.Component {
	constructor(props) {
		super(props);
		state = {
			email: '',
			password: ''
		};
	}

	onClickListener = (viewId) => {
		var apiBaseUrl = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/users/login`;

		var payload = {
			email: this.state.email,
			password: this.state.password
		};

		axios
			.post(apiBaseUrl, payload)
			.then((res) => {
				console.log(res.data.message);
				alert(res.data.message);
				console.log(res.data.token);
				SecureStore.setItemAsync('token', JSON.stringify(res.data.token));
				this.props.navigation.navigate('Profile');
			})
			.catch((err) => {
				console.log(err);
				alert(err.response.data.message);
			});
	};

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<KeyboardAwareScrollView>
					<ThemeProvider>
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: 150
							}}
						>
							<Input
								containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
								placeholder="Email"
								leftIcon={{ type: 'font-awesome', name: 'envelope-o', iconStyle: { marginRight: 13 } }}
								onChangeText={(email) => this.setState({ email })}
							/>
						</View>
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								marginBottom: 200,
								marginTop: 50
							}}
						>
							<Input
								containerStyle={{ width: 280, alignSelf: 'center' }}
								placeholder="Password"
								leftIcon={{ type: 'font-awesome', name: 'lock', iconStyle: { marginRight: 13 } }}
								onChangeText={(password) => this.setState({ password })}
								secureTextEntry={true}
							/>
						</View>

						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								position: 'absolute',
								alignSelf: 'center',
								marginTop: 55
							}}
						>
							<Text h1 h1Style={{ marginLeft: 50 }}>
								Log In
							</Text>
						</View>

						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								position: 'absolute',
								alignSelf: 'center',
								marginTop: 60
							}}
						>
							<Icon name="sign-in" type="evilicon" color="grey" size={50} style={{ marginRight: 150 }} />
						</View>
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								position: 'absolute',
								alignSelf: 'center',
								marginTop: 400
							}}
						>
							<Button
								buttonStyle={{
									backgroundColor: 'black',
									width: 100,
									height: 50
								}}
								title="Sign in"
								titleStyle={{ color: 'grey' }}
								onPress={() => this.onClickListener('Sign In')}
							/>
						</View>
					</ThemeProvider>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		);
	}
}
