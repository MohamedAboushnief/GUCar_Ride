"# GUCar_Ride" 

Deployment_Link : http://ec2-54-93-247-139.eu-central-1.compute.amazonaws.com
How to run node backend using docker : - docker build -t gucar .
                                       - docker run gucar

how to run node backend using docker-compose : - docker-compose up
dependencies: 
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

services used: -Google Sign In
               -AWS RDS (Postgres)
               -AWS EC2 (Deployment)