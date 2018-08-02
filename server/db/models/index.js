const User = require('./user');
const Spaceship = require('./spaceship');
const Order = require('./order');
const LineItems = require('./lineItems')
const Review = require('./review')
const Session = require('./')



Order.belongsTo(User); // meaning Order will have user_id column and associated methods
User.hasMany(Order);// Adds methods to the user model 

Spaceship.belongsToMany(Order, { through: LineItems });
Order.belongsToMany(Spaceship, { through: LineItems });

//reviews associations for user
Review.belongsTo(User);
User.hasMany(Review);

//reviews associations for spacehip (product)
Review.belongsTo(Spaceship);
Spaceship.hasMany(Review);



module.exports = {
  User, Spaceship, Order, LineItems, Review
}
