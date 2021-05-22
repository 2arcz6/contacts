module.exports = {
    HOST: "contacts.cpldk8ckiifu.ap-southeast-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "74189653",
    DB: "contacts",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };