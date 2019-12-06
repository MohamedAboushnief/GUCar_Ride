import React, { Component } from 'react';
import SignUp from './pages/sign_up';
import SignIn from './pages/sign_in';
import AddTrip from './pages/add_trip';
import GoogleSignIn from './pages/google_sign_in';
// import GoogleLogin from './pages/google_sign_in';

import EditInfo from './pages/edit_profile';
import Profile from './pages/profile_page';
import * as Google from 'expo-google-app-auth';
import Expo from 'expo';
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
import AddCar from './pages/add_car';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

// import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

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

					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Button title="Test To Add car" onPress={() => this.props.navigation.navigate('AddCar')} />
					</View>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Button title="Test To Add car" onPress={() => this.props.navigation.navigate('AddTrip')} />
					</View>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Button title="GoogleSignIn" onPress={() => this.props.navigation.navigate('GoogleSignIn')} />
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

const addTrip_StackNavigator = createStackNavigator({
	//All the screen from the Screen2 will be indexed here
	AddTrip: {
		screen: AddTrip,
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
const googleSignIn_StackNavigator = createStackNavigator({
	//All the screen from the Screen2 will be indexed here
	GoogleSignIn: {
		screen: GoogleSignIn,
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
		screen: googleSignIn_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Sign in with google'
		}
	},

	Screen9: {
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
