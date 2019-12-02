import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, Picker } from 'react-native';
import { Button, ThemeProvider, Input, HeaderSideMenu, List, ListItem, Header, SideMenu } from 'react-native-elements';
import axios from 'axios';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

// let datesWhitelist = [
// 	{
// 		start: moment(),
// 		end: moment().add(3, 'days') // total 4 days enabled
// 	}
// ];
// let datesBlacklist = [ moment().add(1, 'days') ]; // 1 day disabled

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
			gender: 'gender',
			genderList: [ 'male', 'female' ],
			address: '',
			addressList: [ 'Maadi', '5th Settlement', 'Heliopolis' ],
			rating: '',
			mobile_number: '',
			isOpen: false
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

	onClickListener = () => {
		var apiBaseUrl = `http://192.168.43.245:3000/routes/users/sign_up`;
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
			mobile_number: [ '010027646793' ]
		};

		axios({ method: 'post', url: apiBaseUrl, data: payload })
			.then((res) => {
				console.log(res.status.message);
			})
			.catch((err) => {
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
				<Header
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{ text: 'Sign Up', style: { color: '#fff' } }}
					rightComponent={{ icon: 'home', color: '#fff' }}
				/>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(first_name) => this.setState({ first_name })}
							placeholder="First Name"
						/>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(last_name) => this.setState({ last_name })}
							placeholder="Last Name"
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
						/>
						<Input
							containerStyle={{ width: 280, alignSelf: 'center', padding: 20 }}
							onChangeText={(guc_id) => this.setState({ guc_id })}
							placeholder="GUC ID"
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
							<Picker.Item label="Male" value="male" />
							<Picker.Item label="Female" value="female" />
						</Picker>
						<Picker selectedValue={this.state.address} onValueChange={this.updateAddress}>
							<Picker.Item label="Maadi" value="Maadi" />
							<Picker.Item label="Heliopolis" value="Heliopolis" />
						</Picker>

						<Button title="signUp" onPress={() => this.onClickListener('Sign Up')} />
					</ScrollView>
				</View>
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
