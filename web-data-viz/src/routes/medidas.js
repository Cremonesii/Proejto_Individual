var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/grafico_quiz/:idUsuario", function (req, res) {
    medidaController.grafico_quiz(req, res);
});

module.exports = router;