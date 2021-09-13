const controller = require("../controllers/car.controller");
const { authJwt } = require("../middlewares");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/car/all", controller.findAll);
  app.post("/api/car/create", controller.create);
  app.get("/api/car/find",[authJwt.verifyToken], controller.findOne);
  app.delete("/api/car/delete", controller.delete);

};
