const express = require('express');
const app = express();
<<<<<<< HEAD
const user = require("./routes/user");
const request = require("./routes/request");

var passport = require("passport");
=======
const user = require('./routes/user');
var passport = require('passport');
>>>>>>> 898b18962c5adc244c615b2823892c1ca6a76661
const port = 3000;

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
<<<<<<< HEAD
app.use("/routes/users", user);
app.use("/routes/request", request);
=======
app.use('/routes/users', user);
>>>>>>> 898b18962c5adc244c615b2823892c1ca6a76661

app.listen(port, () => console.log(`app listening on port ${port}!`));
