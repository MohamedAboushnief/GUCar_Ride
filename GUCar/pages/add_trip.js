import React from 'react';
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	TextInput,
	ImageBackground,
	SafeAreaView,
	TouchableOpacity,
	Picker,
	ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Button, ThemeProvider, Input, Image, Header, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SecureStore from 'expo-secure-store';

export default class AddTrip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pricing: '',
			guc_slot: ''
		};
		this.onClickListener = this.onClickListener.bind(this);
	}

	updatePrice = (pricing) => {
		this.setState({ pricing: pricing });
	};
	updateGucSlot = (guc_slot) => {
		this.setState({ guc_slot: guc_slot });
	};

	componentDidMount() {}

	onClickListener = async () => {
		var payload = {
			guc_slot: this.state.guc_slot,
			pricing: this.state.pricing
		};
		const token = JSON.parse(await SecureStore.getItemAsync('token'));
		console.log(token);
		console.log(payload);
		axios.defaults.headers.common['Authorization'] = token;
		axios
			.post(
				'http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/trips/create_trip',
				payload,
				{
					method: 'POST',
					mode: 'cors'
				}
			)
			.then((res) => {
				console.log(res.data.message);
				alert(res.data.message);
				this.props.navigation.navigate('AddTrip');
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
	};

	render() {
		return (
			<SafeAreaView
				style={{
					flex: 1
				}}
			>
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
					<Icon
						name="money"
						type="FontAwesome"
						color="black"
						size={20}
						style={{ marginRight: 270, marginTop: 155 }}
					/>
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
					<Icon
						name="clock-o"
						type="FontAwesome"
						color="black"
						size={20}
						style={{ marginRight: 270, marginTop: 55 }}
					/>
				</View>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Picker
							selectedValue={this.state.guc_slot}
							onValueChange={this.updateGucSlot}
							style={{ width: 250, marginTop: 100 }}
						>
							<Picker.Item label="Select GUC slot" />
							<Picker.Item label="First" value="First" />
							<Picker.Item label="Second" value="Second" />
							<Picker.Item label="Third" value="Third" />
							<Picker.Item label="Fourth" value="Fourth" />
							<Picker.Item label="Fifth" value="Fifth" />
						</Picker>

						<Picker
							selectedValue={this.state.pricing}
							onValueChange={this.updatePrice}
							style={{ width: 250, marginTop: 50 }}
						>
							<Picker.Item label="Select your fare" />

							<Picker.Item label="Volunteer" value="Volunteer" />
							<Picker.Item label="2 LE" value="2 LE" />
							<Picker.Item label="4 LE" value="4 LE" />
							<Picker.Item label="6 LE" value="6 LE" />
							<Picker.Item label="8 LE" value="8 LE" />
							<Picker.Item label="10 LE" value="10 LE" />
						</Picker>

						<Button
							buttonStyle={{
								backgroundColor: 'black',
								width: 100,
								height: 50,
								alignSelf: 'center',
								justifyContent: 'center',
								marginTop: 100
							}}
							title="Add trip"
							titleStyle={{ color: 'grey' }}
							onPress={() => this.onClickListener('Add Trip')}
						/>
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}
