module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contacts", {
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      favorite: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Contact;
  };