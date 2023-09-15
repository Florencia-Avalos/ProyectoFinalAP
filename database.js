import { Sequelize } from "sequelize";


const dbnName = process.env.DB_NAME
const dbnUserName = process.env.DB_USERNAME
const dbnpassword = process.env.DB_PASSWORD



   export const sequelize= new Sequelize(dbnName,dbnUserName,dbnpassword,{
    host:'localhost',
    dialect: 'mysql',
    logging: console.log,
  })


   export const DbTest = async ()=>{
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }





