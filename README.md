# GUCar_Ride 

A carpooling service application that is used to help GUC students on their commute everyday to save fuel and the hastle of parking spaces, by using this application a student can see and request another student who is going to the GUC and pay for him, also the student who is going with his car can request the fare that he wants on the passengers that are going with him or he can do it as volunteering. 

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
		"express": "^4.17.1",
		"jsonwebtoken": "^8.5.1",
		"nodemon": "^2.0.1",
		"objection": "^1.6.11",
		"passport": "^0.4.0",
		"passport-jwt": "^4.0.0",
		"pg": "^7.14.0",
		"sequelize": "^5.21.2"
	}
```

## Services Used

- Google Sign In
- AWS RDS (Postgres)
- AWS EC2 (Deployment)




