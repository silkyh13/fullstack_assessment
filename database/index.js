require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize connection established");
  })
  .catch(err => console.error("Unable to connect:", err));

const User = sequelize.define("user", {
  firstName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  lastName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

sequelize.sync();

module.exports = {
  User,
  Sequelize
};
