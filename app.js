const express = require('express');
const app = express();
const port = 3000;

const Sequelize = require('./config/databaseConfig');

Sequelize.authenticate()
	.then(() => {
		console.log('database connected');
	})
	.catch((error) => {
		console.log(error);
	});

app.get('/', (req, res) => res.send('Hello World!'));


app.listen(port, () => console.log(`app listening on port ${port}!`));
