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
	Image
} from 'react-native-elements';
import axios from 'axios';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import * as SecureStore from 'expo-secure-store';

export default class EditInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			guc_id: '',
			date_of_birth: '',
			gender: '',
			genderList: [ 'male', 'female' ],
			address: '',
			addressList: [ 'Maadi', '5th Settlement', 'Heliopolis' ],
			mobile_number: ''
		};
		this.onClickListener = this.onClickListener.bind(this);
	}

	updateAddress = (address) => {
		this.setState({ address: address });
	};
	updateGender = (gender) => {
		this.setState({ gender: gender });
	};

	componentDidMount = async () => {
		const token = JSON.parse(await SecureStore.getItemAsync('token'));
		console.log(token);
		axios.defaults.headers.common['Authorization'] = token;

		axios
			.get('http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/users/userInfo', {
				method: 'GET',
				mode: 'cors'
			})
			.then(async (res) => {
				console.log(res.data);

				this.setState({
					first_name: res.data.user.first_name,
					last_name: res.data.user.last_name,
					email: res.data.user.email,
					guc_id: res.data.user.guc_id,
					date_of_birth: res.data.user.date_of_birth,
					gender: res.data.user.gender,
					address: res.data.user.address,
					mobile_number: res.data.user.mobile_number
				});
			})
			.catch((error) => {
				console.log(error.response);
				alert(error.response.data.error);
			});
	};

	onClickListener = async () => {
		var payload = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			email: this.state.email,
			guc_id: this.state.guc_id,
			date_of_birth: this.state.date_of_birth,
			gender: this.state.gender,
			address: this.state.address,
			mobile_number: this.state.mobile_number
		};
		console.log(payload);
		const token = JSON.parse(await SecureStore.getItemAsync('token'));

		axios.defaults.headers.common['Authorization'] = token;

		axios
			.put('http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/users/edit_info', payload, {
				method: 'PUT',
				mode: 'cors'
			})
			.then((res) => {
				console.log(res.data.message);
				alert(res.data.message);
				this.props.navigation.push('Profile');
			})
			.catch((error) => {
				console.log(error.response);
				alert(error.response.data.error);
			});
	};

	render() {
		return (
			<SafeAreaView
				style={{
					flex: 1
				}}
			>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(first_name) => this.setState({ first_name })}
							placeholder="Change First Name"
							leftIcon={{ type: 'font-awesome', name: 'user', iconStyle: { marginRight: 13 } }}
						/>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(last_name) => this.setState({ last_name })}
							placeholder="Change Last Name"
							leftIcon={{ type: 'font-awesome', name: 'user', iconStyle: { marginRight: 13 } }}
						/>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(email) => this.setState({ email })}
							placeholder="Change Email"
							leftIcon={{ type: 'font-awesome', name: 'envelope-o', iconStyle: { marginRight: 13 } }}
						/>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(guc_id) => this.setState({ guc_id })}
							placeholder="Change GUC ID"
							leftIcon={{ type: 'font-awesome', name: 'id-badge', iconStyle: { marginRight: 13 } }}
						/>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(mobile_number) => this.setState({ mobile_number })}
							placeholder="Change Mobile Number"
							leftIcon={{ type: 'font-awesome', name: 'mobile', iconStyle: { marginRight: 13 } }}
						/>
						<View>
							<CalendarStrip
								ref={(ref) => {
									this.CalendarStrip = ref;
								}}
								onDateSelected={() =>
									this.setState({
										date_of_birth: moment(new Date(this.CalendarStrip.getSelectedDate())).format(
											'L'
										)
									})}
								calendarAnimation={{ type: 'sequence', duration: 30 }}
								daySelectionAnimation={{
									type: 'border',
									duration: 200,
									borderWidth: 1,
									borderHighlightColor: 'red'
								}}
								style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
								calendarHeaderStyle={{ color: 'black' }}
								calendarColor={'#FFFFFF'}
								dateNumberStyle={{ color: 'black' }}
								dateNameStyle={{ color: 'black' }}
								highlightDateNumberStyle={{ color: 'red' }}
								highlightDateNameStyle={{ color: 'red' }}
								disabledDateNameStyle={{ color: 'black' }}
								disabledDateNumberStyle={{ color: 'black' }}
								iconContainer={{ flex: 0.1 }}
							/>
						</View>

						<Picker selectedValue={this.state.gender} onValueChange={this.updateGender}>
							<Picker.Item label="Select your gender" />

							<Picker.Item label="male" value="male" />
							<Picker.Item label="female" value="female" />
						</Picker>
						<Picker selectedValue={this.state.address} onValueChange={this.updateAddress}>
							<Picker.Item label="Select your address" />

							<Picker.Item label="Maadi" value="Maadi" />
							<Picker.Item label="Heliopolis" value="Heliopolis" />
						</Picker>

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
							title="Edit Profile"
							buttonStyle={{ backgroundColor: 'black' }}
							titleStyle={{ color: 'grey' }}
							onPress={() => this.onClickListener('Sign Up')}
						/>
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}
