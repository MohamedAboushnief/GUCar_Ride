module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        first_name:{
          validate: {
            max: 30, 
            min: 2,
            notEmpty: true
          },
          type: type.STRING,
          allowNull: false,
        },
        last_name:{
          validate: {
            max: 30, 
            min: 2,
            notEmpty: true
          },
          type: type.STRING,
          allowNull: false,
        },
        email:{
          validate: {
            isEmail: true,
            max: 50, 
            notEmpty: true
          },
          type: type.STRING,
          unique: true,
          allowNull: false
        } ,
        password:{
          validate: {
            min: 4, 
          },
          type: type.STRING,
          unique: true,
          allowNull: false
        },
        guc_id:{
          validate: {
            max: 10, 
            min: 2,
            notEmpty: true,
          },
          type: type.STRING,
          unique: true,
          allowNull: false
        },
        age:{
          validate: {
            max: 4,
            notEmpty: true
          },
          type: type.INTEGER,
          unique: true,
          allowNull: false
        },
        gender: {
          type:   Sequelize.ENUM,
          values: ['male','female']
        },
        address:{
          type: type.STRING
        },
        rating:{
          validate: {
            max: 2,
          },
          type: Sequelize.FLOAT,

        } 

    })
}