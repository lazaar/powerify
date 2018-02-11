'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    domain: DataTypes.STRING,
    productId: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Review;
};