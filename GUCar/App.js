import React, { Component } from 'react';
import SignUp from './pages/sign_up';
import SignIn from './pages/sign_in';
import EditInfo from './pages/edit_profile';
import { ThemeProvider, Input, Header } from 'react-native-elements';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	TouchableHighlight,
	Image,
	Alert,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
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
					leftComponent={{ icon: 'menu', color: '#fff' }}
				/>

				<View
					style={{
						flex: 1,
						position: 'absolute'
					}}
				>
					<Image
						source={require('./assets/gucarWhite.png')}
						style={{
							width: 400,
							height: 100,
							alignSelf: 'center'
						}}
					/>
				</View> */}

				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />
					</View>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Button title="Sign In" onPress={() => this.props.navigation.navigate('SignIn')} />
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

class NavigationDrawerStructure extends Component {
	//Structure for the navigatin Drawer
	toggleDrawer = () => {
		//Props to open/close the drawer
		this.props.navigationProps.toggleDrawer();
	};
	render() {
		return (
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
					{/*Donute Button Image */}
					<Image source={require('./image/drawer.png')} style={{ width: 25, height: 25, marginLeft: 5 }} />
				</TouchableOpacity>
			</View>
		);
	}
}

const Home_StackNavigator = createStackNavigator({
	//All the screen from the Screen1 will be indexed here
	Home: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Demo Screen 0',
			headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const FirstActivity_StackNavigator = createStackNavigator({
	//All the screen from the Screen1 will be indexed here
	SignUp: {
		screen: SignUp,
		navigationOptions: ({ navigation }) => ({
			headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const Screen2_StackNavigator = createStackNavigator({
	//All the screen from the Screen2 will be indexed here
	SignIn: {
		screen: SignIn,
		navigationOptions: ({ navigation }) => ({
			headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const Screen3_StackNavigator = createStackNavigator({
	//All the screen from the Screen2 will be indexed here
	SignIn: {
		screen: EditInfo,
		navigationOptions: ({ navigation }) => ({
			headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const DrawerNavigatorExample = createDrawerNavigator({
	//Drawer Optons and indexing
	Screen1: {
		//Title
		screen: Home_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Demo Screen 1'
		}
	},
	Screen2: {
		//Title
		screen: FirstActivity_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Demo Screen 1'
		}
	},
	Screen3: {
		//Title
		screen: Screen2_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Demo Screen 2'
		}
	},
	Screen4: {
		//Title
		screen: Screen3_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Demo Screen 2'
		}
	}
});

const AppContainer = createAppContainer(DrawerNavigatorExample);

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}
