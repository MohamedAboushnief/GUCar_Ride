import React, { Component } from 'react';
import SignUp from './pages/sign_up';
import SignIn from './pages/sign_in';
import AddTrip from './pages/add_trip';
import GoogleSignIn from './pages/google_sign_in';
import EditInfo from './pages/edit_profile';
import Profile from './pages/profile_page';
import ChangePassword from './pages/change_password';
import * as Google from 'expo-google-app-auth';
import Expo from 'expo';
import ViewRequests from './pages/view_driver_requests';
import ViewTrips from './pages/view_trips';

import {
	StyleSheet,
	View,
	TextInput,
	TouchableHighlight,
	Image,
	Alert,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';
import {
	ThemeProvider,
	Input,
	Text,
	Button,
	HeaderSideMenu,
	List,
	ListItem,
	Header,
	SideMenu
} from 'react-native-elements';
import AddCar from './pages/add_car';
import { createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import * as SecureStore from 'expo-secure-store';
import Icon from 'react-native-vector-icons/FontAwesome';

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
					<Image
						source={require('./assets/car3.gif')}
						style={{
							width: 350,
							height: 120,
							alignSelf: 'center',
							marginBottom: 70
						}}
					/>
				</View>

				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<View>
						<Button
							buttonStyle={{
								backgroundColor: 'black',
								width: 150,
								height: 50,
								alignSelf: 'center',
								justifyContent: 'center',
								marginBottom: 50
							}}
							type={'outline'}
							title="Sign up"
							titleStyle={{ color: 'gainsboro' }}
							onPress={() => this.props.navigation.navigate('SignUp')}
						/>
					</View>
					<View>
						<Button
							buttonStyle={{
								backgroundColor: 'darkred',
								width: 150,
								height: 50,
								alignSelf: 'center',
								justifyContent: 'center',
								marginBottom: 50
							}}
							type={'outline'}
							title="Google sign in"
							titleStyle={{ color: 'gainsboro' }}
							onPress={() => this.props.navigation.navigate('GoogleSignIn')}
						/>
					</View>
					<View>
						<Button
							buttonStyle={{
								backgroundColor: 'gold',
								width: 150,
								height: 50,
								alignSelf: 'center',
								justifyContent: 'center',
								marginBottom: 50
							}}
							type={'outline'}
							title="GUCar sign in"
							titleStyle={{ color: 'white' }}
							onPress={() => this.props.navigation.navigate('SignIn')}
						/>
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

		// this.props.navigationProps.navigate('Home');
		this.props.navigationProps.dismiss();
		this.props.navigationProps.dispatch(
			StackActions.reset({
				index: 0,
				key: null,
				actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
			})
		);
	};

	render() {
		return (
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
					<Image
						source={require('./image/drawer.png')}
						style={{ width: 30, height: 30, marginLeft: 5, marginTop: 10 }}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.onClickListener()}>
					<Icon
						name="sign-out"
						type="font-awesome"
						color="grey"
						size={30}
						style={{ marginLeft: 280, marginTop: 10 }}
					/>
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
		//this.props.navigationProps.navigate('Profile');
		//this.props.navigationProps.dismiss();

		// this.props.navigationProps.dispatch(
		// 	NavigationActions.reset({
		// 		index: 1,
		// 		key: null,
		// 		actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
		// 	})
		// );
		const pushAction = StackActions.push({
			routeName: 'Profile'
		});

		this.props.navigationProps.dispatch(pushAction);
	};

	render() {
		return (
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity onPress={() => this.onClickListener()}>
					{/*Donute Button Image */}
					<Icon
						name="home"
						type="font-awesome"
						color="grey"
						size={30}
						style={{ marginRight: 150, marginLeft: 5 }}
					/>
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

const ChangePasswords_StackNavigator = createStackNavigator({
	//All the screen from the Screen2 will be indexed here
	ChangePassword: {
		screen: ChangePassword,
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
		screen: viewTrips_StackNavigator,
		navigationOptions: {
			drawerLabel: 'View Trips'
		}
	},
	Screen10: {
		//Title
		screen: ViewRequests_StackNavigator,
		navigationOptions: {
			drawerLabel: 'View Requests'
		}
	},
	Screen11: {
		//Title
		screen: ChangePasswords_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Change Password'
		}
	},
	Screen12: {
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
