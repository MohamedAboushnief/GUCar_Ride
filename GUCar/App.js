import React from 'react';
import SignUp from './pages/sign_up';
import SignIn from './pages/sign_in';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>GUCar Ride</Text>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />
				</View>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Button title="Sign In" onPress={() => this.props.navigation.navigate('SignIn')} />
				</View>
			</View>
		);
	}
}

const RootStack = createStackNavigator(
	{
		Home: HomeScreen,
		SignUp: { screen: SignUp },
		SignIn: { screen: SignIn }
	},
	{
		initialRouteName: 'Home'
	}
);

const AppContainer = createAppContainer(RootStack);

class App extends React.Component {
	render() {
		return <AppContainer />;
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
