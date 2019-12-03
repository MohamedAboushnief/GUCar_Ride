const express = require('express');
const cors = require('cors');
const app = express();
const user = require('./routes/user');
const request = require('./routes/request');
const driver_car = require('./routes/driver_car');
const trip = require('./routes/trip');
const passenger_request = require('./routes/passenger_request');
var passport = require('passport');
const port = 5000;

const Sequelize = require('./config/databaseConfig');

Sequelize.authenticate()
	.then(() => {
		console.log('database connected');
	})
	.catch((error) => {
		console.log(error);
	});

const eraseDatabaseOnSync = false;

Sequelize.sync({ force: eraseDatabaseOnSync })
	.then(() => console.log('Synced models with database .'))
	.then(() => {})
	.catch((error) => console.log('Could not sync models with database .', error));

app.use(express.json());
app.use(passport.initialize());
app.use(cors());
app.use('/routes/users', user);
app.use('/routes/requests', request);
app.use('/routes/drivers_cars', driver_car);
app.use('/routes/trips', trip);
app.use('/routes/passenger_request', passenger_request);

app.listen(port, () => console.log(`app listening on port ${port}!`));
