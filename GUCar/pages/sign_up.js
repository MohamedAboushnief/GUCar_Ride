import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

//import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class SignUp extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Sign Up</Text>
			</View>
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
