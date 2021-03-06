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

export default class AddCar extends React.Component {
	constructor(props) {
		super(props);
		state = {
			car_model: '',
			car_plate_number: '',
			car_color: ''
		};
	}

	onClickListener = async () => {
		var payload = {
			car_model: this.state.car_model,
			car_plate_number: this.state.car_plate_number,
			car_color: this.state.car_color
		};
		const token = JSON.parse(await SecureStore.getItemAsync('token'));
		console.log(token);
		axios.defaults.headers.common['Authorization'] = token;
		axios
			.post(
				'http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/drivers_cars/create',
				payload,
				{
					method: 'POST',
					mode: 'cors'
				}
			)
			.then((res) => {
				console.log(res.data.message);
				alert(res.data.message);
				this.props.navigation.push('Profile');
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
	};

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<KeyboardAwareScrollView>
					<ThemeProvider>
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 130 }}>
							<Input
								containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
								placeholder="Car model"
								leftIcon={{ type: 'font-awesome', name: 'car', iconStyle: { marginRight: 13 } }}
								onChangeText={(car_model) => this.setState({ car_model })}
							/>
							<Input
								containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
								placeholder="Car color"
								leftIcon={{
									type: 'font-awesome',
									name: 'paint-brush',
									iconStyle: { marginRight: 13 }
								}}
								onChangeText={(car_color) => this.setState({ car_color })}
							/>
							<Input
								containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
								placeholder="Car plate number"
								leftIcon={{ type: 'font-awesome', name: 'language', iconStyle: { marginRight: 13 } }}
								onChangeText={(car_plate_number) => this.setState({ car_plate_number })}
							/>
						</View>

						<Button
							buttonStyle={{
								backgroundColor: 'black',
								width: 100,
								height: 50,
								alignSelf: 'center',
								justifyContent: 'center',
								marginTop: 80
							}}
							title="Add my car"
							titleStyle={{ color: 'grey' }}
							onPress={() => this.onClickListener('Add Car')}
						/>
					</ThemeProvider>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		);
	}
}
