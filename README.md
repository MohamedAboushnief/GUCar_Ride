# GUCar_Ride 

## Deployment Link

http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com


## Config file Example



```bash
cd config
touch keys_development.js
```
then copy the following code example inside the created file
and add your config details
```
module.exports = {
    secretOrKey:'example',
    pgDB: 'postgresql://postgres:yourpassword@name:portnumber/postgres'
}
```
## Run using Docker

use this command in root of the folder


```bash
docker build -t gucar .
docker run gucar
```

## Run using Docker-Compose

use this command in root of the folder

```bash
docker-compose up
```


## Dependencies
```
"dependencies": {
		"bcryptjs": "^2.4.3",
		"cors": "^2.8.5",
		"expo-server-sdk": "^3.4.0",
		"express": "^4.17.1",
		"jsonwebtoken": "^8.5.1",
		"nodemon": "^2.0.1",
		"objection": "^1.6.11",
		"passport": "^0.4.0",
		"passport-jwt": "^4.0.0",
		"pg": "^7.14.0",
		"react-native-restart": "0.0.13",
		"sequelize": "^5.21.2"
	}
```

## Services Used

- Google Sign In
- AWS RDS (Postgres)
- AWS EC2 (Deployment)

## Contributors

Ali ElSebaie 


