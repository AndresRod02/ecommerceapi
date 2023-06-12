const userRoutes = require("./users.routes");
const productsRoute = require("./products.routes");
const orderRoute = require('./orders.routes');
const productInCartRoute = require('./productInCart.routes');
const productInOrderRoute = require('./productInOrder.routes')
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

const apiRoutes = (app) => {
  app.use(userRoutes);
  app.use(productsRoute);
  app.use(orderRoute);
  app.use(productInCartRoute);
  app.use(productInOrderRoute);
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc)); 

};

module.exports = apiRoutes;
