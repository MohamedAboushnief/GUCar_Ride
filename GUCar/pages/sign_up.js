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
import Profile from './profile_page';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			guc_id: '',
			date_of_birth: '',
			gender: '',
			genderList: [ 'male', 'female' ],
			address: '',
			addressList: [ 'Maadi', '5th Settlement', 'Heliopolis' ],
			rating: '',
			mobile_number: []
		};
		this.onClickListener = this.onClickListener.bind(this);
	}

	updateAddress = (address) => {
		this.setState({ address: address });
	};
	updateGender = (gender) => {
		this.setState({ gender: gender });
	};

	componentDidMount() {}

	onClickListener = async () => {
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
		let token = await Notifications.getExpoPushTokenAsync();
		console.log(token);

		var apiBaseUrl = `http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com:5000/routes/users/sign_up`;
		var payload = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			email: this.state.email,
			password: this.state.password,
			guc_id: this.state.guc_id,
			date_of_birth: this.state.date_of_birth,
			gender: this.state.gender,
			address: this.state.address,
			rating: 0,
			mobile_number: this.state.mobile_number,
			token: token
		};

		axios({ method: 'post', url: apiBaseUrl, data: payload })
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
				console.log(err.response.data.message);
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
				{/* <Header
					containerStyle={{
						backgroundColor: 'black',
						justifyContent: 'space-around'
					}}
					leftComponent={{ icon: 'menu', color: 'grey' }}
					// centerComponent={{ text: 'Sign Up', style: { color: '#fff' } }}
					// rightComponent={{ icon: 'home', color: '#fff' }}
				/>
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
				</View> */}

				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(first_name) => this.setState({ first_name })}
							placeholder="First Name"
							leftIcon={{ type: 'font-awesome', name: 'user', iconStyle: { marginRight: 13 } }}
						/>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(last_name) => this.setState({ last_name })}
							placeholder="Last Name"
							leftIcon={{ type: 'font-awesome', name: 'user', iconStyle: { marginRight: 13 } }}
						/>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(email) => this.setState({ email })}
							placeholder="Email"
							leftIcon={{ type: 'font-awesome', name: 'envelope-o', iconStyle: { marginRight: 13 } }}
						/>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(password) => this.setState({ password })}
							placeholder="Password"
							leftIcon={{ type: 'font-awesome', name: 'lock', iconStyle: { marginRight: 13 } }}
							secureTextEntry={true}
						/>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(guc_id) => this.setState({ guc_id })}
							placeholder="GUC ID"
							leftIcon={{ type: 'font-awesome', name: 'id-badge', iconStyle: { marginRight: 13 } }}
						/>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(mobile_number) => this.setState({ mobile_number: [ mobile_number ] })}
							placeholder="Mobile Number"
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
							<Picker.Item label="male" value="male" />
							<Picker.Item label="female" value="female" />
						</Picker>
						<Picker selectedValue={this.state.address} onValueChange={this.updateAddress}>
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
							title="Sign Up"
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
