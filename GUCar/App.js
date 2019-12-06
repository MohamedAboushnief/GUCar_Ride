import React, { Component } from 'react';
import SignUp from './pages/sign_up';
import SignIn from './pages/sign_in';
import AddTrip from './pages/add_trip';
import ViewTrips from './pages/view_trips';
import EditInfo from './pages/edit_profile';
import Profile from './pages/profile_page';
import ViewRequests from './pages/view_driver_requests';
import { ThemeProvider, Input, Header, Icon } from 'react-native-elements';
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
import AddCar from './pages/add_car';
import { createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import * as SecureStore from 'expo-secure-store';
import RNRestart from 'react-native-restart';
// import { Icon } from 'react-native-vector-icons/Icon';

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

	onClickListener = async (viewId) => {
		await SecureStore.deleteItemAsync('token');
		this.props.navigationProps.navigate('Home');
		//RNRestart.Restart();
		const resetAction = StackActions.reset({
			index: 0,
			actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
		});
		this.props.navigationProps.dispatch(resetAction);
		//RNRestart.Restart();
	};

	render() {
		return (
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
					{/*Donute Button Image */}
					<Image source={require('./image/drawer.png')} style={{ width: 35, height: 35, marginLeft: 5 }} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.onClickListener()}>
					{/*Donute Button Image */}
					<Icon name="sign-out" type="font-awesome" color="grey" size={50} style={{ marginLeft: 120 }} />
				</TouchableOpacity>
			</View>
		);
	}
}

class NavigationDrawerStructure2 extends Component {
	//Structure for the navigatin Drawer
	toggleDrawer = () => {
		//Props to open/close the drawer
		this.props.navigationProps.toggleDrawer();
	};

	onClickListener = async (viewId) => {
		this.props.navigationProps.navigate('Profile');
	};

	render() {
		return (
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity onPress={() => this.onClickListener()}>
					{/*Donute Button Image */}
					<Icon name="home" type="font-awesome" color="grey" size={50} style={{ marginRight: 150 }} />
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
			headerBackground: (
				<Image
					source={require('./assets/gucarWhite.png')}
					style={{
						marginTop: 40,
						width: 390,
						height: 35,
						position: 'absolute'
					}}
				/>
			),
			// headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const ViewRequests_StackNavigator = createStackNavigator({
	//All the screen from the Screen1 will be indexed here
	ViewRequests: {
		screen: ViewRequests,
		navigationOptions: ({ navigation }) => ({
			headerBackground: (
				<Image
					source={require('./assets/gucarWhite.png')}
					style={{
						marginTop: 40,
						width: 390,
						height: 35,
						position: 'absolute'
					}}
				/>
			),
			headerLeft: <NavigationDrawerStructure2 navigationProps={navigation} />,
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const signUp_StackNavigator = createStackNavigator({
	//All the screen from the Screen1 will be indexed here
	SignUp: {
		screen: SignUp,
		navigationOptions: ({ navigation }) => ({
			// headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
			headerBackground: (
				<Image
					source={require('./assets/gucarWhite.png')}
					style={{
						marginTop: 40,
						width: 390,
						height: 35,
						position: 'absolute'
					}}
				/>
			),
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const signIn_StackNavigator = createStackNavigator({
	//All the screen from the Screen2 will be indexed here
	SignIn: {
		screen: SignIn,
		navigationOptions: ({ navigation }) => ({
			// headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
			headerBackground: (
				<Image
					source={require('./assets/gucarWhite.png')}
					style={{
						marginTop: 40,
						width: 390,
						height: 35,
						position: 'absolute'
					}}
				/>
			),
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const editInfo_StackNavigator = createStackNavigator({
	//All the screen from the Screen2 will be indexed here
	EditInfo: {
		screen: EditInfo,
		navigationOptions: ({ navigation }) => ({
			headerLeft: <NavigationDrawerStructure2 navigationProps={navigation} />,
			headerBackground: (
				<Image
					source={require('./assets/gucarWhite.png')}
					style={{
						marginTop: 40,
						width: 390,
						height: 35,
						position: 'absolute'
					}}
				/>
			),
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const profile_StackNavigator = createStackNavigator({
	//All the screen from the Screen2 will be indexed here
	Profile: {
		screen: Profile,
		navigationOptions: ({ navigation }) => ({
			headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
			headerBackground: (
				<Image
					source={require('./assets/gucarWhite.png')}
					style={{
						marginTop: 40,
						width: 390,
						height: 35,
						position: 'absolute'
					}}
				/>
			),
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const addCar_StackNavigator = createStackNavigator({
	//All the screen from the Screen2 will be indexed here
	AddCar: {
		screen: AddCar,
		navigationOptions: ({ navigation }) => ({
			headerLeft: <NavigationDrawerStructure2 navigationProps={navigation} />,
			headerBackground: (
				<Image
					source={require('./assets/gucarWhite.png')}
					style={{
						marginTop: 40,
						width: 390,
						height: 35,
						position: 'absolute'
					}}
				/>
			),
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const addTrip_StackNavigator = createStackNavigator({
	//All the screen from the Screen2 will be indexed here
	AddTrip: {
		screen: AddTrip,
		navigationOptions: ({ navigation }) => ({
			headerLeft: <NavigationDrawerStructure2 navigationProps={navigation} />,
			headerBackground: (
				<Image
					source={require('./assets/gucarWhite.png')}
					style={{
						marginTop: 40,
						width: 390,
						height: 35,
						position: 'absolute'
					}}
				/>
			),
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const viewTrips_StackNavigator = createStackNavigator({
	//All the screen from the Screen2 will be indexed here
	ViewTrips: {
		screen: ViewTrips,
		navigationOptions: ({ navigation }) => ({
			headerLeft: <NavigationDrawerStructure2 navigationProps={navigation} />,
			headerBackground: (
				<Image
					source={require('./assets/gucarWhite.png')}
					style={{
						marginTop: 40,
						width: 390,
						height: 35,
						position: 'absolute'
					}}
				/>
			),
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTintColor: 'black'
		})
	}
});

const signOut_StackNavigator = createStackNavigator({
	//All the screen from the Screen1 will be indexed here
	signOut: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
			headerBackground: (
				<Image
					source={require('./assets/gucarWhite.png')}
					style={{
						marginTop: 40,
						width: 390,
						height: 35,
						position: 'absolute'
					}}
				/>
			),
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
			drawerLabel: 'Home Page'
		}
	},
	Screen2: {
		//Title
		screen: signUp_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Sign Up'
		}
	},
	Screen3: {
		//Title
		screen: signIn_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Sign In'
		}
	},
	Screen4: {
		//Title
		screen: editInfo_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Edit Profile'
		}
	},
	Screen5: {
		//Title
		screen: profile_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Your Profile'
		}
	},
	Screen6: {
		//Title
		screen: addCar_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Add a vehicle'
		}
	},
	Screen7: {
		//Title
		screen: addTrip_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Add a Trip'
		}
	},
	Screen8: {
		//Title
		screen: viewTrips_StackNavigator,
		navigationOptions: {
			drawerLabel: 'View Trips'
		}
	},
	Screen9: {
		//Title
		screen: ViewRequests_StackNavigator,
		navigationOptions: {
			drawerLabel: 'View Requests'
		}
	},

	Screen10: {
		//Title
		screen: Home_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Sign Out'
		}
	}
});

const AppContainer = createAppContainer(DrawerNavigatorExample);

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}
