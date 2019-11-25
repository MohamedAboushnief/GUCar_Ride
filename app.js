const express = require("express");
const app = express();
const user = require("./routes/user");
var passport = require("passport");
const port = 3000;

const Sequelize = require("./config/databaseConfig");

Sequelize.authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch(error => {
    console.log(error);
  });

const eraseDatabaseOnSync = false;

Sequelize.sync({ force: eraseDatabaseOnSync })
  .then(() => console.log("Synced models with database ."))
  .then(() => {})
  .catch(error => console.log("Could not sync models with database .", error));

app.use(express.json());
app.use(passport.initialize());
app.use("/routes/users", user);

app.listen(port, () => console.log(`app listening on port ${port}!`));
