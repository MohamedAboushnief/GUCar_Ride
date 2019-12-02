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

	onClickListener = viewId => {
		var apiBaseUrl = `http://192.168.1.5:3000/routes/users/login`;

		var payload = {
			email: this.state.email,
			password: this.state.password
		};
		axios
			.post(apiBaseUrl, payload)
			.then(res => {
				console.log(res.data.message);
				alert(res.data.message);
				SecureStore.setItemAsync('token', JSON.stringify(res.data.token));
			})
			.catch(err => {
				console.log(err);
				alert(err.response.data.message);
			});
	};

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<KeyboardAwareScrollView>
					<ThemeProvider>
						<Header
							leftComponent={{ icon: 'menu', color: 'grey' }}
							containerStyle={{
								backgroundColor: 'black',
								justifyContent: 'space-around'
							}}
						/>
						<View
							style={{
								flex: 1,
								position: 'absolute'
							}}
						>
							<Image
								source={require('../assets/gucarWhite.png')}
								style={{
									width: 400,
									height: 100,
									position: 'absolute',
									alignSelf: 'center'
								}}
							/>
						</View>
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 130 }}>
							<Input
								containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
								placeholder="Email"
								leftIcon={{ type: 'font-awesome', name: 'envelope-o', iconStyle: { marginRight: 13 } }}
								onChangeText={email => this.setState({ email })}
							/>
						</View>
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
							<Input
								containerStyle={{ width: 280, alignSelf: 'center' }}
								placeholder="Password"
								leftIcon={{ type: 'font-awesome', name: 'lock', iconStyle: { marginRight: 13 } }}
								onChangeText={password => this.setState({ password })}
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
								marginTop: 117
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
								marginTop: 120
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
								marginTop: 470
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
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								position: 'absolute',
								marginTop: 32,
								marginLeft: 300
							}}
						>
							<Button
								buttonStyle={{ backgroundColor: 'black' }}
								icon={{
									name: 'home',
									size: 25,
									color: 'grey'
								}}
								onPress={() => this.props.navigation.navigate('Home')}
							/>
						</View>
					</ThemeProvider>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#DCDCDC'
	},
	inputContainer: {
		borderBottomColor: '#F5FCFF',
		backgroundColor: '#FFFFFF',
		borderRadius: 30,
		borderBottomWidth: 1,
		width: 250,
		height: 45,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputs: {
		height: 45,
		marginLeft: 16,
		borderBottomColor: '#FFFFFF',
		flex: 1,
		borderColor: 'gray',
		borderWidth: 1
	},
	inputIcon: {
		width: 30,
		height: 30,
		marginLeft: 15,
		justifyContent: 'center'
	},
	buttonContainer: {
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		width: 250,
		borderRadius: 30
	},
	setupButton: {
		backgroundColor: '#00b5ec'
	},
	setupText: {
		color: 'white'
	}
});
